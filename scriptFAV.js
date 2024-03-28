// show the movies in the page (My Favorit) from api's data 
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
        let PageFav = document.getElementById("PageFav");
        PageFav.style.color = "#DB4132"
        for (let i = 0; i < movies.length; i++) {
            let FavMovie = localStorage.getItem("myFav" + movies[i].id);
            if (FavMovie == movies[i].id) {
                let allCarts = document.getElementById("allCarts");

                let CartFilm = document.createElement('div');
                CartFilm.className = 'CartFilm';
                CartFilm.id = "cart" + i

                let trilerImg = document.createElement('img');
                trilerImg.className = 'triler';
                if (trilerImg) {
                    trilerImg.src = "https://image.tmdb.org/t/p/original/" + movies[i].poster_path;
                }

                let starIcon = document.createElement('i');
                starIcon.className = 'fa-solid fa-star';
                starIcon.style.color = '#eeff00';

                let note = document.createElement('span');
                note.className = 'note';
                if (note) {
                    note.textContent = movies[i].vote_average.toString().slice(0, 3);
                }

                let noteCount = document.createElement('span');
                noteCount.className = 'noteCount';
                if (noteCount) {
                    noteCount.textContent = `(${movies[i].vote_count})`;
                }

                let heartIcon = document.createElement('i');
                heartIcon.className = 'fa-solid fa-heart';
                heartIcon.style.color = '#ff0a16';
                heartIcon.addEventListener('click', function () {
                    heartIcon.className = "far fa-heart";
                    localStorage.removeItem("myFav" + movies[i].id);
                    CartFilm.remove();
                });

                let name = document.createElement('h3');
                name.className = 'name';
                if (name) {
                    name.textContent = movies[i].title;
                }

                let showDate = document.createElement('span');
                showDate.className = 'date';
                if (showDate) {
                    showDate.textContent = movies[i].release_date
                }

                let ellipsisIcon = document.createElement('i');
                ellipsisIcon.className = 'fa-solid fa-ellipsis-vertical';
                ellipsisIcon.style.color = '#000000';
                ellipsisIcon.onclick = function () {
                    window.location.href = "detailMovies.html?id=" + movies[i].id;
                }

                CartFilm.appendChild(trilerImg);
                CartFilm.appendChild(starIcon)
                CartFilm.appendChild(note)
                CartFilm.appendChild(noteCount)
                CartFilm.appendChild(heartIcon)
                CartFilm.appendChild(name)
                CartFilm.appendChild(showDate)
                CartFilm.appendChild(ellipsisIcon)
                allCarts.appendChild(CartFilm)
            }
        }

    })
    .catch(err => console.error(err));

// use the input of search to find movies in the page by thier titel  
function MySearch() {
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
            let UserSearch = document.getElementById("search").value.toUpperCase();

            for (let i = 0; i < movies.length; i++) {
                let AllMovies = movies[i].title.toUpperCase();
                let cartMovie = document.getElementById("cart" + i);
                cartMovie.style.display = "none";

                if (AllMovies.includes(UserSearch)) {
                    cartMovie.style.display = "";
                }

            }
        })
        .catch(err => console.error(err));

}

// remove the prev list of movies and sort the data from api by the firt letter and show it again in the page (My Favorite)
let sortByAZ = document.getElementById("titleA-Z");
sortByAZ.addEventListener('click', function () {


    let all = document.getElementById("allCarts");
    all.innerHTML = "";
    
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

            movies.sort(function (a, b) {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });

            for (let i = 0; i < movies.length; i++) {

                let FavMovie = localStorage.getItem("myFav" + movies[i].id);
                if (FavMovie == movies[i].id) {


                    let allCarts = document.getElementById("allCarts");

                    let CartFilm = document.createElement('div');
                    CartFilm.className = 'CartFilm';
                    CartFilm.id = "cart" + i

                    let trilerImg = document.createElement('img');
                    trilerImg.className = 'triler';
                    if (trilerImg) {
                        trilerImg.src = "https://image.tmdb.org/t/p/original/" + movies[i].poster_path;
                    }

                    let starIcon = document.createElement('i');
                    starIcon.className = 'fa-solid fa-star';
                    starIcon.style.color = '#eeff00';

                    let note = document.createElement('span');
                    note.className = 'note';
                    if (note) {
                        note.textContent = movies[i].vote_average.toString().slice(0, 3);
                    }

                    let noteCount = document.createElement('span');
                    noteCount.className = 'noteCount';
                    if (noteCount) {
                        noteCount.textContent = `(${movies[i].vote_count})`;
                    }

                    let heartIcon = document.createElement('i');
                    let FavClicked = localStorage.getItem("myFav" + movies[i].id);

                    if (FavClicked == movies[i].id) {
                        heartIcon.className = "fa-solid fa-heart";
                    } else {
                        heartIcon.className = 'far fa-heart';
                    }

                    heartIcon.style.color = '#ff0a16';
                    heartIcon.addEventListener('click', function () {
                        localStorage.setItem("myFav" + movies[i].id, movies[i].id);
                        if (heartIcon.className == 'far fa-heart') {
                            heartIcon.className = "fa-solid fa-heart";
                        } else {
                            heartIcon.className = 'far fa-heart';
                            localStorage.removeItem("myFav" + movies[i].id)
                        }

                    });

                    let name = document.createElement('h3');
                    name.className = 'name';
                    if (name) {
                        name.textContent = movies[i].title;
                    }

                    let showDate = document.createElement('span');
                    showDate.className = 'date';
                    if (showDate) {
                        showDate.textContent = movies[i].release_date
                    }

                    let ellipsisIcon = document.createElement('i');
                    ellipsisIcon.className = 'fa-solid fa-ellipsis-vertical';
                    ellipsisIcon.style.color = '#000000';
                    ellipsisIcon.onclick = function () {
                        window.location.href = "detailMovies.html?id=" + movies[i].id;
                    }

                    CartFilm.appendChild(trilerImg);
                    CartFilm.appendChild(starIcon)
                    CartFilm.appendChild(note)
                    CartFilm.appendChild(noteCount)
                    CartFilm.appendChild(heartIcon)
                    CartFilm.appendChild(name)
                    CartFilm.appendChild(showDate)
                    CartFilm.appendChild(ellipsisIcon)
                    allCarts.appendChild(CartFilm)
                }

            }
        })


        .catch(err => console.error(err));

})


