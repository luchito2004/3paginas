document.addEventListener('DOMContentLoaded', async function() {
    const foodProductsContainer = document.getElementById('foodProductsContainer');
    const animalProductsContainer = document.getElementById('animalProductsContainer');

    // Productos definidos manualmente
    const foodProducts = [
        {
            id: 1,
            imageUrl: 'comidaperro.png',
            name: 'Comida para Perros',
            description: 'Alimento balanceado para perros adultos, 10kg.',
            price: 20000
        },
        {
            id: 2,
            imageUrl: 'comidagato.jpg',
            name: 'Comida para Gatos',
            description: 'Alimento natural para gatos, 5kg.',
            price: 14990
        },
        {
            id: 3,
            imageUrl: 'alimentovaca.png',
            name: 'Alimento para Vacas',
            description: 'Vaca lechera 158 ,25 kg.',
            price: 7790
        }
    ];

    const animalProducts = [
        {
            id: 4,
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Perro',
            name: 'Perro Labrador',
            description: 'Perro Labrador adulto, sano y amigable.',
            price: 199.99
        },
        {
            id: 5,
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Gato',
            name: 'Gato Siamés',
            description: 'Gato siamés, raza pura, muy juguetón.',
            price: 149.99
        },
        {
            id: 6,
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Aguila',
            name: 'Águila Real',
            description: 'Águila real joven, ideal para coleccionistas.',
            price: 499.99
        }
    ];

    // Función para mostrar los productos en el contenedor
    function renderProducts(products, container) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Añadir al carrito</button>
            `;
            container.appendChild(productCard);
        });
    }

    // Mostrar productos de alimentos
    renderProducts(foodProducts, foodProductsContainer);

    // Mostrar productos de animales
    renderProducts(animalProducts, animalProductsContainer);
});

// Carrito simulado en memoria (puede almacenarse en un servidor o base de datos)
let cart = [];

// Función para agregar productos al carrito
function addToCart(productId) {
    const product = [...foodProducts, ...animalProducts].find(p => p.id === productId);
    if (product) {
        // Agregar el producto al carrito
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1; // Si el producto ya está en el carrito, incrementar la cantidad
        } else {
            cart.push({ ...product, quantity: 1 }); // Si no está, agregarlo con cantidad 1
        }
        alert(`${product.name} añadido al carrito`);
    }
}

// Función para obtener los productos del carrito (esto se utilizaría para mostrar los productos del carrito)
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor de items del carrito

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="item-info">
                <h3>${item.name}</h3>
                <span>${item.price} USD</span>
                <p>Cantidad: ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
            <button class="increase-btn" onclick="increaseQuantity(${item.id})">+</button>
            <button class="decrease-btn" onclick="decreaseQuantity(${item.id})">-</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Mostrar el total en el carrito
    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    alert('Producto eliminado del carrito');
    renderCartItems(); // Actualizar el carrito mostrado
}

// Función para aumentar la cantidad de un producto en el carrito
function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1;
        renderCartItems(); // Actualizar el carrito mostrado
    }
}

// Función para disminuir la cantidad de un producto en el carrito
function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        renderCartItems(); // Actualizar el carrito mostrado
    }
}

// Función de compra (limpiar carrito)
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('¡Compra realizada con éxito!');
    cart = []; // Limpiar el carrito después de la compra
    renderCartItems(); // Actualizar el carrito mostrado
});

// Redirigir al carrito en otro puerto (3003)
document.getElementById('goToCartButton').addEventListener('click', function() {
    window.location.href = "http://localhost:3003/carrito.html"; // Asegúrate de que este archivo esté en el puerto correcto
});
