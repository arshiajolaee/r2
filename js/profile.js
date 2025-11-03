// داده‌های کاربر (در پروژه واقعی از API میگیریم)
let userData = {
    name: 'علی احمدی',
    phone: '09123456789',
    email: 'ali@example.com',
    nationalCode: '0123456789',
    birthday: '1370/01/01'
};

// سفارشات (نمونه)
let userOrders = JSON.parse(localStorage.getItem('orders')) || [
    {
        id: '#10001',
        date: '1403/08/10',
        status: 'delivered',
        total: 245000,
        items: 3
    },
    {
        id: '#10002',
        date: '1403/08/05',
        status: 'shipped',
        total: 890000,
        items: 1
    },
    {
        id: '#10003',
        date: '1403/07/28',
        status: 'processing',
        total: 450000,
        items: 2
    }
];

// آدرس‌ها (نمونه)
let userAddresses = [
    {
        id: 1,
        title: 'منزل',
        fullAddress: 'تهران، خیابان آزادی، کوچه ۱۲، پلاک ۳۴',
        postalCode: '1234567890',
        isDefault: true
    },
    {
        id: 2,
        title: 'محل کار',
        fullAddress: 'تهران، خیابان ولیعصر، ساختمان پارس، طبقه ۵',
        postalCode: '0987654321',
        isDefault: false
    }
];

// علاقه‌مندی‌ها
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// محصولات (برای نمایش علاقه‌مندی‌ها)
const products = [
    { id: 1, name: "لامپ LED 12 وات آفتابی", price: 45000, oldPrice: 65000, image: "💡", brand: "آیلا" },
    { id: 2, name: "کابل افشان 1.5 متری", price: 125000, oldPrice: 150000, image: "🔌", brand: "البرز" },
    { id: 3, name: "کلید و پریز کریستال", price: 85000, oldPrice: 110000, image: "⚡", brand: "شنایدر" },
    { id: 4, name: "لامپ هالوژن 50 وات", price: 35000, oldPrice: 45000, image: "💡", brand: "پارس شعاع" },
    { id: 5, name: "تابلو برق 12 کانال", price: 450000, oldPrice: 550000, image: "🔧", brand: "الکو پویا" },
    { id: 6, name: "دریل شارژی 18 ولت", price: 890000, oldPrice: 1100000, image: "🛠️", brand: "بوش" }
];

// بارگذاری اولیه
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    updateCartBadge();
    setupPasswordStrength();
});

