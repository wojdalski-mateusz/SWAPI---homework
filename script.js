window.onload = init;

const BASE_URL = "https://swapi.dev/api/";
let urls = [];
let endpoints = [];
let buttons = [];

async function init(){
    const response = await fetch(BASE_URL);
    const data = await response.json();
    endpoints = Object.keys(data);
    urls = Object.values(data);

    createButtons();
}

function createButtons() {
  endpoints.forEach((endpoint) => {
    const element = document.createElement("button");
    document.getElementById("nav-buttons").appendChild(element);
    element.innerHTML = endpoint[0].toUpperCase() + endpoint.slice(1);
    element.className = "button";
    element.id = `${endpoint}Btn-js`;
    buttons.push(element);
  });
}