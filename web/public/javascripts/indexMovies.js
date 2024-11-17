async function loadRecentMovies() {
    try {
        const response = await fetch('../json/movies.json');
        const movies = await response.json();
        const recentMoviesContainer = document.getElementById('recent-movies');

        movies.slice(0, 4).forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="${movie.imagen}" alt="${movie.titulo}">
                <p>${movie.titulo}</p>
            `;
            recentMoviesContainer.appendChild(movieItem);
        });
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadRecentMovies);
