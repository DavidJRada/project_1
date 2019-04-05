let city = "Stamford,us";
let taskInput = '';

const requestData = () => {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=0d4a536dd84f2c41a282e010c8caaf60",
        type: "GET",
        data: {

        }
    }).then(function (data) {
        $('<div>').text(data.main.temp).appendTo('.weatherDisplay')
        for (let i = 0; i < (data.weather).length; i++) {
            console.log(data)
            // console.log(data.weather[i].id)

            $('<div>').text(data.weather[i].description).appendTo('.weatherDisplay')
        }
    })
}


const getTask = () => {
    taskInput = $('#input').val()
    console.log(taskInput)
}

$(() => {

    $('#getWeather').on('click', (e) => {
        e.preventDefault();
        requestData();
    })
    $('form').on('submit', (e) => {
        e.preventDefault()
        getTask()
    })

})


