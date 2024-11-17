function checkAuthenticationOnIndex() {
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
    if (authenticatedUser) {
        window.location.href = '../html/biblioteca.html';
    }
}

if (window.location.pathname.endsWith('../html/index.html')) {
    checkAuthenticationOnIndex();
}

function logout() {
    localStorage.removeItem('authenticatedUser');
    window.location.href = '../html/login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('nav a[href="../html/index.html"]');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    }
});
