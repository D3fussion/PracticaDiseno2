products.then((data) => {
    const slide1 = document.getElementById("slide1");
    const slide2 = document.getElementById("slide2");
    const productsList = document.getElementById("productsList");

    if (slide1 !== null && slide2 !== null) {

        for (let i = 0; i < 8; i++) {
            const tarjeta = document.createElement('div');

            tarjeta.className = "product-card";

            tarjeta.innerHTML = `
            <div class="product-image-container group">
                <img src="${data.products[i].images[0]}" 
                    alt="${data.products[i].title}" 
                    class="product-image">
                
                <div class="add-to-cart-overlay" onclick="addToCart(${data.products[i].id})">
                    <a class="add-to-cart-text">
                        Agregar al carrito
                    </a>
                </div>
            </div>
        
            <div style="height: 35%; margin-top: 1rem;">
                <div class="product-info">
                    <h2 class="product-title">
                        ${data.products[i].title}
                    </h2>
                    <p class="product-category">
                        ${data.products[i].category}
                    </p>
                    <p class="product-price">
                        $${data.products[i].price}
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
            const tarjeta = document.createElement('div');

            tarjeta.className = "product-card";

            tarjeta.innerHTML = `
            <div class="product-image-container group">
                <img src="${product.images[0]}" 
                    alt="${product.title}" 
                    class="product-image">
                
                <div class="add-to-cart-overlay" onclick="addToCart(${product.id})">
                    <a class="add-to-cart-text">
                        Agregar al carrito
                    </a>
                </div>
            </div>
        
            <div style="height: 35%; margin-top: 1rem;">
                <div class="product-info">
                    <h2 class="product-title">
                        ${product.title}
                    </h2>
                    <p class="product-category">
                        ${product.category}
                    </p>
                    <p class="product-price">
                        $${product.price}
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