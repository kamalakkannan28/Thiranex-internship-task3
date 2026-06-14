const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active")
            return !task.completed;

        if(currentFilter === "completed")
            return task.completed;

        return true;

    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.dataset.id = task.id;

        if(task.completed)
            li.classList.add("completed");

        li.innerHTML = `

            <span>${task.text}</span>

            <div class="actions">

                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === "")
        return;

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    saveTasks();

    renderTasks();

    taskInput.value = "";

});

taskList.addEventListener("click", (e) => {

    const li = e.target.closest("li");

    if(!li)
        return;

    const id = Number(li.dataset.id);

    const task = tasks.find(t => t.id === id);

    if(e.target.classList.contains("delete-btn")){

        tasks = tasks.filter(t => t.id !== id);

    }

    else if(e.target.classList.contains("complete-btn")){

        task.completed = !task.completed;

    }

    else if(e.target.classList.contains("edit-btn")){

        const updated = prompt("Edit Task", task.text);

        if(updated !== null && updated.trim() !== ""){

            task.text = updated.trim();

        }

    }

    saveTasks();

    renderTasks();

});

document.querySelector(".filters").addEventListener("click", (e)=>{

    if(e.target.tagName !== "BUTTON")
        return;

    currentFilter = e.target.dataset.filter;

    renderTasks();

});

renderTasks();
