async function fetchProducts() {
    const url = 'https://dummyjson.com/products/category/groceries';

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        return await respuesta.json();

    } catch (error) {
        console.error('Hubo un problema:', error);
        toast('Hubo un problema al cargar los productos', 'error');
    }
}

const products = fetchProducts();
