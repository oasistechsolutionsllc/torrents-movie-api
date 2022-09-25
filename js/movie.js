document.addEventListener('DOMContentLoaded', () => {
    getMovieDetails();
})

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
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
                    <img src="${movieDetails['medium_cover_image']}" alt="${movieDetails['title']}" class="w-100 rounded-0 mb-1">
                </div>
                <div id="download-buttons"></div>
           </div>
            <div class="col-sm-8 col-md-9 text-center text-sm-start">
                <h1 class="fs-3 text-uppercase">${movieDetails['title']}</h1>
                <p class="lead"><span class="fw-bold">Year: </span>${movieDetails['year']}</p>
                <p class="lead"><span class="fw-bold">Rating: </span>${movieDetails['rating']}</p>
                <p class="lead"><span class="fw-bold">Runtime: </span>${movieDetails['runtime']}</p>
                <p class="lead"><span class="fw-bold">Lang: </span>${movieDetails['language']}</p>
                <p class="lead"><span class="fw-bold">Rated: </span>${movieDetails['mpa_rating']}</p>
                <p class="lead">${movieDetails['description_full']}</p>
            </div>`;

        const movieDetailsURL = movieDetails['url']
        const splitMovieDetailsURL = movieDetailsURL.split('/')
        const sliceMovieDetailsURL = splitMovieDetailsURL.slice(-1)
        const getMovieDetailsURL = sliceMovieDetailsURL[0]

        const torrentLinks = movieDetails['torrents']
        torrentLinks.forEach(torrentLink => {
            let link = `<a href="magnet:?xt=urn:btih:${torrentLink['hash']}&dn=${getMovieDetailsURL.replace('-', '+').replace(' ', '+')}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr= udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337" class="btn btn-primary d-block mb-1 rounded-0 torrent-link fs-6 text-uppercase">Magnet Link <img src="img/magnet.png" alt="magnet link"></a>`;
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