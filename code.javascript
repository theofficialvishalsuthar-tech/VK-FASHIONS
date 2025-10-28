const products = [
    { id: 1, name: "Men's Formal Shirt", category: "Men", type: "Formals", price: 1500, image: "https://picsum.photos/250/300?grayscale", description: "Elegant black shirt with fine detailing." },
    { id: 2, name: "Women's Casual Dress", category: "Women", type: "Casuals", price: 2000, image: "https://picsum.photos/250/301?grayscale", description: "White dress for everyday elegance." },
    { id: 3, name: "Boys' Jeans", category: "Boys", type: "Casuals", price: 1200, image: "https://picsum.photos/250/302?grayscale", description: "Comfortable black jeans for active kids." },
    { id: 4, name: "Girls' Skirt", category: "Girls", type: "Casuals", price: 1000, image: "https://picsum.photos/250/303?grayscale", description: "White skirt with subtle patterns." },
];

function loadProducts(filter = {}) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    products.filter(p => 
        (!filter.category || p.category === filter.category) &&
        (!filter.type || p.type === filter.type) &&
        p.price <= filter.price &&
        (!filter.search || p.name.toLowerCase().includes(filter.search))
    ).forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="viewProduct(${p.id})">View Details</button>
        `;
        grid.appendChild(card);
    });
}
loadProducts();

document.getElementById('category-filter').addEventListener('change', updateFilters);
document.getElementById('type-filter').addEventListener('change', updateFilters);
document.getElementById('price-filter').addEventListener('input', (e) => {
    document.getElementById('price-value').textContent = e.target.value;
    updateFilters();
});

function updateFilters() {
    const filter = {
        category: document.getElementById('category-filter').value !== 'All Categories' ? document.getElementById('category-filter').value : '',
        type: document.getElementById('type-filter').value !== 'All Types' ? document.getElementById('type-filter').value : '',
        price: document.getElementById('price-filter').value
    };
    loadProducts(filter);
}

function viewProduct(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `₹${product.price}`;
    document.getElementById('product-modal').style.display = 'block';
}
document.querySelector('.close').onclick = () => document.getElementById('product-modal').style.display = 'none';

let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `<p>${item.name