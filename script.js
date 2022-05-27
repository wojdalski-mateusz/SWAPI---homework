window.onload = init;

const BASE_URL = "https://swapi.dev/api/";
let urls = [];
let endpoints = [];

async function init(){
    const response = await fetch(BASE_URL);
    const data = await response.json();
    endpoints = Object.keys(data);
    urls = Object.values(data);

    createButtons();
}

async function catchCorrectEndpoint(endpoint){
    const response = await fetch(`${BASE_URL}${endpoint}`);
    endpoint = await response.json();
    console.log(endpoint)
}

function onClickButton(endpoint){
    catchCorrectEndpoint(endpoint.target.innerHTML.toLowerCase());
}

function createButtons() {
  endpoints.forEach((endpoint) => {
    const button = document.createElement("button");
    document.getElementById("nav-buttons").appendChild(button);
    button.innerHTML = endpoint[0].toUpperCase() + endpoint.slice(1);
    button.className = "button";
    button.id = `${endpoint}Btn-js`;
    button.id = endpoint;
    button.onclick = onClickButton;
  });
}