document.addEventListener('DOMContentLoaded', () => {
    getMovies()
})

let page = 1
const currentURL = document.location.search
const SearchUrlParams = new URLSearchParams(currentURL)
const getUrlParam = SearchUrlParams.get('cat')
let lastMovie;


const getMovies = async () => {

    try {
        pageLoader(true)
        const urlEndPoint = `https://yts.mx/api/v2/list_movies.json?genre=${getUrlParam}&page=${page}&limit=18&sort_by=rating`
        const response = await fetch(urlEndPoint)
        const data = await response.json()
        const movies = data['data']['movies']

        const movieList = document.getElementById('movies')
        movies.forEach(movie => {
            const movieDetails = `<div class="col">
                <img src="${movie['medium_cover_image']}" alt="${movie['title']}" class="movie-poster w-100">
                <h3 class="fs-5 text-truncate">${movie['title']}</h3>
                <a href="movie.html?movie_id=${movie['id']}" class="btn btn-primary mb-3 d-block rounded-0">View Movie</a>
             </div>`
            movieList.innerHTML += movieDetails
        })

        if (lastMovie) {
            observer.unobserve(lastMovie)
        }

        const movieEntries = document.querySelectorAll('.row .col')
        lastMovie = movieEntries[movieEntries.length - 1]
        observer.observe(lastMovie)

    } catch (error) {
        console.log(error)
    } finally {
        pageLoader(false)
        const categoryName = document.getElementById('category-name')
        categoryName.innerText = 'movies in: ' + getUrlParam
        const categorySection = document.getElementById('categories')
        categorySection.classList.remove('d-none')
    }
}

const pageLoader = (loadingState) => {
    if (loadingState) {
        document.getElementById('loader').classList.remove('d-none')
    } else {
        document.getElementById('loader').classList.add('d-none')

    }
}

let observer = new IntersectionObserver((listMovies) => {
    listMovies.forEach(listMovie => {
        if (listMovie.isIntersecting) {
            page++
            getMovies()
        }
    })
}, {
    'rootMargin': '0px 0px 200px 0px',
    'threshold': 1.0
})