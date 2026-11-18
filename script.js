
// ======================================
// SUB-PRACTICUM 10: DOM MANIPULATION
// ======================================

// 1. Change message using querySelector()
function changeMessage() {
    document.querySelector("#dom-message").textContent =
        "Welcome to ToyNest! Learning through play is fun!";
}

// 2. Change element background color
function changeColor() {
    document.querySelector("#dom-message").style.backgroundColor =
        "#ffedcc";
}

// 3. Dynamically create and add DOM elements
function addToy() {
    let newToy = document.createElement("p");

    newToy.textContent = "New Toy Added!";
    newToy.className = "toy-item";

    document.querySelector("#toy-container").appendChild(newToy);
}

// 4. Interactive form element
function displayToy() {
    let toy = document.querySelector("#toy-name").value;

    if (toy.trim() === "") {
        document.querySelector("#toy-result").textContent =
            "Please enter a toy name!";
    } else {
        document.querySelector("#toy-result").textContent =
            "Your favourite toy is: " + toy;
    }
}

// 5. setTimeout()
let timeoutID;

function startTimeout() {
    clearTimeout(timeoutID);

    document.querySelector("#timer-message").textContent =
        "Your message will appear in 3 seconds...";

    timeoutID = setTimeout(function () {
        document.querySelector("#timer-message").textContent =
            "Time is up! Keep Playing!";
        timeoutID = null;
    }, 3000);
}

// 6. clearTimeout()
function cancelTimeout() {
    clearTimeout(timeoutID);
    timeoutID = null;

    document.querySelector("#timer-message").textContent =
        "Timeout cancelled!";
}

// 7. setInterval()
let intervalID = null;
let count = 0;

function startInterval() {
    if (intervalID !== null) {
        return;
    }

    intervalID = setInterval(function () {
        count++;

        document.querySelector("#counter").textContent =
            "Counter: " + count;
    }, 1000);
}

// 8. clearInterval()
function stopInterval() {
    clearInterval(intervalID);
    intervalID = null;
}


// ======================================
// SUB-PRACTICUM 11: FORM VALIDATION
// ======================================

// Process and validate form details
function validateForm() {

    let name = document.querySelector("#member-name").value.trim();
    let age = document.querySelector("#member-age").value.trim();
    let phone = document.querySelector("#member-phone").value.trim();
    let email = document.querySelector("#member-email").value.trim();

    let result = document.querySelector("#validation-result");

    // Check if any box is empty
    if (name === "" || age === "" || phone === "" || email === "") {

        result.textContent = "Please fill in all the fields!";
        result.style.color = "#e7837d";

    }

    // Check if age contains only numbers
    else if (!/^[0-9]+$/.test(age)) {

        result.textContent = "Age must contain numbers only!";
        result.style.color = "#e7837d";

    }

    // Check if age is within the valid range
    else if (Number(age) < 1 || Number(age) > 100) {

        result.textContent =
            "Please enter a valid age between 1 and 100!";
        result.style.color = "#e7837d";

    }

    // Check if phone number contains only numbers
    else if (!/^[0-9]+$/.test(phone)) {

        result.textContent =
            "Phone number must contain numbers only!";
        result.style.color = "#e7837d";

    }

    // Check if phone number has exactly 10 digits
    else if (phone.length !== 10) {

        result.textContent =
            "Phone number must contain exactly 10 digits!";
        result.style.color = "#e7837d";

    }

    // Check email format
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        result.textContent = "Please enter a valid email address!";
        result.style.color = "#e7837d";

    }

    // If all validations are successful
    else {

        result.style.color = "green";

        result.textContent =
            "Registration Successful!\n" +
            "Welcome to ToyNest, " + name + "!\n" +
            "Age: " + age + "\n" +
            "Phone: " + phone + "\n" +
            "Email: " + email;
    }
}


// ======================================
// SUB-PRACTICUM 12: RESTFUL API INTEGRATION
// ======================================

