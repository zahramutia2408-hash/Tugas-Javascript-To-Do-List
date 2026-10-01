const inputTask = document.getElementById("inputTask");
const listContainer = document.getElementById("listContainer");
const tombol = document.getElementById("tombol");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");
const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");
const pendingTask = document.getElementById("pendingTask");

function addTask() {
  const taskText = inputTask.value.trim();
  if (taskText === "") {
    alert("Kamu belum memasukkan to do list!");
    return;
  }

  let li = document.createElement("li");
  li.textContent = taskText;
  let span = document.createElement("span");
  span.textContent = "\u00D7";
  span.title = "Hapus task";
  li.appendChild(span);
  listContainer.appendChild(li);
  inputTask.value = "";
  saveData();
  updateDisplay();
}

tombol.addEventListener("click", function () {
  addTask();
});

inputTask.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("done");
    saveData();
    updateDisplay();
  } else if (event.target.tagName === "SPAN") {
    event.target.parentElement.remove();
    saveData();
    updateDisplay();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  updateDisplay();
}

function updateDisplay() {
  const total = listContainer.querySelectorAll("li").length;
  const completed = listContainer.querySelectorAll("li.done").length;
  const pending = total - completed;
  totalTask.textContent = total;
  completedTask.textContent = completed;
  pendingTask.textContent = pending;
  if (total === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

showTask();
