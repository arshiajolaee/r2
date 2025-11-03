// سیستم Loading Skeleton حرفه‌ای

class SkeletonLoader {
    constructor() {
        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById('skeleton-styles')) return;

        const style = document.createElement('style');
        style.id = 'skeleton-styles';
        style.textContent = `
            .skeleton {
                background: linear-gradient(
                    90deg,
                    rgba(30, 30, 30, 0.8) 0%,
                    rgba(40, 40, 40, 0.9) 50%,
                    rgba(30, 30, 30, 0.8) 100%
                );
                background-size: 200% 100%;
                animation: skeleton-loading 1.5s ease-in-out infinite;
                border-radius: 8px;
            }

            @keyframes skeleton-loading {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }

            .skeleton-pulse {
                animation: skeleton-pulse 1.5s ease-in-out infinite;
            }

            @keyframes skeleton-pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }

            /* Product Card Skeleton */
            .skeleton-product-card {
                background: rgba(20, 20, 20, 0.9);
                border: 2px solid rgba(212, 175, 55, 0.2);
                border-radius: 15px;
                overflow: hidden;
                padding: 20px;
            }

            .skeleton-product-image {
                width: 100%;
                height: 200px;
                margin-bottom: 15px;
            }

            .skeleton-product-brand {
                width: 60px;
                height: 14px;
                margin-bottom: 10px;
            }

            .skeleton-product-title {
                width: 100%;
                height: 20px;
                margin-bottom: 10px;
            }

            .skeleton-product-rating {
                width: 120px;
                height: 16px;
                margin-bottom: 15px;
            }

            .skeleton-product-price {
                width: 90px;
                height: 24px;
                margin-bottom: 15px;
            }

            .skeleton-product-button {
                width: 100%;
                height: 45px;
            }

            /* Order Card Skeleton */
            .skeleton-order-card {
                background: rgba(20, 20, 20, 0.9);
                border: 2px solid rgba(212, 175, 55, 0.2);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 20px;
            }

            .skeleton-order-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            }

            .skeleton-order-number {
                width: 150px;
                height: 24px;
            }

            .skeleton-order-status {
                width: 100px;
                height: 30px;
                border-radius: 15px;
            }

            .skeleton-order-details {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }

            .skeleton-order-detail {
                width: 100%;
                height: 40px;
            }

            /* Table Row Skeleton */
            .skeleton-table-row {
                display: grid;
                grid-template-columns: 80px 1fr 150px 120px 100px 120px 150px;
                gap: 20px;
                padding: 20px;
                border-bottom: 1px solid rgba(212, 175, 55, 0.1);
                align-items: center;
            }

            .skeleton-table-cell {
                height: 20px;
            }

            .skeleton-table-image {
                width: 60px;
                height: 60px;
                border-radius: 8px;
            }

            /* Stats Card Skeleton */
            .skeleton-stat-card {
                background: rgba(30, 30, 30, 0.8);
                border: 2px solid rgba(212, 175, 55, 0.2);
                border-radius: 15px;
                padding: 25px;
                display: flex;
                gap: 15px;
            }

            .skeleton-stat-icon {
                width: 60px;
                height: 60px;
                border-radius: 12px;
            }

            .skeleton-stat-info {
                flex: 1;
            }

            .skeleton-stat-title {
                width: 80px;
                height: 16px;
                margin-bottom: 10px;
            }

            .skeleton-stat-value {
                width: 120px;
                height: 28px;
            }

            /* Address Card Skeleton */
            .skeleton-address-card {
                background: rgba(30, 30, 30, 0.8);
                border: 2px solid rgba(212, 175, 55, 0.2);
                border-radius: 15px;
                padding: 25px;
            }

            .skeleton-address-title {
                width: 100px;
                height: 20px;
                margin-bottom: 15px;
            }

            .skeleton-address-line {
                width: 100%;
                height: 16px;
                margin-bottom: 8px;
            }

            .skeleton-address-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }

            .skeleton-address-button {
                width: 100px;
                height: 36px;
                border-radius: 8px;
            }

            /* Grid Layouts */
            .skeleton-grid {
                display: grid;
                gap: 25px;
            }

            .skeleton-grid.products {
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            }

            .skeleton-grid.stats {
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }

            .skeleton-grid.addresses {
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            }

            @media (max-width: 768px) {
                .skeleton-table-row {
                    grid-template-columns: 1fr;
                }

                .skeleton-grid.products,
                .skeleton-grid.addresses {
                    grid-template-columns: 1fr;
                }

                .skeleton-grid.stats {
                    grid-template-columns: 1fr 1fr;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // ساخت Skeleton برای کارت محصول
    createProductCard() {
        return `
            <div class="skeleton-product-card">
                <div class="skeleton skeleton-product-image"></div>
                <div class="skeleton skeleton-product-brand"></div>
                <div class="skeleton skeleton-product-title"></div>
                <div class="skeleton skeleton-product-rating"></div>
                <div class="skeleton skeleton-product-price"></div>
                <div class="skeleton skeleton-product-button"></div>
            </div>
        `;
    }

    // ساخت Skeleton برای کارت سفارش
    createOrderCard() {
        return `
            <div class="skeleton-order-card">
                <div class="skeleton-order-header">
                    <div class="skeleton skeleton-order-number"></div>
                    <div class="skeleton skeleton-order-status"></div>
                </div>
                <div class="skeleton-order-details">
                    <div class="skeleton skeleton-order-detail"></div>
                    <div class="skeleton skeleton-order-detail"></div>
                    <div class="skeleton skeleton-order-detail"></div>
                </div>
            </div>
        `;
    }

    // ساخت Skeleton برای ردیف جدول
    createTableRow() {
        return `
            <div class="skeleton-table-row">
                <div class="skeleton skeleton-table-image"></div>
                <div class="skeleton skeleton-table-cell"></div>
                <div class="skeleton skeleton-table-cell"></div>
                <div class="skeleton skeleton-table-cell"></div>
                <div class="skeleton skeleton-table-cell"></div>
                <div class="skeleton skeleton-table-cell"></div>
                <div class="skeleton skeleton-table-cell"></div>
            </div>
        `;
    }

    // ساخت Skeleton برای کارت آمار
    createStatCard() {
        return `
            <div class="skeleton-stat-card">
                <div class="skeleton skeleton-stat-icon"></div>
                <div class="skeleton-stat-info">
                    <div class="skeleton skeleton-stat-title"></div>
                    <div class="skeleton skeleton-stat-value"></div>
                </div>
            </div>
        `;
    }

    // ساخت Skeleton برای کارت آدرس
    createAddressCard() {
        return `
            <div class="skeleton-address-card">
                <div class="skeleton skeleton-address-title"></div>
                <div class="skeleton skeleton-address-line"></div>
                <div class="skeleton skeleton-address-line"></div>
                <div class="skeleton skeleton-address-line" style="width: 60%;"></div>
                <div class="skeleton-address-actions">
                    <div class="skeleton skeleton-address-button"></div>
                    <div class="skeleton skeleton-address-button"></div>
                </div>
            </div>
        `;
    }

    // نمایش Skeleton در container
    show(container, type = 'product', count = 6) {
        if (typeof container === 'string') {
            container = document.getElementById(container) || document.querySelector(container);
        }

        if (!container) return;

        let html = '';
        const createMethod = {
            'product': () => this.createProductCard(),
            'order': () => this.createOrderCard(),
            'table': () => this.createTableRow(),
            'stat': () => this.createStatCard(),
            'address': () => this.createAddressCard()
        }[type];

        for (let i = 0; i < count; i++) {
            html += createMethod();
        }

        // تعیین کلاس grid
        const gridClass = {
            'product': 'products',
            'stat': 'stats',
            'address': 'addresses'
        }[type] || '';

        container.innerHTML = `<div class="skeleton-grid ${gridClass}">${html}</div>`;
    }

    // حذف Skeleton
    hide(container) {
        if (typeof container === 'string') {
            container = document.getElementById(container) || document.querySelector(container);
        }

        if (!container) return;

        const skeleton = container.querySelector('.skeleton-grid');
        if (skeleton) {
            skeleton.style.opacity = '0';
            skeleton.style.transition = 'opacity 0.3s';
            setTimeout(() => {
                container.innerHTML = '';
            }, 300);
        }
    }

    // نمایش با تاخیر (برای شبیه‌سازی loading)
    showWithDelay(container, type, count, delay = 1000) {
        this.show(container, type, count);
        return new Promise(resolve => {
            setTimeout(() => {
                this.hide(container);
                resolve();
            }, delay);
        });
    }
}

// ساخت instance عمومی
const skeleton = new SkeletonLoader();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkeletonLoader;
}

// نمونه استفاده:
// skeleton.show('productsContainer', 'product', 6);
// skeleton.show('ordersGrid', 'order', 3);
// skeleton.show('statsGrid', 'stat', 4);
// skeleton.show('addressesList', 'address', 2);
// skeleton.show('productsTableBody', 'table', 5);

// با تاخیر:
// await skeleton.showWithDelay('productsContainer', 'product', 6, 2000);
// حالا محصولات واقعی را نمایش دهید