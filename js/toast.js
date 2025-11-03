// سیستم Toast Notification حرفه‌ای

class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // ساخت container برای toast ها
        if (!document.getElementById('toast-container')) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
            `;
            document.body.appendChild(this.container);
        } else {
            this.container = document.getElementById('toast-container');
        }

        // اضافه کردن استایل‌ها
        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById('toast-styles')) return;

        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                background: rgba(20, 20, 20, 0.98);
                border: 2px solid;
                border-radius: 12px;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                min-width: 300px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                animation: slideIn 0.3s ease;
                backdrop-filter: blur(10px);
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .toast:hover {
                transform: translateX(-5px);
            }

            .toast.toast-success {
                border-color: #10b981;
            }

            .toast.toast-error {
                border-color: #dc2626;
            }

            .toast.toast-warning {
                border-color: #fbbf24;
            }

            .toast.toast-info {
                border-color: #3b82f6;
            }

            .toast-icon {
                font-size: 28px;
                flex-shrink: 0;
            }

            .toast-content {
                flex: 1;
            }

            .toast-title {
                font-weight: 700;
                font-size: 15px;
                margin-bottom: 4px;
                color: #f5f5f5;
            }

            .toast-message {
                font-size: 14px;
                color: #ccc;
                line-height: 1.5;
            }

            .toast-close {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: #999;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                flex-shrink: 0;
            }

            .toast-close:hover {
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
            }

            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(to right, #d4af37, #f2d06b);
                border-radius: 0 0 10px 10px;
                animation: progress linear;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-100%);
                }
            }

            @keyframes progress {
                from { width: 100%; }
                to { width: 0%; }
            }

            @media (max-width: 768px) {
                #toast-container {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }

                .toast {
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    show(options) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = 4000,
            icon = null
        } = options;

        // ساخت المان toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.position = 'relative';
        toast.style.overflow = 'hidden';

        // تعیین آیکون
        const icons = {
            success: icon || '✅',
            error: icon || '❌',
            warning: icon || '⚠️',
            info: icon || 'ℹ️'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">×</button>
            ${duration > 0 ? `<div class="toast-progress" style="animation-duration: ${duration}ms;"></div>` : ''}
        `;

        // اضافه کردن به container
        this.container.appendChild(toast);

        // دکمه بستن
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.remove(toast));

        // کلیک روی خود toast
        toast.addEventListener('click', (e) => {
            if (e.target !== closeBtn) {
                this.remove(toast);
            }
        });

        // حذف خودکار
        if (duration > 0) {
            setTimeout(() => {
                this.remove(toast);
            }, duration);
        }

        return toast;
    }

    remove(toast) {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // متدهای میانبر
    success(message, title = 'موفق!') {
        return this.show({ type: 'success', title, message });
    }

    error(message, title = 'خطا!') {
        return this.show({ type: 'error', title, message });
    }

    warning(message, title = 'هشدار!') {
        return this.show({ type: 'warning', title, message });
    }

    info(message, title = '') {
        return this.show({ type: 'info', title, message });
    }

    // Toast های خاص
    addedToCart(productName) {
        return this.show({
            type: 'success',
            title: 'به سبد خرید اضافه شد',
            message: productName,
            icon: '🛒',
            duration: 3000
        });
    }

    removedFromCart(productName) {
        return this.show({
            type: 'info',
            title: 'از سبد حذف شد',
            message: productName,
            icon: '🗑️',
            duration: 3000
        });
    }

    orderSuccess(orderNumber) {
        return this.show({
            type: 'success',
            title: 'سفارش ثبت شد!',
            message: `شماره سفارش: ${orderNumber}`,
            icon: '🎉',
            duration: 5000
        });
    }

    loading(message = 'در حال بارگذاری...') {
        return this.show({
            type: 'info',
            title: '',
            message: message,
            icon: '⏳',
            duration: 0 // نمایش تا زمان حذف دستی
        });
    }

    discountApplied(amount) {
        return this.show({
            type: 'success',
            title: 'کد تخفیف اعمال شد',
            message: `${amount.toLocaleString()} تومان تخفیف`,
            icon: '🎁',
            duration: 4000
        });
    }
}

// ساخت instance عمومی
const toast = new ToastManager();

// Export برای استفاده در سایر فایل‌ها
if (typeof module !== 'undefined' && module.exports) {
    module.exports = toast;
}

// نمونه استفاده:
// toast.success('محصول به سبد خرید اضافه شد');
// toast.error('خطا در ارتباط با سرور');
// toast.warning('موجودی محصول کم است');
// toast.info('اطلاعات ذخیره شد');
// toast.addedToCart('لامپ LED 12 وات');
// const loadingToast = toast.loading('در حال پردازش...');
// setTimeout(() => toast.remove(loadingToast), 2000);