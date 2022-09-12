//для перевода приветствия
const greetingTransl = {'en': ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
'ru': ['Доброе утро','Добрый день', 'Добрый вечер', 'Доброй ночи']}
const state = {language:'en'}

//время
function showTime() {
    const language = state.language
    const date = new Date().toLocaleTimeString();
    const clock = document.querySelector(".clock");
    clock.textContent = date;
    showGreeting(language);
    setTimeout(showTime, 1000);
}
showTime();

//при загрузке дата на английском
let lang  = 'en-US'
 //дата
function showDate() {
   const date = new Date();
   const options = {weekday:'long', month: 'long', day: 'numeric'};
   const dates = document.querySelector(".date");
   dates.innerHTML = date.toLocaleDateString(lang, options);
   setTimeout(showDate, 1000);
}
showDate();

//приветствие на английском при первом запуске
function showGreeting(language='en') {
    const date = new Date();
    const hours = date.getHours();
    let greeting = ''
    let timeOfDay = document.querySelector('.greeting');
    if(hours>=12 && hours<18){greeting='afternoon'}
    else if(hours>=18 && hours<24){greeting='evening'}
    else if(hours>=0 && hours<6){greeting='night'}
    else if (hours>=6 && hours<12){greeting='morning'}
    const timeDay = ['morning', 'afternoon', 'evening', 'night']
    const index = timeDay.indexOf(greeting)
    const show = `${greetingTransl[language][index]}`
    timeOfDay.textContent = show
    return greeting
}

//рандомный номер картинки
function getRandomNum(min, max) {
    min = Math.ceil(1);
    max = Math.floor(20);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
getRandomNum()
 
const slideNext=document.querySelector('.slide-next');
const slidePrev=document.querySelector('.slide-prev'); 

//генератор ссылки
function setBg(){
    let timeDay = showGreeting()
    let randomNum = getRandomNum ()
    let randomZero = randomNum.toString().padStart(2,'0')
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/VeranikaM85/momentum-backgrounds/main/${timeDay}/${randomZero}.jpg`
    let url = `url(${img.src})`
    img.onload = () => {document.getElementsByTagName('body')[0].style.backgroundImage = url;}
//вперед
    slideNext.addEventListener('click', function next(){
        if(randomZero==='20'){randomZero='01'}
        else{randomZero = (Number(randomZero) + 1).toString().padStart(2,'0')}
        img.src = `https://raw.githubusercontent.com/VeranikaM85/momentum-backgrounds/main/${timeDay}/${randomZero}.jpg`
        let url = `url(${img.src})`
        img.onload = () => {document.getElementsByTagName('body')[0].style.backgroundImage = url;}})
//назад
    slidePrev.addEventListener('click', function prev(){
        if(randomZero==='01'){randomZero='20'}
        else{randomZero = (Number(randomZero) - 1).toString().padStart(2,'0')}  
        img.src = `https://raw.githubusercontent.com/VeranikaM85/momentum-backgrounds/main/${timeDay}/${randomZero}.jpg`
        let url = `url(${img.src})`
        img.onload = () => {document.getElementsByTagName('body')[0].style.backgroundImage = url;}})
}
setBg()