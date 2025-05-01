
// Product data with tags and descriptions
const products = [
  { name: "Studio Crafted Frame", price: "₹500", originalPrice: "₹900", image: "https://storage.googleapis.com/a1aa/image/gRe9HQbc9K4YtBBW904imDk66jNr12NjTyMiOaMJc0g.jpg", tags: ["frames"], description: "Handcrafted by our studio, this frame offers elegance at an affordable price.", dimensions: "8x10 inches" },
  { name: "Classic Photo Frame", price: "₹1200", image: "https://storage.googleapis.com/a1aa/image/vjq0KbcX7Pk4uDjVyA2-CzDQTPtD00p6iBDzz-azYJ4.jpg", tags: ["frames"], description: "A timeless wooden frame perfect for any photo, adding a classic touch to your memories.", dimensions: "10x12 inches" },
  { name: "Personalized Album", price: "₹1500", image: "https://storage.googleapis.com/a1aa/image/CiD5RiEXXwZxdsFCQpaL1_vMaY1t1wrVEF9fuiemuuI.jpg", tags: ["gift"], description: "A custom-made photo album with your choice of cover design, ideal for gifting.", dimensions: "8x10 inches" },
  { name: "Button badge", price: "₹100", image: "https://storage.googleapis.com/a1aa/image/CiD5RiEXXwZxdsFCQpaL1_vMaY1t1wrVEF9fuiemuuI.jpg", tags: ["gift"], description: "A custom-made photo album with your choice of cover design, ideal for gifting.", dimensions: "8x10 inches" },

  { name: "Custom Canvas Print", price: "₹1800", image: "https://storage.googleapis.com/a1aa/image/ReiRhBkPZXWtRPjmn0vsLeHa3rc-8du8E9XUj0Mv4c0.jpg", tags: ["gift"], description: "Turn your favorite photo into a stunning canvas print, perfect for home decor.", dimensions: "16x20 inches" }
];

let currentProducts = [...products];
let modal; // Declare modal in a broader scope

function renderProducts(productList) {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = ''; // Clear existing products
  productList.slice(1).forEach((product, index) => { // Skip the first product (Featured Gift)
    const productCard = document.createElement('div');
    productCard.className = `card p-5 text-center bg-white/90 rounded-xl shadow-md slide-up animation-delay-${800 + index * 100} cursor-pointer`;
    productCard.dataset.product = index + 1; // Adjust index to match products array
    productCard.innerHTML = `
      <img alt="${product.name}" class="w-full h-52 object-cover rounded-lg" src="${product.image}"/>
      <h3 class="text-xl font-semibold mt-3">${product.name}</h3>
      <p class="text-green-600 font-bold mt-1">${product.originalPrice ? `<s>${product.originalPrice}</s> ` : ''}${product.price}</p>
      <button class="bg-green-600 text-white px-4 py-2 rounded-lg btn mt-3 text-sm font-medium inline-block">View</button>
    `;
    productCard.addEventListener('click', () => showModal(product));
    productGrid.appendChild(productCard);
  });
}

function showModal(product) {
  modal = document.getElementById('product-modal'); // Assign the modal element
  const modalContent = document.getElementById('modal-content-inner');
  modalContent.innerHTML = `
    <img alt="${product.name}" class="w-full h-96 object-contain rounded-lg mb-4" src="${product.image}"/>
    <h3 class="text-2xl font-playfair font-semibold text-gray-800 mb-2">${product.name}</h3>
    <p class="text-green-600 font-bold mb-2">${product.originalPrice ? `<s>${product.originalPrice}</s> ` : ''}${product.price}</p>
    <p class="text-gray-600 mb-4">${product.description}</p>
    <p class="text-gray-700 mb-4"><strong>Dimensions:</strong> ${product.dimensions}</p>
    <button class="button" id="buy-now-btn">
      <svg viewBox="0 0 16 16" class="bi bi-cart-check" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
      </svg>
      <p class="text">Buy Now</p>
    </button>
  `;
  modal.style.display = 'block'; // Show the modal

  const buyNowBtn = document.getElementById('buy-now-btn');
  buyNowBtn.addEventListener('click', () => showOrderForm(product));
}

