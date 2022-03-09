var userInputEl = document.getElementById('#query');
var searchSideEl = document.querySelector('#searchSide');
var displaySideEl = document.querySelector('#displaySide');
var history = JSON.parse(localStorage.getItem('history')) || [];

var toJSON = function (response) {
    return response.json();
};

// stores recently searched cities - instructor assisted
var logSearch = function (query) {
    var searched = {
        query: query,
    };
    var lastSearch = JSON.parse(localStorage.getItem('lastSearch')) || [];
    var searchTerms = lastSearch.map(item => item.query);

    if (searchTerms.includes(query)) {
        var yourSearchList = lastSearch.concat(searched);
        localStorage.setItem('lastSearch', JSON.stringify(yourSearchList));
    }
}



var searchMyCity = function (userInputEl) {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + userInputEl + '&limit=5&appid=85935cb03b82ef5a71b61e85e479e53c&fo=json')

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
                    var tempEl = document.createElement('p');
                    var humidEl = document.createElement('p');
                    var windEl = document.createElement('p');

                    //nameEL.textContent = ;
                    windEl.textContent = 'Wind: ' + data.current.wind_speed + ' mph';
                    tempEl.textContent = 'Temp: ' + data.current.temp + ' F\u00B0';
                    humidEl.textContent = 'Humidity: ' + data.current.humidity + '%';

                    cardEl.appendChild(tempEl);
                    cardEl.appendChild(humidEl);
                    cardEl.appendChild(windEl);
                    displaySideEl.appendChild(cardEl);
                })
        })
}

var handleSubmission = function () {
    searchMyCity(userInputEl);
}

searchSideEl.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.matches('button')) {
        handleSubmission();
    }
});