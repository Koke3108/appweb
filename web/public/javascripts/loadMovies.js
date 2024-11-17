const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
if (!authenticatedUser) {
    window.location.href = 'login.html';
}

async function loadMovies() {
    try {
        const response = await fetch('../json/movies.json');
        const movies = await response.json();
        const movieList = document.getElementById('movie-list');
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="${movie.imagen}" alt="${movie.titulo}">
                <p>${movie.titulo}</p>
                <a href="info.html?id=${movie.id}">Ver detalles</a>
            `;
            movieList.appendChild(movieItem);
        });
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadMovies);
