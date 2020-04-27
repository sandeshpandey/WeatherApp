const appId = 'e045c1a5881c2cd920eb22fa9de1ae1a'
let units = 'metric'
let searchMethod

function getSearchMethod (searchTerm){
    if (searchTerm.legth ===5 && Number.parseInt(searchTerm)+ '' === searchTerm )
        searchMethod ='zip';
    else
        searchMethod='q'
}

let searchWeather = searchTerm => {
    getSearchMethod(searchTerm)
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}


function init(resultFromServer){
    
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage='url("clear.jpg")'
        break

        case 'Clouds':
                document.body.style.backgroundImage='url("cloudy.jpg")'
        break

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
                document.body.style.backgroundImage='url("rain.jpg")'
        break

        case 'Snow':
                document.body.style.backgroundImage='url("snow.jpg")'
        break

        case 'Thunderstorm':
                document.body.style.backgroundImage='url("storm.jpg")'
        break
    
        default:
        break
    } 
    
    

    let cityHeader = document.querySelector('#cityHeader')
    let temperature = document.querySelector('#temperature')
    let weatherDescriptionHeader = document.querySelector('#weatherDescriptionHeader')
    let weatherIcon = document.querySelector('#documentIconImg')
    let windSpeed = document.querySelector('#windSpeed')
    let humidity = document.querySelector('#humidity')

    weatherIcon.src = `http://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}@2x.png`
    let resultDescription = resultFromServer.weather[0].description
    weatherDescriptionHeader.innerHTML = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)
    temperature.innerHTML = Math.floor(resultFromServer.main.temp) + ' &#176' + 'C'
    windSpeed.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s'
    cityHeader.innerHTML = resultFromServer.name
    humidity.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
    let weatherContainer = document.querySelector('#weatherContainer')
    let weatherContainerHeight = weatherContainer.clientHeight
    let weatherContainerWidth = weatherContainer.clientWidth

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`
    weatherContainer.style.visibility = 'visible'
}

function getSearchTerm(){
    let searchTerm = document.querySelector('#searchInput').value
        if(searchTerm)
            searchWeather(searchTerm)
}

document.querySelector('#searchBtn').addEventListener('click', () => getSearchTerm())

document.querySelector('#searchInput').addEventListener('keyup', event => {
    if(event.keyCode === 13){
        event.preventDefault()
        getSearchTerm()
    }
})


