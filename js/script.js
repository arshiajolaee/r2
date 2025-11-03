// محصولات
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

// متغیرهای سبد خرید
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = "all";
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// بارگذاری صفحه
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  startBannerSlider();
  updateCart();
});

// نمایش محصولات
function renderProducts() {
  const container = document.getElementById("productsContainer");
  const filteredProducts =
    currentCategory === "all"
      ? products
      : products.filter((p) => p.category === currentCategory);

  container.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card" onclick="goToProduct(${product.id})" style="cursor: pointer;">
            <div class="product-image">
                ${
                  product.discount > 0
                    ? `<div class="product-discount">${product.discount}%</div>`
                    : ""
                }
                <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist(${
                  product.id
                })">
                    ${wishlist.includes(product.id) ? "❤️" : "🤍"}
                </button>
                <div class="product-icon">${product.image}</div>
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
                    ${
                      product.oldPrice
                        ? `<div class="old-price">${product.oldPrice.toLocaleString()} تومان</div>`
                        : ""
                    }
                    <div class="current-price">${product.price.toLocaleString()} تومان</div>
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${
                  product.id
                })">
                    افزودن به سبد خرید
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// رفتن به صفحه جزئیات محصول
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// فیلتر دسته‌بندی
function filterCategory(category) {
  currentCategory = category;

  // بروزرسانی دکمه‌های nav
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  renderProducts();
}

// افزودن به سبد خرید
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // ذخیره در localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  updateCart();
  alert('✅ محصول به سبد خرید اضافه شد!');
}

// حذف از سبد خرید
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// تغییر تعداد محصول
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    }
  }
}

// بروزرسانی سبد خرید
function updateCart() {
  const badge = document.getElementById("cartBadge");
  badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartContent = document.getElementById("cartContent");

  if (cart.length === 0) {
    cartContent.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>سبد خرید شما خالی است</p>
            </div>
        `;
  } else {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalDiscount = cart.reduce(
      (sum, item) => sum + (item.oldPrice - item.price) * item.quantity,
      0
    );
    const shippingCost = totalPrice > 500000 ? 0 : 30000;
    const finalPrice = totalPrice + shippingCost;

    cartContent.innerHTML = `
            <div class="cart-items">
                ${cart
                  .map(
                    (item) => `
                    <div class="cart-item">
                        <div class="cart-item-main">
                            <div class="cart-item-image">${item.image}</div>
                            <div class="cart-item-info">
                                <div class="cart-item-name">${item.name}</div>
                                <div class="cart-item-brand">${item.brand}</div>
                                <div class="cart-item-controls">
                                    <div class="quantity-control">
                                        <button class="qty-btn" onclick="updateQuantity(${
                                          item.id
                                        }, 1)">+</button>
                                        <span class="quantity">${
                                          item.quantity
                                        }</span>
                                        <button class="qty-btn" onclick="updateQuantity(${
                                          item.id
                                        }, -1)">-</button>
                                    </div>
                                    <button class="remove-item" onclick="removeFromCart(${
                                      item.id
                                    })">🗑️</button>
                                </div>
                            </div>
                        </div>
                        <div class="cart-item-prices">
                            <span>قیمت واحد: ${item.price.toLocaleString()} تومان</span>
                            <span class="cart-item-total">${(
                              item.price * item.quantity
                            ).toLocaleString()} تومان</span>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            
            <div class="price-calculator">
                <div class="calculator-title">محاسبه قیمت</div>
                <div class="calculator-row">
                    <span>جمع کل محصولات:</span>
                    <span>${totalPrice.toLocaleString()} تومان</span>
                </div>
                ${
                  totalDiscount > 0
                    ? `
                    <div class="calculator-row discount">
                        <span>تخفیف:</span>
                        <span>${totalDiscount.toLocaleString()} تومان</span>
                    </div>
                `
                    : ""
                }
                <div class="calculator-row shipping">
                    <span>هزینه ارسال:</span>
                    <span class="${shippingCost === 0 ? "free" : ""}">
                        ${
                          shippingCost === 0
                            ? "رایگان"
                            : shippingCost.toLocaleString() + " تومان"
                        }
                    </span>
                </div>
                ${
                  totalPrice < 500000
                    ? `
                    <div class="shipping-alert">
                        با خرید ${(
                          500000 - totalPrice
                        ).toLocaleString()} تومان دیگر، ارسال رایگان!
                    </div>
                `
                    : ""
                }
                <div class="calculator-total">
                    <span>قابل پرداخت:</span>
                    <span class="total-amount">${finalPrice.toLocaleString()} تومان</span>
                </div>
            </div>
            
            <button class="checkout-btn" onclick="checkout()">
                ثبت سفارش و پرداخت
            </button>
        `;
  }
}

// باز/بستن سبد خرید
function toggleCart() {
  const overlay = document.getElementById("cartOverlay");
  const sidebar = document.getElementById("cartSidebar");

  overlay.classList.toggle("active");
  sidebar.classList.toggle("active");
}

// افزودن/حذف از علاقه‌مندی‌ها
function toggleWishlist(productId) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter((id) => id !== productId);
  } else {
    wishlist.push(productId);
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  renderProducts();
}

// اسلایدر بنر
let currentSlide = 0;
function startBannerSlider() {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    changeBanner(currentSlide);
  }, 4000);
}

function changeBanner(index) {
  currentSlide = index;
  const slides = document.querySelectorAll(".banner-slide");
  const dots = document.querySelectorAll(".dot");

  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

// پرداخت - تغییر اصلی اینجاست ✅
function checkout() {
  if (cart.length === 0) {
    alert('❌ سبد خرید شما خالی است!');
    return;
  }
  
  // انتقال به صفحه checkout
  window.location.href = 'checkout.html';
}