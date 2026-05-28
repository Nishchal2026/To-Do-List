const Form = document.querySelector("form")
const Input = document.querySelector("input")
const searchBtn = document.querySelector(".search-btn")
const todoDiv = document.querySelector(".todo-div")
const taskCount = document.getElementById("task-count")
const maximumTask = document.querySelector(".maximum-task")
const progressRange = document.querySelector(".progress-range")


let taskAdded = 0
    Input.focus()

const addTodo = (inputValue) => {
    let List = document.createElement("div")
    List.classList.add("list")
     List.innerHTML = `
    <input type="checkbox" class="checkbox">
    <input type="text" class="todo-input" >
    <div class="list-btn">
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    </div>
     `
    todoDiv.appendChild(List)
    Input.value = ""
    taskAdded++
    

    // Update Task Count 

    const updateTaskCount = () => {
        if(taskAdded<=8){
            taskCount.innerText = `${taskAdded}`
        }
        if(taskAdded>=8){
            maximumTask.classList.add("box-shadow")
        }else{
            maximumTask.classList.remove("box-shadow")

        }

    }

    updateTaskCount()

    // Update Progess bar 

    const updateProgress = () => {
        progressRange.style.width = `${ parseFloat(taskCount.innerText) * 12.5}%`
    }
    updateProgress()


    // Selected all elements of a list 

    const checkBox = List.querySelector(".checkbox")
    const listInput = List.querySelector(".todo-input")
    const editBtn = List.querySelector(".edit-btn")
    const deleteBtn = List.querySelector(".delete-btn")

    listInput.value = `${inputValue}`
    listInput.setAttribute("readonly" , "readonly")

    // click on checkbox then todo will be crosses 

    checkBox.addEventListener("change" , () => {
        if(checkBox.checked==true){
            listInput.classList.add("cross")
        }else{
            listInput.classList.remove("cross")
        }
    })

    // click on delete button to delete a todo 

    deleteBtn.addEventListener("click" , () => {
        List.remove()
        taskAdded--
        taskCount.innerText = taskAdded

        updateTaskCount()
        updateProgress()
        if(taskCount.innerText<8){
            Input.removeAttribute("disabled")
            Input.focus()
        }

    })

    // click on edit button to edit todo 

    editBtn.addEventListener("click" , () => {
        if(editBtn.textContent.toLowerCase()=="edit"){
            listInput.removeAttribute("readonly")
            listInput.focus()
            editBtn.innerText = "Save"
        }else{
             listInput.setAttribute("readonly" , "readonly")
             editBtn.innerText = "Edit"
        }
    })
     

}

Form.addEventListener("submit" , (event) => {
    event.preventDefault()
    let inputValue = Input.value.trim()
    if(inputValue.length==0){
        return
    }else{
        addTodo(inputValue)
        
    if(taskCount.innerText==8){
        Input.setAttribute("disabled" , "disabled")
    }  
        
        
    }
    

} )