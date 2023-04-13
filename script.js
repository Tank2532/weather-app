var currentCity = document.querySelector('#city');
var currentDate = document.querySelector('#date');
var currentTemp = document.querySelector('#temp');
var currentPic = document.querySelector('#picture');
var currentWind = document.querySelector('#wind');
var currentHumid = document.querySelector('#humid');
var dateOne = document.querySelector('#date-1');
var picOne = document.querySelector('#picture-1');
var tempOne = document.querySelector('#temp-1');
var windOne = document.querySelector('#wind-1');
var humidOne = document.querySelector('#humid-1');
var dateTwo = document.querySelector('#date-2');
var picTwo = document.querySelector('#picture-2');
var tempTwo = document.querySelector('#temp-2');
var windTwo = document.querySelector('#wind-2');
var humidTwo = document.querySelector('#humid-2');
var dateThree = document.querySelector('#date-3');
var picThree = document.querySelector('#picture-3');
var tempThree = document.querySelector('#temp-3');
var windThree = document.querySelector('#wind-3');
var humidThree = document.querySelector('#humid-3');
var dateFour = document.querySelector('#date-4');
var picFour = document.querySelector('#picture-4');
var tempFour = document.querySelector('#temp-4');
var windFour = document.querySelector('#wind-4');
var humidFour = document.querySelector('#humid-4');
var dateFive = document.querySelector('#date-5');
var picFive = document.querySelector('#picture-5');
var tempFive = document.querySelector('#temp-5');
var windFive = document.querySelector('#wind-5');
var humidFive = document.querySelector('#humid-5');
var searchButton = document.querySelector('.search-btn');
var searchCity = document.querySelector('.search-bar');
var cardsEl = document.querySelector('.cards');
var recent = document.querySelector('#recent-searches');
var searchEl = document.querySelector('.history');


var today = dayjs().format('MM/DD/YYYY');
$(currentDate).text(today);


var day1 = dayjs().add(1, 'day').format('MM/DD/YYYY');

var day2 = dayjs().add(2, 'day').format('MM/DD/YYYY');

var day3 = dayjs().add(3, 'day').format('MM/DD/YYYY');

var day4 = dayjs().add(4, 'day').format('MM/DD/YYYY');

var day5 = dayjs().add(5, 'day').format('MM/DD/YYYY');

var fiveDayDates = [day1, day2, day3, day4, day5]

// Function to grab the Lat and Lon for the forecast API
async function getLatLon(cityName) {
    var requestLonLat = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=e555e88ca3b04d74c7f45d18751b7ab0"; 
    const response = await fetch(requestLonLat);
    const data = await response.json();
    var lat = data[0].lat;
    var lon = data[0].lon;
    getForecast(lat, lon);
};


// Function to grab the forecast for the selected city
async function getForecast(lat, lon) {
    var requestForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=265ae15a1f0d3a3b015bd08a0b58dba7";
    const response2 = await fetch(requestForecast);
    const data2 = await response2.json();
    var temp = data2.list[0].main.temp;
    var wind = data2.list[0].wind.speed;
    var humid = data2.list[0].main.humidity;
    currentPic.setAttribute('src', `https://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}.png`)
    currentTemp.textContent = `Temp: ${temp}°`;
    currentWind.textContent = `Wind: ${wind}mph`;
    currentHumid.textContent = `Humid: ${humid}%`;
    fiveDay(data2);
};

function fiveDay (data2) {
    cardsEl.innerHTML = "";

    for (let i = 1; i < 6; i++) {
        var sectionEl = document.createElement('section');
        var h4El = document.createElement('h4');
        var imgEl = document.createElement('img');
        var pTemp = document.createElement('p');
        var pHumid = document.createElement('p');
        var pWind = document.createElement('p');

        imgEl.setAttribute('src', `https://openweathermap.org/img/wn/${data2.list[i].weather[0].icon}.png`)
        h4El.textContent = fiveDayDates[i-1];
        pTemp.textContent = `Temp: ${data2.list[i].main.temp}°`;
        pHumid.textContent = `Humid: ${data2.list[i].main.humidity}%`;
        pWind.textContent = `Wind: ${data2.list[i].wind.speed}mph`;

        sectionEl.append(h4El, imgEl, pTemp, pHumid, pWind);
        cardsEl.append(sectionEl);
        
    }
};

function store(newCity) {
    var historyArray = JSON.parse(window.localStorage.getItem('history')) || [];
    if (historyArray.indexOf(newCity) === -1) {
      historyArray.push(newCity);
      window.localStorage.setItem('history', JSON.stringify(historyArray));
    }
  };

function removeLocalStorage (valueToRemove) {
    var history =JSON.parse(window.localStorage.getItem('history'));
    const filteredValue = history.filter(function(item) {
      return item !== valueToRemove;
    });
    window.localStorage.setItem('history', JSON.stringify(filteredValue));
  };

function createBtnCity (cityName) {
    var searchColumn = document.createElement("section");
    var historyCity = document.createElement("p");
    
    historyCity.textContent = cityName;

    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.classList.add("btn", "btn-remove");
    removeButton.addEventListener("click", function () {
      searchColumn.remove();
      removeLocalStorage(cityName);
    });

    searchColumn.append(historyCity, removeButton);
    searchEl.appendChild(searchColumn);
};

// Event Listener for whenever you hit the search button
searchButton.addEventListener('click', function () {
    var city = searchCity.value
    document.getElementById('city').innerHTML = city;
    getLatLon(city);
    store(city);
    createBtnCity(city);
});

