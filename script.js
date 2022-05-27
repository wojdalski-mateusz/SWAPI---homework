window.onload = init;

const BASE_URL = "https://swapi.dev/api/";

async function getApi(){
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data)
}

function init(){
    getApi();
}