let city = "Stamford,us";
let taskInput = '';


const getCity = () => {
    console.log($('#city').val())
}

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

const requestForecast = () => {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=0d4a536dd84f2c41a282e010c8caaf60",
        type: "GET",
        data: {

        }
    }).then(function (data) {
        for (let i = 0; i < 5; i++) {
            console.log(data.list[i])
            // console.log(data.weather[i].id)

            $('<div>').text(data.list[i].main.temp).appendTo('.forecast')
        }
    })
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

    $('city').on('submit', (e) => {
        e.preventDefault();
        $('city').empty()
        getCity();
    })
})


