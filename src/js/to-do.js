
//управление модальным окном с туду листом
const closeBtn = document.querySelector('.modal__close-icon');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal')
const toDo = document.querySelector('.todo');

toDo.addEventListener('click', ()=>{
    modal.classList.add('active');
    overlay.classList.add('active')
})

closeBtn.addEventListener('click',()=>{
    modal.classList.remove('active');
    overlay.classList.remove('active')
});

overlay.addEventListener('click',()=>{
    modal.classList.remove('active');
    overlay.classList.remove('active')
});

//константа с контейнером для тасков
const tasksContainer = document.querySelector('.tasks')

//конструктор нового таска
function addTask(){
    const newToDoItem = document.createElement('div');
    newToDoItem.classList.add('task')
    newToDoItem.textContent = `${document.querySelector('.newtask_input').value}`
    const btnDone = document.createElement('div')
    const btnDelete = document.createElement('div')
    btnDone.classList.add('done')
    btnDelete.classList.add('delete')
    newToDoItem.append(btnDone)
    newToDoItem.append(btnDelete)
    tasksContainer.append(newToDoItem)
}

//функция удаления и смены статуса на "сделано" в таске
function doneDelete(){
var currentTaskDelete = document.querySelectorAll(".delete");
var currentTaskDone = document.querySelectorAll(".done");
//удаление
    for(var i=0; i<currentTaskDelete.length; i++){
        currentTaskDelete[i].onclick = function(){
            this.parentNode.remove();
        }
    }
//добавление    
    for(var i=0; i<currentTaskDone.length; i++){
    currentTaskDone[i].onclick = function(){
        let q=this.parentNode
            if(q.classList.contains('text-decoration')){
                this.parentNode.classList.remove('text-decoration');
                this.parentNode.childNodes[1].classList.remove('done_selected');
            }else{
                this.parentNode.classList.add('text-decoration');
                this.parentNode.childNodes[1].classList.add('done_selected');
            }
        }
    }
}

//добавление нового таска по клику на кнопку и манипуляции с существующими тасками
document.querySelector('.push').onclick = function(){
    if(document.querySelector('.newtask_input').value.length == 0){
        alert("Please Enter a Task")
    }else{
        addTask()
        doneDelete()
        document.querySelector('.newtask_input').value=`${''}`
    }
}

//константы для сортировки по тегам
const done = document.querySelector('done_tag')
const doneTask = document.querySelectorAll('.text-decoration')

//сортировка по тегам

//сортировка по тегу done
document.querySelector('.done_tag').addEventListener('click', () => {
    document.querySelector('.done_tag').classList.add('tag_selected')
    document.querySelector('.all_tag').classList.remove('tag_selected')
    document.querySelector('.active_tag').classList.remove('tag_selected')
    const tasks=document.querySelector('.tasks')
    for(var i=0; i<tasks.childNodes.length;i++){
        if(tasks.childNodes[i].classList.contains('text-decoration')){
            tasks.childNodes[i].classList.remove('display-none')
            var currentTaskDoneTag = document.querySelectorAll(".done");
            currentTaskDoneTag[i].onclick = function(){
                this.parentNode.classList.add('display-none');
                this.parentNode.classList.remove('text-decoration');
                this.parentNode.childNodes[1].classList.remove('done_selected');
            }
        }else{
            tasks.childNodes[i].classList.add('display-none')
        }    
    }
})


//сортировка по тегу active
document.querySelector('.active_tag').addEventListener('click', () => {
    document.querySelector('.done_tag').classList.remove('tag_selected')
    document.querySelector('.all_tag').classList.remove('tag_selected')
    document.querySelector('.active_tag').classList.add('tag_selected')
    const tasks=document.querySelector('.tasks')
    for(var i=0; i<tasks.childNodes.length;i++){
        if(tasks.childNodes[i].classList.contains('text-decoration')){
            tasks.childNodes[i].classList.add('display-none')
        }else{
            tasks.childNodes[i].classList.remove('display-none')
            var currentTaskDoneTag = document.querySelectorAll(".done");
            currentTaskDoneTag[i].onclick = function(){
                this.parentNode.classList.add('display-none');
                this.parentNode.classList.add('text-decoration');
                this.parentNode.childNodes[1].classList.add('done_selected');
            }
        }
    }
})


//сортировка по тегу all
function allTag(){
    document.querySelector('.done_tag').classList.remove('tag_selected')
    document.querySelector('.all_tag').classList.add('tag_selected')
    document.querySelector('.active_tag').classList.remove('tag_selected')
    const tasks=document.querySelector('.tasks')
    for(var i=0; i<tasks.childNodes.length;i++){
        tasks.childNodes[i].classList.remove('display-none')}
        var currentTaskDoneTag = document.querySelectorAll(".done");
    for(var i=0; i<currentTaskDoneTag.length; i++){
        currentTaskDoneTag[i].onclick = function(){
        let q=this.parentNode
            if(q.classList.contains('text-decoration')){
                this.parentNode.classList.remove('text-decoration');
                this.parentNode.childNodes[1].classList.remove('done_selected');
            }else{
                this.parentNode.classList.add('text-decoration');
                this.parentNode.childNodes[1].classList.add('done_selected');
            }
        }
    }
}
document.querySelector('.all_tag').addEventListener('click', allTag);

//запись перед перезагрузкой туду листа
function setLocalStorageTask() {
    localStorage.setItem('tasks', document.querySelector('.tasks').innerHTML);
}
window.addEventListener ('beforeunload', setLocalStorageTask)

//вывод после перезагрузки туду листа
function getLocalStorageTask() {
    if(localStorage.getItem('tasks')){
        document.querySelector('.tasks').innerHTML = localStorage.getItem('tasks');
        doneDelete();
        allTag();
    }
}
window.addEventListener('load', getLocalStorageTask)