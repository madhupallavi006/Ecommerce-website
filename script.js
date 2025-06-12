const products = [
  { id: 1, name: "Smart Watch", price: 2999, category: "electronics", rating: 4.5, review: "Great battery!", image: "https://m.media-amazon.com/images/I/6172ejBpFfL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 2, name: "Bluetooth Speaker", price: 1699, category: "electronics", rating: 4.2, review: "Superb sound!", image: "https://m.media-amazon.com/images/I/71o6CU8MqVL._AC_UY327_FMwebp_QL65_.jpg" },
  { id: 3, name: "Sneakers", price: 999, category: "fashion", rating: 4.7, review: "Very comfortable.", image: "https://m.media-amazon.com/images/I/61dPiu1fAUL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 4, name: "Leather Wallet", price: 499, category: "fashion", rating: 4.1, review: "Good quality.", image: "https://m.media-amazon.com/images/I/91nomXcCMvL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 5, name: "Coffee Maker", price: 2499, category: "home", rating: 4.3, review: "Easy to use.", image: "https://m.media-amazon.com/images/I/61ukOBw3GzL._AC_UY327_FMwebp_QL65_.jpg" },
  { id: 6, name: "T-Shirt", price: 499, category: "fashion", rating: 4.0, review: "Nice fit.", image: "https://m.media-amazon.com/images/I/61k4d-9W7RL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 7, name: "LED TV", price: 19999, category: "electronics", rating: 4.6, review: "Excellent display.", image: "https://m.media-amazon.com/images/I/719d1sN-1HL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 8, name: "Curtains Set", price: 799, category: "home", rating: 4.4, review: "Lovely fabric.", image: "https://m.media-amazon.com/images/I/61HP0er5T+L._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 9, name: "Gold Plated Necklace", price: 1299, category: "fashion", rating: 4.7, review: "Lovely necklace.", image: "https://images-eu.ssl-images-amazon.com/images/I/615bAqFAlXL._AC_UL232_SR232,232_.jpg" },
  { id: 10, name: "Non-stick Frying Pan", price: 749, category: "home", rating: 4.4, review: "Easy to use.", image: "https://m.media-amazon.com/images/I/61Q9PAoLceL._AC_UL480_FMwebp_QL65_.jpg" },


];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("productList");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalPrice = document.getElementById("modalPrice");
const modalRating = document.getElementById("modalRating");
const modalReview = document.getElementById("modalReview");

const loginModal = document.getElementById("loginModal");
const darkToggle = document.getElementById("darkToggle");

function renderProducts(list) {
  productList.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="viewDetails(${p.id})">Details</button>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.innerText = cart.length;
}

function viewDetails(id) {
  const p = products.find(p => p.id === id);
  modalTitle.innerText = p.name;
  modalImage.src = p.image;
  modalImage.style.maxWidth = "300px";
  modalImage.style.height = "auto";
  modalPrice.innerText = `Price: ₹${p.price}`;
  modalRating.innerText = `Rating: ${p.rating} ⭐`;
  modalReview.innerText = `Review: ${p.review}`;
  modal.style.display = "flex";
}

document.getElementById("closeModal").onclick = () => modal.style.display = "none";
document.getElementById("closeLogin").onclick = () => loginModal.style.display = "none";
document.getElementById("loginBtn").onclick = () => loginModal.style.display = "flex";
document.getElementById("loginSubmit").onclick = () => {
  alert("Logged in!");
  loginModal.style.display = "none";
};

darkToggle.onclick = () => document.body.classList.toggle("dark-mode");

document.getElementById("searchBar").oninput = (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
};

document.getElementById("categoryFilter").onchange = (e) => {
  const cat = e.target.value;
  const filtered = cat ? products.filter(p => p.category === cat) : products;
  renderProducts(filtered);
};

renderProducts(products);
cartCount.innerText = cart.length;
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

document.getElementById("cartBtn").onclick = () => {
  showCart();
  cartModal.style.display = "flex";
};

closeCart.onclick = () => {
  cartModal.style.display = "none";
};

function showCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.innerText = "";
    return;
  }

  const itemMap = {};
  cart.forEach(item => {
    if (!itemMap[item.id]) {
      itemMap[item.id] = { ...item, qty: 1 };
    } else {
      itemMap[item.id].qty += 1;
    }
  });

  let html = "";
  let total = 0;
  Object.values(itemMap).forEach(item => {
    html += `<p>${item.name} x ${item.qty} = ₹${item.price * item.qty}</p>`;
    total += item.price * item.qty;
  });

  cartItems.innerHTML = html;
  totalPrice.innerText = `Total: ₹${total}`;
}

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  cartModal.style.display = "none";
  cartCount.innerText = "0";
}

