const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
if (!authenticatedUser) {
    window.location.href = '../html/login.html';
}

async function loadUserMovies() {
    try {
        const response = await fetch('../json/movies.json');
        const movies = await response.json();
        const userMoviesContainer = document.getElementById('user-movies');

        const userMovieCopies = new Set(authenticatedUser.copias);

        const userMovies = movies.filter(movie =>
            movie.copias.some(copia => userMovieCopies.has(copia.id))
        );

        userMovies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="${movie.imagen}" alt="${movie.titulo}">
                <p>${movie.titulo}</p>
                <a href="info.html?id=${movie.id}">Ver detalles</a>
            `;
            userMoviesContainer.appendChild(movieItem);
        });
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadUserMovies);
