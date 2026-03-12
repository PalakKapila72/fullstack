let tasks = [];
let addBtn = document.getElementById("addBtn");
let allBtn = document.getElementById("allBtn");
let completedBtn = document.getElementById("completedBtn");
let pendingBtn = document.getElementById("pendingBtn");

addBtn.addEventListener("click", addTask);
allBtn.addEventListener("click", () => showTasks(tasks));
completedBtn.addEventListener("click", showCompleted);
pendingBtn.addEventListener("click", showPending);


function addTask(){

    let name = document.getElementById("taskName").value;
    let priority = document.getElementById("priority").value;

    if(name=="") return;

    let task = {
        name:name,
        priority:priority,
        completed:false
    };

    tasks.push(task);

    document.getElementById("taskName").value="";

    showTasks(tasks);
}


function showTasks(list){

    let ul = document.getElementById("taskList");

    ul.innerHTML="";

    list.forEach((t,index)=>{

        let li = document.createElement("li");

        if(t.completed){
            li.classList.add("completed");
        }

        li.innerHTML =
        t.name + " ("+t.priority+") " +

        `<div>
            <button onclick="toggle(${index})">✓</button>
            <button onclick="deleteTask(${index})">X</button>
        </div>`;

        ul.appendChild(li);
    });

}


function toggle(i){

    tasks[i].completed = !tasks[i].completed;

    showTasks(tasks);
}


function deleteTask(i){

    tasks.splice(i,1);

    showTasks(tasks);
}


function showCompleted(){

    let c = tasks.filter(t => t.completed);

    showTasks(c);
}


function showPending(){

    let p = tasks.filter(t => !t.completed);

    showTasks(p);
}
