// Furniture products data with 3D model URLs added (expanded to 50 products)
const baseProducts = [
    { id: 1, name: "Modern Sofa", price: 499.99, image: "https://via.placeholder.com/150?text=Modern+Sofa", model3d: "https://modelviewer.dev/shared-assets/models/Sofa.glb" },
    { id: 2, name: "Wooden Dining Table", price: 799.99, image: "https://via.placeholder.com/150?text=Dining+Table", model3d: "https://modelviewer.dev/shared-assets/models/DiningTable.glb" },
    { id: 3, name: "Office Chair", price: 199.99, image: "https://via.placeholder.com/150?text=Office+Chair", model3d: "https://modelviewer.dev/shared-assets/models/Chair.glb" },
    { id: 4, name: "Bookshelf", price: 299.99, image: "https://via.placeholder.com/150?text=Bookshelf", model3d: "https://modelviewer.dev/shared-assets/models/Bookshelf.glb" }
];

const products = [];

for (let i = 1; i <= 50; i++) {
    const base = baseProducts[(i - 1) % baseProducts.length];
    products.push({
        id: i,
        name: `${base.name} ${i}`,
        price: parseFloat((base.price * (1 + (i % 5) * 0.1)).toFixed(2)),
        image: base.image,
        model3d: base.model3d
    });
}

// Shopping cart data
let cart = [];

// Render products on the page with 3D model viewer and hover effect
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <model-viewer src="${product.model3d}" alt="${product.name}" auto-rotate camera-controls ar ar-modes="webxr scene-viewer quick-look" style="width: 150px; height: 150px; border-radius: 5px; transition: transform 0.3s ease;"></model-viewer>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    renderCart();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    renderCart();
}

// Render shopping cart
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.product.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <span>${item.product.name} x ${item.quantity}</span>
            <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Initialize the store
function initStore() {
    renderProducts();
    renderCart();
}

window.onload = initStore;
