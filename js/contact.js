// ارسال فرم تماس
function submitContactForm(event) {
    event.preventDefault();
    
    // گرفتن مقادیر فرم
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    // اعتبارسنجی
    if (!fullName || fullName.length < 3) {
        alert('❌ لطفاً نام و نام خانوادگی کامل را وارد کنید');
        return;
    }
    
    if (!phone || phone.length !== 11 || !phone.startsWith('09')) {
        alert('❌ شماره موبایل نامعتبر است');
        return;
    }
    
    if (!email || !isValidEmail(email)) {
        alert('❌ ایمیل نامعتبر است');
        return;
    }
    
    if (!subject) {
        alert('❌ لطفاً موضوع پیام را انتخاب کنید');
        return;
    }
    
    if (!message || message.length < 20) {
        alert('❌ پیام باید حداقل 20 کاراکتر باشد');
        return;
    }
    
    // نمایش لودینگ
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ در حال ارسال...';
    btn.disabled = true;
    
    // شبیه‌سازی ارسال به سرور
    setTimeout(() => {
        // در پروژه واقعی به API ارسال می‌شود
        const contactData = {
            fullName,
            phone,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('fa-IR')
        };
        
        // ذخیره در localStorage (برای تست)
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contactData);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        // نمایش پیام موفقیت
        alert(`✅ پیام شما با موفقیت ارسال شد!

📝 خلاصه پیام:
نام: ${fullName}
ایمیل: ${email}
موضوع: ${getSubjectText(subject)}

تیم پشتیبانی ما در اسرع وقت با شما تماس خواهد گرفت.`);
        
        // ریست کردن فرم
        document.getElementById('contactForm').reset();
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // اسکرول به بالا
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

// بررسی اعتبار ایمیل
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// دریافت متن موضوع
function getSubjectText(value) {
    const subjects = {
        'support': 'پشتیبانی فنی',
        'order': 'سوال درباره سفارش',
        'product': 'سوال درباره محصولات',
        'complaint': 'شکایت و انتقاد',
        'suggestion': 'پیشنهاد',
        'cooperation': 'همکاری',
        'other': 'سایر موارد'
    };
    return subjects[value] || value;
}

// فرمت شماره تلفن در حین تایپ
document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    e.target.value = value;
});

// شمارنده کاراکتر برای textarea
document.getElementById('message')?.addEventListener('input', function(e) {
    const length = e.target.value.length;
    const small = e.target.nextElementSibling;
    
    if (length < 20) {
        small.textContent = `حداقل 20 کاراکتر (${length}/20)`;
        small.style.color = '#dc2626';
    } else {
        small.textContent = `${length} کاراکتر`;
        small.style.color = '#10b981';
    }
});

// کپی آدرس ایمیل با کلیک
document.querySelectorAll('.info-card a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.textContent;
        navigator.clipboard.writeText(email).then(() => {
            alert(`✅ ایمیل کپی شد!\n${email}`);
        });
    });
});

// کپی شماره تلفن با کلیک
document.querySelectorAll('.info-card a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const phone = this.textContent.replace(/\D/g, '');
        if (confirm('آیا می‌خواهید شماره کپی شود؟\n' + this.textContent)) {
            e.preventDefault();
            navigator.clipboard.writeText(phone).then(() => {
                alert(`✅ شماره کپی شد!\n${this.textContent}`);
            });
        }
    });
});

// انیمیشن ورود المان‌ها
document.addEventListener('DOMContentLoaded', function() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// شبیه‌سازی باز شدن نقشه
document.querySelector('.map-placeholder')?.addEventListener('click', function() {
    alert('🗺️ نقشه\n\nدر پروژه واقعی اینجا نقشه Google Maps یا نقشه‌های دیگر نمایش داده می‌شود.\n\nآدرس: تهران، خیابان آزادی، نرسیده به میدان آزادی، پلاک 1234');
});

// لاگ کردن پیام‌ها در کنسول (برای توسعه‌دهندگان)
console.log('📞 صفحه تماس با ما بارگذاری شد');
console.log('✅ فرم تماس آماده دریافت پیام است');