var searchBtn = document.querySelector("#searchBtn");

var searchMyCity = function () {
    var myCity = document.getElementById("cityLookup").value;
    localStorage.setItem('city', JSON.stringify(myCity))
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + myCity + '&limit=5&appid=85935cb03b82ef5a71b61e85e479e53c&fo=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem('cityLat', JSON.stringify(data[0].lat));
            localStorage.setItem('cityLon', JSON.stringify(data[0].lon));

            console.log(localStorage.getItem('cityLat'));
            console.log(localStorage.getItem('cityLon'));
        })
        getWeather();
};

var latVar = localStorage.getItem('cityLat');
var lonVar = localStorage.getItem('cityLon');
var requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latVar + '&lon=' + lonVar + '&appid=8a4f71946c01452c9735df61812f9851&units=imperial';

// currently the app will not fetch an updated requestURL when a 2nd set of lat/lon is acquired

var getWeather = function () {
fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var weatherEl = document.querySelector('#main-display');

        var cardEl = document.createElement('div');
        var h3El = document.createElement('h3');
        var descEl = document.createElement('p');

        h3El.textContent = localStorage.getItem('city');
        descEl.textContent = data.current.temp;

        cardEl.appendChild(h3El);
        cardEl.appendChild(descEl);
        weatherEl.appendChild(cardEl);

    })
    .catch(function (err) {
        console.log(err);
    });
};

searchBtn.addEventListener('click', searchMyCity);