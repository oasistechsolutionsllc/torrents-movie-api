document.addEventListener('DOMContentLoaded', () => {
    getMovies();
})

const getMovies = async () => {

    try {
        loadingMovies(true);

        let currentURL = window.location.href;
        let replaceURL = currentURL.replace('=', '/');
        let splitURL = replaceURL.split('/');
        let sliceURL = splitURL.slice(-1);
        let pageNumber = sliceURL[0];

        let page = Number(pageNumber);

        document.getElementById('page-count').textContent = 'PAGE: ' + String(page);

        let prev = document.getElementById('prev');
        prev.addEventListener('click', () => {

            let pagerNum = ''
            if (page > 1) {
                pagerNum = page - 1;
                prev.setAttribute('href', `pager.html?page=${pagerNum}`)
            } else {
                prev.setAttribute('href', `index.html`)
            }


        })

        let next = document.getElementById('next');
        next.addEventListener('click', () => {

            let pagerNum = page + 1;

            next.setAttribute('href', `pager.html?page=${pagerNum}`)
            console.log(next)
        })

        let endPoint = `https://yts.mx/api/v2/list_movies.json?page=${pageNumber}&limit=18`;
        const response = await fetch(endPoint);
        const data = await response.json();
        const movies = data['data']['movies'];

//    LOOP THROUGH THE MOVIES

        let html = ''
        movies.forEach(movie => {
            html += `<div class="col">
                    <img src="${movie.medium_cover_image}" alt="${movie.title}" class="w-100">
                    <h3 class="fs-5 text-truncate">${movie.title}</h3>
                    <a href="movie.html?movie_id=${movie.id}" class="btn btn-warning mb-3 d-block">View Movie</a>
                </div>`;
        })

        document.getElementById('movies').innerHTML = html;
    } catch (error) {
        console.log(error);
    } finally {
        loadingMovies(false);
    }

}

getMovies();

function loadingMovies(estado) {
    if (estado) {
        document.getElementById('loader').classList.remove('d-none');
    } else {
        document.getElementById('loader').classList.add('d-none');

    }
}