function showOrderForm(product) {
  const modalContent = document.getElementById('modal-content-inner');
  modalContent.innerHTML = `
    <h3 class="text-2xl font-playfair font-semibold text-gray-800 mb-4">${product.name} - Order Details</h3>
    <p class="text-green-600 font-bold mb-2">${product.originalPrice ? `<s>${product.originalPrice}</s> ` : ''}${product.price}</p>
    <p class="text-gray-600 mb-4">${product.description}</p>
    <p class="text-gray-700 mb-4"><strong>Dimensions:</strong> ${product.dimensions}</p>
    <form id="order-form">
      <div class="form-group">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" name="first-name" required>
        <div class="error" id="first-name-error">First name is required</div>
      </div>
      <div class="form-group">
        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" name="last-name" required>
        <div class="error" id="last-name-error">Last name is required</div>
      </div>
      <div class="form-group">
        <label for="mobile">Mobile</label>
        <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" required placeholder="10-digit number">
        <div class="error" id="mobile-error">Valid 10-digit mobile number is required</div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        <div class="error" id="email-error">Valid email is required</div>
      </div>
      <div class="form-group">
        <label for="country">Country</label>
        <input type="text" id="country" name="country" required>
        <div class="error" id="country-error">Country is required</div>
      </div>
      <div class="form-group">
        <label for="state">State</label>
        <input type="text" id="state" name="state" required>
        <div class="error" id="state-error">State is required</div>
      </div>
      <div class="form-group">
        <label for="pin-code">Area Pin Code</label>
        <input type="text" id="pin-code" name="pin-code" pattern="[0-9]{6}" required placeholder="6-digit pin code">
        <div class="error" id="pin-code-error">Valid 6-digit pin code is required</div>
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input type="text" id="address" name="address" required>
        <div class="error" id="address-error">Address is required</div>
      </div>
      <div class="form-group">
        <label for="door-number">Door Number</label>
        <input type="text" id="door-number" name="door-number" required>
        <div class="error" id="door-number-error">Door number is required</div>
      </div>
      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-lg btn mt-3 text-sm font-medium" id="confirm-order-btn">Confirm Order</button>
    </form>
  `;
  modal.style.display = 'block'; // Show the modal

  const form = document.getElementById('order-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      confirmOrder(product);
    }
  });
}

function validateForm() {
  let isValid = true;
  const fields = [
    { id: 'first-name', errorId: 'first-name-error', pattern: /.+/ },
    { id: 'last-name', errorId: 'last-name-error', pattern: /.+/ },
    { id: 'mobile', errorId: 'mobile-error', pattern: /[0-9]{10}/ },
    { id: 'email', errorId: 'email-error', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { id: 'country', errorId: 'country-error', pattern: /.+/ },
    { id: 'state', errorId: 'state-error', pattern: /.+/ },
    { id: 'pin-code', errorId: 'pin-code-error', pattern: /[0-9]{6}/ },
    { id: 'address', errorId: 'address-error', pattern: /.+/ },
    { id: 'door-number', errorId: 'door-number-error', pattern: /.+/ }
  ];

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);
    if (!field.pattern.test(input.value)) {
      error.style.display = 'block';
      isValid = false;
    } else {
      error.style.display = 'none';
    }
  });

  return isValid;
}

function confirmOrder(product) {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email').value;
  const country = document.getElementById('country').value;
  const state = document.getElementById('state').value;
  const pinCode = document.getElementById('pin-code').value;
  const address = document.getElementById('address').value;
  const doorNumber = document.getElementById('door-number').value;

  const message = `
    Product: ${product.name}
    Price: ${product.price}${product.originalPrice ? ` (Original: ${product.originalPrice})` : ''}
    Dimensions: ${product.dimensions}
    Customer Details:
    - Full Name: ${firstName} ${lastName}
    - Mobile: ${mobile}
    - Email: ${email}
    - Country: ${country}
    - State: ${state}
    - Pin Code: ${pinCode}
    - Address: ${doorNumber}, ${address}
  `;
  const whatsappLink = `https://wa.me/7569921448?text=${encodeURIComponent(message)}`;
  window.location.href = whatsappLink;
}

document.addEventListener('DOMContentLoaded', () => {
  // Initial render of products
  renderProducts(currentProducts);

  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = currentProducts.filter(product => product.name.toLowerCase().includes(query));
    renderProducts(filtered);
  });
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
  });

  // Featured Gift click handler
  const featuredGift = document.getElementById('featured-gift');
  featuredGift.addEventListener('click', () => showModal(products[0]));

  // Product card click handlers
  const productCards = document.querySelectorAll('#product-grid .card');
  productCards.forEach(card => {
    const productIndex = parseInt(card.dataset.product);
    card.addEventListener('click', () => showModal(products[productIndex]));
  });

  // Modal close functionality
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Hamburger menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Animation handling
  const elements = document.querySelectorAll('.fade-in, .slide-up');
  elements.forEach((el, index) => {
    setTimeout(() => el.classList.remove('opacity-0'), index * 200);
  });
});
// JavaScript for Automatic Photo Slider
const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
let currentIndex = 0;

function autoSlide() {
    currentIndex = (currentIndex + 1) % slide.length; // Loop back to the first slide
    const slideWidth = slide[0].clientWidth;
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Automatically slide every 3 seconds
setInterval(autoSlide, 3000);

// Adjust slider on window resize
window.addEventListener('resize', () => {
    const slideWidth = slide[0].clientWidth;
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
});
  