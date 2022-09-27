document.addEventListener('DOMContentLoaded', () => {
    getMovies()
})

const page = 1
const currentURL = document.location.search;
const SearchUrlParams = new URLSearchParams(currentURL)
const getUrlParam = SearchUrlParams.get('cat')

const urlEndPoint = `https://yts.mx/api/v2/list_movies.json?genre=${getUrlParam}&page=${page}&limit=18&sort_by=rating`

const getMovies = async () => {

    try {

        pageLoader(true)

        const response = await fetch(urlEndPoint)
        const data = await response.json()
        const movies = data['data']['movies']

        const movieList = document.getElementById('movies')
        movies.forEach(movie => {
            const movieDetails = `<div class="col">
                <img src="${movie['medium_cover_image']}" alt="${movie['title']}" class="movie-poster w-100">
                <h1 class="fs-6 text-truncate">${movie['title']}</h1>
             </div>`
            movieList.innerHTML += movieDetails
        })

    } catch (error) {
        console.log(error)
    } finally {
        pageLoader(false)
        const categoryName = document.getElementById('category-name')
        categoryName.innerText = 'movies in: ' + getUrlParam
    }
}

const pageLoader = (loadingState) => {
    if (loadingState) {
        document.getElementById('loader').classList.remove('d-none');
    } else {
        document.getElementById('loader').classList.add('d-none');

    }
}