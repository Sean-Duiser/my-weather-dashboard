var searchSideEl = document.querySelector('#searchSide');
var displaySideEl = document.querySelector('#displaySide');
var lastSearch = JSON.parse(localStorage.getItem('lastSearch')) || [];
var myCity = document.querySelector('#query');
var currentDate = moment().format('MMM Do');
var bigDisplayEl = document.querySelector('#bigDisplay');

var toJSON = function (response) {
    return response.json();
};

var capitalize = function (string) {
    return string[0].toUpperCase() + string.slice(1);
}

// stores recently searched cities - instructor assisted
// var logSearch = function (myCity) {
//     var searched = {
//         myCity: myCity,
//     };
//     var lastSearch = JSON.parse(localStorage.getItem('lastSearch')) || [];
//     var searchTerms = lastSearch.map(item => item.myCity);

//     if (!searchTerms.includes(myCity)) {
//         var yourSearchList = lastSearch.concat(searched);
//         localStorage.setItem('lastSearch', JSON.stringify(yourSearchList));
//     }
// }

var searchMyCity = function (myCity) {
    displaySideEl.innerHTML = '';
    bigDisplayEl.innerHTML = '';
    var myCity = document.querySelector('#query').value;
    myCity = capitalize(myCity);
    console.log(myCity);
    localStorage.setItem('myCity', myCity);
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + myCity + '&limit=1&appid=85935cb03b82ef5a71b61e85e479e53c&fo=json')

        .then(toJSON)
        .then(function (data) {
            console.log(data);
            var latData = JSON.stringify(data[0].lat);
            var lonData = JSON.stringify(data[0].lon);

            var requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latData + '&lon=' + lonData + '&appid=8a4f71946c01452c9735df61812f9851&units=imperial';

            fetch(requestURL)

                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var cardEl = document.createElement('div');
                    var nameEL = document.createElement('h2');
                    var timeEl = document.createElement('p');
                    var tempEl = document.createElement('p');
                    var humidEl = document.createElement('p');
                    var windEl = document.createElement('p');
                    var uvEL = document.createElement('p');

                    cardEl.setAttribute('id', 'bigDate');
                    nameEL.setAttribute('class', 'card-header');
                    uvEL.textContent = 'UV Index: ' + data.current.uvi;
                    if (data.current.uvi <= 2) {
                        uvEL.setAttribute('style', 'background-color: green');
                    }
                    nameEL.textContent = myCity;
                    timeEl.textContent = currentDate;
                    windEl.textContent = 'Wind: ' + data.current.wind_speed + ' mph';
                    tempEl.textContent = 'Temp: ' + data.current.temp + ' F\u00B0';
                    humidEl.textContent = 'Humidity: ' + data.current.humidity + '%';

                    cardEl.appendChild(nameEL);
                    cardEl.appendChild(timeEl);
                    cardEl.appendChild(tempEl);
                    cardEl.appendChild(humidEl);
                    cardEl.appendChild(windEl);
                    cardEl.appendChild(uvEL);
                    bigDisplayEl.appendChild(cardEl);

                    for (i = 0; i < 5; i++) {
                        var cardElFive = document.createElement('div');
                        var tempElFive = document.createElement('p');
                        var humidElFive = document.createElement('p');
                        var windElFive = document.createElement('p');
                        var timeElFive = document.createElement('p');
                        
                        displaySideEl.setAttribute('class', 'container my-5 bg-dark text-light')
                        displaySideEl.setAttribute('style', 'display: flex');
                        timeElFive.textContent = moment().add([i + 1], 'days').format('MMM Do');
                        timeElFive.setAttribute('class', 'card-header');
                        cardElFive.setAttribute('id', 'fiveDay');
                        cardElFive.setAttribute('class', 'card-body')
                        tempElFive.textContent = 'Temp: ' + data.daily[i].temp.max + ' F\u00B0';
                        tempElFive.setAttribute('class', 'card-text')
                        windElFive.textContent = 'Wind: ' + data.daily[i].wind_speed + ' mph';
                        humidElFive.setAttribute('class', 'card-text')
                        humidElFive.textContent = 'Humidity: ' + data.daily[i].humidity + '%';

                        cardElFive.appendChild(timeElFive);
                        cardElFive.appendChild(tempElFive);
                        cardElFive.appendChild(humidElFive);
                        cardElFive.appendChild(windElFive);
                        displaySideEl.appendChild(cardElFive);

                    }

                })
        })
}


var handleSubmission = function () {
    searchMyCity(myCity);
}

searchSideEl.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.matches('button')) {
        handleSubmission();
    }
});