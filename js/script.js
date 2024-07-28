// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", nextId);
}
// Function to generate a unique task id
function generateTaskId() {
    let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
    localStorage.setItem("nextId", nextId + 1);
    return nextId;
}

// Function to create a task card
function createTaskCard(task) {
    console.log("Creating task card for task:", task);
    const card = $('<div>').addClass('task-card').attr('data-task-id', task.id);

    const cardBody = $('<div>').addClass('card-body');

    const title = $('<h5>').addClass('card-title').text(task.name);

    const progress = $('<p>').addClass('card-text').text("Progress: " + task.progress);

    cardBody.append(title, progress);

    // Task Card delete button
    const deleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id)
        .on('click', function(event) {
            handleDeleteTask(event);
        });

    cardBody.append(deleteBtn);

    card.append(cardBody);

    // Change card background color based on due date
    if (task.dueDate) {
        const dueDate = dayjs(task.dueDate);
        const today = dayjs();
        const daysUntilDue = dueDate.diff(today, 'day');

        if (daysUntilDue < 0) {
            card.addClass('bg-danger');
        } else if (daysUntilDue <= 3) {
            card.addClass('bg-warning');
        }
    }

    return card;
}

//  Render the task list and make cards draggable
function renderTaskList() {

    // Clear task cards from each lane
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    // Render task cards into appropriate lanes
    taskList.forEach(function(task) {
        const taskCard = createTaskCard(task);
        console.log(task);
        switch (task.progress) {
            case 'todo':
                $('#todo-cards').append(taskCard);
                break;
            case 'in-progress':
                $('#in-progress-cards').append(taskCard);
                break;
            case 'done':
                $('#done-cards').append(taskCard);
                break;
            default:
                break;
        }
    });

    // Add draggable functionality to cards
    $('.task-card').draggable({
        revert: 'invalid',
        stack: '.task-card',
        cursor: 'move',
        opacity: 0.7,
        helper: 'clone'
        }
    );
    
}

// Function to add a new task
function handleAddTask(event){
    event.preventDefault();

    console.log("Handling task addition...");

    const taskName = $("#taskName").val();
    const dueDate = $("#dueDate").val();
    const description = $("#description").val();

    const newTask = {
        id: generateTaskId(),
        name: taskName,
        dueDate: dueDate,
        description: description,
        progress: "todo"
    };

    taskList.push(newTask);

    saveTasks();

    renderTaskList();

    $("#formModal").modal("hide");

    // Clear input fields after task card created
    $("#taskName").val("");
    $("#dueDate").val("");
    $("#description").val("");

}

// Function for deleting a task
function handleDeleteTask(event) {
   event.preventDefault(); // Stop the event bubbling

    console.log("Handling task deletion...");

    const taskCard = $(event.target).closest('.task-card');
    const taskId = taskCard.data('taskId');

    // Find the index of the task with the corresponding ID in the taskList array
    const taskIndex = taskList.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        // Remove the task from the taskList array
        taskList.splice(taskIndex, 1);

        // Save the updated taskList to localStorage
        saveTasks();

        // Remove the task card element from the task board
        taskCard.remove();

        console.log("Task deletion handled successfully.");
    }
}

// Function for dropping tasks into a new status lane
function handleDrop(event, ui) {
    
    event.preventDefault();

    const taskId = ui.draggable.data('taskId');

    const dropTargetId = $(event.target).attr('id');

    let newProgress;
    switch (dropTargetId) {
        case 'to-do':
            newProgress = 'todo';
            break;
        case 'in-progress':
            newProgress = 'in-progress';
            break;
        case 'done':
            newProgress = 'done';
            break;
        default:
            console.error('Invalid drop target.');
            return;
    }

    // Find the dropped task in the taskList array
    const droppedTaskIndex = taskList.findIndex(function(task) {
        return task.id === taskId;
    });
    
    // If dropped task is found
    if (droppedTaskIndex !== -1) {
        // Update progress of dropped task
        taskList[droppedTaskIndex].progress = newProgress;
    
        // Save updated taskList to localStorage
        saveTasks();
    
        // Re-render the task list
        renderTaskList();
    } else {
        console.error('Dropped task not found.');
    }
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  renderTaskList();
  $("#addTaskForm").submit(handleAddTask);

  $(".lane").droppable({
      accept: ".task-card",
      drop: handleDrop
});
})