let tasks = []; // Array to store tasks

// Get input field and task list
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Add task function
function addTask() {
  const task = taskInput.value;
  
  if (task !== '') {
    tasks.push(task);
    
    // Clear input field
    taskInput.value = '';
    
    updateTaskList();
    saveTasksToLocalStorage();
  }
}

// Delete task function
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
  saveTasksToLocalStorage();
}

// Mark task as complete function
function completeTask(index) {
  tasks[index] = `<s>${tasks[index]}</s>`;
  
  updateTaskList();
  saveTasksToLocalStorage();
}

// Update task list function
function updateTaskList() {
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML =`
      <span style='background-color: #78bfd9;'>${task}</span>
      <button onclick="completeTask(${index})" style='background-color:green;'> Complete</button>
      <button onclick="deleteTask(${index})" style='background-color:red;'>Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Save tasks to local storage function
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage function
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    updateTaskList();
  }
}

// Load tasks from local storage when the page is loaded
window.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);













