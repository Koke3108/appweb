const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
if (!authenticatedUser) {
    window.location.href = 'login.html';
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadMovieDetails() {
    const movieId = getQueryParam('id');
    try {
        const response = await fetch('../json/movies.json');
        const movies = await response.json();
        const movie = movies.find(m => m.id === parseInt(movieId));

        if (movie) {
            const movieDetails = document.getElementById('movie-details');
            movieDetails.innerHTML = `
                <img src="${movie.imagen}" alt="${movie.titulo}">
                <div class="movie-info">
                    <h2>${movie.titulo}</h2>
                    <p>Género: ${movie.genero}</p>
                    <p>Director: ${movie.director}</p>
                    <p>Año: ${movie.año}</p>
                    <p>Descripción: ${movie.descripcion}</p>
                    <h3>Copias disponibles:</h3>
                    <ul>
                        ${movie.copias.map(copia => `<li>ID: ${copia.id}, Estado: ${copia.estado}, Formato: ${copia.formato}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else {
            document.getElementById('movie-details').innerText = 'Película no encontrada.';
        }
    } catch (error) {
        console.error('Error al cargar los detalles de la película:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadMovieDetails);
