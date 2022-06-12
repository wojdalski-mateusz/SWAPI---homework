window.onload = init;

const BASE_URL = "https://swapi.dev/api/";
let urls = [];
let endpointData = {};
let endpoints = [];
let endpoint;
let nextPageUrl = "";
let prevPageUrl = "";
let collectionName;
let fetchUrl;

const nextPageBtn = document.getElementById("nextPageBtn-js");
const prevPageBtn = document.getElementById("prevPageBtn-js");

nextPageBtn.addEventListener("click", nextPage);
prevPageBtn.addEventListener("click", prevPage);

class Person {
  constructor(url, name, birth_year, height, mass, created) {
    this.url = url.split("/").reverse().slice(1, 2).join();
    this.name = name;
    this.birth_year = birth_year;
    this.height = height;
    this.mass = mass;
    this.created = created.slice(0, 10).split("-").reverse().join("-");
  }
}

class Planet {
  constructor(url, name, terrain, population, climate, created) {
    this.url = url.split("/").reverse().slice(1, 2).join();
    this.name = name;
    this.terrain = terrain;
    this.population = population;
    this.climate = climate;
    this.created = created.slice(0, 10).split("-").reverse().join("-");
  }
}

class Film {
  constructor(url, title, director, producer, release_date, created) {
    this.url = url.split("/").reverse().slice(1, 2).join();
    this.title = title;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
    this.created = created.slice(0, 10).split("-").reverse().join("-");
  }
}

class Species {
  constructor(url, name, language, designation, classification, created) {
    this.url = url.split("/").reverse().slice(1, 2).join();
    this.name = name;
    this.language = language;
    this.designation = designation;
    this.classification = classification;
    this.created = created.slice(0, 10).split("-").reverse().join("-");
  }
}

class Vehicle {
  constructor(url, name, model, vehicle_class, crew, created) {
    this.url = url.split("/").reverse().slice(1, 2).join();
    this.name = name;
    this.model = model;
    this.vehicle_class = vehicle_class;
    this.crew = crew;
    this.created = created.slice(0, 10).split("-").reverse().join("-");
  }
}

class Starship {
  constructor(url, name, model, length, crew, created) {
    this.url = url.split("/").reverse().slice(1, 2).join();
    this.name = name;
    this.model = model;
    this.length = length;
    this.crew = crew;
    this.created = created.slice(0, 10).split("-").reverse().join("-");
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
  let rows = [];
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");

  for (key in collectionInstances[0]) {
    headers.push(key.toUpperCase());
  }

  //headers.unshift("ID");
  headers[0] = "ID";

  collectionInstances.forEach((object, index) => {
    let content = [];
    for (values in object) {
      content.push(object[values]);
    }
    //content.unshift(index + 1);
    rows.push(content);
  });

  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  for (headerText of headers) {
    const headerElement = document.createElement("th");

    headerElement.textContent = headerText;
    tableHead.querySelector("tr").appendChild(headerElement);
  }

  for (const row of rows) {
    const rowElement = document.createElement("tr");
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Delete";
    removeBtn.className = "button";
    removeBtn.id = "removeBtn-js";
    const showDetailsBtn = document.createElement("button");
    showDetailsBtn.innerText = "Details";
    showDetailsBtn.id = "showDetailsBtn-js";
    showDetailsBtn.className = "button";

    for (cellText of row) {
      const cellElement = document.createElement("td");

      cellElement.textContent = cellText;
      cellElement.id = "table-cell";
      rowElement.appendChild(cellElement);
    }
    rowElement.appendChild(removeBtn);
    rowElement.appendChild(showDetailsBtn);
    tableBody.appendChild(rowElement);

    removeBtn.addEventListener("click", deleteRow);
  }
}

async function catchCorrectEndpoint(endpoint, url) {
  fetchUrl = url ? url : `${BASE_URL}${endpoint}`;
  const response = await fetch(fetchUrl);
  endpointData = await response.json();
  nextPageUrl = endpointData.next;
  prevPageUrl = endpointData.previous;
  console.log("endpointData: ", endpointData);
  console.log("fetchUrl: ", fetchUrl);
  console.log("nextPageUrl: ", nextPageUrl);
  console.log("prevPageUrl: ", prevPageUrl);

  switch (endpoint) {
    case "people":
      const peopleInstances = endpointData.results.map(
        ({ url, name, birth_year, height, mass, created }) =>
          new Person(url, name, birth_year, height, mass, created)
      );
      console.log(peopleInstances);
      createTable(peopleInstances, document.querySelector("table"));
      break;
    case "planets":
      const planetsInstances = endpointData.results.map(
        ({ url, name, terrain, population, climate, created }) =>
          new Planet(url, name, terrain, population, climate, created)
      );
      console.log(planetsInstances);
      createTable(planetsInstances, document.querySelector("table"));

      break;
    case "films":
      const filmsInstances = endpointData.results.map(
        ({ url, title, director, producer, release_date, created }) =>
          new Film(url, title, director, producer, release_date, created)
      );
      console.log(filmsInstances);
      createTable(filmsInstances, document.querySelector("table"));

      break;
    case "species":
      const speciesInstances = endpointData.results.map(
        ({ url, name, language, designation, classification, created }) =>
          new Species(url, name, language, designation, classification, created)
      );
      console.log(speciesInstances);
      createTable(speciesInstances, document.querySelector("table"));

      break;
    case "vehicles":
      const vehiclesInstances = endpointData.results.map(
        ({ url, name, model, vehicle_class, crew, created }) =>
          new Vehicle(url, name, model, vehicle_class, crew, created)
      );
      console.log(vehiclesInstances);
      createTable(vehiclesInstances, document.querySelector("table"));

      break;
    case "starships":
      const starshipsInstances = endpointData.results.map(
        ({ url, name, model, length, crew, created }) =>
          new Starship(url, name, model, length, crew, created)
      );
      console.log(starshipsInstances);
      createTable(starshipsInstances, document.querySelector("table"));

      break;
  }
}

function onClickButton(event) {
  collectionName = event.target.innerHTML.toLowerCase();
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

// function deleteRow(e) {
//   console.log("Usunąłeś wiersz");

//   const btn = e.target;
//   btn.closest("tr").remove();
// }

function deleteRow(e) {
  swal({
    title: "Are you sure?",
    icon: "warning",
    buttons: ["NO", "YES"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const btn = e.target;
      btn.closest("tr").remove();
    } else {
      return;
    }
  });
}

async function nextPage() {
  if (nextPageUrl) {
    await catchCorrectEndpoint(collectionName, nextPageUrl);
  }
}

async function prevPage() {
  if (prevPageUrl) {
    await catchCorrectEndpoint(collectionName, prevPageUrl);
  }
}
