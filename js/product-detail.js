// محصولات (همان لیست از script.js)
const products = [
  {
    id: 1,
    name: "لامپ LED 12 وات آفتابی",
    price: 45000,
    oldPrice: 65000,
    image: "💡",
    category: "lamp",
    rating: 4.5,
    reviews: 234,
    discount: 30,
    brand: "آیلا",
  },
  {
    id: 2,
    name: "کابل افشان 1.5 متری",
    price: 125000,
    oldPrice: 150000,
    image: "🔌",
    category: "cable",
    rating: 4.8,
    reviews: 456,
    discount: 16,
    brand: "البرز",
  },
  {
    id: 3,
    name: "کلید و پریز کریستال",
    price: 85000,
    oldPrice: 110000,
    image: "⚡",
    category: "switch",
    rating: 4.3,
    reviews: 189,
    discount: 22,
    brand: "شنایدر",
  },
  {
    id: 4,
    name: "لامپ هالوژن 50 وات",
    price: 35000,
    oldPrice: 45000,
    image: "💡",
    category: "lamp",
    rating: 4.0,
    reviews: 123,
    discount: 22,
    brand: "پارس شعاع",
  },
  {
    id: 5,
    name: "تابلو برق 12 کانال",
    price: 450000,
    oldPrice: 550000,
    image: "🔧",
    category: "panel",
    rating: 4.7,
    reviews: 89,
    discount: 18,
    brand: "الکو پویا",
  },
  {
    id: 6,
    name: "دریل شارژی 18 ولت",
    price: 890000,
    oldPrice: 1100000,
    image: "🛠️",
    category: "tools",
    rating: 4.9,
    reviews: 567,
    discount: 19,
    brand: "بوش",
  },
  {
    id: 7,
    name: "سیم 1.5 میلیمتری 100 متری",
    price: 95000,
    oldPrice: 120000,
    image: "🔌",
    category: "cable",
    rating: 4.6,
    reviews: 334,
    discount: 20,
    brand: "البرز",
  },
  {
    id: 8,
    name: "پریز برق 6 خانه",
    price: 125000,
    oldPrice: 155000,
    image: "⚡",
    category: "switch",
    rating: 4.4,
    reviews: 278,
    discount: 19,
    brand: "الیکس",
  },
];

// متغیرهای عمومی
let quantity = 1;
let currentProduct = null;
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// اجرای کد بعد از لود شدن صفحه
document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
    loadRelatedProducts();
});

// بارگذاری اطلاعات محصول
function loadProduct() {
    // گرفتن ID از URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // پیدا کردن محصول
    currentProduct = products.find(p => p.id === productId);

    if (!currentProduct) {
        alert('محصول پیدا نشد!');
        window.location.href = 'index.html';
        return;
    }

    // بروزرسانی اطلاعات صفحه
    document.getElementById('productBrand').textContent = `برند: ${currentProduct.brand}`;
    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productNameBreadcrumb').textContent = currentProduct.name;
    
    document.getElementById('currentPrice').textContent = currentProduct.price.toLocaleString();
    document.getElementById('oldPrice').textContent = currentProduct.oldPrice.toLocaleString();
    
    document.getElementById('mainEmoji').textContent = currentProduct.image;
    document.getElementById('discountBadge').textContent = `${currentProduct.discount}% تخفیف`;
    
    document.getElementById('ratingNumber').textContent = currentProduct.rating;
    document.getElementById('reviewsCount').textContent = `(${currentProduct.reviews} نظر)`;

    // محاسبه صرفه‌جویی
    const saving = currentProduct.oldPrice - currentProduct.price;
    document.getElementById('discountInfo').textContent = 
        `🎉 شما ${saving.toLocaleString()} تومان در این خرید صرفه‌جویی می‌کنید!`;

    // تنظیم thumbnails با ایموجی محصول
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails[0].textContent = currentProduct.image;
    thumbnails[0].setAttribute('onclick', `changeImage('${currentProduct.image}')`);

    // چک کردن wishlist
    updateWishlistButton();
}

