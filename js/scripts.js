let elForm = document.querySelector(".form") 
let elInput = document.querySelector(".input")
let elList = document.querySelector(".list")
let all = document.querySelector(".all")
let complete = document.querySelector(".complete")
let active = document.querySelector(".active")
let activeBtn = document.querySelector(".btn-light")
let secondBtn = document.querySelector(".btn-secondary")
let allBtn = document.querySelector(".allBnt")
let dltAll = document.querySelector(".delete-all")
let secondList = document.querySelector(".seondList")

let newTitle = document.querySelector(".newTitle")

let defoltTodo = JSON.parse(window.localStorage.getItem("render"))

let arrTodo = defoltTodo || []

render(arrTodo, elList)

function render(array, list) {
   
   list.innerHTML = null
   
   all.textContent = arrTodo.length
   complete.textContent = 0;
   active.textContent = arrTodo.length;
   
   array.forEach((todo) =>{
      
      let newLi = document.createElement("li")
      let newDesc = document.createElement("p")
      let newBox = document.createElement("div")
      let newBtn = document.createElement("button")
      let newCheck = document.createElement("input")
      
      
      newDesc.textContent = todo.title
      newBtn.textContent = "Delete Note"
      
      
      newCheck.setAttribute("type", "checkbox")
      newCheck.setAttribute("class", "checkbox")
      newLi.setAttribute("class", "li")
      newBtn.setAttribute("class", "btn btn-danger delete-btn")
      newBtn.dataset.todoId = todo.id
      newCheck.dataset.todoId = todo.id
      
      newLi.prepend(newCheck)
      newBox.appendChild(newDesc)
      newLi.appendChild(newBox)
      newLi.appendChild(newBtn)
      
      if(todo.isCompleted){
         newDesc.style.textDecoration = "line-through"
         newCheck.checked = true;
         complete.textContent++;
         active.textContent--;
      }
      
      list.appendChild(newLi)
      
   })
   
}

function secondRender(array, list) {
      
   list.innerHTML = null

   array.forEach((todo) =>{
      
      let newLi = document.createElement("li")
      let newDesc = document.createElement("p")
      let newBox = document.createElement("div")
      
      
      newDesc.textContent = todo.title
      newBox.style.margin = "0 auto"
      
      newLi.setAttribute("class", "li")
      
      newBox.appendChild(newDesc)
      newLi.appendChild(newBox)

      list.appendChild(newLi)

      // window.localStorage.setItem("render", JSON.stringify(arrTodo))
      
   })
}


elForm.addEventListener("submit", evet =>{
   
   evet.preventDefault()
   
   const newTodo = {
      title: elInput.value,
      id: arrTodo.length > 0 ? arrTodo[arrTodo.length - 1].id +1 : 0,
      isCompleted: false
   }
   
   if(!isNaN(elInput.value)){
      alert("You need to enter a note! (it should consist not only of numbers)")
   }
   else if (elInput.value.trim()) {
      arrTodo.push(newTodo)
      render(arrTodo,elList)
      window.localStorage.setItem("render", JSON.stringify(arrTodo))
   }
   else{
      alert("You haven't entered anything!")
   }
   
   elInput.value = null
   
   all.textContent = arrTodo.length
   
})


elList.addEventListener("click",evt =>{
   
   if(evt.target.matches(".delete-btn")){
      
      let btnId = evt.target.dataset.todoId;
      
      let findIndex = arrTodo.findIndex(todo => todo.id == btnId);
      
      arrTodo.splice(findIndex, 1)
      
      render(arrTodo,elList)
      
      all.textContent = arrTodo.length
      
      window.localStorage.setItem("render", JSON.stringify(arrTodo))

   }
   else if(evt.target.matches(".checkbox")){
      
      let inputId = evt.target.dataset.todoId;
      
      let findElement = arrTodo.find(todo => todo.id == inputId);
      
      findElement.isCompleted = !findElement.isCompleted;
      
      render(arrTodo,elList)
      
      window.localStorage.setItem("render", JSON.stringify(arrTodo))

   }
})


activeBtn.addEventListener("click", f =>{
   
   secondList.innerHTML = null

   let filtered = arrTodo.filter(e => !e.isCompleted)
   
   if (filtered.length != 0) {
      newTitle.textContent = "Your Active Notes:"
      secondRender(filtered,secondList)
   }
   else{
      newTitle.textContent = "Your Active Notes Empty)"
   }
   
})

secondBtn.addEventListener("click", f =>{

   secondList.innerHTML = null
   
   let filtered = arrTodo.filter(e => e.isCompleted)
   
   if (filtered.length != 0) {
      newTitle.textContent = "Your Completed Notes:"
      secondRender(filtered,secondList)
   }
   else{
      newTitle.textContent = "Your Completed Notes Empty("
   }
   
})
allBtn.addEventListener("click", f =>{

   newTitle.textContent = null

   secondList.innerHTML = null
   
})
dltAll.addEventListener("click", f =>{
   window.localStorage.clear("render")
})