// API URL used for fetching and submitting sample toy data
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// 1. GET API CALL - Fetch toy data
async function fetchToys() {

    let status = document.querySelector("#api-status");
    let display = document.querySelector("#api-data");

    status.textContent = "Loading toy data...";
    display.innerHTML = "";

    console.log("GET API request started...");

    try {

        // Fetch data from REST API
        let response = await fetch(API_URL + "?_limit=5");

        // Check API response
        if (!response.ok) {
            throw new Error("API request failed: " + response.status);
        }

        // Convert response into JSON
        let toys = await response.json();

        console.log("GET API response:", toys);

        // Display fetched toy details
        toys.forEach(function (toy) {

            let toyCard = document.createElement("div");
            toyCard.className = "api-item";

            let toyTitle = document.createElement("h4");
            toyTitle.textContent = toy.title;

            let toyDescription = document.createElement("p");
            toyDescription.textContent = toy.body;

            toyCard.appendChild(toyTitle);
            toyCard.appendChild(toyDescription);

            display.appendChild(toyCard);
        });

        status.textContent = "Toy data loaded successfully!";

        console.log("GET API completed successfully.");

    } catch (error) {

        status.textContent =
            "Error loading toy data. Please try again.";

        console.error("GET API Error:", error);

        display.textContent =
            "Unable to retrieve data from the server.";
    }
}


// 2. POST API CALL - Add a new toy
async function addToyAPI() {

    let toyName = document.querySelector("#api-toy-name").value.trim();
    let category = document.querySelector("#api-toy-category").value.trim();

    let status = document.querySelector("#post-status");

    // INPUT VALIDATION: Check empty fields
    if (toyName === "" || category === "") {

        status.textContent = "Please fill in all the fields!";
        status.style.color = "#e7837d";

        console.warn("POST API stopped: Empty input fields.");

        return;
    }

    // INPUT VALIDATION: Check minimum input length
    if (toyName.length < 2 || category.length < 2) {

        status.textContent =
            "Toy name and category must have at least 2 characters.";

        status.style.color = "#e7837d";

        return;
    }

    // Prepare data for POST request
    let newToy = {
        title: toyName,
        body: "Category: " + category,
        userId: 1
    };

    console.log("POST API request data:", newToy);

    status.textContent = "Submitting toy details...";
    status.style.color = "#26354a";

    try {

        // Send data to REST API
        let response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newToy)
        });

        // Check response status
        if (!response.ok) {
            throw new Error("POST request failed: " + response.status);
        }

        // Read server response
        let savedToy = await response.json();

        console.log("POST API response:", savedToy);

        status.textContent =
            "Toy submitted successfully! Toy ID: " + savedToy.id;

        status.style.color = "green";

        // Clear input fields
        document.querySelector("#api-toy-name").value = "";
        document.querySelector("#api-toy-category").value = "";

    } catch (error) {

        status.textContent =
            "Unable to submit toy details. Please try again.";

        status.style.color = "#e7837d";

        console.error("POST API Error:", error);
    }
}


// 3. API TESTING AND DEBUGGING
async function testAPI() {

    let debugStatus = document.querySelector("#debug-status");

    debugStatus.textContent = "Testing API connection...";

    console.log("Starting API connection test...");

    try {

        // Send a test GET request
        let response = await fetch(API_URL + "/1");

        // Check if server responds successfully
        if (!response.ok) {
            throw new Error("Server returned status: " + response.status);
        }

        let data = await response.json();

        console.log("API connection successful!");
        console.log("Test API data:", data);

        debugStatus.textContent =
            "API connection successful! Check the browser console for details.";

        debugStatus.style.color = "green";

    } catch (error) {

        console.error("API connection test failed:", error);

        debugStatus.textContent =
            "API connection failed. Check your internet connection and console.";

        debugStatus.style.color = "#e7837d";
    }
}


// 4. CLEAR API RESULTS
function clearAPIDisplay() {

    document.querySelector("#api-data").innerHTML =
        "<p>Fetched toy details will appear here.</p>";

    document.querySelector("#api-status").textContent =
        "API data has not been loaded yet.";

    document.querySelector("#post-status").textContent =
        "New toy submission status will appear here.";

    document.querySelector("#debug-status").textContent =
        "Ready to test the API.";

    console.clear();
    console.log("API display cleared.");
}


// ======================================
// SUB-PRACTICUM 13: TASK-BASED WEB APP
// ======================================

// Array to store all tasks
let tasks = [];

// Variable to generate unique task IDs
let nextTaskId = 1;


