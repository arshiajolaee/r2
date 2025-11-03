// محصولات (همان لیست از script.js)
const products = [
    { id: 1, name: "لامپ LED 12 وات آفتابی", price: 45000, oldPrice: 65000, image: "💡", category: "lamp", rating: 4.5, reviews: 234, discount: 30, brand: "آیلا" },
    { id: 2, name: "کابل افشان 1.5 متری", price: 125000, oldPrice: 150000, image: "🔌", category: "cable", rating: 4.8, reviews: 456, discount: 16, brand: "البرز" },
    { id: 3, name: "کلید و پریز کریستال", price: 85000, oldPrice: 110000, image: "⚡", category: "switch", rating: 4.3, reviews: 189, discount: 22, brand: "شنایدر" },
    { id: 4, name: "لامپ هالوژن 50 وات", price: 35000, oldPrice: 45000, image: "💡", category: "lamp", rating: 4.0, reviews: 123, discount: 22, brand: "پارس شعاع" },
    { id: 5, name: "تابلو برق 12 کانال", price: 450000, oldPrice: 550000, image: "🔧", category: "panel", rating: 4.7, reviews: 89, discount: 18, brand: "الکو پویا" },
    { id: 6, name: "دریل شارژی 18 ولت", price: 890000, oldPrice: 1100000, image: "🛠️", category: "tools", rating: 4.9, reviews: 567, discount: 19, brand: "بوش" },
    { id: 7, name: "سیم 1.5 میلیمتری 100 متری", price: 95000, oldPrice: 120000, image: "🔌", category: "cable", rating: 4.6, reviews: 334, discount: 20, brand: "البرز" },
    { id: 8, name: "پریز برق 6 خانه", price: 125000, oldPrice: 155000, image: "⚡", category: "switch", rating: 4.4, reviews: 278, discount: 19, brand: "الیکس" },
    { id: 9, name: "لامپ LED 20 وات مهتابی", price: 65000, oldPrice: 85000, image: "💡", category: "lamp", rating: 4.7, reviews: 312, discount: 23, brand: "آیلا" },
    { id: 10, name: "کابل شارژ 2 متری", price: 45000, oldPrice: 60000, image: "🔌", category: "cable", rating: 4.2, reviews: 189, discount: 25, brand: "البرز" }
];

let filteredProducts = [...products];
let currentView = 'grid';
let currentPage = 1;
let itemsPerPage = 9;
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// اجرای کد بعد از لود صفحه
document.addEventListener('DOMContentLoaded', function() {
    loadSearchQuery();
    renderProducts();
    updateCartBadge();
    setupSearchInput();
});

// بارگذاری کوئری جستجو از URL
function loadSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        document.getElementById('searchInput').value = query;
        performSearch();
    }
}

// تنظیم input جستجو
function setupSearchInput() {
    const input = document.getElementById('searchInput');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// انجام جستجو
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!query) {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)
        );
    }
    
    applyFilters();
}

