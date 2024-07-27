// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// const timeDisplayEl = $('#time-display');
// const projectDisplayEl = $('#project-display');
// const projectFormEl = $('#project-form');
// const projectNameInputEl = $('#project-name-input');
// const projectTypeInputEl = $('#project-type-input');
// const projectDateInputEl = $('#taskDueDate');

let taskName = document.getElementById('taskName');
let dueDate = document.getElementById('dueDate');
let taskDescription = document.getElementById('taskDescription')

// Todo: create a function to generate a unique task id
function generateTaskId() {
  let taskId = Math.random().toString(36).substring(2,9);
  localStorage.setItem('nextID', taskId);
  console.log(taskId); 
};
generateTaskId();


// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('div')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.type);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask); 

  // Set background color based on due date for each card
  
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    //pull task cards from local storage
    // 
// Make the taskCard element draggable:
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // Function to clone card that is dragged
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
      ? $(e.target)
      : $(e.target).closest('ui-draggable');
      return original.clone().css({
        width: original.outerWidth(),
      });
    }
  })
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