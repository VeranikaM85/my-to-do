const weatherTransl = {'en':['Wind speed:','m/s','Humidity:' ,'Error! Weather for','city not found'],
'ru': ['Скорость ветра:', 'м/c', 'Влажность', 'Ошибка! Погода для', 'города не найдена']}

//вывод погоды
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city=document.querySelector('.city');
const weatherError=document.querySelector('.weather-error'); 
let currentCorrectCity='Minsk'

//город после перезагрузки
const getCity = () => {
    if(localStorage.getItem(city)) {
    city.value = localStorage.getItem(city);}
    else{city.value='Minsk'}
  getWeather()}
window.addEventListener('load', getCity)

//вывод погоды или ошибки
async function getWeather(language='en') {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=4abcaaf1cf21a70b8ebace9786e57d4e&units=metric`
  console.log(url)
  const res = await fetch(url);
  const data = await res.json();
    if(data.cod=="200"){
      weatherError.textContent='';
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.floor(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `${weatherTransl[language][0]} ${Math.floor(data.wind.speed)} ${weatherTransl[language][1]}`;
      humidity.textContent = `${weatherTransl[language][2]} ${Math.floor(data.main.humidity)} %`;
      currentCorrectCity = city.value
    }else{ 
      weatherError.textContent = `${weatherTransl[language][3]} "${city.value}" ${weatherTransl[language][4]}`;
      temperature.textContent=''
      weatherDescription.textContent=''
      wind.textContent=''
      humidity.textContent=''
    }
  //запись города перед перезагрузкой 
  const setCity = () => {
  localStorage.setItem(city, currentCorrectCity);
  }
  window.addEventListener('beforeunload', setCity)
}

//вывод погоды при изменении города
city.addEventListener('change', () => {
 getWeather()})