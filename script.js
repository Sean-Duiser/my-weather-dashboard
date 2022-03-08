var searchBtn = document.querySelector("#searchBtn");

function getWeather () {
    var latVar = localStorage.getItem('cityLat');
    var lonVar = localStorage.getItem('cityLon');
    console.log(latVar);
    console.log(lonVar);
    var requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latVar + '&lon=' + lonVar + '&appid=8a4f71946c01452c9735df61812f9851&units=imperial';
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
};

function searchMyCity () {
    var myCity = document.getElementById("cityLookup").value;
    localStorage.setItem('city', JSON.stringify(myCity));
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + myCity + '&limit=5&appid=85935cb03b82ef5a71b61e85e479e53c&fo=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem('cityLat', JSON.stringify(data[0].lat));
            localStorage.setItem('cityLon', JSON.stringify(data[0].lon));

        })
     
    getWeather();
};

function handleSubmission (event) {
    event.preventDefault();
    console.log('HERE');
    searchMyCity();
};

searchBtn.addEventListener('click', handleSubmission);

// need to give lat/long localStorage keys unique names each time they're saved
// localStorage.key could be used to ensure "past search" buttons persist on page
// a loop that runs on page load that iterates through all of they keys, and runs getWeather for each of them