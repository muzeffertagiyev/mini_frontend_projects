// 
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e426388127dc3ada71fcd97938f7c904&page=1"
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API= 'https://api.themoviedb.org/3/search/movie?api_key=e426388127dc3ada71fcd97938f7c904&query="'

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")
// GET INITIAL MOVIES
getMovies(API_URL)

async function getMovies(url){
    try{
        const res = await fetch(url)

        if(!res.ok){
            throw new Error(res.status)
        }
        const data = await res.json()
        showMovies(data.results)
        
    }catch(error){
        document.querySelector("body").innerText = error
    }
}


form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !==''){
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    }else{
        window.location.reload()
    }
})



function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie)=>{
        const {title,poster_path,vote_average, overview} = movie
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        movieEl.innerHTML =`
                <img src="${IMAGE_PATH+poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3 class="title">
                        ${title}
                    </h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
        `
        main.appendChild(movieEl)

    })
}


function getClassByRate(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}