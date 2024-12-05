document.querySelector(".create-task-btn").addEventListener("click", () => {
  const taskName = prompt("Enter task name:");
  const time = prompt("Enter task time (e.g., 10:00 - 11:00):");

  if (taskName && time) {
    const taskList = document.querySelector(".task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span class="time">${time}</span>
      <span class="task-name">${taskName}</span>
    `;
    taskList.appendChild(taskItem);
  }
});
