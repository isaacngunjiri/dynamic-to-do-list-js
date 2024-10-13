// Step 1: Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {

    // Step 2: Select DOM Elements
    const addButton = document.getElementById("add-task-btn"); // Select the 'Add Task' button
    const taskInput = document.getElementById("task-input");   // Select the input field for task entry
    const taskList = document.getElementById("task-list");     // Select the task list where tasks will be added

    // Step 3: Define the addTask function
    function addTask() {
        // Get the value of the input field and trim any extra spaces
        const taskText = taskInput.value.trim();

        // Step 4: Check if the taskText is empty
        if (taskText === "") {
            alert("Please enter a task!"); // Alert if the input is empty
            return; // Exit the function to prevent adding an empty task
        }

        // Step 5: Task creation and removal setup
        // Create a new 'li' element to hold the task
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create a 'Remove' button for deleting the task
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn"); // Add a class for styling

        // Add an event listener to the remove button to remove the task when clicked
        removeBtn.onclick = function() {
            taskList.removeChild(listItem); // Remove the task from the list
        };

        // Append the remove button to the 'li' element
        listItem.appendChild(removeBtn);

        // Append the 'li' element (the new task) to the task list
        taskList.appendChild(listItem);

        // Step 6: Clear the input field after adding the task
        taskInput.value = "";
    }

    // Step 7: Attach Event Listeners
    // Call addTask when the 'Add Task' button is clicked
    addButton.addEventListener("click", addTask);

    // Add task by pressing the "Enter" key
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask(); // Trigger the addTask function if 'Enter' is pressed
        }
    });

    // Step 8: Invoke addTask function on DOMContentLoaded (optional, not typical for task adding logic)
    // This is not required here as the DOMContentLoaded event is already set up
});
