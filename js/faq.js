// باز/بسته کردن سوال
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // بستن همه سوالات
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // اگر این سوال باز نبود، بازش کن
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// فیلتر کردن بر اساس دسته‌بندی
function filterCategory(category) {
    const items = document.querySelectorAll('.faq-item');
    const noResults = document.getElementById('noResults');
    
    // بروزرسانی دکمه‌های دسته‌بندی
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    let visibleCount = 0;
    
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // نمایش/مخفی کردن پیام "نتیجه‌ای یافت نشد"
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
    
    // اسکرول به بالا
    window.scrollTo({ top: 400, behavior: 'smooth' });
}

// جستجو در سوالات
function searchFAQ() {
    const searchTerm = document.getElementById('faqSearch').value.toLowerCase().trim();
    const items = document.querySelectorAll('.faq-item');
    const noResults = document.getElementById('noResults');
    
    let visibleCount = 0;
    
    items.forEach(item => {
        const question = item.querySelector('.question-text').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
            visibleCount++;
            
            // هایلایت کردن کلمه جستجو شده
            if (searchTerm.length > 0) {
                highlightText(item, searchTerm);
            }
        } else {
            item.style.display = 'none';
        }
    });
    
    // نمایش/مخفی کردن پیام "نتیجه‌ای یافت نشد"
    if (visibleCount === 0 && searchTerm.length > 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
    
    // ریست کردن دکمه دسته‌بندی "همه سوالات"
    if (searchTerm.length === 0) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.category-btn').classList.add('active');
    }
}

// هایلایت کردن متن جستجو شده
function highlightText(element, searchTerm) {
    // در پروژه واقعی می‌توان با استفاده از mark.js یا روش‌های دیگر هایلایت کرد
    // فعلاً ساده نگه داشته‌ایم
}

// رویدادهای کیبورد برای جستجو
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('faqSearch');
    
    if (searchInput) {
        // جستجوی realtime
        searchInput.addEventListener('input', searchFAQ);
        
        // پاک کردن جستجو با فشار دکمه Escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                searchFAQ();
                this.blur();
            }
        });
    }
    
    // انیمیشن ورود المان‌ها
    animateFAQItems();
});

// انیمیشن ورود سوالات
function animateFAQItems() {
    const items = document.querySelectorAll('.faq-item');
    
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// شمارنده سوالات فعال
function updateActiveCount() {
    const activeItems = document.querySelectorAll('.faq-item:not([style*="display: none"])');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        const category = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        let count = 0;
        
        if (category === 'all') {
            count = document.querySelectorAll('.faq-item').length;
        } else {
            count = document.querySelectorAll(`.faq-item[data-category="${category}"]`).length;
        }
        
        // اضافه کردن شمارنده به دکمه (اختیاری)
        // btn.innerHTML += ` <span style="color: #666;">(${count})</span>`;
    });
}

// Print FAQ (چاپ سوالات)
function printFAQ() {
    const openItems = document.querySelectorAll('.faq-item.active');
    
    if (openItems.length === 0) {
        alert('❌ لطفاً ابتدا سوالات مورد نظر خود را باز کنید');
        return;
    }
    
    window.print();
}

// Share FAQ (اشتراک‌گذاری)
function shareFAQ() {
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'سوالات متداول - تابش الکتریک',
            text: 'سوالات متداول فروشگاه تابش الکتریک',
            url: url
        }).then(() => {
            console.log('اشتراک‌گذاری موفق');
        }).catch((error) => {
            console.error('خطا در اشتراک‌گذاری:', error);
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

// کپی کردن لینک
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ لینک کپی شد!');
    }).catch(() => {
        alert('❌ خطا در کپی کردن لینک');
    });
}

// اسکرول نرم به سوال خاص
function scrollToFAQ(faqId) {
    const element = document.getElementById(faqId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // باز کردن سوال
        setTimeout(() => {
            element.querySelector('.faq-question').click();
        }, 500);
    }
}

// آماده‌سازی برای چاپ
window.addEventListener('beforeprint', function() {
    // باز کردن تمام سوالات برای چاپ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.add('active');
    });
});

window.addEventListener('afterprint', function() {
    // بستن سوالات بعد از چاپ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
});

// نمایش تعداد نتایج جستجو
document.getElementById('faqSearch')?.addEventListener('input', function() {
    const visibleItems = document.querySelectorAll('.faq-item:not([style*="display: none"])').length;
    const totalItems = document.querySelectorAll('.faq-item').length;
    
    if (this.value.trim().length > 0) {
        console.log(`نمایش ${visibleItems} از ${totalItems} سوال`);
    }
});