// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "Premium sound quality with noise cancellation technology.",
        price: 129.99,
        image: "img/Wireless Bluetooth Headphones.jpg",
        category: "electronics",
        rating: 4.5,
        stock: 15
    },
    {
        id: 2,
        name: "Smartphone X Pro",
        description: "Latest smartphone with advanced camera and long battery life.",
        price: 899.99,
        image: "img/Smartphone X Pro.jpg",
        category: "electronics",
        rating: 4.8,
        stock: 10
    },
    {
        id: 3,
        name: "Men's Casual T-Shirt",
        description: "Comfortable cotton t-shirt for everyday wear.",
        price: 24.99,
        image: "img/Men's Casual T-Shirt.jpg",
        category: "clothing",
        rating: 4.2,
        stock: 50
    },
    {
        id: 4,
        name: "Women's Running Shoes",
        description: "Lightweight and breathable shoes for running and training.",
        price: 79.99,
        image: "img/Women's Running Shoes.jpg",
        category: "clothing",
        rating: 4.6,
        stock: 25
    },
    {
        id: 5,
        name: "Smart Watch Series 5",
        description: "Track your fitness and stay connected with this smart watch.",
        price: 199.99,
        image: "img/Smart Watch Series 5.jpg",
        category: "electronics",
        rating: 4.4,
        stock: 20
    },
    {
        id: 6,
        name: "Stainless Steel Water Bottle",
        description: "Keep your drinks hot or cold for hours with this insulated bottle.",
        price: 29.99,
        image: "img/Stainless Steel Water Bottle.jpg",
        category: "home",
        rating: 4.3,
        stock: 40
    },
    {
        id: 7,
        name: "Organic Face Moisturizer",
        description: "Hydrating face cream with natural ingredients.",
        price: 34.99,
        image: "img/Organic Face Moisturizer.jpg",
        category: "beauty",
        rating: 4.7,
        stock: 30
    },
    {
        id: 8,
        name: "Wireless Charging Pad",
        description: "Fast wireless charging for compatible devices.",
        price: 39.99,
        image: "img/Wireless Charging Pad.jpg",
        category: "electronics",
        rating: 4.1,
        stock: 35
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count
    updateCartCount();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Home page
    const featuredProductsContainer = document.getElementById('featured-products');
    if (featuredProductsContainer) {
        // Display featured products (first 4)
        const featuredProducts = products.slice(0, 4);
        displayProducts(featuredProducts, featuredProductsContainer);
    }
    
    // Products page
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        // Display all products
        displayProducts(products, productsGrid);
        
        // Filter functionality
        const applyFiltersBtn = document.getElementById('apply-filters');
        const categoryFilters = document.querySelectorAll('.category-filter');
        const priceRange = document.getElementById('price-range');
        const priceValue = document.getElementById('price-value');
        
        // Update price value display
        if (priceRange) {
            priceRange.addEventListener('input', function() {
                priceValue.textContent = `$${this.value}`;
            });
        }
        
        // Apply filters
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', function() {
                let filteredProducts = [...products];
                
                // Category filter
                const selectedCategories = [];
                categoryFilters.forEach(filter => {
                    if (filter.checked && filter.value !== 'all') {
                        selectedCategories.push(filter.value);
                    }
                });
                
                if (selectedCategories.length > 0) {
                    filteredProducts = filteredProducts.filter(product => 
                        selectedCategories.includes(product.category)
                    );
                }
                
                // Price filter
                const maxPrice = parseInt(priceRange.value);
                filteredProducts = filteredProducts.filter(product => 
                    product.price <= maxPrice
                );
                
                // Display filtered products
                displayProducts(filteredProducts, productsGrid);
            });
        }
        
        // Sort functionality
        const sortBy = document.getElementById('sort-by');
        if (sortBy) {
            sortBy.addEventListener('change', function() {
                let sortedProducts = [...products];
                
                switch(this.value) {
                    case 'price-low':
                        sortedProducts.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-high':
                        sortedProducts.sort((a, b) => b.price - a.price);
                        break;
                    case 'name-asc':
                        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 'name-desc':
                        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                        break;
                    default:
                        // Default sorting (featured)
                        break;
                }
                
                displayProducts(sortedProducts, productsGrid);
            });
        }
    }
    
    // Product detail page
    const productDetailContainer = document.getElementById('product-detail-container');
    if (productDetailContainer) {
        // Get product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        
        if (productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                displayProductDetail(product, productDetailContainer);
                
                // Update breadcrumb
                const breadcrumb = document.getElementById('product-breadcrumb');
                if (breadcrumb) {
                    breadcrumb.textContent = product.name;
                }
                
                // Display related products (same category)
                const relatedProductsContainer = document.getElementById('related-products');
                if (relatedProductsContainer) {
                    const relatedProducts = products.filter(p => 
                        p.category === product.category && p.id !== product.id
                    ).slice(0, 4);
                    
                    displayProducts(relatedProducts, relatedProductsContainer);
                }
            }
        }
    }
    
    // Cart page
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        displayCart();
        
        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        const cartContent = document.getElementById('cart-content');
        const checkoutForm = document.getElementById('checkout-form');
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                cartContent.classList.add('hidden');
                checkoutForm.classList.remove('hidden');
            });
        }
        
        // Back to cart button
        const backToCartBtn = document.getElementById('back-to-cart');
        if (backToCartBtn) {
            backToCartBtn.addEventListener('click', function() {
                checkoutForm.classList.add('hidden');
                cartContent.classList.remove('hidden');
            });
        }
        
        // Place order
        const paymentForm = document.getElementById('payment-form');
        const orderConfirmation = document.getElementById('order-confirmation');
        
        if (paymentForm) {
            paymentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get email for confirmation
                const email = document.getElementById('email').value;
                const confirmationEmail = document.getElementById('confirmation-email');
                if (confirmationEmail) {
                    confirmationEmail.textContent = email;
                }
                
                // Generate random order number
                const orderNumber = Math.floor(100000 + Math.random() * 900000);
                const orderNumberElement = document.getElementById('order-number');
                if (orderNumberElement) {
                    orderNumberElement.textContent = orderNumber;
                }
                
                // Show confirmation
                checkoutForm.classList.add('hidden');
                orderConfirmation.classList.remove('hidden');
                
                // Clear cart
                cart = [];
                saveCart();
                updateCartCount();
            });
        }
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});

