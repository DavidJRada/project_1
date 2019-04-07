
let city = "Stamford,us";

const weatherIconsObj = {
    'Clouds': 'weather_icons/clouds.png',
    'Clear': 'weather_icons/clear.png',
    'Rain': 'weather_icons/rain.png'
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
    appendWeather(location) {
        $('<div>').text("Temp: " + this.temp + '°f').appendTo(location)
        $('<div>').text("Humidity: " + this.humidity + '%').appendTo(location)
        $('<div>').text("Weather: " + this.weather).appendTo(location)
        $('<img>').attr('src', this.img).appendTo(location)
    }
}

class ForecastItem extends WeatherItem {
    constructor(temp, humidity, weather, img, date, time) {
        super(temp, humidity, weather, img, date, time);
        this.date = date;
        this.time = time;
    }
    appendForecastWeather(location) {
        $('<div>').text("Time: " + this.time).prependTo(location)
        $('<div>').text("Date: " + this.date).prependTo(location);
        this.appendWeather(location)
    }
}

const requestCurrent = () => {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=0d4a536dd84f2c41a282e010c8caaf60",
        type: "GET",
        data: {

        }
    }).then(function (data) {
        let temp = (Math.floor(data.main.temp))
        let humidity = data.main.humidity
        let weather = data.weather[0].main
        let img = weatherIconsObj[weather]

        const currentWeather = new WeatherItem(temp, humidity, weather, img);
        currentWeather.appendWeather('.currentDisplay')


    })
}

const requestForecast = () => {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=0d4a536dd84f2c41a282e010c8caaf60",
        type: "GET",
        data: {

        }
    }).then(function (data) {
        //Loop through forecast list data to pull out the main description of the weather
        for (let i = 0; i < 5; i++) {

            let dateAndTime = (data.list[i].dt_txt).split(' ')

            let temp = data.list[i].main.temp
            let humidity = data.list[i].main.humidity
            let weather = data.list[i].weather[0].main
            let img = weatherIconsObj[weather]
            let date = dateAndTime[0]
            let time = dateAndTime[1]
            let $widgetInstance = $('<div>').addClass('forecast')
            $widgetInstance.appendTo('.forecastDisplay')

            const forecastInstance = new ForecastItem(temp, humidity, weather, img, date, time)

            forecastInstance.appendForecastWeather($widgetInstance);

        }
    })
}




$(() => {

    $('#getCurrent').on('click', (e) => {
        e.preventDefault();
        requestCurrent();
    })

    $('#getForecast').on('click', (e) => {
        e.preventDefault();
        requestForecast();
    })
})