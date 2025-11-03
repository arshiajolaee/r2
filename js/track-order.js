// پیگیری سفارش
function trackOrder(event) {
    event.preventDefault();
    
    const orderNumber = document.getElementById('orderNumber').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    
    // اعتبارسنجی
    if (!orderNumber || !phoneNumber) {
        alert('❌ لطفاً تمام فیلدها را پر کنید');
        return;
    }
    
    if (phoneNumber.length !== 11 || !phoneNumber.startsWith('09')) {
        alert('❌ شماره موبایل نامعتبر است');
        return;
    }
    
    // نمایش لودینگ
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ در حال جستجو...';
    btn.disabled = true;
    
    // شبیه‌سازی درخواست به سرور
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // گرفتن سفارشات از localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const foundOrder = orders.find(order => 
            order.orderNumber === orderNumber && 
            order.customer.phone === phoneNumber
        );
        
        if (foundOrder) {
            displayOrderResult(foundOrder);
        } else {
            // اگر پیدا نشد، نمایش سفارش نمونه
            displaySampleOrder();
        }
    }, 1500);
}

// نمایش نتیجه سفارش
function displayOrderResult(order) {
    document.getElementById('trackForm').parentElement.style.display = 'none';
    document.getElementById('orderResult').style.display = 'block';
    document.getElementById('noResult').style.display = 'none';
    
    // نمایش شماره سفارش
    document.getElementById('resultOrderNumber').textContent = order.orderNumber;
    
    // نمایش محصولات
    const orderItems = order.items.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: rgba(30, 30, 30, 0.5); border-radius: 10px; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 40px;">${item.image}</div>
                <div>
                    <div style="font-weight: 600; color: #f5f5f5;">${item.name}</div>
                    <div style="color: #999; font-size: 14px;">تعداد: ${item.quantity}</div>
                </div>
            </div>
            <div style="color: #d4af37; font-weight: 700;">${(item.price * item.quantity).toLocaleString()} تومان</div>
        </div>
    `).join('');
    document.getElementById('orderItems').innerHTML = orderItems;
    
    // نمایش اطلاعات مشتری
    document.getElementById('customerInfo').innerHTML = `
        <p><strong>نام:</strong> ${order.customer.fullName}</p>
        <p><strong>موبایل:</strong> ${order.customer.phone}</p>
        ${order.customer.email ? `<p><strong>ایمیل:</strong> ${order.customer.email}</p>` : ''}
    `;
    
    // نمایش آدرس
    document.getElementById('shippingAddress').innerHTML = `
        <p><strong>استان:</strong> ${order.shipping.province}</p>
        <p><strong>شهر:</strong> ${order.shipping.city}</p>
        <p><strong>کد پستی:</strong> ${order.shipping.postalCode}</p>
        <p><strong>آدرس:</strong> ${order.shipping.address}</p>
    `;
    
    // نمایش اطلاعات پرداخت
    const paymentMethods = {
        'online': '💳 پرداخت آنلاین',
        'card': '🏦 کارت به کارت',
        'cash': '💵 پرداخت در محل'
    };
    const total = order.pricing.subtotal - order.pricing.discount + order.pricing.shipping;
    document.getElementById('paymentInfo').innerHTML = `
        <p><strong>روش پرداخت:</strong> ${paymentMethods[order.payment]}</p>
        <p><strong>مبلغ:</strong> ${total.toLocaleString()} تومان</p>
        <p><strong>وضعیت:</strong> <span style="color: #10b981;">✓ پرداخت شده</span></p>
    `;
    
    // اسکرول به بالا
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// نمایش سفارش نمونه (برای تست)
function displaySampleOrder() {
    document.getElementById('trackForm').parentElement.style.display = 'none';
    document.getElementById('orderResult').style.display = 'block';
    document.getElementById('noResult').style.display = 'none';
    
    const orderNumber = document.getElementById('orderNumber').value.trim();
    document.getElementById('resultOrderNumber').textContent = orderNumber;
    
    // نمایش محصولات نمونه
    document.getElementById('orderItems').innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: rgba(30, 30, 30, 0.5); border-radius: 10px; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 40px;">💡</div>
                <div>
                    <div style="font-weight: 600; color: #f5f5f5;">لامپ LED 12 وات آفتابی</div>
                    <div style="color: #999; font-size: 14px;">تعداد: 2</div>
                </div>
            </div>
            <div style="color: #d4af37; font-weight: 700;">90,000 تومان</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: rgba(30, 30, 30, 0.5); border-radius: 10px;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 40px;">🔌</div>
                <div>
                    <div style="font-weight: 600; color: #f5f5f5;">کابل افشان 1.5 متری</div>
                    <div style="color: #999; font-size: 14px;">تعداد: 1</div>
                </div>
            </div>
            <div style="color: #d4af37; font-weight: 700;">125,000 تومان</div>
        </div>
    `;
    
    // نمایش اطلاعات نمونه
    document.getElementById('customerInfo').innerHTML = `
        <p><strong>نام:</strong> علی احمدی</p>
        <p><strong>موبایل:</strong> ${document.getElementById('phoneNumber').value}</p>
        <p><strong>ایمیل:</strong> ali@example.com</p>
    `;
    
    document.getElementById('shippingAddress').innerHTML = `
        <p><strong>استان:</strong> تهران</p>
        <p><strong>شهر:</strong> تهران</p>
        <p><strong>کد پستی:</strong> 1234567890</p>
        <p><strong>آدرس:</strong> تهران، خیابان آزادی، کوچه 12، پلاک 34</p>
    `;
    
    document.getElementById('paymentInfo').innerHTML = `
        <p><strong>روش پرداخت:</strong> 💳 پرداخت آنلاین</p>
        <p><strong>مبلغ:</strong> 245,000 تومان</p>
        <p><strong>وضعیت:</strong> <span style="color: #10b981;">✓ پرداخت شده</span></p>
    `;
    
    // تاریخ‌های نمونه
    const now = new Date();
    const date1 = formatDate(new Date(now - 2 * 24 * 60 * 60 * 1000));
    const date2 = formatDate(new Date(now - 2 * 24 * 60 * 60 * 1000));
    const date3 = formatDate(new Date(now - 1 * 24 * 60 * 60 * 1000));
    const date4 = formatDate(new Date(now - 1 * 24 * 60 * 60 * 1000));
    
    document.getElementById('date1').textContent = date1;
    document.getElementById('date2').textContent = date2;
    document.getElementById('date3').textContent = date3;
    document.getElementById('date4').textContent = date4;
    
    // کد پستی نمونه
    document.getElementById('postCode').textContent = generateTrackingCode();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ریست فرم
function resetForm() {
    document.getElementById('trackForm').parentElement.style.display = 'block';
    document.getElementById('orderResult').style.display = 'none';
    document.getElementById('noResult').style.display = 'none';
    document.getElementById('orderNumber').value = '';
    document.getElementById('phoneNumber').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// کپی کد رهگیری
function copyTrackingCode() {
    const code = document.getElementById('postCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('✅ کد رهگیری کپی شد!\n' + code);
    }).catch(() => {
        alert('❌ خطا در کپی کردن');
    });
}

// تولید کد رهگیری تصادفی
function generateTrackingCode() {
    return Math.random().toString().slice(2, 12);
}

// فرمت تاریخ
function formatDate(date) {
    const year = date.toLocaleDateString('fa-IR', { year: 'numeric' });
    const month = date.toLocaleDateString('fa-IR', { month: '2-digit' });
    const day = date.toLocaleDateString('fa-IR', { day: '2-digit' });
    const hour = date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${year}/${month}/${day} - ${hour}`;
}

// فرمت شماره تلفن در حین تایپ
document.getElementById('phoneNumber')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    e.target.value = value;
});

// فرمت شماره سفارش
document.getElementById('orderNumber')?.addEventListener('input', function(e) {
    let value = e.target.value.trim();
    if (value && !value.startsWith('#')) {
        e.target.value = '#' + value;
    }
});