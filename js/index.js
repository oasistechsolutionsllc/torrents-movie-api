let page = 1;
let html = '';
let lastMovie;

document.addEventListener("DOMContentLoaded", () => {
    getMovies();
})


document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
})

const getMovies = async () => {
    try {
        loadingMovies(true)
        const url = `https://yts.mx/api/v2/list_movies.json?page=${page}&limit=18`;

        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json()
            const results = data['data'];
            const movies = results['movies'];

            movies.forEach(movie => {
                html += `<div class="col">
                    <img src="${movie['medium_cover_image']}" alt="${movie['title']}" class="movie-poster w-100">
                    <h3 class="fs-5 text-truncate">${movie['title']}</h3>
                    <a href="movie.html?movie_id=${movie['id']}" class="btn btn-primary mb-3 d-block rounded-0">View Movie</a>
                </div>`;
            })

            document.getElementById('movies').innerHTML = html;

            if(lastMovie){
                observer.unobserve(lastMovie)
            }

            const movieEntries = document.querySelectorAll('.row .col')
            lastMovie = movieEntries[movieEntries.length - 1]
            observer.observe(lastMovie)

        } else if (response.status === 401) {
            console.log("Something was wrong fetching the API")
        } else if (response.status === 404) {
            console.log("Movie was not found")
        } else {
            console.log("some error happened")
        }

    } catch (error) {
        console.log(error)
    } finally {
        loadingMovies(false)
    }

}

function loadingMovies(estado) {
    if (estado) {
        document.getElementById('loader').classList.remove('d-none');
    } else {
        document.getElementById('loader').classList.add('d-none');

    }
}

let observer = new IntersectionObserver((listMovies) => {
    listMovies.forEach(listMovie => {
        if (listMovie.isIntersecting) {
            page++
            getMovies();
        }
    })
}, {
    'rootMargin': '0px 0px 200px 0px',
    'threshold': 1.0
});
