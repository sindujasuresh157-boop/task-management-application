// ============================================
// TASK MANAGEMENT APPLICATION
// ============================================

// Store tasks in localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ============================================
// SAVE TASKS
// ============================================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ============================================
// ADD TASK
// ============================================

function addTask() {

    const titleElement = document.getElementById("taskTitle");
    const descriptionElement = document.getElementById("description");
    const dueDateElement = document.getElementById("dueDate");
    const priorityElement = document.getElementById("priority");
    const statusElement = document.getElementById("status");

    if (!titleElement) {
        alert("Task title field not found.");
        return;
    }

    const title = titleElement.value.trim();
    const description = descriptionElement
        ? descriptionElement.value.trim()
        : "";

    const dueDate = dueDateElement
        ? dueDateElement.value
        : "";

    const priority = priorityElement
        ? priorityElement.value
        : "Medium";

    const status = statusElement
        ? statusElement.value
        : "Pending";


    // Check title
    if (title === "") {
        alert("Please enter a task title.");
        return;
    }


    // Create task
    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        status: status
    };


    // Add task
    tasks.push(newTask);

    // Save
    saveTasks();

    // Update screen
    displayTasks();
    updateDashboard();

    // Clear form
    titleElement.value = "";

    if (descriptionElement) {
        descriptionElement.value = "";
    }

    if (dueDateElement) {
        dueDateElement.value = "";
    }

    alert("Task added successfully!");
}


// ============================================
// DISPLAY TASKS
// ============================================

function displayTasks() {

    const taskList =
        document.getElementById("taskList");

    if (!taskList) {
        return;
    }


    taskList.innerHTML = "";


    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-message">
                <p>📋 No tasks added yet.</p>
                <p>Add your first task above!</p>
            </div>
        `;

        return;
    }


    tasks.forEach(function(task) {

        const taskCard =
            document.createElement("div");

        taskCard.className = "task-item";


        taskCard.innerHTML = `

            <div class="task-content">

                <h3>${escapeHTML(task.title)}</h3>

                <p>
                    ${escapeHTML(task.description || "No description")}
                </p>

                <div class="task-details">

                    <span>
                        📅 ${task.dueDate || "No due date"}
                    </span>

                    <span>
                        ⭐ ${escapeHTML(task.priority)}
                    </span>

                    <span>
                        📌 ${escapeHTML(task.status)}
                    </span>

                </div>

            </div>


            <div class="task-actions">

                <button
                    onclick="changeStatus(${task.id})">
                    🔄 Status
                </button>

                <button
                    onclick="editTask(${task.id})">
                    ✏️ Edit
                </button>

                <button
                    onclick="deleteTask(${task.id})">
                    🗑️ Delete
                </button>

            </div>

        `;


        taskList.appendChild(taskCard);

    });
}


// ============================================
// CHANGE STATUS
// ============================================

function changeStatus(id) {

    const task =
        tasks.find(function(task) {
            return task.id === id;
        });


    if (!task) {
        return;
    }


    if (task.status === "Pending") {

        task.status = "In Progress";

    }
    else if (task.status === "In Progress") {

        task.status = "Completed";

    }
    else {

        task.status = "Pending";

    }


    saveTasks();

    displayTasks();

    updateDashboard();
}


// ============================================
// EDIT TASK
// ============================================

function editTask(id) {

    const task =
        tasks.find(function(task) {
            return task.id === id;
        });


    if (!task) {
        return;
    }


    const newTitle =
        prompt(
            "Enter new task title:",
            task.title
        );


    if (newTitle === null) {
        return;
    }


    if (newTitle.trim() === "") {
        alert("Task title cannot be empty.");
        return;
    }


    task.title = newTitle.trim();


    const newDescription =
        prompt(
            "Enter new description:",
            task.description
        );


    if (newDescription !== null) {
        task.description =
            newDescription.trim();
    }


    saveTasks();

    displayTasks();

    updateDashboard();
}


// ============================================
// DELETE TASK
// ============================================

function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmDelete) {
        return;
    }


    tasks =
        tasks.filter(function(task) {
            return task.id !== id;
        });


    saveTasks();

    displayTasks();

    updateDashboard();
}


// ============================================
// SEARCH TASKS
// ============================================

function searchTasks() {

    const searchElement =
        document.getElementById("searchInput");

    if (!searchElement) {
        displayTasks();
        return;
    }


    const searchText =
        searchElement.value
            .toLowerCase()
            .trim();


    const taskList =
        document.getElementById("taskList");


    if (!taskList) {
        return;
    }


    taskList.innerHTML = "";


    const filteredTasks =
        tasks.filter(function(task) {

            return (
                task.title
                    .toLowerCase()
                    .includes(searchText)
                ||
                task.description
                    .toLowerCase()
                    .includes(searchText)
            );

        });


    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-message">
                <p>🔍 No matching tasks found.</p>
            </div>
        `;

        return;
    }


    filteredTasks.forEach(function(task) {

        const taskCard =
            document.createElement("div");

        taskCard.className = "task-item";


        taskCard.innerHTML = `

            <div class="task-content">

                <h3>${escapeHTML(task.title)}</h3>

                <p>
                    ${escapeHTML(task.description || "No description")}
                </p>

                <div class="task-details">

                    <span>
                        📅 ${task.dueDate || "No due date"}
                    </span>

                    <span>
                        ⭐ ${escapeHTML(task.priority)}
                    </span>

                    <span>
                        📌 ${escapeHTML(task.status)}
                    </span>

                </div>

            </div>

            <div class="task-actions">

                <button
                    onclick="changeStatus(${task.id})">
                    🔄 Status
                </button>

                <button
                    onclick="editTask(${task.id})">
                    ✏️ Edit
                </button>

                <button
                    onclick="deleteTask(${task.id})">
                    🗑️ Delete
                </button>

            </div>

        `;


        taskList.appendChild(taskCard);

    });
}


