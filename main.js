const addBtn = document.getElementById("addtask")
const inputField = document.getElementById("descriptionOfATask")

const listOfTasks = document.getElementById("listOfTasks")


let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function Task(description){
    this.description = description;
    this.done = false;
}
function createList(task, index){
    return `
    <div class="item"${task.done ? 'checked' : ' '}>
    <div class = "description">${task.description}</div>
    <div class = "buttons">
      <input onclick="completedTask(${index})" class="completed" type="checkbox"${task.done? 'checked':' '}>
      <button class="delete">Delete</button>
    </div>
  </div>
  `
}

function fillList(){
    listOfTasks.innerHTML = "";
    if(tasks.length > 0 ){
        tasks.forEach((element,index) => {
            listOfTasks.innerHTML += createList(element, index)
            
        })
    }
}
fillList();
function addToLocal(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// function completedTask(index){
   
   
//     tasks[index].done =!tasks[index].done;
//     if( tasks[index].done)



addBtn.addEventListener("click",() =>{
    tasks.push(new Task(inputField.value))
    addToLocal();
    fillList();
    inputField.value = '';


})
