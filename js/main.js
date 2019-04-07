let city = "Stamford,us";

const weatherIconsObj = {
    'clouds': 'weather_icons/clouds.png',
    'clear sky': 'weather_icons/clear.png',
    'rain': 'weather_icons/rain.png'
}

const requestData = () => {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=0d4a536dd84f2c41a282e010c8caaf60",
        type: "GET",
        data: {

        }
    }).then(function (data) {
        $('<div>').text(Math.floor(data.main.temp) + '°f').appendTo('.currentDisplay')

        $('<div>').text('Humidity: ' + data.main.humidity + '%').appendTo('.currentDisplay')
        
        for (let i = 0; i < (data.weather).length; i++) {
            $('<div>').text('Current weather: ' + data.weather[i].description).appendTo('.currentDisplay')
            console.log(data.weather[0].description)
            $('<img>').attr('src', (weatherIconsObj[data.weather[0].description])).appendTo('.currentDisplay')
        }

    })
}

$(() => {

    $('#getCurrent').on('click', (e) => {
        e.preventDefault();
        requestData();
    })
})