const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const goToRegister = document.getElementById("goToRegister");
const goToLogin = document.getElementById("goToLogin");

const isUserLoggedIn = localStorage.getItem("isLoggedIn");

window.onload = function () {
    if (isUserLoggedIn === "true") {
        // Si el usuario ya ha iniciado sesión, redirigir a la página de productos
        window.location.href = "http://localhost:3002/productos.html";  // Asegúrate de que este archivo esté en el puerto correcto
    } else {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    }
};

goToRegister.addEventListener("click", function(event) {
    event.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
});

goToLogin.addEventListener("click", function(event) {
    event.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
});

// Registro
registerForm.onsubmit = async function (event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Validación de campos (simple)
    if (!name || !email || !password) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3001/autenticacion/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: email, password: password })  // Enviar email como username
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(data.message || "¡Registro exitoso!");

            // Mostrar el formulario de login después del registro
            loginForm.style.display = "block";
            registerForm.style.display = "none";
        } else {
            alert(data.message || "Hubo un error al registrar el usuario.");
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert("Error de conexión. Intenta de nuevo.");
    }
};

// Inicio de sesión
loginForm.onsubmit = async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Validación de campos
    if (!email || !password) {
        alert("El correo y la contraseña son obligatorios.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3001/autenticacion/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: email, password: password })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(data.message || "Inicio de sesión exitoso.");
            localStorage.setItem("isLoggedIn", "true");  // Guardar el estado de sesión

            // Redirigir al usuario a la página de productos
            window.location.href = "http://localhost:3002/productos.html";  // Asegúrate de que este archivo esté en el puerto correcto
        } else {
            alert(data.message || "Credenciales incorrectas.");
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert("Error de conexión. Intenta de nuevo.");
    }
};
