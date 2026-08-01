let todoList = []
let updateIds = []
let sumforTotal=0
let sumforTask=0
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
    if(title=="")
    {
        alert("Don't Add empty ToDo")
    }
    else
    {
        let totalTask=document.getElementById("Total-tasks")
        sumforTotal=sumforTotal+1
        totalTask.innerText=sumforTotal
        console.log(title)
        todoList.push({ id: todoList.length + 1, titleKey: title })
        document.getElementById("actual-title").value=""
        updateFrontend(todoList)
    }
}
function updateFrontend(todoList) {
    let todolistelement = document.getElementById("todolistelement")
    todolistelement.innerHTML = ""
    for (index in todoList) {
        console.log(index)
        const isChecked = todoList[index].completed ? "checked" : ""
        todolistelement.innerHTML += `<li><label onClick="todoClicked(${todoList[index].id})">${todoList[index].titleKey}</label> <input type='checkbox' id= ${todoList[index].id} class="check" ${isChecked} onClick="todoChecked(${todoList[index].id}); event.stopPropagation()"></li>`
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

        document.getElementById("delete-todo").addEventListener("click",(event)=>{
            let res=confirm("Are you sure You want to Delete this ToDo Task")
            if(res)
            {
                let todoId=updateIds.pop()
                console.log(todoId)
                deleteProcess(todoId)
            }
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
    if(updatedTitle=="")
    {
        alert("Don't Add empty ToDo")
    }
    else
    {
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
}

function updatetodoList(todoId)
{
    let todoListElement=document.querySelectorAll("li")
    for(let list=0;list<todoListElement.length;list++)
    {
        if(todoList[list].id===todoId)
        {
            console.log(todoList[list].titleKey)
            todoListElement[list].innerHTML=`<label onClick="todoClicked(${todoList[list].id})"> ${todoList[list].titleKey} </label>`
            let checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.className="check"
            checkbox.id = todoList[list].id
            // checkbox.addEventListener('click', (event) => {
            //     event.stopPropagation()
            //     todoChecked(todoId)
            // })

            checkbox.addEventListener('click', () => {
                todoChecked(todoId)
            })
            todoListElement[list].appendChild(checkbox)
            if(todoList[list].completed)
            {
                todoChecked(todoId)
            }
            document.getElementById("update-dialog").close()
            break
        }
    }
}

function todoChecked(id)
{
    let checkedtoDo=document.getElementById(id)
    let taskCounter=document.getElementById("tasks-count")
    let todo = todoList.find(t => t.id === id)
    if(todo) {
        todo.completed = checkedtoDo.checked
    }
    if(!taskCounter.innerText==0)
    {
        if(checkedtoDo.checked)
        {
            sumforTask+=1
            taskCounter.innerText=sumforTask
        }
        else{
            sumforTask-=1
            taskCounter.innerText=sumforTask
        }
    }
}

function deleteProcess(id)
{
    let todoListElement=document.querySelectorAll("li")
    for(let list=0;list<todoListElement.length;list++)
    {
        if(todoList[list].id===id)
        {
            let totalTask=document.getElementById("Total-tasks")
            sumforTotal-=1
            totalTask.innerText=sumforTotal
            let checkbox=document.getElementById(id)
            if(checkbox.checked)
            {
                let taskDone=document.getElementById("tasks-count")
                sumforTask-=1
                taskDone.innerText=sumforTask
            }
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