
async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('login-message');

    try {
        const response = await fetch('../json/users.json');
        const users = await response.json();
        const user = users.find(u => u.nombre_usuario === username && u.contrasena === password);

        if (user) {
            localStorage.setItem('authenticatedUser', JSON.stringify(user));
            window.location.href = '../html/biblioteca.html';
        } else {
            messageElement.textContent = 'Nombre de usuario o contraseña incorrectos.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        messageElement.textContent = 'Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.';
        messageElement.style.color = 'red';
    }
}

document.getElementById('login-form').addEventListener('submit', handleLogin);
