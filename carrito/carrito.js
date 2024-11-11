// API URL del backend (servidor que corre en el puerto 3003)
const apiUrl = 'http://localhost:3003/carrito';

// Función para obtener los productos del carrito desde el servidor
async function fetchCartItems() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('No se pudo obtener el carrito');
        }
        const cartItems = await response.json();
        renderCartItems(cartItems);
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
    }
}

// Función para renderizar los productos del carrito
function renderCartItems(cartItems) {
    const cartItemsContainer = document.getElementById('cart-items-container');
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor

    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity; // Aseguramos que se multiplica por la cantidad

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        cartItemElement.innerHTML = `
            <div class="item-info">
                <h3>${item.name}</h3>
                <span>${item.price} USD</span>
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
        `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    // Actualizar el precio total
    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
async function removeFromCart(itemId) {
    try {
        const response = await fetch(`${apiUrl}/remove/${itemId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Producto eliminado del carrito');
            fetchCartItems(); // Recargar los productos del carrito
        } else {
            throw new Error('No se pudo eliminar el producto');
        }
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
    }
}

// Función para actualizar la cantidad de un producto en el carrito
async function updateQuantity(itemId, quantity) {
    try {
        const response = await fetch(`${apiUrl}/update/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        });

        if (response.ok) {
            fetchCartItems(); // Recargar los productos del carrito después de actualizar la cantidad
        } else {
            throw new Error('No se pudo actualizar la cantidad');
        }
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
    }
}

// Función para manejar la acción de compra
document.getElementById('checkout-btn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${apiUrl}/checkout`, {
            method: 'POST'
        });
        if (response.ok) {
            alert('¡Compra realizada con éxito!');
            fetchCartItems(); // Recargar el carrito vacío después de la compra
        } else {
            throw new Error('Error al realizar la compra');
        }
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        alert('Hubo un error al realizar la compra');
    }
});

// Inicializar el carrito cuando se cargue la página
fetchCartItems();
