document.addEventListener('DOMContentLoaded', () => {
    //    my code here
    getMovieDetails();
})
const demo = document.getElementById('movie');
let urlLocation = window.location.href;
const replacedUrl = urlLocation.replace('=', '/');
const splitUrl = replacedUrl.split('/');
const sliceUrlList = splitUrl.slice(-1);
const getMovieId = sliceUrlList[0];

const getMovieDetails = async () => {

    try {
        loadingSate(true);
        const endPoint = `https://yts.mx/api/v2/movie_details.json?movie_id=${getMovieId}`;
        const response = await fetch(endPoint);
        const data = await response.json();

        const movieDetails = data['data']['movie'];

        demo.innerHTML = `
           <div class="col-sm-4 col-md-3">
                <div class="portada">
                    <img src="${movieDetails['medium_cover_image']}" alt="${movieDetails['title']}" class="w-100 rounded mb-1">
                </div>
                <div id="download-buttons"></div>
           </div>
            <div class="col-sm-8 col-md-9">
                <h1 class="fs-3 text-uppercase">${movieDetails['title']}</h1>
                <p class="lead"><span class="fw-bold">Year: </span>${movieDetails['year']}</p>
                <p class="lead"><span class="fw-bold">Rating: </span>${movieDetails['rating']}</p>
                <p class="lead"><span class="fw-bold">Runtime: </span>${movieDetails['runtime']}</p>
                <p class="lead"><span class="fw-bold">Lang: </span>${movieDetails['language']}</p>
                <p class="lead"><span class="fw-bold">Rated: </span>${movieDetails['mpa_rating']}</p>
                <p class="lead">${movieDetails['description_full']}</p>
            </div>`;

        const torrentLinks = movieDetails['torrents']
        torrentLinks.forEach(torrentLink => {
            let link = `<a href="${torrentLink['url']}" class="btn btn-success d-block mb-1">Download</a>`;
            const downloadButtons = document.getElementById('download-buttons')
            downloadButtons.innerHTML += link;
        })

    } catch (error) {
        console.log(error)
    } finally {
        loadingSate(false)
    }

}

function loadingSate(state) {
    if (state) {
        document.getElementById('loader').classList.remove('d-none')
    } else {
        document.getElementById('loader').classList.add('d-none')
    }
}