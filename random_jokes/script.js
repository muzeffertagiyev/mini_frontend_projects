const jokeBtn = document.getElementById("jokeBtn")
const jokeContainer = document.getElementById("joke")

const endpoint = 'https://icanhazdadjoke.com/'
const config={
    headers : {
        'Accept':"application/json"
    }
}


getData()
jokeBtn.addEventListener("click",getData)

async function getData(){
    try{
        const res = await fetch(endpoint,config)
        if(!res.ok){
            throw new Error(res.status)
        }
        const data = await res.json()

        jokeContainer.innerHTML = data.joke

    }catch(error){
        document.querySelector("body").innerHTML = error
    }
}

