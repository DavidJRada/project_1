let city = "Stamford,us";

const weatherIconsObj = {
    'clouds': 'weather_icons/clouds.png',
    'Clear': 'weather_icons/clear.png',
    'rain': 'weather_icons/rain.png'
}
const newWeatherItem = () => {

    const currentWeather = new WeatherItem(12, 12, 87, 89, ('Clear Sky'), weatherIconsObj['clear sky'])
    currentWeather.appendWeather()

}




class WeatherItem {
    constructor(temp, humidity, weather, img) {
        this.temp = temp;
        this.humidity = humidity;
        this.weather = weather
        this.img = img;
    }
    appendWeather() {
        $('<div>').text("Temp: " + this.temp + '°f').appendTo('.currentDisplay')
        $('<div>').text("Humidity: " + this.humidity + '%').appendTo('.currentDisplay')
        $('<div>').text("Weather: " + this.weather).appendTo('.currentDisplay')
        $('<img>').attr('src', this.img).appendTo('.currentDisplay')
    }
}

class ForecastItem extends WeatherItem {
    constructor(date, time, ) {
        super(date, time)
        this.date = date;
        this.time = time;
    }
    appendForecastWeather() {
        $('<div>').text("Date: " + this.date).appendTo('.currentDisplay');
        $('<div>').text("Time: " + this.time).appendTo('.currentDisplay')
    }
}

const requestCurrent = () => {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=0d4a536dd84f2c41a282e010c8caaf60",
        type: "GET",
        data: {

        }
    }).then(function (data) {
        console.log(data)
        let temp = (Math.floor(data.main.temp))
        let humidity = data.main.humidity
        let weather = data.weather[0].main
        let img = weatherIconsObj[weather]

        const currentWeather = new WeatherItem(temp, humidity, weather, img);
        currentWeather.appendWeather()

        
    })
}

        // for (let i = 0; i < (data.weather).length; i++) {
        //     $('<div>').text('Current weather: ' + data.weather[i].description).appendTo('.currentDisplay')
        //     // console.log(data.weather[0].description)
        //     $('<img>').attr('src', (weatherIconsObj[data.weather[0].description])).appendTo('.currentDisplay').css('height', '100px').css('width', '100px')


const requestForecast = () => {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=0d4a536dd84f2c41a282e010c8caaf60",
        type: "GET",
        data: {

        }
    }).then(function (data) {
        // console.log(data)
        //Loop through forecast list data to pull out the main description of the weather
        // for (let i = 0; i < data.list.length; i++) {
        //     //Store the result of hourly forecast as variable
        //     let hourlyForecast = data.list[i].weather[0].main
        //     // for (let j = 0; j < weatherIconsArr.length; j++) {
        //     if (weatherIconsArr.filter(icon => {
        //         return icon === hourlyForecast
        //     }))


        //         // return(match)
        //     }
    })

}




$(() => {

    $('#getCurrent').on('click', (e) => {
        e.preventDefault();
        requestCurrent();
    })

    $('#getForecast').on('click', (e) => {
        e.preventDefault();
        requestCurrent();
    })
})