// ============================================
// FILTER BY PRIORITY
// ============================================

function filterTasks() {

    const filterElement =
        document.getElementById("filterPriority");

    if (!filterElement) {
        displayTasks();
        return;
    }


    const selectedPriority =
        filterElement.value;


    const taskList =
        document.getElementById("taskList");


    if (!taskList) {
        return;
    }


    taskList.innerHTML = "";


    let filteredTasks = tasks;


    if (selectedPriority !== "All") {

        filteredTasks =
            tasks.filter(function(task) {

                return task.priority === selectedPriority;

            });

    }


    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-message">
                <p>📋 No tasks found.</p>
            </div>
        `;

        return;
    }


    filteredTasks.forEach(function(task) {

        const taskCard =
            document.createElement("div");

        taskCard.className = "task-item";


        taskCard.innerHTML = `

            <div class="task-content">

                <h3>${escapeHTML(task.title)}</h3>

                <p>
                    ${escapeHTML(task.description || "No description")}
                </p>

                <div class="task-details">

                    <span>
                        📅 ${task.dueDate || "No due date"}
                    </span>

                    <span>
                        ⭐ ${escapeHTML(task.priority)}
                    </span>

                    <span>
                        📌 ${escapeHTML(task.status)}
                    </span>

                </div>

            </div>

            <div class="task-actions">

                <button
                    onclick="changeStatus(${task.id})">
                    🔄 Status
                </button>

                <button
                    onclick="editTask(${task.id})">
                    ✏️ Edit
                </button>

                <button
                    onclick="deleteTask(${task.id})">
                    🗑️ Delete
                </button>

            </div>

        `;


        taskList.appendChild(taskCard);

    });
}


// ============================================
// DASHBOARD
// ============================================

function updateDashboard() {

    const total =
        tasks.length;


    const pending =
        tasks.filter(function(task) {

            return task.status === "Pending";

        }).length;


    const inProgress =
        tasks.filter(function(task) {

            return task.status === "In Progress";

        }).length;


    const completed =
        tasks.filter(function(task) {

            return task.status === "Completed";

        }).length;


    updateNumber("totalTasks", total);

    updateNumber("pendingTasks", pending);

    updateNumber("inProgressTasks", inProgress);

    updateNumber("completedTasks", completed);
}


// ============================================
// UPDATE NUMBER
// ============================================

function updateNumber(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


// ============================================
// SECURITY
// ============================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ============================================
// INITIAL LOAD
// ============================================

displayTasks();

updateDashboard();