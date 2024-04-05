// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const randomString = Math.random().toString(36).substr(2, 10); // Generate random string
    return randomString; // Return random string as task ID
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
  
    // Create task name element
    const nameElement = document.createElement('h3');
    nameElement.textContent = taskName;
    taskCard.appendChild(nameElement);
  
    // Create description element
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    taskCard.appendChild(descriptionElement);
  
    // Create due date element
    const dueDateElement = document.createElement('p');
    dueDateElement.textContent = 'Due Date: ' + dueDate;
    taskCard.appendChild(dueDateElement);
  
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const taskListContainer = document.createElement('div');
    taskListContainer.classList.add('task-list');
  
    taskList.forEach(task => {
      const taskCardElement = createTaskCard(task.name, task.description, task.dueDate);
      taskCardElement.setAttribute('draggable', true); // Make task card draggable
      taskListContainer.appendChild(taskCardElement);
    });
  
    // Add event listeners for drag and drop functionality
    taskListContainer.addEventListener('dragstart', handleDragStart);
    taskListContainer.addEventListener('dragover', handleDragOver);
    taskListContainer.addEventListener('drop', handleDrop);
  
    // Append the task list container to the document body
    document.body.appendChild(taskListContainer);
  }
  
  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }
  
  function handleDragOver(event) {
    event.preventDefault();
  }
  
  function handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const taskCard = document.getElementById(taskId);
    event.target.appendChild(taskCard);
  }
  }

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}


        const taskName = prompt("Enter task name:");
        const description = prompt("Enter task description:");
        const dueDate = prompt("Enter due date (YYYY-MM-DD):");
      
        // Check if all fields are provided
        if (taskName && description && dueDate) {
          const newTask = { name: taskName, description: description, dueDate: dueDate };
          renderTask(newTask);
        } else {
          alert("Please provide all task details.");
        }
      }
      
      function renderTask(task) {
        const taskListContainer = document.querySelector('.task-list');
      
        if (taskListContainer) {
          const taskCardElement = createTaskCard(task.name, task.description, task.dueDate);
          taskCardElement.setAttribute('draggable', true); // Make task card draggable
          taskListContainer.appendChild(taskCardElement);
        } else {
          console.error("Task list container not found.");
        }
      }
      
// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    if (taskCard && taskCard.parentNode) {
        taskCard.parentNode.removeChild(taskCard);
      } else {
        console.error("Unable to delete task: Invalid task card or parent node.");
      }
} 
      


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const taskCard = document.getElementById(taskId);
    const dropZone = event.target.closest('.swim-lanes');
  
    if (dropZone) {
      dropZone.appendChild(taskCard);
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
