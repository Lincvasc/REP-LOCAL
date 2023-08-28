
const fullList = document.querySelector('.list-tasks')
const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')

let myItemList = []

function addNewTask() {
  myItemList.push({
    task: input.value,
    completed: false,
  })

  input.value = ''

  showTasks()
}

function showTasks() {
  let newList = ''

  

  myItemList.forEach((item, position) => {
    newList =
      newList +
      `

        <li class="task ${item.completed && 'done'}">
            <img src="./img/checked.png" alt="check-icon" onclick="completeTask(${position})">
            <p>${item.task}</p>
            <img src="./img/trash.png" alt="trash-icon" onclick="deleteItem(${position})">
        </li>
        
        `
  })

  fullList.innerHTML = newList

  localStorage.setItem('list', JSON.stringify(myItemList))
}

function completeTask(position) {
  myItemList[position].completed = !myItemList[position].completed

  showTasks()
}

function deleteItem(position) {
  myItemList.splice(position, 1)

  showTasks()
}

function reloadTasks() {
  const LocalStorageTasks = localStorage.getItem('list')

  if (LocalStorageTasks) {
    myItemList = JSON.parse(LocalStorageTasks)
  }

  showTasks()
}

reloadTasks()
button.addEventListener('click', addNewTask)
