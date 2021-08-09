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
    <div class="item${task.done ? 'checked' : ' '}">
       <div class ="checkboxAndDescription">
      <input onclick="completedTask(${index})" class="completed" type="checkbox"${task.done? 'checked':' '}>
      <div class = "description">${task.description}</div>
      </div>
      <button class="delete"onclick ="deleteTask(${index})">Delete</button>
    
  </div>
  `
}

function filterTask(){
    let activeTasks = tasks.length && tasks.filter(item => item.done ==false);
    let completedTask = tasks.length && tasks.filter(item => item.done ==true);
 tasks = [...activeTasks, ...completedTask]
}
let todoItemElement =[]

function fillList(){
    listOfTasks.innerHTML = "";
    if(tasks.length > 0 ){
        filterTask()
        tasks.forEach((element,index) => {
            listOfTasks.innerHTML += createList(element, index)
            
        });
    }todoItemElement =document.querySelectorAll(".item")
}
fillList();
function addToLocal(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function completedTask(index){
   
   tasks[index].done =!tasks[index].done;
    if( tasks[index].done){
        todoItemElement[index].classList.add('checked')

    }else{
        todoItemElement[index].classList.remove('checked')
    }
    addToLocal();
    fillList();
}

addBtn.addEventListener("click",() =>{
    if(inputField.value != ''){
    tasks.push(new Task(inputField.value))
    addToLocal();
    fillList();
    inputField.value = '';


}})



function deleteTask(index){
    tasks.splice(index,1)
    addToLocal()
    fillList()
}
