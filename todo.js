const form = document.querySelector("form");
let taskArr = [], id = 0;
let taskArray;

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
})

function todo() {
    let entry = `
        <button id="delete-btn">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
        <label id="title">Title</label>
        <input type="text" id="txtBox">
        <label>Date</label>
        <input type="date" id="dateBox">
        <label>Discription</label>
        <textarea name="textArea" id="text-area" rows="5"></textarea>
        <button id="addTask" type="button" onclick="displayBtn()">Add task</button>`
    form.innerHTML += entry;
    const newdelete = document.getElementById("newDelete")
    newdelete.remove();
}

addValue = () => {
    const txtBox = document.getElementById("txtBox");
    const dateBox = document.getElementById("dateBox");
    const textdis = document.getElementById("text-area");
    const displayTask = document.getElementById("displayTask");

    let task = {
        id: `${id}`,
        title: `${txtBox.value}`,
        date: `${dateBox.value}`,
        discription: `${textdis.value}`
    };
    taskArr.push(task);
    localStorage.setItem(`task_array`, JSON.stringify(taskArr));
    id = id + 1;
}

function displayBtn() {
    addValue();
    renderTasks();
    document.getElementById("txtBox").value = "";
    document.getElementById("dateBox").value = "";
    document.getElementById("text-area").value = "";
    form.innerHTML = "";
}

function renderTasks() {
    displayTask.innerHTML = `<button id="newDelete" onclick="todo()">Add new task</button>`;
    taskArray = JSON.parse(localStorage.getItem(`task_array`));
    console.log(taskArray)
    taskArray.forEach(element => {
        let display = `<div>
            <p>Title: ${element.title}</p>
            <p>Date: ${element.date}</p>
            <p>Description: ${element.discription}</p>
            <button class="editBtn" onclick="editBtn('${element.id}')">Edit</button>
            <button onclick="deleteBtn('${element.id}')">Delete</button>
        </div>`;
        displayTask.innerHTML += display;
    });
}

function deleteBtn(elmid) {
    taskArray = JSON.parse(localStorage.getItem(`task_array`)) || [];
    taskArray = taskArray.filter((taskA) => Number(taskA.id) !== Number(elmid));
    console.log(taskArray);
    localStorage.setItem("task_array", JSON.stringify(taskArray));
    displayTask.innerHTML = "";
    renderTasks();
}

//when we edit the data the data should get updated in the local storage 
function editBtn(elmid) {
    //const taskToEdit = taskArr.find(taskA => Number(taskA.id) === Number(elmid));
    taskArray = JSON.parse(localStorage.getItem('task_array'));
    taskToEdit = taskArray.find(taskA => Number(taskA.id) === Number(elmid));

    if (taskToEdit) {
        editingTaskId = elmid;
        form.innerHTML = `
            <label for="txtBox">Title</label>
            <input type="text" id="txtBox" value="${taskToEdit.title}">
            <label for="dateBox">Date</label>
            <input type="date" id="dateBox" value="${taskToEdit.date}">
            <label for="text-area">Description</label>
            <textarea id="text-area" rows="5">${taskToEdit.discription}</textarea>
            <button id="addTask" type="button" onclick="updateTask()">Update task</button>`;
    }
}

function updateTask() {
    const txtBox = document.getElementById("txtBox");
    const dateBox = document.getElementById("dateBox");
    const textdis = document.getElementById("text-area");
    const taskIndex = taskArr.findIndex(task => task.id === editingTaskId);
    if (taskIndex !== -1) {
        taskArr[taskIndex].title = txtBox.value;
        taskArr[taskIndex].date = dateBox.value;
        taskArr[taskIndex].discription = textdis.value;
        localStorage.setItem('task_array', JSON.stringify(taskArr));
        editingTaskId = null;
        form.innerHTML = "";
    }
    renderTasks();
}

//cross buttton