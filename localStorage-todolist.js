let $ = document
let inputElem = $.getElementById('input-Elem')
let addTodoList =$.querySelector('.Add-todoList')
let deleteBtn =$.querySelector('.clear-todoList')
let listMenu = $.querySelector('.list-menu')

let todosArray = []

function addTodoListHandler(){
    
    let titlesValue = inputElem.value
    todosAbg ={
        id:todosArray.length + 1,
        title: titlesValue,
        complate :false,
    }

    inputElem.value = ''
    todosArray.push(todosAbg)
    todosGanarete(todosArray)
    setLocalStorage(todosArray)
    
}


function setLocalStorage(setLocal){
    localStorage.setItem('localItem',JSON.stringify(setLocal))
}

function getLocalStoragehandler(){
    let getvaluelocalStorage = JSON.parse(localStorage.getItem('localItem'))
    if(getvaluelocalStorage){
        todosArray = getvaluelocalStorage
    
    }
    else{
        todosArray = []
        
    }

    todosGanarete(todosArray)
    
}


function todosGanarete(todoList){
    let listItemsElem ,lableList , listItemsBoxElem , btncomplate ,btnDelete
    listMenu.innerHTML = ''
    todoList.forEach(function(todos){
        console.log(todos)
        listItemsElem = $.createElement('li')
        listItemsElem.className = 'list-items'
        
        lableList = $.createElement('label')
        lableList.innerHTML = todos.title
        if(todos.complate){
            lableList.className = 'complateText'
            lableList.innerHTML = 'uncomplate'
        }

        listItemsBoxElem = $.createElement('div')
        listItemsBoxElem.className = 'box-btn'

        btncomplate = $.createElement('button')
        btncomplate.className = 'complate'
        btncomplate.innerHTML = 'complate'
        btncomplate.setAttribute('onclick', 'complateElemHandler('+todos.id+')')
        
        btnDelete = $.createElement('button')
        btnDelete.className = 'delete'
        btnDelete.innerHTML = 'delete'
        btnDelete.setAttribute('onclick', 'deleteElemHandler('+ todos.id +')')
       
        
        
        listItemsElem.append(lableList , listItemsBoxElem)
        listItemsBoxElem.append(btncomplate ,btnDelete)
        
        listMenu.append(listItemsElem)
    })
}
function complateElemHandler(complate){
    let setlocalStorageDelete = JSON.parse(localStorage.getItem('localItem'))
    todosArray = setlocalStorageDelete
    todosArray.forEach(function(todo){
        if(todo.id === complate){
            todo.complate = !todo.complate
        }
    })
    
    setLocalStorage(todosArray)
    todosGanarete(todosArray)
}

function deleteElemHandler(event){
    let setlocalStorageDelete = JSON.parse(localStorage.getItem('localItem'))
    todosArray = setlocalStorageDelete
    let valueTodosArray = todosArray.findIndex(function(todo){
        return todo.id === event
    })

    todosArray.splice(valueTodosArray ,1)
    setLocalStorage(todosArray)

    todosGanarete(todosArray  )

    console.log(todosArray)
}


function clearHandler(){
    todosArray = []
    todosGanarete(todosArray)

    localStorage.removeItem('localItem')
    console.log(todosArray)
}



window.addEventListener('keydown',function(event){
    if(event.code === 'Enter'){
        addTodoListHandler()
    }
    console.log(event)
})
deleteBtn.addEventListener('click',clearHandler)

window.addEventListener('load',getLocalStoragehandler)

addTodoList.addEventListener('click',addTodoListHandler)