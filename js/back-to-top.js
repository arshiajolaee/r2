// دکمه بازگشت به بالای صفحه - حرفه‌ای و انیمیت‌دار

class BackToTop {
    constructor(options = {}) {
        this.options = {
            scrollThreshold: options.scrollThreshold || 300,
            scrollDuration: options.scrollDuration || 500,
            showOnLoad: options.showOnLoad || false,
            position: options.position || 'left', // 'left' or 'right'
            bottom: options.bottom || '30px',
            side: options.side || '30px',
            ...options
        };

        this.button = null;
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.createButton();
        this.attachStyles();
        this.attachEventListeners();

        if (this.options.showOnLoad) {
            this.show();
        }
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.id = 'back-to-top';
        this.button.className = 'back-to-top-btn';
        this.button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="tooltip">بازگشت به بالا</span>
        `;
        this.button.setAttribute('aria-label', 'بازگشت به بالای صفحه');
        this.button.style[this.options.position] = this.options.side;
        this.button.style.bottom = this.options.bottom;

        document.body.appendChild(this.button);
    }

    attachStyles() {
        if (document.getElementById('back-to-top-styles')) return;

        const style = document.createElement('style');
        style.id = 'back-to-top-styles';
        style.textContent = `
            .back-to-top-btn {
                position: fixed;
                width: 55px;
                height: 55px;
                background: linear-gradient(135deg, #d4af37, #f2d06b);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.9);
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                color: #0a0a0a;
            }

            .back-to-top-btn.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }

            .back-to-top-btn:hover {
                transform: translateY(-5px) scale(1.05);
                box-shadow: 0 12px 35px rgba(212, 175, 55, 0.6);
            }

            .back-to-top-btn:active {
                transform: translateY(-2px) scale(1);
            }

            .back-to-top-btn svg {
                width: 24px;
                height: 24px;
                animation: bounce 2s infinite;
            }

            @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-5px);
                }
            }

            .back-to-top-btn:hover svg {
                animation: none;
            }

            .back-to-top-btn .tooltip {
                position: absolute;
                ${this.options.position === 'left' ? 'right' : 'left'}: calc(100% + 15px);
                top: 50%;
                transform: translateY(-50%);
                background: rgba(20, 20, 20, 0.95);
                color: #d4af37;
                padding: 8px 15px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s;
                border: 2px solid rgba(212, 175, 55, 0.3);
                pointer-events: none;
            }

            .back-to-top-btn .tooltip::after {
                content: '';
                position: absolute;
                top: 50%;
                ${this.options.position === 'left' ? 'left' : 'right'}: 100%;
                transform: translateY(-50%);
                border: 8px solid transparent;
                border-${this.options.position === 'left' ? 'left' : 'right'}-color: rgba(212, 175, 55, 0.3);
            }

            .back-to-top-btn:hover .tooltip {
                opacity: 1;
                visibility: visible;
                ${this.options.position === 'left' ? 'right' : 'left'}: calc(100% + 20px);
            }

            /* Progress Circle */
            .back-to-top-btn::before {
                content: '';
                position: absolute;
                top: -3px;
                left: -3px;
                right: -3px;
                bottom: -3px;
                border-radius: 50%;
                border: 3px solid transparent;
                border-top-color: #0a0a0a;
                animation: rotate 1.5s linear infinite;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .back-to-top-btn.scrolling::before {
                opacity: 1;
            }

            @keyframes rotate {
                to {
                    transform: rotate(360deg);
                }
            }

            @media (max-width: 768px) {
                .back-to-top-btn {
                    width: 50px;
                    height: 50px;
                    ${this.options.position}: 20px !important;
                    bottom: 20px !important;
                }

                .back-to-top-btn .tooltip {
                    display: none;
                }
            }
        `;

        document.head.appendChild(style);
    }

    attachEventListeners() {
        // نمایش/مخفی کردن دکمه بر اساس اسکرول
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > this.options.scrollThreshold) {
                this.show();
            } else {
                this.hide();
            }

            // نمایش loading در حین اسکرول
            if (!this.isScrolling) {
                this.button.classList.add('scrolling');
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.button.classList.remove('scrolling');
            }, 150);
        });

        // کلیک روی دکمه
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });

        // Keyboard accessibility
        this.button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.scrollToTop();
            }
        });
    }

    show() {
        this.button.classList.add('show');
        this.button.setAttribute('tabindex', '0');
    }

    hide() {
        this.button.classList.remove('show');
        this.button.setAttribute('tabindex', '-1');
    }

    scrollToTop() {
        this.isScrolling = true;
        this.button.classList.add('scrolling');

        // استفاده از smooth scroll
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // اگر smooth scroll کار نکرد، از انیمیشن دستی استفاده کن
        const duration = this.options.scrollDuration;
        const start = window.pageYOffset;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeInOutCubic)
            const easing = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, start * (1 - easing));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                this.isScrolling = false;
                this.button.classList.remove('scrolling');
            }
        };

        // فقط اگر smooth scroll کار نکرد
        if (!('scrollBehavior' in document.documentElement.style)) {
            requestAnimationFrame(animateScroll);
        } else {
            setTimeout(() => {
                this.isScrolling = false;
                this.button.classList.remove('scrolling');
            }, duration);
        }
    }

    destroy() {
        if (this.button) {
            this.button.remove();
        }

        const style = document.getElementById('back-to-top-styles');
        if (style) {
            style.remove();
        }
    }
}

// ساخت instance عمومی
const backToTop = new BackToTop({
    scrollThreshold: 400,
    position: 'left', // یا 'right'
    bottom: '30px',
    side: '30px'
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackToTop;
}

// نمونه استفاده:
// const backToTop = new BackToTop();
// با تنظیمات سفارشی:
// const backToTop = new BackToTop({
//     scrollThreshold: 500,
//     position: 'right',
//     bottom: '40px',
//     side: '40px'
// });