window.onload = init;

const BASE_URL = "https://swapi.dev/api/";
let urls = [];
let endpoints = [];
let endpoint;
let collectionsInstances = [];

class Person {
  constructor(name, birth_year, height, mass, created) {
    this.name = name;
    this.birth_year = birth_year;
    this.height = height;
    this.mass = mass;
    this.created = created;
  }
}

class Planet {
  constructor(name, terrain, population, climate, created) {
    this.name = name;
    this.terrain = terrain;
    this.population = population;
    this.climate = climate;
    this.created = created;
  }
}

class Film {
  constructor(title, director, producer, release_date, created) {
    this.title = title;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
    this.created = created;
  }
}

class Species {
  constructor(name, language, designation, classification, created) {
    this.name = name;
    this.language = language;
    this.designation = designation;
    this.classification = classification;
    this.created = created;
  }
}

class Vehicle {
  constructor(name, model, vehicle_class, crew, created) {
    this.name = name;
    this.model = model;
    this.vehicle_class = vehicle_class;
    this.crew = crew;
    this.created = created;
  }
}

class Starship {
  constructor(name, model, length, crew, created) {
    this.name = name;
    this.model = model;
    this.length = length;
    this.crew = crew;
    this.created = created;
  }
}

async function init() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  endpoints = Object.keys(data);
  urls = Object.values(data);

  createButtons();
}

function createTable(collectionInstances, table) {
  let headers = [];
  let content = [];

  for (key in collectionInstances[0]) {
    headers.push(key.toUpperCase());
  }

  content.unshift(headers);
  collectionInstances.forEach((object) => {
    let content1 = [];
    for (values in object) {
      content1.push(object[values]);
    }
    content.push(content1);
  });

  table.innerHTML = "";

  content.forEach((row) => {
    const rowElement = document.createElement("tr");
    for (cellText of row) {
      const cellElement = document.createElement("td");
      cellElement.textContent = cellText;
      cellElement.id = "table-cell";
      rowElement.appendChild(cellElement);
    }

    table.appendChild(rowElement);
  });
}

async function catchCorrectEndpoint(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  endpointData = await response.json();

  switch (endpoint) {
    case "people":
      const peopleInstances = endpointData.results.map(
        ({name, birth_year, height, mass, created }) =>
          new Person(name, birth_year, height, mass, created)
      );
      console.log(peopleInstances);
      collectionsInstances.push(peopleInstances);
      createTable(peopleInstances, document.querySelector("table"));
      break;
    case "planets":
      const planetsInstances = endpointData.results.map(
        ({ name, terrain, population, climate, created }) =>
          new Planet(name, terrain, population, climate, created)
      );
      console.log(planetsInstances);
      collectionsInstances.push(planetsInstances);
      createTable(planetsInstances, document.querySelector("table"));

      break;
    case "films":
      const filmsInstances = endpointData.results.map(
        ({ title, director, producer, release_date, created }) =>
          new Film(title, director, producer, release_date, created)
      );
      console.log(filmsInstances);
      collectionsInstances.push(filmsInstances);
      createTable(filmsInstances, document.querySelector("table"));

      break;
    case "species":
      const speciesInstances = endpointData.results.map(
        ({ name, language, designation, classification, created }) =>
          new Species(name, language, designation, classification, created)
      );
      console.log(speciesInstances);
      collectionsInstances.push(speciesInstances);
      createTable(speciesInstances, document.querySelector("table"));

      break;
    case "vehicles":
      const vehiclesInstances = endpointData.results.map(
        ({ name, model, vehicle_class, crew, created }) =>
          new Vehicle(name, model, vehicle_class, crew, created)
      );
      console.log(vehiclesInstances);
      collectionsInstances.push(vehiclesInstances);
      createTable(vehiclesInstances, document.querySelector("table"));

      break;
    case "starships":
      const starshipsInstances = endpointData.results.map(
        ({ name, model, length, crew, created }) =>
          new Starship(name, model, length, crew, created)
      );
      console.log(starshipsInstances);
      collectionsInstances.push(starshipsInstances);
      createTable(starshipsInstances, document.querySelector("table"));

      break;
  }
}

function onClickButton(event) {
  const collectionName = event.target.innerHTML.toLowerCase();
  catchCorrectEndpoint(collectionName);
}

function createButtons() {
  endpoints.forEach((endpoint) => {
    const button = document.createElement("button");
    document.getElementById("nav-buttons-js").appendChild(button);
    button.innerHTML = endpoint[0].toUpperCase() + endpoint.slice(1);
    button.className = "button";
    button.id = `${endpoint}Btn-js`;
    button.id = endpoint;
    button.addEventListener("click", onClickButton);
  });
}
