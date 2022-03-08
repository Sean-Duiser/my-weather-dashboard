var searchBtn = document.querySelector("#searchBtn");

function searchMyCity() {
    var myCity = document.getElementById("cityLookup").value;
    localStorage.setItem(JSON.stringify(myCity), JSON.stringify(myCity));

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + myCity + '&limit=5&appid=85935cb03b82ef5a71b61e85e479e53c&fo=json')

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            var latData = JSON.stringify(data[0].lat);
            var lonData = JSON.stringify(data[0].lon);

            localStorage.setItem(JSON.stringify(myCity) + '-cityLat', latData);
            localStorage.setItem(JSON.stringify(myCity) + '-cityLon', lonData);

            var requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latData + '&lon=' + lonData + '&appid=8a4f71946c01452c9735df61812f9851&units=imperial';

            fetch(requestURL)

                .then(function (response) {
                    return response.json();
                })

                .then(function (data) {

                    var weatherEl = document.querySelector('#main-display');

                    var cardEl = document.createElement('div');
                    var h3El = document.createElement('h3');
                    var descEl = document.createElement('p');

                    h3El.textContent = 'The current temperature in ' + myCity + ' is ';
                    descEl.textContent = data.current.temp + ' F\u00B0';

                    cardEl.appendChild(h3El);
                    cardEl.appendChild(descEl);
                    weatherEl.appendChild(cardEl);

                })

        })

};

searchBtn.addEventListener('click', searchMyCity);

// localStorage.key could be used to ensure "past search" buttons persist on page
// a loop that runs on page load that iterates through all of they keys, and runs getWeather for each of them