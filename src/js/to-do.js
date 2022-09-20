const closeBtn = document.querySelector('.modal__close-icon');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal')
const toDo = document.querySelector('.clock');

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

//константами с кнопками удаления, доне и возврата
const tasksContainer = document.querySelector('.tasks')
const tasksDoneContainer = document.querySelector('.tasks-done')

//add new task
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

//delete and done task
document.querySelector('.push').onclick = function(){
    let div = document.querySelector('.tasks')
    console.log(div)
    if(document.querySelector('.newtask_input').value.length == 0){
        alert("Please Enter a Task")
    }else{
        addTask()
    var currentTaskDelete = document.querySelectorAll(".delete");
    var currentTaskDone = document.querySelectorAll(".done");
    //delete
        for(var i=0; i<currentTaskDelete.length; i++){
            currentTaskDelete[i].onclick = function(){
                this.parentNode.remove();
            }
        }
        for(var i=0; i<currentTaskDone.length; i++){
        currentTaskDone[i].onclick = function(){
            let q=this.parentNode
            if(q.classList.contains('text-decoration')){
                this.parentNode.classList.remove('text-decoration');
                this.parentNode.childNodes[1].classList.remove('done_selected');
                }
            else{
                this.parentNode.classList.add('text-decoration');
                this.parentNode.childNodes[1].classList.add('done_selected');
            }
        }
        }
    }
}

const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.tag');
    tags.forEach(tag=>{
        tag.classList.remove('tag_selected');
        tag.classList.add('tag_bordered')
    })
}

const selectClickedTags = (clickedTag) => {
        clickedTag.classList.add('tag_selected');
        clickedTag.classList.remove('tag_bordered');
}

const done = document.querySelector('done_tag')
const doneTask = document.querySelectorAll('.text-decoration')

//сортировка
document.querySelector('.done_tag').onclick = function(){
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
}

document.querySelector('.active_tag').onclick = function(){
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
}

document.querySelector('.all_tag').onclick = function(){
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
                    
                    }
                else{
                    this.parentNode.classList.add('text-decoration');
                    this.parentNode.childNodes[1].classList.add('done_selected');
                }
            }
        }
    }


    function setLocalStorageTask() {
        localStorage.setItem('tasks', document.querySelector('.tasks').innerHTML);
    }
    window.addEventListener ('beforeunload', setLocalStorageTask)
    
function getLocalStorageTask() {
    if(localStorage.getItem('tasks')) {
        document.querySelector('.tasks').innerHTML = localStorage.getItem('tasks');
        }
    }
window.addEventListener('load', getLocalStorageTask)