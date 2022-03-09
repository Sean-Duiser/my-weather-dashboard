var historyEL = document.querySelector("#history");
var weatherEl = document.querySelector('#main-display');
var searchBtnEl = document.querySelector('#searchBtn');
var myCity = document.querySelector("#cityLookup").value;

var searchMyCity = function (myCity) {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + myCity + '&limit=5&appid=85935cb03b82ef5a71b61e85e479e53c&fo=json')

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            var latData = JSON.stringify(data[0].lat);
            var lonData = JSON.stringify(data[0].lon);

            var requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latData + '&lon=' + lonData + '&appid=8a4f71946c01452c9735df61812f9851&units=imperial';

            getWeather(requestURL);
        });
};

var getWeather = function (requestURL) {

    fetch(requestURL)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            var myCity = document.getElementById("cityLookup").value;
            var weatherEl = document.querySelector('#main-display');

            var cardEl = document.createElement('div');
            var h3El = document.createElement('h3');
            var descEl = document.createElement('p');
            var recentCityBtn = document.createElement('button');

            h3El.textContent = myCity;
            descEl.textContent = data.current.temp + ' F\u00B0';
            recentCityBtn.textContent = myCity;
            recentCityBtn.setAttribute('id', myCity);
            recentCityBtn.setAttribute('class', 'recentCity');
            recentCityBtn.setAttribute('name', 'recentCity')

            historyEL.appendChild(recentCityBtn);
            cardEl.appendChild(h3El);
            cardEl.appendChild(descEl);
            weatherEl.appendChild(cardEl);

        })
};

console.log(localStorage.getItem([0]));
searchBtnEl.addEventListener('click', searchMyCity);

historyEL.addEventListener('click', function (event) {
    event.preventDefault();
    var target = event.target;
    if (target.matches('button')) {
        myCity = this.button.textContent;
        searchMyCity();
    }
})

// I want to create a button after every search w/ city's name as the text.
    // On click, that button should set #cityLookup.value to the button's text, and run searchMyCity()
    // if a button that already exists would be created, don't create that button.

// localStorage.key could be used to ensure "past search" buttons persist on page
// a loop that runs on page load that iterates through all of they keys, and runs getWeather for each of them