// بارگذاری اطلاعات سفارش
document.addEventListener('DOMContentLoaded', function() {
    loadOrderDetails();
});

// بارگذاری جزئیات سفارش
function loadOrderDetails() {
    // گرفتن آخرین سفارش از localStorage
    const orderData = JSON.parse(localStorage.getItem('lastOrder'));

    if (!orderData) {
        alert('اطلاعات سفارش یافت نشد!');
        window.location.href = 'index.html';
        return;
    }

    // نمایش شماره سفارش
    document.getElementById('orderNumber').textContent = orderData.orderNumber;

    // نمایش اطلاعات مشتری
    const customerInfo = `
        <div><strong>نام و نام خانوادگی:</strong> ${orderData.customer.fullName}</div>
        <div><strong>شماره موبایل:</strong> ${orderData.customer.phone}</div>
        ${orderData.customer.email ? `<div><strong>ایمیل:</strong> ${orderData.customer.email}</div>` : ''}
        ${orderData.customer.nationalCode ? `<div><strong>کد ملی:</strong> ${orderData.customer.nationalCode}</div>` : ''}
    `;
    document.getElementById('customerInfo').innerHTML = customerInfo;

    // نمایش اطلاعات آدرس
    const shippingInfo = `
        <div><strong>استان:</strong> ${orderData.shipping.province}</div>
        <div><strong>شهر:</strong> ${orderData.shipping.city}</div>
        <div><strong>کد پستی:</strong> ${orderData.shipping.postalCode}</div>
        <div><strong>آدرس:</strong> ${orderData.shipping.address}</div>
    `;
    document.getElementById('shippingInfo').innerHTML = shippingInfo;

    // نمایش روش پرداخت
    const paymentMethods = {
        'online': '💳 پرداخت آنلاین (درگاه بانکی)',
        'card': '🏦 کارت به کارت',
        'cash': '💵 پرداخت در محل'
    };
    document.getElementById('paymentInfo').innerHTML = `<div>${paymentMethods[orderData.payment]}</div>`;

    // نمایش محصولات سفارش
    const orderItems = orderData.items.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: rgba(30, 30, 30, 0.5); border-radius: 10px; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 40px;">${item.image}</div>
                <div>
                    <div style="font-weight: 600; color: #f5f5f5;">${item.name}</div>
                    <div style="color: #999; font-size: 14px;">برند: ${item.brand} | تعداد: ${item.quantity}</div>
                </div>
            </div>
            <div style="color: #d4af37; font-weight: 700;">${(item.price * item.quantity).toLocaleString()} تومان</div>
        </div>
    `).join('');
    document.getElementById('orderItems').innerHTML = orderItems;

    // نمایش قیمت‌ها
    document.getElementById('subtotal').textContent = orderData.pricing.subtotal.toLocaleString() + ' تومان';
    document.getElementById('shipping').textContent = orderData.pricing.shipping === 0 ? 'رایگان' : orderData.pricing.shipping.toLocaleString() + ' تومان';
    
    if (orderData.pricing.discount > 0) {
        document.getElementById('discountRow').style.display = 'flex';
        document.getElementById('discount').textContent = '- ' + orderData.pricing.discount.toLocaleString() + ' تومان';
    }

    const total = orderData.pricing.subtotal - orderData.pricing.discount + orderData.pricing.shipping;
    document.getElementById('total').textContent = total.toLocaleString() + ' تومان';

    // ارسال ایمیل/پیامک تایید (در پروژه واقعی)
    sendConfirmation(orderData);
}

// ارسال تاییدیه (شبیه‌سازی)
function sendConfirmation(orderData) {
    console.log('📧 ارسال ایمیل تایید به:', orderData.customer.email);
    console.log('📱 ارسال پیامک تایید به:', orderData.customer.phone);
    console.log('✅ سفارش ثبت شد:', orderData);
}

// اشتراک‌گذاری در شبکه‌های اجتماعی
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.textContent.trim();
        const orderNumber = document.getElementById('orderNumber').textContent;
        
        let message = '';
        if (platform.includes('تلگرام')) {
            message = `📱 در حال اشتراک‌گذاری در تلگرام...\nسفارش ${orderNumber}`;
        } else if (platform.includes('واتساپ')) {
            message = `💬 در حال اشتراک‌گذاری در واتساپ...\nسفارش ${orderNumber}`;
        } else if (platform.includes('توییتر')) {
            message = `🐦 در حال اشتراک‌گذاری در توییتر...\nسفارش ${orderNumber}`;
        }
        
        alert(message);
    });
});

// پرینت صفحه
window.addEventListener('beforeprint', function() {
    console.log('📄 در حال آماده‌سازی برای چاپ...');
});

window.addEventListener('afterprint', function() {
    console.log('✅ چاپ انجام شد یا لغو گردید');
});