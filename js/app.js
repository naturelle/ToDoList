// CODE EXPLAINED channel
//select the 
const clear= document.querySelector(".clear")
const dateElement= document.getElementById("date")
const list=document.getElementById("list")
const input =document.getElementById("input")

//classes names
const check ="fa-check-circle"
const uncheck="fa-circle-thin"
const linethrough="lineThrough"

//variables
let LIST, id

//get item from localstorage (TODO burda key??)
let data = localStorage.getItem("TODO")

//check if data is not empty
if(data) {
    LIST = JSON.parse(data)
    id=LIST.length //set id to the last one lin array
    loadList(LIST) //load the list to the user interface
}
else 
{
    LIST=[]
    id=0
}

//load items to user interface
function loadList(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash)
    })
}

//clear the local storage
clear.addEventListener("click", ()=>{
    localStorage.clear()
    location.reload()
})

//show todays date
const options = {weekday : "long", month : "short", day : "numeric"}
const today= new Date()
dateElement.innerHTML =today.toLocaleDateString("en-US", options)

//add to do function
function addToDo(toDo, id, done, trash) {

    if (trash){return}

    const DONE = done ? check : uncheck
    const LINE = done ? linethrough : "" 

    const item = `
                    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                     </li>
    `
    const position = "beforeend"
    list.insertAdjacentHTML(position, item)
}

//add an item with enter key
document.addEventListener('keyup', (event)=> {
    const toDo=input.value
    if (toDo) {
        if (event.keyCode==13) {
            addToDo(toDo, id, false, false)

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            } )

            //add item from local storage (this code must be added where the list array updated)
            localStorage.setItem("TODO",JSON.stringify(LIST))

            id++
            input.value=""
        }
        
    }
})

//complete todo
function completeToDo(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector(".text").classList.toggle(linethrough)

    LIST[element.id].done = LIST[element.id].done ? false:true
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash=true
}

//target the items created dynamically
list.addEventListener("click", (event)=> {
    const element=event.target //return the clicked element inside list
    const elementJob = element.attributes.job.value //complete or delete

    if(elementJob == "complete") 
    {
        completeToDo(element)
    }
    else if (elementJob=="delete"){
        removeToDo(element)
    }
    //add item from local storage (this code must be added where the list array updated)
    localStorage.setItem("TODO",JSON.stringify(LIST))

})