// Display products in grid
function displayProducts(productsArray, container) {
    container.innerHTML = '';
    
    if (productsArray.length === 0) {
        container.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
        return;
    }
    
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <a href="product-detail.html?id=${product.id}" class="btn-small">View Details</a>
                    <button class="btn-small add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
        
        // Add event listener to "Add to Cart" button
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', function() {
            addToCart(product.id);
        });
    });
}

// Display product detail
function displayProductDetail(product, container) {
    container.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <div class="product-detail-price">$${product.price.toFixed(2)}</div>
            <div class="product-detail-description">
                <p>${product.description}</p>
            </div>
            <div class="product-detail-meta">
                <p><strong>Category:</strong> ${capitalizeFirstLetter(product.category)}</p>
                <p><strong>Rating:</strong> ${product.rating}/5</p>
                <p><strong>Availability:</strong> ${product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</p>
            </div>
            <div class="product-detail-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn minus">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
                    <button class="quantity-btn plus">+</button>
                </div>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Quantity selector functionality
    const minusBtn = container.querySelector('.minus');
    const plusBtn = container.querySelector('.plus');
    const quantityInput = container.querySelector('.quantity-input');
    
    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < product.stock) {
            quantityInput.value = value + 1;
        }
    });
    
    // Add to cart functionality
    const addToCartBtn = container.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        addToCart(product.id, quantity);
    });
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
}

// Display cart
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartContent = document.getElementById('cart-content');
    
    if (!cartItemsContainer) return;
    
    // Check if cart is empty
    if (cart.length === 0) {
        cartEmptyMessage.classList.remove('hidden');
        cartContent.classList.add('hidden');
        return;
    }
    
    cartEmptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
    
    // Clear container
    cartItemsContainer.innerHTML = '';
    
    // Add cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-subtotal">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
            <div class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
        
        // Quantity buttons
        const minusBtn = cartItem.querySelector('.minus');
        const plusBtn = cartItem.querySelector('.plus');
        const quantityInput = cartItem.querySelector('.quantity-input');
        
        minusBtn.addEventListener('click', function() {
            updateCartItemQuantity(item.id, item.quantity - 1);
        });
        
        plusBtn.addEventListener('click', function() {
            updateCartItemQuantity(item.id, item.quantity + 1);
        });
        
        quantityInput.addEventListener('change', function() {
            const newQuantity = parseInt(this.value);
            if (newQuantity > 0) {
                updateCartItemQuantity(item.id, newQuantity);
            } else {
                this.value = item.quantity;
            }
        });
        
        // Remove button
        const removeBtn = cartItem.querySelector('.cart-item-remove');
        removeBtn.addEventListener('click', function() {
            removeCartItem(item.id);
        });
    });
    
    // Update cart summary
    updateCartSummary();
}

// Update cart item quantity
function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    if (newQuantity <= 0) {
        removeCartItem(productId);
        return;
    }
    
    item.quantity = newQuantity;
    saveCart();
    displayCart();
    updateCartCount();
}

// Remove cart item
function removeCartItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
    updateCartCount();
}

// Update cart summary
function updateCartSummary() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const taxElement = document.getElementById('cart-tax');
    const totalElement = document.getElementById('cart-total');
    
    if (!subtotalElement) return;
    
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate shipping (free over $50, otherwise $5.99)
    const shipping = subtotal > 50 ? 0 : 5.99;
    
    // Calculate tax (8.25%)
    const tax = subtotal * 0.0825;
    
    // Calculate total
    const total = subtotal + shipping + tax;
    
    // Update elements
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}