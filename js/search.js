document.addEventListener('DOMContentLoaded', () => {
    SearchMovies();
})

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
})

const SearchMovies = async () => {

    try {

        pageLoader(true);

        let urlLocation = window.location.href;
        const replacedUrl = urlLocation.replace('=', '/');
        const splitUrl = replacedUrl.split('/');
        const sliceUrlList = splitUrl.slice(-1);
        const getMovieTitle = sliceUrlList[0];

        const endPoint = `https://yts.mx/api/v2/list_movies.json?query_term=${getMovieTitle}`;
        const response = await fetch(endPoint);


        if (response.status === 200) {
            const data = await response.json();
            const movies = data['data']['movies']

            let html = '';
            movies.forEach(movie => {
                html += `<div class="col">
                            <img src="${movie.medium_cover_image}" alt="${movie.title}" class="w-100">
                            <h3 class="fs-5 text-truncate">${movie.title}</h3>
                            <a href="movie.html?movie_id=${movie.id}" class="btn btn-primary mb-3 d-block rounded-0">View Movie</a>
                       </div>`
            })

            const movieID = document.getElementById('movies');
            movieID.innerHTML = html;
        }

    } catch (error) {
        console.log('no se pudo extraer la pelicula')
        if (error instanceof TypeError) {
            const movieID = document.getElementById('not-found');
            movieID.innerHTML = `<h1 class="text-center">No Movie was found</h1>`
        }
    } finally {
        pageLoader(false)
    }

}

const pageLoader = (loadingState) => {

    if (loadingState) {
        document.getElementById('loader').classList.remove('d-none');
    } else {
        document.getElementById('loader').classList.add('d-none');
    }

}