// اعمال فیلترها
function applyFilters() {
    let filtered = [...products];
    
    // جستجو
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    if (query) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)
        );
    }
    
    // فیلتر دسته‌بندی
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(input => input.value);
    
    if (!selectedCategories.includes('all') && selectedCategories.length > 0) {
        filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // فیلتر قیمت
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    
    // فیلتر برند
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
        .map(input => input.value);
    
    if (selectedBrands.length > 0) {
        filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // فیلتر امتیاز
    const selectedRating = document.querySelector('input[name="rating"]:checked')?.value;
    if (selectedRating && selectedRating !== 'all') {
        const minRating = parseFloat(selectedRating);
        filtered = filtered.filter(product => product.rating >= minRating);
    }
    
    // فیلتر موجودی (در این نسخه همه موجود هستند)
    const availableOnly = document.querySelector('input[name="stock"]:checked');
    if (availableOnly) {
        // در پروژه واقعی این فیلتر کار می‌کند
    }
    
    filteredProducts = filtered;
    currentPage = 1;
    renderProducts();
}

// مرتب‌سازی محصولات
function sortProducts() {
    const sortBy = document.getElementById('sortBy').value;
    
    switch(sortBy) {
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
            filteredProducts.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'discount':
            filteredProducts.sort((a, b) => b.discount - a.discount);
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    renderProducts();
}

// تغییر نمایش
function changeView(view) {
    currentView = view;
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.view-btn').classList.add('active');
    
    const container = document.getElementById('productsContainer');
    if (view === 'list') {
        container.classList.add('list-view');
    } else {
        container.classList.remove('list-view');
    }
}

// رندر محصولات
function renderProducts() {
    const container = document.getElementById('productsContainer');
    const emptyState = document.getElementById('emptyState');
    
    // محاسبه صفحه‌بندی
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // بروزرسانی اطلاعات جستجو
    document.getElementById('searchTitle').textContent = 
        document.getElementById('searchInput').value 
        ? `نتایج جستجو برای "${document.getElementById('searchInput').value}"`
        : 'همه محصولات';
    
    document.getElementById('searchCount').textContent = 
        `${filteredProducts.length} محصول یافت شد`;
    
    // نمایش محصولات
    if (paginatedProducts.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        document.getElementById('pagination').innerHTML = '';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    container.innerHTML = paginatedProducts.map(product => `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <div class="product-image">
                ${product.discount > 0 ? `<div class="product-discount">${product.discount}%</div>` : ''}
                <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                    ${wishlist.includes(product.id) ? '❤️' : '🤍'}
                </button>
                <div style="font-size: ${currentView === 'list' ? '60px' : '80px'};">${product.image}</div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    <span class="stars">⭐</span>
                    <span>${product.rating}</span>
                    <span class="reviews">(${product.reviews} نظر)</span>
                </div>
                <div class="product-price">
                    ${product.oldPrice ? `<div class="old-price">${product.oldPrice.toLocaleString()} تومان</div>` : ''}
                    <div class="current-price">${product.price.toLocaleString()} تومان</div>
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    افزودن به سبد خرید
                </button>
            </div>
        </div>
    `).join('');
    
    renderPagination();
}

// رندر صفحه‌بندی
function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = `
        <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            ‹
        </button>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<button class="page-btn" disabled>...</button>`;
        }
    }
    
    html += `
        <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            ›
        </button>
    `;
    
    pagination.innerHTML = html;
}

// تغییر صفحه
function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// رفتن به صفحه محصول
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// افزودن به سبد خرید
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // استفاده از Toast به جای alert
    if (typeof toast !== 'undefined') {
        toast.addedToCart(product.name);
    } else {
        alert('✅ محصول به سبد خرید اضافه شد!');
    }
    
    updateCartBadge();
}

// toggle علاقه‌مندی‌ها
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        if (typeof toast !== 'undefined') {
            toast.info('از علاقه‌مندی‌ها حذف شد');
        }
    } else {
        wishlist.push(productId);
        if (typeof toast !== 'undefined') {
            toast.success('به علاقه‌مندی‌ها اضافه شد');
        }
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderProducts();
}

// پاک کردن فیلترها
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    document.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.checked = input.value === 'all';
    });
    
    document.querySelectorAll('input[name="rating"]').forEach(input => {
        input.checked = input.value === 'all';
    });
    
    document.getElementById('sortBy').value = 'default';
    
    filteredProducts = [...products];
    renderProducts();
    
    if (typeof toast !== 'undefined') {
        toast.info('فیلترها پاک شدند');
    }
}

// بروزرسانی badge سبد خرید
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').textContent = totalItems;
}

// handle کلیک روی checkbox دسته‌بندی "همه"
document.addEventListener('DOMContentLoaded', function() {
    const allCheckbox = document.querySelector('input[name="category"][value="all"]');
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]:not([value="all"])');
    
    if (allCheckbox) {
        allCheckbox.addEventListener('change', function() {
            if (this.checked) {
                categoryCheckboxes.forEach(cb => cb.checked = false);
            }
        });
        
        categoryCheckboxes.forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.checked) {
                    allCheckbox.checked = false;
                }
                
                const anyChecked = Array.from(categoryCheckboxes).some(c => c.checked);
                if (!anyChecked) {
                    allCheckbox.checked = true;
                }
            });
        });
    }
});