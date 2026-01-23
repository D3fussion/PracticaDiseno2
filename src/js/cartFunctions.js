function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[id]) {
        cart[id]++;
    } else {
        cart[id] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast('Producto agregado al carrito', 'success');
}

function openCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemsContainer = document.getElementById('cartItems');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');

    cartOverlay.classList.add('open');
    // Sidebar animation is handled by CSS via .open class on overlay

    cartItemsContainer.innerHTML = '';

    if (Object.keys(cart).length === 0) {
        // Updated text class or kept inline style if simple? Let's use inline for simplicity or specific class
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--gray-500); margin-top: 2.5rem;">Tu carrito está vacío</p>';
        return;
    }

    fetchProducts().then(data => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        for (const id in cart) {
            const product = data.products.find(p => p.id == id);
            if (product) {
                const quantity = cart[id];
                const itemTotal = product.price * quantity;
                total += itemTotal;

                const productContainer = document.createElement('div');
                productContainer.className = "cart-item";
                productContainer.innerHTML = `
                    <div class="cart-item-img-box">
                        <img src="${product.images[0]}" alt="${product.title}" class="cart-item-img">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title-row">
                            <p class="cart-item-title" title="${product.title}">${product.title}</p>
                            <button onclick="removeFromCart(${product.id})" class="cart-remove-btn">&times;</button>
                        </div>
                        <div class="cart-item-controls-row">
                             <div class="qty-selector">
                                <button onclick="updateCartItemQuantity(${product.id}, -1)" class="qty-btn qty-btn-minus">-</button>
                                <input type="number" value="${quantity}" onchange="setCartItemQuantity(${product.id}, this.value)" class="qty-input">
                                <button onclick="updateCartItemQuantity(${product.id}, 1)" class="qty-btn qty-btn-plus">+</button>
                            </div>
                             <p class="cart-item-price">$${itemTotal.toFixed(2)}</p>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(productContainer);
            }
        }

        const cartTotal = document.getElementById('cartTotal');
        // Ensure cart total element exists before setting
        if (cartTotal) {
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    });
}

function closeCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    // const cartSidebar = document.getElementById('cartSidebar'); // Not needed for logic

    cartOverlay.classList.remove('open');
}

function removeFromCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[id]) {
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
        openCart();
    }
}

function updateCartItemQuantity(id, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[id]) {
        cart[id] += change;
        if (cart[id] <= 0) {
            delete cart[id];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        openCart();
    }
}

function setCartItemQuantity(id, value) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let quantity = parseInt(value);
    if (isNaN(quantity) || quantity <= 0) {
        quantity = 1;
    }
    cart[id] = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    openCart();
}