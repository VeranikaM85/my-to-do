//переменные для перевода имени
document.querySelector('.name').placeholder = '[Your name]';

//сохранение введенного имени
function setLocalStorage() {
    localStorage.setItem('name', document.querySelector('.name').value);
}
window.addEventListener ('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
    document.querySelector('.name').value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)