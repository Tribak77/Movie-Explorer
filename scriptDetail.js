// get the complet url and get the params that was send with it 
let urlParams = new URLSearchParams(window.location.search);
let moviesId = urlParams.get('id');

// show the detail movie from api's data 
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer 354ac65aebc36d1585a2fe5d1a303b27'
    }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=3&api_key=354ac65aebc36d1585a2fe5d1a303b27', options)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;

        for (let i = 0; i < movies.length; i++) {

            if (moviesId == movies[i].id) {

                let detailMovies = document.getElementById("backgrounMovie");
                detailMovies.style.background = `url('https://image.tmdb.org/t/p/original/${movies[i].backdrop_path}')`;
                detailMovies.style.backgroundSize ='cover';
                // detailMovies.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';

                let div = document.getElementById('detail');

                let detailTriler = document.createElement("img");
                detailTriler.id = "trilelMovie";
                detailTriler.src = "https://image.tmdb.org/t/p/original/" + movies[i].poster_path;

                let detailFav = document.createElement("i");
                let FavClicked = localStorage.getItem("myFav" + movies[i].id);

                if (FavClicked == movies[i].id) {
                    detailFav.className = "fa-solid fa-heart";
                } else {
                    detailFav.className = 'far fa-heart';
                }

                detailFav.style.color = "#ff0033";
                detailFav.addEventListener('click', function () {
                    localStorage.setItem("myFav" + movies[i].id, movies[i].id);
                    if (detailFav.className == 'far fa-heart') {
                        detailFav.className = "fa-solid fa-heart";
                        console.log('test1')
                    } else {
                        detailFav.className = 'far fa-heart';
                        localStorage.removeItem("myFav" + movies[i].id)
                        console.log('test2')
                    }

                });

                let detailName = document.getElementById("nameMovie");
                detailName.textContent = movies[i].title;

                let detailDate = document.getElementById("dateMovie");
                detailDate.textContent = `(${movies[i].release_date.slice(0, 4)})`;

                let detailNote = document.getElementById("noteMovie");
                detailNote.textContent = movies[i].vote_average.toString().slice(0, 3);

                let detailCont = document.getElementById("contNote");
                detailCont.textContent = `(${movies[i].vote_count})`;

                let detailOverview = document.getElementById("ouverViewText");
                detailOverview.textContent = movies[i].overview;

                div.appendChild(detailTriler);
                div.appendChild(detailFav);
            }
        }
    })
    .catch(err => console.error(err));

