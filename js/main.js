let city = "Stamford,us";
let taskInput = '';

const requestData = () => {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=0d4a536dd84f2c41a282e010c8caaf60",
        type: "GET",
        data: {

        }
    }).then(function (data) {
        $('<div>').text(Math.floor(data.main.temp) + '°f').appendTo('.weatherDisplay')

        $('<div>').text('Humidity: ' + data.main.humidity + '%').appendTo('.weatherDisplay')

        for (let i = 0; i < (data.weather).length; i++) {
            console.log(data)
            // console.log(data.weather[i].id)

            $('<div>').text('Current weather: ' + data.weather[i].description).appendTo('.weatherDisplay')
        }

    })
}

const weatherIcons = {

}

const requestForecast = () => {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=0d4a536dd84f2c41a282e010c8caaf60",
        type: "GET",
        data: {

        }
    }).then(function (data) {
        console.log(data)
        for (let i=0; i<data.list.length; i++) {
            console.log(data.list[i].weather[0].main)
        }





            // for (let i = 0; i < ; i++) {
            // for(let j=0; i<(data.list.length); i++)
            // console.log(data.list.weather[i].main)


            // console.log(data[i].forecast.symbol.name)
            // let $forecastItem = $('<div>').addClass('forecastItem')
            // let $temp = $('<div>').text(data.list[i].main.temp)
            // let $time = $('<div>').text(((data.list[i].dt_txt).split(' '))[1])
            // console.log($time)
            

            // $forecastItem.appendTo('.forecast')
            // $temp.appendTo($forecastItem)
            // $time.appendTo($forecastItem)

        }
    )
}

const getTask = () => {
    $('.taskList').empty()

    taskInput = $('#input').val()

    let todoItem = $('<div>').addClass('items').addClass('toDoItems').text(taskInput)

    todoItem.appendTo('.tasks')

    let button = $('<button>').addClass('finishedButton').text('FINISHED').on('click', (e) => {

        $(e.currentTarget.parentNode).appendTo('.completedTasks').removeClass('toDoItems').addClass('finishedTasks')

    })
    button.appendTo(todoItem)

}

$(() => {

    $('#getWeather').on('click', (e) => {
        e.preventDefault();
        requestData();
    })
    $('#getForecast').on('click', (e) => {
        e.preventDefault();
        requestForecast();
    })

    $('form').on('submit', (e) => {
        e.preventDefault()
        $('#input').empty()
        $('.taskList').empty()
        getTask()
    })

})


