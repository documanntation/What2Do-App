let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Set up Google Maps and Places API for cafe recommendations
let map;
let service;
let infowindow;

function initMap() {
  const userLocation = { lat: -6.9175, lng: 107.6191 }; // Default location (Bandung, Indonesia)

  map = new google.maps.Map(document.getElementById("map"), {
    center: userLocation,
    zoom: 14,
  });

  infowindow = new google.maps.InfoWindow();

  const request = {
    location: userLocation,
    radius: 5000, // Search within 5km
    type: ["cafe"], // Filter for cafes
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    const cafeList = document.getElementById("cafe-list");
    cafeList.innerHTML = ""; // Clear previous results

    results.forEach((place) => {
      // Create a marker for each cafe
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
      });

      // Add an info window for each marker
      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(
          "<strong>" + place.name + "</strong><br>" + place.vicinity
        );
        infowindow.open(map, marker);
      });

      // Add cafes to the list
      const li = document.createElement("li");
      li.textContent = `${place.name} - ${place.vicinity}`;
      cafeList.appendChild(li);
    });
  }
}

// Task management logic (same as before)
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  listContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    // Add checkbox with toggle functionality
    li.innerHTML = `
      <input 
        type="checkbox" 
        class="task-checkbox" 
        ${task.completed ? "checked" : ""} 
        onchange="toggleTask(${index})"
      />
      <span class="${task.completed ? "completed-text" : ""}">
        ${task.name}
      </span>
      <div class="actions">
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    listContainer.appendChild(li);
  });
  updateCounters();
}

function addTask() {
  const taskName = inputBox.value.trim();
  if (!taskName) {
    alert("Task cannot be empty!");
    return;
  }
  tasks.push({ name: taskName, completed: false });
  saveTasks();
  renderTasks();
  inputBox.value = "";
}

function editTask(index) {
  const newName = prompt("Edit your task:", tasks[index].name);
  if (newName !== null && newName.trim() !== "") {
    tasks[index].name = newName.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function updateCounters() {
  const completed = tasks.filter((task) => task.completed).length;
  const uncompleted = tasks.length - completed;
  completedCounter.textContent = completed;
  uncompletedCounter.textContent = uncompleted;
}

document.getElementById("input-button").addEventListener("click", addTask);

// Initial render
renderTasks();

// Initialize Google Maps and cafe recommendations
window.onload = function () {
  initMap();
};
