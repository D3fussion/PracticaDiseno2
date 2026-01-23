products.then((data) => {
    const slide1 = document.getElementById("slide1");
    const slide2 = document.getElementById("slide2");
    const productsList = document.getElementById("productsList");

    if (slide1 !== null && slide2 !== null) {

        for (let i = 0; i < 8; i++) {
            const tarjeta = document.createElement('article');

            tarjeta.className = "product-card";
            tarjeta.setAttribute("itemscope", "");
            tarjeta.setAttribute("itemtype", "http://schema.org/Product");

            tarjeta.innerHTML = `
            <div class="product-image-container group">
                <img src="${data.products[i].images[0]}" 
                    alt="${data.products[i].title}" 
                    class="product-image" itemprop="image">
                
                <button class="add-to-cart-overlay cart-btn-overlay" onclick="addToCart(${data.products[i].id})">
                    <span class="add-to-cart-text">
                        Agregar al carrito
                    </span>
                </button>
            </div>
        
            <div style="height: 35%; margin-top: 1rem;">
                <div class="product-info">
                    <h2 class="product-title" itemprop="name">
                        ${data.products[i].title}
                    </h2>
                    <p class="product-category" itemprop="category">
                        ${data.products[i].category}
                    </p>
                    <p class="product-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                        <span itemprop="priceCurrency" content="MXN">$</span><span itemprop="price">${data.products[i].price}</span>
                    </p>
                </div>
            </div>
            `;

            if (i < 4) slide1.appendChild(tarjeta);
            else slide2.appendChild(tarjeta);
        }

    } else if (productsList !== null) {

        const productsList = document.getElementById("productsList");

        data.products.forEach(product => {
            const tarjeta = document.createElement('article');

            tarjeta.className = "product-card";
            tarjeta.setAttribute("itemscope", "");
            tarjeta.setAttribute("itemtype", "http://schema.org/Product");

            tarjeta.innerHTML = `
            <div class="product-image-container group">
                <img src="${product.images[0]}" 
                    alt="${product.title}" 
                    class="product-image" itemprop="image">
                
                <button class="add-to-cart-overlay cart-btn-overlay" onclick="addToCart(${product.id})">
                    <span class="add-to-cart-text">
                        Agregar al carrito
                    </span>
                </button>
            </div>
        
            <div style="height: 35%; margin-top: 1rem;">
                <div class="product-info">
                    <h2 class="product-title" itemprop="name">
                        ${product.title}
                    </h2>
                    <p class="product-category" itemprop="category">
                        ${product.category}
                    </p>
                    <p class="product-price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                        <span itemprop="priceCurrency" content="MXN">$</span><span itemprop="price">${product.price}</span>
                    </p>
                </div>
            </div>
            `;

            productsList.appendChild(tarjeta);

        });

    } else {
        console.log("No se encontro el elemento");
    }
});