// بارگذاری محصولات مشابه
function loadRelatedProducts() {
    if (!currentProduct) return;

    // پیدا کردن محصولات همان دسته (به جز خود محصول)
    const relatedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    const container = document.getElementById('relatedProducts');
    container.innerHTML = relatedProducts.map(product => `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <div class="product-image">${product.image}</div>
            <div class="card-body">
                <div class="card-brand">${product.brand}</div>
                <div class="card-title">${product.name}</div>
                <div class="card-price">${product.price.toLocaleString()} تومان</div>
            </div>
        </div>
    `).join('');
}

// تغییر تصویر اصلی
function changeImage(emoji) {
    document.getElementById('mainEmoji').textContent = emoji;
    
    // بروزرسانی active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.target.classList.add('active');
}

// افزایش تعداد
function increaseQty() {
    quantity++;
    document.getElementById('quantity').textContent = quantity;
}

// کاهش تعداد
function decreaseQty() {
    if (quantity > 1) {
        quantity--;
        document.getElementById('quantity').textContent = quantity;
    }
}

// افزودن به سبد خرید
function addToCartDetail() {
    if (!currentProduct) return;

    // گرفتن سبد خرید از localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // چک کردن اگر محصول قبلاً در سبد هست
    const existingItem = cart.find(item => item.id === currentProduct.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...currentProduct,
            quantity: quantity
        });
    }

    // ذخیره در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // نمایش پیام
    alert(`✅ ${quantity} عدد به سبد خرید اضافه شد!\n\nمحصول: ${currentProduct.name}\nقیمت واحد: ${currentProduct.price.toLocaleString()} تومان\nجمع: ${(currentProduct.price * quantity).toLocaleString()} تومان`);
    
    // ریست کردن تعداد
    quantity = 1;
    document.getElementById('quantity').textContent = quantity;

    // بروزرسانی badge سبد خرید
    updateCartBadge();
}

// toggle علاقه‌مندی‌ها
function toggleWishlistDetail() {
    if (!currentProduct) return;

    const index = wishlist.indexOf(currentProduct.id);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        alert('❌ از علاقه‌مندی‌ها حذف شد');
    } else {
        wishlist.push(currentProduct.id);
        alert('✅ به علاقه‌مندی‌ها اضافه شد');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistButton();
}

// بروزرسانی دکمه wishlist
function updateWishlistButton() {
    if (!currentProduct) return;
    
    const btn = document.getElementById('wishlistBtn');
    if (wishlist.includes(currentProduct.id)) {
        btn.textContent = '❤️';
    } else {
        btn.textContent = '🤍';
    }
}

// بروزرسانی badge سبد خرید
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = totalItems;
    }
}

// اشتراک‌گذاری
function share(platform) {
    const productUrl = window.location.href;
    const productName = currentProduct ? currentProduct.name : 'محصول';
    
    const messages = {
        telegram: `📱 در حال اشتراک‌گذاری در تلگرام...`,
        whatsapp: `💬 در حال اشتراک‌گذاری در واتساپ...`,
        twitter: `🐦 در حال اشتراک‌گذاری در توییتر...`,
        link: `🔗 لینک کپی شد!\n${productUrl}`
    };

    if (platform === 'link') {
        // کپی لینک
        navigator.clipboard.writeText(productUrl).then(() => {
            alert(messages[platform]);
        });
    } else {
        alert(messages[platform]);
        // می‌تونی لینک‌های واقعی شبکه‌های اجتماعی رو اضافه کنی
    }
}

// نمایش تب
function showTab(index) {
    // مخفی کردن همه تب‌ها
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // نمایش تب انتخاب شده
    document.getElementById(`tab${index}`).classList.add('active');
    event.target.classList.add('active');
}

// رفتن به صفحه محصول دیگر
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// بارگذاری اولیه badge
updateCartBadge();