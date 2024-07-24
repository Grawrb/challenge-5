// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const timeDisplayEl = $('#time-display');
const projectDisplayEl = $('#project-display');
const projectFormEl = $('#project-form');
const projectNameInputEl = $('#project-name-input');
const projectTypeInputEl = $('#project-type-input');
const projectDateInputEl = $('#taskDueDate');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Math.random().toString(36).substring(2,9);
}

console.log(generateTaskId());

// Todo: create a function to create a task card
function createTaskCard(task) {

   
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    //pull task cards from local storage
    // 
// Make the taskCard element draggable:
dragElement(document.getElementById("taskCard"));

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the taskCard from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the taskCard from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
};
};

// Todo: create a function to handle adding a new task
function handleAddTask(event){          
// click listener in modal, add task btn
// grab value of title
// validate that input exists
// grab value of due date
// validate''
// grab value of task description
// validate''
// create task object with values
// add task to local storage(grab existing task list, parse from json, push into list, stringify list, push to local storage)
// close modal
// $('#modal').modal('hide');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker             
$(document).ready(function () {

});