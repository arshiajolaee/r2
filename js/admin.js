// Sample Products Data
let products = [
  {
    id: 1,
    name: "لامپ LED 12 وات آفتابی",
    brand: "آیلا",
    category: "lamp",
    price: 45000,
    oldPrice: 65000,
    stock: 120,
    emoji: "💡",
    discount: 30,
  },
  {
    id: 2,
    name: "کابل افشان 1.5 متری",
    brand: "البرز",
    category: "cable",
    price: 125000,
    oldPrice: 150000,
    stock: 85,
    emoji: "🔌",
    discount: 16,
  },
  {
    id: 3,
    name: "کلید و پریز کریستال",
    brand: "شنایدر",
    category: "switch",
    price: 85000,
    oldPrice: 110000,
    stock: 45,
    emoji: "⚡",
    discount: 22,
  },
  {
    id: 4,
    name: "تابلو برق 12 کانال",
    brand: "الکو پویا",
    category: "panel",
    price: 450000,
    oldPrice: 550000,
    stock: 25,
    emoji: "🔧",
    discount: 18,
  },
  {
    id: 5,
    name: "دریل شارژی 18 ولت",
    brand: "بوش",
    category: "tools",
    price: 890000,
    oldPrice: 1100000,
    stock: 0,
    emoji: "🛠️",
    discount: 19,
  },
];

// Sample Orders Data
let orders = [
  {
    id: "#12345",
    customer: "علی احمدی",
    date: "1403/08/10",
    total: 245000,
    status: "pending",
    items: 3,
  },
  {
    id: "#12344",
    customer: "سارا محمدی",
    date: "1403/08/10",
    total: 890000,
    status: "confirmed",
    items: 1,
  },
  {
    id: "#12343",
    customer: "محمد رضایی",
    date: "1403/08/09",
    total: 450000,
    status: "shipped",
    items: 2,
  },
  {
    id: "#12342",
    customer: "زهرا کریمی",
    date: "1403/08/09",
    total: 125000,
    status: "delivered",
    items: 1,
  },
];

// Sample Customers Data
let customers = [
  {
    name: "علی احمدی",
    email: "ali@example.com",
    phone: "09121234567",
    orders: 12,
    total: "2,450,000",
    joinDate: "1402/05/15",
  },
  {
    name: "سارا محمدی",
    email: "sara@example.com",
    phone: "09129876543",
    orders: 8,
    total: "1,890,000",
    joinDate: "1402/06/20",
  },
  {
    name: "محمد رضایی",
    email: "mohammad@example.com",
    phone: "09123456789",
    orders: 15,
    total: "3,200,000",
    joinDate: "1402/04/10",
  },
  {
    name: "زهرا کریمی",
    email: "zahra@example.com",
    phone: "09125551234",
    orders: 5,
    total: "850,000",
    joinDate: "1403/01/05",
  },
];

let currentProductId = null;

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  loadOrders();
  loadCustomers();
});

// Navigation
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Show selected section
  document.getElementById(sectionId).classList.add("active");

  // Add active class to clicked nav item
  event.target.closest(".nav-item").classList.add("active");
}

// Toggle Sidebar (Mobile)
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Load Products
function loadProducts() {
  const tbody = document.getElementById("productsTableBody");
  tbody.innerHTML = products
    .map(
      (product) => `
        <tr>
            <td><span class="product-img">${product.emoji}</span></td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>${product.price.toLocaleString()} تومان</td>
            <td>${product.stock} عدد</td>
            <td>
                <span class="status-badge ${
                  product.stock > 0 ? "available" : "unavailable"
                }">
                    ${product.stock > 0 ? "موجود" : "ناموجود"}
                </span>
            </td>
            <td>
                <button class="action-btn" onclick="editProduct(${
                  product.id
                })">✏️ ویرایش</button>
                <button class="action-btn delete" onclick="deleteProduct(${
                  product.id
                })">🗑️ حذف</button>
            </td>
        </tr>
    `
    )
    .join("");
}