// remove the prev list of movies and sort the data from api by the evaluation and show it again in the page (My Favorite)
let sortByNote = document.getElementById("MostRated");
sortByNote.addEventListener('click', function () {


    let all = document.getElementById("allCarts");
    all.innerHTML = "";
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

            movies.sort(function (a, b) {
                if (a.vote_average > b.vote_average) {
                    return -1;
                }

            });

            for (let i = 0; i < movies.length; i++) {
                let FavMovie = localStorage.getItem("myFav" + movies[i].id);
                if (FavMovie == movies[i].id) {
                    let allCarts = document.getElementById("allCarts");

                    let CartFilm = document.createElement('div');
                    CartFilm.className = 'CartFilm';
                    CartFilm.id = "cart" + i

                    let trilerImg = document.createElement('img');
                    trilerImg.className = 'triler';
                    if (trilerImg) {
                        trilerImg.src = "https://image.tmdb.org/t/p/original/" + movies[i].poster_path;
                    }

                    let starIcon = document.createElement('i');
                    starIcon.className = 'fa-solid fa-star';
                    starIcon.style.color = '#eeff00';

                    let note = document.createElement('span');
                    note.className = 'note';
                    if (note) {
                        note.textContent = movies[i].vote_average.toString().slice(0, 3);
                    }

                    let noteCount = document.createElement('span');
                    noteCount.className = 'noteCount';
                    if (noteCount) {
                        noteCount.textContent = `(${movies[i].vote_count})`;
                    }

                    let heartIcon = document.createElement('i');
                    let FavClicked = localStorage.getItem("myFav" + movies[i].id);

                    if (FavClicked == movies[i].id) {
                        heartIcon.className = "fa-solid fa-heart";
                    } else {
                        heartIcon.className = 'far fa-heart';
                    }

                    heartIcon.style.color = '#ff0a16';
                    heartIcon.addEventListener('click', function () {
                        localStorage.setItem("myFav" + movies[i].id, movies[i].id);
                        if (heartIcon.className == 'far fa-heart') {
                            heartIcon.className = "fa-solid fa-heart";
                        } else {
                            heartIcon.className = 'far fa-heart';
                            localStorage.removeItem("myFav" + movies[i].id)
                        }

                    });

                    let name = document.createElement('h3');
                    name.className = 'name';
                    if (name) {
                        name.textContent = movies[i].title;
                    }

                    let showDate = document.createElement('span');
                    showDate.className = 'date';
                    if (showDate) {
                        showDate.textContent = movies[i].release_date
                    }

                    let ellipsisIcon = document.createElement('i');
                    ellipsisIcon.className = 'fa-solid fa-ellipsis-vertical';
                    ellipsisIcon.style.color = '#000000';
                    ellipsisIcon.onclick = function () {
                        window.location.href = "detailMovies.html?id=" + movies[i].id;
                    }

                    CartFilm.appendChild(trilerImg);
                    CartFilm.appendChild(starIcon)
                    CartFilm.appendChild(note)
                    CartFilm.appendChild(noteCount)
                    CartFilm.appendChild(heartIcon)
                    CartFilm.appendChild(name)
                    CartFilm.appendChild(showDate)
                    CartFilm.appendChild(ellipsisIcon)
                    allCarts.appendChild(CartFilm)
                }

            }
        })


        .catch(err => console.error(err));

})
