
var button = document.getElementById('searchBtn');
var userInput = document.getElementById('search-input');

var locationName;

function btnGO() {

    locationName = String(userInput.value);
    console.log(locationName);

    var LONGLATurl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + locationName + '&limit=1&appid=3b3319e2a4bdc403d7f45843c07de674';
    
    const geoData = fetch(LONGLATurl)

    .then(function (response) {
        return response.json();
    })

    //We now have the LATITUDE and LOGITUDE of our city
    .then((data) => {
        console.log(data); //See the data from the Geocoding API
        return [data[0].lat, data[0].lon];
    });

    //Takes those Coords and passes them into the two APIs for display on the site
    const giveLongLats = () => {
        geoData.then((a) => {
            // Call a function to update cityBox and make a history button 
            currentAPI(a[0], a[1]);
            });
    };

    //Probably don't need this and just have the function automatically get called above...
    giveLongLats();
};

function currentAPI(Lat, Lon) {

    var currentURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+Lat+'&lon='+Lon+'&exclude=minutely,hourly,daily,alerts&appid=3b3319e2a4bdc403d7f45843c07de674';

    fetch(currentURL)

        .then(function (response) {
            return response.json();
    })

        .then(function (data) {
            console.log(data);

    });
};

button.addEventListener('click', btnGO);