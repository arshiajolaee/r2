// بارگذاری سبد خرید از localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedPayment = 'online';
let discountAmount = 0;
let currentStep = 1;

// اجرای کد بعد از لود شدن صفحه
document.addEventListener('DOMContentLoaded', function() {
    // اگر سبد خرید خالی است، برگشت به صفحه اصلی
    if (cart.length === 0) {
        alert('سبد خرید شما خالی است!');
        window.location.href = 'index.html';
        return;
    }

    loadOrderSummary();
    setupProvinceListener();
});

// بارگذاری خلاصه سفارش
function loadOrderSummary() {
    const container = document.getElementById('summaryItems');
    
    container.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="item-image">${item.image}</div>
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-details">${item.brand} | تعداد: ${item.quantity}</div>
            </div>
            <div class="item-price">${(item.price * item.quantity).toLocaleString()}</div>
        </div>
    `).join('');

    updatePricing();
}

// بروزرسانی قیمت‌ها
function updatePricing() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 500000 ? 0 : 30000;
    const total = subtotal - discountAmount + shippingCost;

    document.getElementById('subtotal').textContent = subtotal.toLocaleString() + ' تومان';
    document.getElementById('shipping').textContent = shippingCost === 0 ? 'رایگان' : shippingCost.toLocaleString() + ' تومان';
    document.getElementById('total').textContent = total.toLocaleString() + ' تومان';

    if (discountAmount > 0) {
        document.getElementById('discountRow').style.display = 'flex';
        document.getElementById('discount').textContent = '- ' + discountAmount.toLocaleString() + ' تومان';
    }
}

// رفتن به مرحله بعد
function goToStep(step) {
    // اعتبارسنجی مرحله فعلی
    if (step > currentStep) {
        if (currentStep === 1 && !validateStep1()) {
            return;
        }
    }

    // مخفی کردن همه مراحل
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    // نمایش مرحله جدید
    document.getElementById(`step${step}`).classList.add('active');

    // بروزرسانی indicator
    document.querySelectorAll('.step').forEach((stepEl, index) => {
        stepEl.classList.remove('active', 'completed');
        if (index + 1 < step) {
            stepEl.classList.add('completed');
        } else if (index + 1 === step) {
            stepEl.classList.add('active');
        }
    });

    currentStep = step;

    // اگر مرحله 3 است، نمایش اطلاعات نهایی
    if (step === 3) {
        showReview();
    }

    // اسکرول به بالا
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// اعتبارسنجی مرحله 1
function validateStep1() {
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const province = document.getElementById('province').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!fullName || fullName.length < 3) {
        alert('❌ لطفاً نام و نام خانوادگی کامل را وارد کنید');
        document.getElementById('fullName').focus();
        return false;
    }

    if (!phone || phone.length !== 11 || !phone.startsWith('09')) {
        alert('❌ لطفاً شماره موبایل معتبر وارد کنید (مثال: 09123456789)');
        document.getElementById('phone').focus();
        return false;
    }

    if (!province) {
        alert('❌ لطفاً استان را انتخاب کنید');
        document.getElementById('province').focus();
        return false;
    }

    if (!city) {
        alert('❌ لطفاً شهر را انتخاب کنید');
        document.getElementById('city').focus();
        return false;
    }

    if (!postalCode || postalCode.length !== 10 || isNaN(postalCode)) {
        alert('❌ لطفاً کد پستی 10 رقمی معتبر وارد کنید');
        document.getElementById('postalCode').focus();
        return false;
    }

    if (!address || address.length < 15) {
        alert('❌ لطفاً آدرس کامل و دقیق را وارد کنید (حداقل 15 کاراکتر)');
        document.getElementById('address').focus();
        return false;
    }

    return true;
}

// انتخاب روش پرداخت
function selectPayment(method) {
    selectedPayment = method;
    document.getElementById(method).checked = true;
    
    // بروزرسانی استایل payment option ها
    document.querySelectorAll('.payment-option').forEach(option => {
        option.style.borderColor = 'rgba(212, 175, 55, 0.2)';
        option.style.background = 'rgba(30, 30, 30, 0.5)';
    });
    
    event.currentTarget.style.borderColor = '#d4af37';
    event.currentTarget.style.background = 'rgba(30, 30, 30, 0.8)';
}

// اعمال کد تخفیف
function applyDiscount() {
    const code = document.getElementById('discountCode').value.trim().toUpperCase();
    
    if (!code) {
        alert('⚠️ لطفاً کد تخفیف را وارد کنید');
        return;
    }
    
    // کدهای تخفیف نمونه
    const discountCodes = {
        'WELCOME10': 10, // 10% تخفیف
        'SAVE20': 20,    // 20% تخفیف
        'GOLD30': 30,    // 30% تخفیف
        'TABESH50': 50   // 50% تخفیف
    };

    if (discountCodes[code]) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        discountAmount = Math.floor(subtotal * (discountCodes[code] / 100));
        
        alert(`✅ کد تخفیف با موفقیت اعمال شد!\n\n🎁 ${discountCodes[code]}% تخفیف\n💰 مبلغ تخفیف: ${discountAmount.toLocaleString()} تومان`);
        updatePricing();
        
        // غیرفعال کردن input
        document.getElementById('discountCode').disabled = true;
        event.target.textContent = '✓ اعمال شد';
        event.target.style.background = 'rgba(16, 185, 129, 0.2)';
        event.target.style.color = '#10b981';
        event.target.style.cursor = 'not-allowed';
    } else {
        alert('❌ کد تخفیف نامعتبر است\n\nکدهای نمونه برای تست:\n• WELCOME10\n• SAVE20\n• GOLD30\n• TABESH50');
    }
}

// نمایش بررسی نهایی
function showReview() {
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const province = document.getElementById('province').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const postalCode = document.getElementById('postalCode').value;

    const shippingInfo = `
        <div style="line-height: 2;">
            <div><strong style="color: #d4af37;">نام و نام خانوادگی:</strong> ${fullName}</div>
            <div><strong style="color: #d4af37;">شماره موبایل:</strong> ${phone}</div>
            ${email ? `<div><strong style="color: #d4af37;">ایمیل:</strong> ${email}</div>` : ''}
            <div><strong style="color: #d4af37;">استان:</strong> ${province}</div>
            <div><strong style="color: #d4af37;">شهر:</strong> ${city}</div>
            <div><strong style="color: #d4af37;">کد پستی:</strong> ${postalCode}</div>
            <div><strong style="color: #d4af37;">آدرس:</strong> ${address}</div>
        </div>
    `;

    const paymentMethods = {
        'online': '💳 پرداخت آنلاین از طریق درگاه امن بانکی',
        'card': '🏦 کارت به کارت و ارسال رسید',
        'cash': '💵 پرداخت نقدی هنگام دریافت کالا'
    };

    const paymentInfo = `<div style="line-height: 2;">${paymentMethods[selectedPayment]}</div>`;

    document.getElementById('reviewShipping').innerHTML = shippingInfo;
    document.getElementById('reviewPayment').innerHTML = paymentInfo;
}

// ثبت سفارش
function submitOrder() {
    // چک کردن پذیرش قوانین
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('⚠️ لطفاً قوانین و مقررات سایت را مطالعه کرده و بپذیرید');
        terms.focus();
        return;
    }

    // نمایش لودینگ
    const submitBtn = event.target;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ در حال ثبت سفارش...';
    submitBtn.disabled = true;

    // شبیه‌سازی تاخیر شبکه
    setTimeout(() => {
        // جمع‌آوری اطلاعات سفارش
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingCost = subtotal > 500000 ? 0 : 30000;

        const orderData = {
            customer: {
                fullName: document.getElementById('fullName').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value || '',
                nationalCode: document.getElementById('nationalCode').value || '',
            },
            shipping: {
                province: document.getElementById('province').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                address: document.getElementById('address').value,
            },
            payment: selectedPayment,
            items: cart,
            pricing: {
                subtotal: subtotal,
                discount: discountAmount,
                shipping: shippingCost,
            },
            orderNotes: document.getElementById('orderNotes').value || '',
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('fa-IR')
        };

        // ذخیره سفارش
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderNumber = '#' + (10000 + orders.length + 1);
        orderData.orderNumber = orderNumber;
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        // ذخیره آخرین سفارش برای صفحه success
        localStorage.setItem('lastOrder', JSON.stringify(orderData));

        // پاک کردن سبد خرید
        localStorage.removeItem('cart');

        // انتقال به صفحه تایید
        window.location.href = 'order-success.html';
    }, 1500);
}

// تنظیم listener برای تغییر استان
function setupProvinceListener() {
    const provinceSelect = document.getElementById('province');
    if (provinceSelect) {
        provinceSelect.addEventListener('change', function() {
            const citySelect = document.getElementById('city');
            citySelect.innerHTML = '<option value="">در حال بارگذاری...</option>';
            
            // شهرهای نمونه (در پروژه واقعی باید از API استفاده کنید)
            const cities = {
                'tehran': ['تهران', 'شهریار', 'ری', 'ورامین', 'پاکدشت', 'اسلامشهر', 'دماوند', 'فیروزکوه'],
                'isfahan': ['اصفهان', 'کاشان', 'نجف‌آباد', 'خمینی‌شهر', 'شاهین‌شهر', 'گلپایگان', 'نطنز'],
                'shiraz': ['شیراز', 'مرودشت', 'کازرون', 'فسا', 'لار', 'جهرم', 'آباده'],
                'mashhad': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'قوچان', 'کاشمر', 'چناران'],
                'tabriz': ['تبریز', 'مراغه', 'میانه', 'مرند', 'بناب', 'سراب', 'شبستر']
            };

            setTimeout(() => {
                citySelect.innerHTML = '<option value="">انتخاب کنید</option>';
                const provinceCities = cities[this.value] || [];
                provinceCities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }, 300);
        });
    }
}

// اضافه کردن event listener برای فرمت کردن خودکار شماره تلفن
document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    e.target.value = value;
});

// اضافه کردن event listener برای فرمت کردن خودکار کد پستی
document.getElementById('postalCode')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});