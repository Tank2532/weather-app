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
var searchInput = document.querySelector('.search-bar');
// Find way to store Lon and Lat from requestLonLat pull to place in here
// var requestForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=265ae15a1f0d3a3b015bd08a0b58dba7";
// Replace London with searchInput
var requestLonLat = "http://api.openweathermap.org/geo/1.0/direct?q=" + 'London' + "&limit=5&appid=e555e88ca3b04d74c7f45d18751b7ab0"; 
var lon = ''
var lat = ''

var today = dayjs().format('MM/DD/YYYY');
$(currentDate).text(today);

var nextDay = dayjs().add(1, 'day').format('MM/DD/YYYY');
$(dateOne).text(nextDay);

var oneDayAfter = dayjs().add(2, 'day').format('MM/DD/YYYY');
$(dateTwo).text(oneDayAfter);

var twoDayAfter = dayjs().add(3, 'day').format('MM/DD/YYYY');
$(dateThree).text(twoDayAfter);

var threeDayAfter = dayjs().add(4, 'day').format('MM/DD/YYYY');
$(dateFour).text(threeDayAfter);

var fourDayAfter = dayjs().add(5, 'day').format('MM/DD/YYYY');
$(dateFive).text(fourDayAfter);

async function getLonLat() {
    const response = await fetch(requestLonLat);
    const data = await response.json();
    lat = data[0].lat;
    lon = data[0].lon;
}

getForecast();

// Doesn't list lon or lat in requestForecast url
async function getForecast() {
    alert(lon);
    alert(lat);
    var requestForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=265ae15a1f0d3a3b015bd08a0b58dba7";
    const response2 = await fetch(requestForecast);
    const data2 = await response2.json();
    console.log(data2);
}



// searchButton.addEventListener('click', function (event) {
    
// });

