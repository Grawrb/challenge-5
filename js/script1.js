// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

function generateTaskId() {
    const randomString = Math.random().toString(36).substr(2, 10); // Generate random string
    return randomString; // Return random string as task ID
  }

// Function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    // taskCard.setAttribute('id', 'task-' + Math.floor(Math.random() * 1000)); // Unique ID for each task
  
    const nameElement = document.createElement('h3');
    nameElement.textContent = 'task';
    taskCard.appendChild(nameElement);
  
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = 'description';
    taskCard.appendChild(descriptionElement);
  
    const dueDateElement = document.createElement('p');
    dueDateElement.textContent = 'Due Date: ' + dueDate;
    taskCard.appendChild(dueDateElement);
  
    return taskCard;
  }
  
  // Function to render the task list
  function renderTaskList(taskList) {
    const taskListContainer = document.createElement('div');
    taskListContainer.classList.add('task-list');
  
    taskList.forEach(task => {
      const taskCardElement = createTaskCard(task.name, task.description, task.dueDate);
      taskCardElement.setAttribute('draggable', true);
      taskListContainer.appendChild(taskCardElement);
    });
  
    document.body.appendChild(taskListContainer);
  }
  
  // Function to handle adding a new task
  function addNewTask() {
    const taskName = prompt("Enter task name:");
    const description = prompt("Enter task description:");
    const dueDate = prompt("Enter due date (YYYY-MM-DD):");
  
    if (taskName && description && dueDate) {
      const newTask = { name: taskName, description: description, dueDate: dueDate };
      renderTask(newTask);
    } else {
      alert("Please provide all task details.");
    }
  }
  
  // Function to handle deleting a task
  function deleteTask(taskCard) {
    if (taskCard && taskCard.parentNode) {
      taskCard.parentNode.removeChild(taskCard);
    } 
  }
  
  // Function to handle dropping a task into a new status row
  function handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const taskCard = document.getElementById(taskId);
    const dropZone = event.target.closest('.status-row');
  
    if (dropZone) {
      dropZone.appendChild(taskCard);
    }
  }
  
  // Render task list on page load
  $(document).ready(function () {
    const tasks = [
      { name: 'Task 1', description: 'Complete the report', dueDate: '2024-04-10' },
      { name: 'Task 2', description: 'Review the presentation', dueDate: '2024-04-15' },
      { name: 'Task 3', description: 'Prepare for the meeting', dueDate: '2024-04-20' }
    ];
    renderTaskList(tasks);
  
    const todoRow = document.querySelector('.todo-row');
    const inProgressRow = document.querySelector('.in-progress-row');
    const doneRow = document.querySelector('.done-row');
  
    todoRow.addEventListener('drop', handleDrop);
    inProgressRow.addEventListener('drop', handleDrop);
    doneRow.addEventListener('drop', handleDrop);
  
    const dueDateInputs = document.querySelectorAll('input[type="date"]');
    dueDateInputs.forEach(input => {
      input.addEventListener('click', function() {
        // Show date picker on input click
        this.setAttribute('type', 'text');
        this.focus();
        this.setAttribute('type', 'date');
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('.btn btn-success');
    const addTaskModal = document.getElementById('addTaskModal');
  
    openModalBtn.addEventListener('click', function() {
      addTaskModal.style.display = 'block';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target == addTaskModal) {
        addTaskModal.style.display = 'none';
      }
    });
  
    const taskForm = document.getElementById('taskForm');
  
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskName = document.getElementById('taskName').value;
      const description = document.getElementById('description').value;
      const dueDate = document.getElementById('dueDate').value;
  
      if (taskName && description && dueDate) {
        const newTask = { name: taskName, description: description, dueDate: dueDate };
        renderTask(newTask);
        addTaskModal.style.display = 'none';
        taskForm.reset();
      } else {
        alert("Please provide all task details.");
      }
    });
  
  });
  