// نمایش تب
function showTab(tabName) {
    // مخفی کردن همه تب‌ها
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // مخفی کردن active از منو
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // نمایش تب انتخاب شده
    document.getElementById(tabName).classList.add('active');
    event.target.closest('.menu-item').classList.add('active');

    // بارگذاری محتوای مربوطه
    switch(tabName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'addresses':
            loadAddresses();
            break;
        case 'wishlist':
            loadWishlist();
            break;
        case 'info':
            loadUserInfo();
            break;
        case 'password':
            // فرم رمز عبور آماده است
            break;
    }

    // اسکرول به بالا
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// بارگذاری داشبورد
function loadDashboard() {
    // محاسبه آمار
    const totalOrders = userOrders.length;
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
    const wishlistCount = wishlist.length;

    // بروزرسانی آمار
    document.getElementById('totalOrders').textContent = totalOrders + ' سفارش';
    document.getElementById('totalSpent').textContent = totalSpent.toLocaleString() + ' تومان';
    document.getElementById('wishlistCount').textContent = wishlistCount;

    // نمایش آخرین سفارشات
    const recentOrders = userOrders.slice(0, 3);
    document.getElementById('recentOrders').innerHTML = recentOrders.length > 0 
        ? recentOrders.map(order => `
            <div class="order-card">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <div>
                        <strong style="color: #d4af37;">سفارش ${order.id}</strong>
                        <p style="color: #999; font-size: 14px; margin-top: 5px;">${order.date}</p>
                    </div>
                    <span class="status-badge">${getOrderStatusText(order.status)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: #ccc;">
                    <span>${order.items} محصول</span>
                    <span style="color: #d4af37; font-weight: 700;">${order.total.toLocaleString()} تومان</span>
                </div>
            </div>
        `).join('')
        : '<p style="color: #666; text-align: center; padding: 40px;">شما هنوز سفارشی ثبت نکرده‌اید</p>';
}

// بارگذاری سفارشات
function loadOrders() {
    const container = document.getElementById('ordersList');
    
    if (userOrders.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">شما هنوز سفارشی ثبت نکرده‌اید</p>';
        return;
    }

    container.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                <div>
                    <h3 style="color: #d4af37; font-size: 20px; margin-bottom: 5px;">سفارش ${order.id}</h3>
                    <p style="color: #999; font-size: 14px;">${order.date}</p>
                </div>
                <span class="status-badge">${getOrderStatusText(order.status)}</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                <div>
                    <p style="color: #999; font-size: 13px; margin-bottom: 5px;">تعداد محصولات</p>
                    <p style="color: #f5f5f5; font-weight: 600; font-size: 16px;">${order.items} عدد</p>
                </div>
                <div>
                    <p style="color: #999; font-size: 13px; margin-bottom: 5px;">مبلغ کل</p>
                    <p style="color: #d4af37; font-weight: 700; font-size: 16px;">${order.total.toLocaleString()} تومان</p>
                </div>
                <div>
                    <button class="btn-primary" style="width: 100%;" onclick="alert('مشاهده جزئیات سفارش ${order.id}')">
                        مشاهده جزئیات
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// فیلتر سفارشات
function filterOrders(status) {
    // بروزرسانی دکمه‌های فیلتر
    document.querySelectorAll('.orders-filter .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // فیلتر کردن
    let filtered = status === 'all' ? userOrders : userOrders.filter(order => order.status === status);
    
    const container = document.getElementById('ordersList');
    if (filtered.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">سفارشی با این وضعیت یافت نشد</p>';
    } else {
        // نمایش سفارشات فیلتر شده (همان کد loadOrders)
    }
}

// بارگذاری آدرس‌ها
function loadAddresses() {
    const container = document.getElementById('addressesList');
    
    container.innerHTML = userAddresses.map(address => `
        <div class="address-card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                <h3 style="color: #d4af37; font-size: 18px;">📍 ${address.title}</h3>
                ${address.isDefault ? '<span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 4px 12px; border-radius: 10px; font-size: 12px; font-weight: 600;">پیش‌فرض</span>' : ''}
            </div>
            <p style="color: #ccc; line-height: 1.8; margin-bottom: 10px;">${address.fullAddress}</p>
            <p style="color: #999; font-size: 14px; margin-bottom: 20px;">کد پستی: ${address.postalCode}</p>
            <div style="display: flex; gap: 10px;">
                <button class="btn-primary" onclick="editAddress(${address.id})">✏️ ویرایش</button>
                ${!address.isDefault ? `<button onclick="deleteAddress(${address.id})" style="background: rgba(220, 38, 38, 0.1); border: 2px solid #dc2626; color: #dc2626; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: 600;">🗑️ حذف</button>` : ''}
            </div>
        </div>
    `).join('');
}

// نمایش فرم افزودن آدرس
function showAddAddress() {
    alert('📍 فرم افزودن آدرس جدید\n\nدر پروژه واقعی یک Modal یا صفحه جدید باز می‌شود.');
}

// ویرایش آدرس
function editAddress(id) {
    const address = userAddresses.find(a => a.id === id);
    alert(`✏️ ویرایش آدرس: ${address.title}\n\n${address.fullAddress}`);
}

// حذف آدرس
function deleteAddress(id) {
    if (confirm('آیا از حذف این آدرس اطمینان دارید؟')) {
        userAddresses = userAddresses.filter(a => a.id !== id);
        loadAddresses();
        alert('✅ آدرس با موفقیت حذف شد');
    }
}

// بارگذاری علاقه‌مندی‌ها
function loadWishlist() {
    const container = document.getElementById('wishlistProducts');
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">لیست علاقه‌مندی‌های شما خالی است</p>';
        return;
    }

    const wishlistProducts = products.filter(p => wishlist.includes(p.id));

    container.innerHTML = wishlistProducts.map(product => `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <div style="background: linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(40, 40, 40, 0.8)); padding: 40px; text-align: center; font-size: 80px; position: relative;">
                <button onclick="event.stopPropagation(); removeFromWishlist(${product.id})" style="position: absolute; top: 10px; left: 10px; background: rgba(220, 38, 38, 0.8); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 20px;">❌</button>
                ${product.image}
            </div>
            <div style="padding: 20px;">
                <div style="color: #d4af37; font-size: 12px; margin-bottom: 8px;">${product.brand}</div>
                <div style="font-weight: 700; color: #f5f5f5; margin-bottom: 10px;">${product.name}</div>
                <div style="color: #d4af37; font-size: 20px; font-weight: 900; margin-bottom: 15px;">${product.price.toLocaleString()} تومان</div>
                <button onclick="event.stopPropagation(); addToCartFromWishlist(${product.id})" style="width: 100%; background: linear-gradient(135deg, #d4af37, #f2d06b); color: #0a0a0a; border: none; padding: 12px; border-radius: 10px; font-weight: 700; cursor: pointer;">افزودن به سبد خرید</button>
            </div>
        </div>
    `).join('');
}

// حذف از علاقه‌مندی‌ها
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
    loadDashboard(); // بروزرسانی آمار
    alert('❌ از علاقه‌مندی‌ها حذف شد');
}

// افزودن به سبد از علاقه‌مندی‌ها
function addToCartFromWishlist(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    alert('✅ به سبد خرید اضافه شد!');
}

// بارگذاری اطلاعات کاربر
function loadUserInfo() {
    document.getElementById('editName').value = userData.name;
    document.getElementById('editPhone').value = userData.phone;
    document.getElementById('editEmail').value = userData.email || '';
    document.getElementById('editNationalCode').value = userData.nationalCode || '';
    document.getElementById('editBirthday').value = userData.birthday || '';
}

// ذخیره اطلاعات کاربر
function saveUserInfo() {
    userData.name = document.getElementById('editName').value;
    userData.email = document.getElementById('editEmail').value;
    userData.nationalCode = document.getElementById('editNationalCode').value;
    userData.birthday = document.getElementById('editBirthday').value;
    
    // در پروژه واقعی به API ارسال می‌شود
    alert('✅ اطلاعات با موفقیت ذخیره شد');
    
    // بروزرسانی نام در sidebar
    document.querySelector('.user-welcome h3').textContent = userData.name;
}

// تغییر رمز عبور
function changePassword() {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    
    if (!current || !newPass || !confirm) {
        alert('❌ لطفاً تمام فیلدها را پر کنید');
        return;
    }
    
    if (newPass.length < 8) {
        alert('❌ رمز عبور جدید باید حداقل 8 کاراکتر باشد');
        return;
    }
    
    if (newPass !== confirm) {
        alert('❌ رمز عبور جدید و تکرار آن یکسان نیستند');
        return;
    }
    
    // در پروژه واقعی به API ارسال می‌شود
    alert('✅ رمز عبور با موفقیت تغییر کرد');
    
    // پاک کردن فیلدها
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

// نشانگر قدرت رمز عبور
function setupPasswordStrength() {
    const newPasswordInput = document.getElementById('newPassword');
    if (!newPasswordInput) return;
    
    newPasswordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthDiv = document.getElementById('passwordStrength');
        
        if (password.length === 0) {
            strengthDiv.innerHTML = '';
            return;
        }
        
        let strength = 'weak';
        let strengthText = 'ضعیف';
        let strengthColor = '#dc2626';
        
        if (password.length >= 8) {
            if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
                strength = 'strong';
                strengthText = 'قوی';
                strengthColor = '#10b981';
            } else if (/[A-Za-z]/.test(password) && /[0-9]/.test(password)) {
                strength = 'medium';
                strengthText = 'متوسط';
                strengthColor = '#fbbf24';
            }
        }
        
        strengthDiv.innerHTML = `
            <div class="password-strength-bar ${strength}" style="background: ${strengthColor};"></div>
            <p style="color: ${strengthColor}; font-size: 12px; margin-top: 5px;">قدرت رمز: ${strengthText}</p>
        `;
    });
}

// دریافت متن وضعیت سفارش
function getOrderStatusText(status) {
    const statuses = {
        'pending': '⏳ در انتظار تایید',
        'processing': '⚙️ در حال پردازش',
        'shipped': '🚚 ارسال شده',
        'delivered': '✅ تحویل داده شده',
        'cancelled': '❌ لغو شده'
    };
    return statuses[status] || status;
}

// بروزرسانی badge سبد خرید
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = totalItems;
    }
}