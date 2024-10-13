// Step 1: Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {

    // Step 2: Select DOM Elements
    const addButton = document.getElementById("add-task-btn"); // Select the 'Add Task' button
    const taskInput = document.getElementById("task-input");   // Select the input field for task entry
    const taskList = document.getElementById("task-list");     // Select the task list where tasks will be added

    // Step 3: Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get stored tasks or an empty array
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load each task, without saving them again to Local Storage
    }

    // Step 4: Define the addTask function (with Local Storage saving)
    function addTask(taskText, save = true) {
        // If the task is not provided (only for manual input), get the input value and trim spaces
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Step 5: Prevent adding empty tasks
        if (taskText === "") {
            alert("Please enter a task!"); // Alert if the input is empty
            return;
        }

        // Step 6: Task creation and removal setup
        // Create a new 'li' element to hold the task
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create a 'Remove' button for deleting the task
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn"); // Add a class for styling

        // Add an event listener to the remove button to remove the task when clicked
        removeBtn.onclick = function() {
            taskList.removeChild(listItem); // Remove the task from the DOM
            removeTaskFromLocalStorage(taskText); // Remove the task from Local Storage
        };

        // Append the remove button to the 'li' element
        listItem.appendChild(removeBtn);

        // Append the 'li' element (the new task) to the task list
        taskList.appendChild(listItem);

        // Step 7: Clear the input field after adding the task
        taskInput.value = "";

        // Step 8: Save the task to Local Storage (only if manually added)
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Step 9: Save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get the stored tasks
        storedTasks.push(taskText); // Add the new task to the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated array back to Local Storage
    }

    // Step 10: Remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get the stored tasks
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task from the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated array back to Local Storage
    }

    // Step 11: Attach Event Listeners
    // Call addTask when the 'Add Task' button is clicked
    addButton.addEventListener("click", function() {
        addTask(); // Call addTask without passing a taskText (will be pulled from input)
    });

    // Add task by pressing the "Enter" key
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask(); // Trigger the addTask function if 'Enter' is pressed
        }
    });

    // Step 12: Load tasks when the page loads
    loadTasks();
});