// Load Orders
function loadOrders() {
  const container = document.getElementById("ordersGrid");
  container.innerHTML = orders
    .map(
      (order) => `
        <div class="order-card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                <div>
                    <h3 style="color: #d4af37; font-size: 18px; margin-bottom: 5px;">سفارش ${
                      order.id
                    }</h3>
                    <p style="color: #999; font-size: 14px;">مشتری: ${
                      order.customer
                    }</p>
                </div>
                <span class="status-badge ${
                  order.status === "pending" ? "unavailable" : "available"
                }">
                    ${getOrderStatus(order.status)}
                </span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; padding-top: 15px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
                <div>
                    <p style="color: #999; font-size: 12px;">تاریخ</p>
                    <p style="color: #f5f5f5; font-weight: 600;">${
                      order.date
                    }</p>
                </div>
                <div>
                    <p style="color: #999; font-size: 12px;">تعداد اقلام</p>
                    <p style="color: #f5f5f5; font-weight: 600;">${
                      order.items
                    } محصول</p>
                </div>
                <div>
                    <p style="color: #999; font-size: 12px;">مبلغ</p>
                    <p style="color: #d4af37; font-weight: 700;">${order.total.toLocaleString()} تومان</p>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Load Customers
function loadCustomers() {
  const tbody = document.getElementById("customersTableBody");
  tbody.innerHTML = customers
    .map(
      (customer) => `
        <tr>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.orders} سفارش</td>
            <td>${customer.total} تومان</td>
            <td>${customer.joinDate}</td>
        </tr>
    `
    )
    .join("");
}

// Product Modal
function showAddProduct() {
  currentProductId = null;
  document.getElementById("modalTitle").textContent = "افزودن محصول جدید";
  document.getElementById("productName").value = "";
  document.getElementById("productBrand").value = "";
  document.getElementById("productCategory").value = "lamp";
  document.getElementById("productEmoji").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productOldPrice").value = "";
  document.getElementById("productStock").value = "";
  document.getElementById("productDiscount").value = "";
  document.getElementById("productModal").classList.add("active");
}

function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  currentProductId = id;
  document.getElementById("modalTitle").textContent = "ویرایش محصول";
  document.getElementById("productName").value = product.name;
  document.getElementById("productBrand").value = product.brand;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productEmoji").value = product.emoji;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productOldPrice").value = product.oldPrice;
  document.getElementById("productStock").value = product.stock;
  document.getElementById("productDiscount").value = product.discount;
  document.getElementById("productModal").classList.add("active");
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("active");
}

function saveProduct() {
  const productData = {
    name: document.getElementById("productName").value,
    brand: document.getElementById("productBrand").value,
    category: document.getElementById("productCategory").value,
    emoji: document.getElementById("productEmoji").value,
    price: parseInt(document.getElementById("productPrice").value),
    oldPrice: parseInt(document.getElementById("productOldPrice").value),
    stock: parseInt(document.getElementById("productStock").value),
    discount: parseInt(document.getElementById("productDiscount").value),
  };

  if (!productData.name || !productData.brand || !productData.price) {
    alert("لطفاً تمام فیلدهای ضروری را پر کنید");
    return;
  }

  if (currentProductId) {
    // Edit existing product
    const index = products.findIndex((p) => p.id === currentProductId);
    products[index] = { ...products[index], ...productData };
    alert("محصول با موفقیت ویرایش شد");
  } else {
    // Add new product
    const newProduct = {
      id: products.length + 1,
      ...productData,
    };
    products.push(newProduct);
    alert("محصول با موفقیت اضافه شد");
  }

  loadProducts();
  closeProductModal();
}

function deleteProduct(id) {
  if (confirm("آیا از حذف این محصول اطمینان دارید؟")) {
    products = products.filter((p) => p.id !== id);
    loadProducts();
    alert("محصول با موفقیت حذف شد");
  }
}

// Helper Functions
function getCategoryName(category) {
  const categories = {
    lamp: "لامپ و روشنایی",
    cable: "سیم و کابل",
    switch: "کلید و پریز",
    panel: "تابلو برق",
    tools: "ابزار برقی",
  };
  return categories[category] || category;
}

function getOrderStatus(status) {
  const statuses = {
    pending: "در انتظار",
    confirmed: "تایید شده",
    shipped: "ارسال شده",
    delivered: "تحویل داده شده",
  };
  return statuses[status] || status;
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("productModal");
  if (event.target === modal) {
    closeProductModal();
  }
};
