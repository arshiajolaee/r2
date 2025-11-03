// انیمیشن شمارنده آمار
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // فرمت کردن عدد
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString('fa-IR');
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// شروع انیمیشن شمارنده‌ها
function startCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
    });
}

// مشاهده‌گر تقاطع برای انیمیشن‌ها
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // اگر بخش آمار است، شمارنده‌ها را شروع کن
            if (entry.target.classList.contains('stats-section')) {
                startCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// انیمیشن ورود المان‌ها
document.addEventListener('DOMContentLoaded', function() {
    // انیمیشن کارت‌های ارزش‌ها
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // انیمیشن تیم
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 150);
    });
    
    // انیمیشن خدمات
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // انیمیشن گواهینامه‌ها
    const certCards = document.querySelectorAll('.certificate-card');
    certCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'rotateY(90deg)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'rotateY(0)';
        }, index * 150);
    });
    
    // مشاهده‌گر برای بخش آمار
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsSection.style.opacity = '0';
        statsSection.style.transform = 'translateY(30px)';
        statsSection.style.transition = 'all 0.6s ease';
        observer.observe(statsSection);
    }
    
    // لاگ
    console.log('✅ صفحه درباره ما بارگذاری شد');
});

// افکت موس برای کارت‌های ارزش
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// انیمیشن کلیک برای دکمه‌های CTA
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // اگر لینک داخلی است
        if (this.getAttribute('href').startsWith('index.html') || 
            this.getAttribute('href').startsWith('contact.html')) {
            
            // افکت کلیک
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        }
    });
});

// افکت اسکرول نرم برای لینک‌های داخلی
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// تغییر رنگ هدر در اسکرول
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(20, 20, 20, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(212, 175, 55, 0.3)';
    } else {
        header.style.background = 'rgba(20, 20, 20, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(212, 175, 55, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// انیمیشن برای آیکون‌ها
const icons = document.querySelectorAll('.value-icon, .service-icon, .cert-icon');
icons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
        this.style.transition = 'all 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// کپی اطلاعات تماس با کلیک
document.querySelectorAll('.footer-section p').forEach(p => {
    if (p.textContent.includes('021') || p.textContent.includes('@')) {
        p.style.cursor = 'pointer';
        p.title = 'کلیک کنید تا کپی شود';
        
        p.addEventListener('click', function() {
            const text = this.textContent.replace(/[📞✉️📍]/g, '').trim();
            navigator.clipboard.writeText(text).then(() => {
                // نمایش پیام موقت
                const originalText = this.textContent;
                this.textContent = '✅ کپی شد!';
                this.style.color = '#10b981';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('خطا در کپی:', err);
            });
        });
    }
});

// پارالاکس ساده برای hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.about-hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// لاگ آماری
console.log('📊 آمار سایت:');
console.log('- 15 سال سابقه');
console.log('- 50,000+ مشتری راضی');
console.log('- 5,000+ محصول متنوع');
console.log('- 98% رضایت مشتریان');