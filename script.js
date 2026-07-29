let todoList = []
let updateIds = []
function addBtn() 
{
    let addTask = document.getElementById("add-task")
    addTask.style.display = "flex"
    addTask.showModal()
    let closeaddDialog = document.getElementById("close-add-dialog")
    closeaddDialog.addEventListener("click", () => 
    {
        addTask.style.display = "none"
        addTask.close()
    })
}
function add() 
{
    let title = document.getElementById("actual-title").value
    console.log(title)
    todoList.push({ id: todoList.length + 1, titleKey: title })
    document.getElementById("actual-title").value=""
    updateFrontend(todoList)
}
function updateFrontend(todoList) {
    let todolistelement = document.getElementById("todolistelement")
    todolistelement.innerHTML = ""
    for (index in todoList) {
        console.log(index)
        todolistelement.innerHTML += `<li onClick="todoClicked(${todoList[index].id})"> ${todoList[index].titleKey} <input type='checkbox' id= ${todoList[index].id} class="check" onClick="todoChecked(${todoList[index].id})" onClick="event.stopPropagation()"></li>`
    }
}

function todoClicked(id) 
{
    id=Number(id)
    console.log(id)
    updateIds.push(id)
    let todoView = todoList.find((todo) => 
    {
        if (todo.id === id) 
        {
            console.log(todo.titleKey)
            document.getElementById("todo-title").innerText = todo.titleKey
            document.getElementById("viewDialog").showModal()
        }
    })

    document.getElementById("editBtn").addEventListener("click",()=>{
        document.getElementById("viewDialog").close()
        document.getElementById("updatedTodoInput").setAttribute('placeholder',todoList[id-1].titleKey)
        document.getElementById("update-dialog").showModal()

        document.getElementById("update-todo").addEventListener("click",()=>{
            let todoId=updateIds.pop()
            console.log(typeof todoId)
            updateProcess(todoId)
        })

        document.getElementById("delete-todo").addEventListener("click",()=>{
            let todoId=updateIds.pop()
            console.log(todoId)
            deleteProcess(todoId)
        })

        document.getElementById("close-update").addEventListener("click",()=>{
            document.getElementById("update-dialog").close()
        }) 

    })

    document.getElementById("closeModalBtn").addEventListener("click",()=>{
        document.getElementById("viewDialog").close()
    })
}

function updateProcess(id)
{
    let updatedTitle=document.getElementById("updatedTodoInput").value
    let todoupdate=todoList.find((todo)=>
    {
        if(todo.id===id)
        {
            todo.titleKey=updatedTitle
            console.log(todo)
        }
    })
    updatetodoList(id)
}

function updatetodoList(todoId)
{
    let todoListElement=document.querySelectorAll("li")
    for(let list=0;list<todoListElement.length;list++)
    {
        if(todoList[list].id===todoId)
        {
            console.log(todoList[list].titleKey)
            todoListElement[list].innerText=todoList[list].titleKey
            let checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.className="check"
            checkbox.id = todoList[list].id

            checkbox.addEventListener('click', (event) => {
                event.stopPropagation()
                todoChecked(todoId)
            })
            checkbox.addEventListener('click', () => {
                taskDone(todoId)
            })

            todoListElement[list].appendChild(checkbox)
            document.getElementById("update-dialog").close()
            break
        }
    }
}

function todoChecked(id)
{
    console.log(id)
}

function deleteProcess(id)
{
    let todoListElement=document.querySelectorAll("li")
    for(let list=0;list<todoListElement.length;list++)
    {
        if(todoList[list].id===id)
        {
            todoList.splice(list,1)
            document.getElementById("todolistelement").removeChild(todoListElement[list])
            document.getElementById("update-dialog").close()
            break
        }
    }
    document.getElementById("close-update").addEventListener("click",()=>{
        document.getElementById("update-dialog").close()
    })
    console.log(todoList)
}