// 1. CREATE - Add a new task
function addTask() {

    let taskInput = document.querySelector("#task-input");
    let taskMessage = document.querySelector("#task-message");

    let taskName = taskInput.value.trim();

    // Validate input
    if (taskName === "") {
        taskMessage.textContent = "Please enter a task!";
        taskMessage.style.color = "#e7837d";
        return;
    }

    // Create a task object
    let newTask = {
        id: nextTaskId,
        name: taskName
    };

    // Add task object to array
    tasks.push(newTask);

    nextTaskId++;

    console.log("Task added:", newTask);

    taskInput.value = "";

    taskMessage.textContent = "Task added successfully!";
    taskMessage.style.color = "green";

    // Display updated task list
    displayTasks();
}


// 2. READ - Display all tasks
function displayTasks() {

    let taskList = document.querySelector("#task-list");
    let taskCount = document.querySelector("#task-count");

    // Clear previous task display
    taskList.innerHTML = "";

    // Check if task array is empty
    if (tasks.length === 0) {

        let emptyMessage = document.createElement("p");

        emptyMessage.className = "empty-task";
        emptyMessage.textContent =
            "No tasks added yet. Start by adding one!";

        taskList.appendChild(emptyMessage);

    } else {

        // Loop through the task array
        tasks.forEach(function (task) {

            let taskRow = document.createElement("div");
            taskRow.className = "task-row";

            let taskText = document.createElement("span");
            taskText.className = "task-text";
            taskText.textContent = task.name;

            let taskActions = document.createElement("div");
            taskActions.className = "task-actions";

            // Edit button
            let editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-task-button";
            editButton.onclick = function () {
                editTask(task.id);
            };

            // Delete button
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-task-button";
            deleteButton.onclick = function () {
                deleteTask(task.id);
            };

            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            taskRow.appendChild(taskText);
            taskRow.appendChild(taskActions);

            taskList.appendChild(taskRow);
        });
    }

    // Update total task count
    taskCount.textContent = "Total Tasks: " + tasks.length;
}


// 3. UPDATE - Edit an existing task
function editTask(taskId) {

    let task = tasks.find(function (item) {
        return item.id === taskId;
    });

    if (!task) {
        return;
    }

    let taskList = document.querySelector("#task-list");

    // Find the task row using its position in the array
    let taskIndex = tasks.findIndex(function (item) {
        return item.id === taskId;
    });

    let taskRow = taskList.children[taskIndex];

    // Clear the existing task row
    taskRow.innerHTML = "";

    // Create input for editing
    let editInput = document.createElement("input");

    editInput.type = "text";
    editInput.className = "task-edit-input";
    editInput.value = task.name;
    editInput.maxLength = 100;

    // Save button
    let saveButton = document.createElement("button");

    saveButton.textContent = "Save";
    saveButton.className = "save-task-button";

    saveButton.onclick = function () {

        let updatedName = editInput.value.trim();

        if (updatedName === "") {
            document.querySelector("#task-message").textContent =
                "Task name cannot be empty!";
            document.querySelector("#task-message").style.color =
                "#e7837d";
            return;
        }

        // Update the task in the array
        task.name = updatedName;

        console.log("Task updated:", task);

        document.querySelector("#task-message").textContent =
            "Task updated successfully!";
        document.querySelector("#task-message").style.color = "green";

        displayTasks();
    };

    // Cancel button
    let cancelButton = document.createElement("button");

    cancelButton.textContent = "Cancel";
    cancelButton.className = "cancel-task-button";

    cancelButton.onclick = function () {
        displayTasks();
    };

    taskRow.appendChild(editInput);
    taskRow.appendChild(saveButton);
    taskRow.appendChild(cancelButton);

    editInput.focus();
}


// 4. DELETE - Remove a task
function deleteTask(taskId) {

    // Find task position in the array
    let taskIndex = tasks.findIndex(function (task) {
        return task.id === taskId;
    });

    if (taskIndex === -1) {
        return;
    }

    // Remove task from array
    let deletedTask = tasks.splice(taskIndex, 1);

    console.log("Task deleted:", deletedTask[0]);

    document.querySelector("#task-message").textContent =
        "Task deleted successfully!";

    document.querySelector("#task-message").style.color = "green";

    // Display updated task list
    displayTasks();
}


// 5. Add task when Enter key is pressed
document.addEventListener("DOMContentLoaded", function () {

    let taskInput = document.querySelector("#task-input");

    taskInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            addTask();
        }

    });

});
