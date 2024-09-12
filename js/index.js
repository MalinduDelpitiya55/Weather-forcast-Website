const apiKey = 'ee16cdd2901442cdabd52206240703';
const baseURL = 'https://api.weatherapi.com/v1/';
let mylocation;
// Reusable fetch function
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${baseURL}${endpoint}&key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function getGeoLocation() {
    console.log("getGeoLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

async function success(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`${latitude}, ${longitude}`);

    try {
        // Fetch the weather data from the API
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&days=7&aqi=yes&alerts=yes&key=ee16cdd2901442cdabd52206240703`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        mylocation = data["location"]["name"];
        console.log("mylocation"+mylocation);
        currentWeather(mylocation);
        currentMap(mylocation);
        updatePastThreeDays(mylocation);
        futureSevnDays(mylocation);

    } catch (error) {
        alert("Location not Found");
        console.error('Error fetching data:', error);
    }
}



// Function to update clock
function updateClock() {
    const currentDate = new Date();
    const localMonth = currentDate.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const localMonthName = months[localMonth];
    const localDay = currentDate.getDate();
    const localWeekDay = currentDate.getDay();
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const localWeekDayName = weekDays[localWeekDay];
    const localHour = currentDate.getHours();
    const localMinute = currentDate.getMinutes();
    const localSecond = currentDate.getSeconds();

    // Add leading zeros before 10
    const leadingZero = (num) => (num < 10 ? "0" + num : num);

    // Create a string with the local date and time
    const localDateTimeString = `${localWeekDayName}, ${localMonthName} ${leadingZero(localDay)} ${leadingZero(localHour)}:${leadingZero(localMinute)}:${leadingZero(localSecond)}`;

    // Update clock
    document.getElementById("date-time").textContent = localDateTimeString;
}


// Function to fetch and update weather data for current weather
async function currentWeather(location) {
    console.log(location);
    const data = await fetchData(`forecast.json?q=${location}&days=7&aqi=yes&alerts=yes`);
    this.mylocation = location;

    // Update DOM elements with weather data
    document.getElementById("current-city").innerHTML = data["location"]["name"];
    document.getElementById("current-country").innerHTML = data["location"]["country"];
    // document.getElementById("date&time").innerHTML = ;

    // temprature
    document.getElementById("current-temparature").innerHTML = data["current"]["temp_c"];
    document.getElementById("current-cloud-condition").innerHTML = data["current"]["condition"]["text"];
    document.getElementById("current-feel-temparature").innerHTML = data["current"]["feelslike_c"] + "°C";
    document.getElementById("current-high-temparature").innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}` + "°C";
    document.getElementById("current-low-temparature").innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}` + "°C";
    document.getElementById("current-cloud-condition-icon").src = data["current"]["condition"]["icon"];

    // Current details
    document.getElementById("visibility").innerHTML = data["current"]["vis_km"];
    document.getElementById("dew-point").innerHTML = `${data.forecast.forecastday[0].hour[0].dewpoint_c}`;
    document.getElementById("wind").innerHTML = data["current"]["wind_kph"];
    document.getElementById("humidity").innerHTML = data["current"]["humidity"];
    document.getElementById("cloudiness").innerHTML = data["current"]["cloud"];
    var rainChance = `${data.forecast.forecastday[0].day.daily_chance_of_rain}`;
    document.getElementById("rainChance").innerHTML = rainChance;

    if (rainChance > 49) {
        document.getElementById("umbrella-required").innerHTML = "Umbrella Required";
    }
    else {
        document.getElementById("umbrella-required").innerHTML = "No Umbrella Required";
    }

    // sunset and sunrise   
    document.getElementById("sun-rise").innerHTML = `${data.forecast.forecastday[0].astro.sunrise}`;
    document.getElementById("sun-set").innerHTML = `${data.forecast.forecastday[0].astro.sunset}`;
    // Update additional elements as needed

    checkbox.addEventListener('change', function () {
        let reop = {
            method: 'GET'
        };
        if (this.checked) {
            // Checkbox is checked, switch to Fahrenheit
            currentUnit.textContent = '°F';
            changingUnit.textContent = '°C';
            document.getElementById("current-temparature").innerHTML = data["current"]["temp_f"];
            document.getElementById("current-feel-temparature").innerHTML = data["current"]["feelslike_f"] + "°F";
            document.getElementById("current-high-temparature").innerHTML = `${data.forecast.forecastday[0].day.maxtemp_f}` + "°F";
            document.getElementById("current-low-temparature").innerHTML = `${data.forecast.forecastday[0].day.mintemp_f}` + "°F";
        } else {
            // Checkbox is unchecked, switch to Celsius
            currentUnit.textContent = '°C';
            changingUnit.textContent = '°F';
            document.getElementById("current-temparature").innerHTML = data["current"]["temp_c"];
            document.getElementById("current-feel-temparature").innerHTML = data["current"]["feelslike_c"] + "°C";
            document.getElementById("current-high-temparature").innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}` + "°C";
            document.getElementById("current-low-temparature").innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}` + "°C";
        }
    });
}

// Function to fetch and update weather data for a given cities
async function cityWeather(location, elementsPrefix) {
    let reop = {
        method: 'GET'
    };
    const data = await fetchData(`forecast.json?q=${location}&days=7&aqi=yes&alerts=yes`);

    // Update DOM elements with weather data
    document.getElementById(`${elementsPrefix}-name`).innerHTML = data["location"]["name"];
    document.getElementById(`${elementsPrefix}-country`).innerHTML = data["location"]["country"];
    document.getElementById(`${elementsPrefix}-temparature`).innerHTML = data["current"]["temp_c"] +"°C";
    document.getElementById(`${elementsPrefix}-forecast`).src = data["current"]["condition"]["icon"];
    document.getElementById(`${elementsPrefix}-text`).innerHTML = data["current"]["condition"]["text"];

    checkbox.addEventListener('change', function () {
        let reop = {
            method: 'GET',
            url: `${baseURL}current.json?key=${apiKey}&q=${location}`,
        };
        if (this.checked) {
            // Checkbox is checked, switch to Fahrenheit
            currentUnit.textContent = '°F';
            changingUnit.textContent = '°C';
            document.getElementById(`${elementsPrefix}-temparature`).innerHTML = data["current"]["temp_f"] + "F";
        } else {
            // Checkbox is unchecked, switch to Celsius
            currentUnit.textContent = '°C';
            changingUnit.textContent = '°F';
            document.getElementById(`${elementsPrefix}-temparature`).innerHTML = data["current"]["temp_c"] + "°C";
        }
    });

    // Update additional elements as needed
}

// Function to update past three days weather
async function updatePastThreeDays(location) {
    const startDate = new Date();
    let currentDay1 = new Date(startDate);

    for (let i = 3; i > 0; i--) {

        currentDay1.setDate(currentDay1.getDate() - 1);
        //hethuw blann toISOString, split
        let formattedDate = currentDay1.toISOString().split('T')[0];

        fetch(`https://api.weatherapi.com/v1/history.json?key=ee16cdd2901442cdabd52206240703&q=${location}&dt=${formattedDate}&days=7`)
            .then(response => response.json())
            .then(data => {
                var dateString = new Date(`${data.forecast.forecastday[0].date}`);
                var date = new Date(dateString);
                var day = date.getDate();
                var weekdayNumber = date.getDay();
                var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                var weekdayName = weekdays[weekdayNumber];
                document.getElementById(`p-day-${i}`).innerHTML = weekdayName + "(" + day + ")";
                document.getElementById(`p-day${i}-img`).src = `${data.forecast.forecastday[0].day.condition.icon}`;
                document.getElementById(`p-day${i}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}` + "°C";
                document.getElementById(`p-day${i}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}` + "°C";

                checkbox.addEventListener('change', function () {
                    let reop = {
                        method: 'GET'
                    };
                    if (this.checked) {
                        // Checkbox is checked, switch to Fahrenheit
                        currentUnit.textContent = '°F';
                        changingUnit.textContent = '°C';
                        document.getElementById(`p-day${i}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_f}` + "°F";
                        document.getElementById(`p-day${i}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.mintemp_f}` + "°F";
                    } else {
                        // Checkbox is unchecked, switch to Celsius
                        currentUnit.textContent = '°C';
                        changingUnit.textContent = '°F';
                        document.getElementById(`p-day${i}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}` + "°C";
                        document.getElementById(`p-day${i}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}` + "°C";
                    }
                });

            })
            .catch(error => {
                console.error("Error:", error);
            });

    }
}
async function futureSevnDays(location) {
    const startDate = new Date();
    let currentDay = new Date(startDate);
    for (let i = 0; i < 7; i++) {
        //hethuw blann toISOString, split
        currentDay.setDate(currentDay.getDate() + 1);
        const formattedDate = currentDay.toISOString().split('T')[0];

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=ee16cdd2901442cdabd52206240703&q=${location}&days=7&aqi=yes&alerts=yes&dt=${formattedDate}`)
            .then(response => response.json())
            .then(data => {
                // Define the date using the api
                var dateString = new Date(`${data.forecast.forecastday[0].date}`);
                var date = new Date(dateString);
                var day = date.getDate();
                var weekdayNumber = date.getDay();
                var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                var weekdayName = weekdays[weekdayNumber];
                document.getElementById(`f-day-${i + 1}`).innerHTML = weekdayName + "(" + day + ")";
                document.getElementById(`f-day${i + 1}-icon`).src = `${data.forecast.forecastday[0].day.condition.icon}`;
                document.getElementById(`f-day${i + 1}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}` + "°C";
                document.getElementById(`f-day${i + 1}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}` + "°C";

                checkbox.addEventListener('change', function () {
                    let reop = {
                        method: 'GET'
                    };
                    if (this.checked) {
                        // Checkbox is checked, switch to Fahrenheit
                        currentUnit.textContent = '°F';
                        changingUnit.textContent = '°C';
                        document.getElementById(`f-day${i + 1}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_f}` + "°F";
                        document.getElementById(`f-day${i + 1}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.mintemp_f}` + "°F";
                    } else {
                        // Checkbox is unchecked, switch to Celsius
                        currentUnit.textContent = '°C';
                        changingUnit.textContent = '°F';
                        document.getElementById(`f-day${i + 1}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}` + "°C";
                        document.getElementById(`f-day${i + 1}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}` + "°C";
                    }
                });


            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
}


// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const weekdayNumber = date.getDay();
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekdayName = weekdays[weekdayNumber];
    return `${weekdayName} (${day})`;
}

// Event listeners
document.getElementById('searchBtn').addEventListener('click', search);
document.getElementById('theme').addEventListener('click', toggleTheme);
//document.getElementById('check-unit').addEventListener('change', toggleTemperatureUnit);

// Initial setup
updateClock();
getGeoLocation()
setInterval(updateClock, 1000);
cityWeather('kandy', 'city-1');
cityWeather('nuwaraeliya', 'city-2');
cityWeather('jaffna', 'city-3');
cityWeather('malabe', 'city-4');



// Search function
function search() {
    mylocation = document.getElementById("searchTxt").value;
    currentWeather(mylocation);
    updatePastThreeDays(mylocation);
    futureSevnDays(mylocation);
    currentMap(mylocation);
}

// Function to toggle theme
function toggleTheme() {
    const theme = document.getElementById('darkmode-toggle').checked ? 'light' : 'dark';
    document.body.setAttribute("data-bs-theme", theme);
}

const checkbox = document.getElementById('check-unit');
const currentUnit = document.getElementById('current-unit');
const changingUnit = document.getElementById('Changing-unit');
// Function to toggle temperature unit


let hour = new Date().getHours();
const backgroundImageContainer = document.querySelector('.forecast-now');

if (hour > 6 && hour < 18) {
    console.log("sdgghd");
    
    backgroundImageContainer.style.backgroundImage = 'url("")';
}
else {
    console.log("dsgsdg");
    backgroundImageContainer.style.backgroundImage = 'url("assets/moon.jpg")';
}


//===================================   map =============================

let map; // Declare a variable to hold the map instance

function initializeMap(latitude, longitude, pin) {
    if (!map) {
        map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        map.setView([latitude, longitude], 13);
    }

    // Add a marker to the map
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`Location: ${pin}`)
        .openPopup();
}

// Event listener for search button
document.getElementById("searchBtn").addEventListener("click", async () => {
    try {
        const searchVal = document.getElementById("searchTxt").value;
        const { latitude, longitude } = await fetchLocationData(searchVal);
        initializeMap(latitude, longitude, searchVal);
    } catch (error) {
        console.error('Error during fetch:', error);
        // Handle errors
    }
});

async function currentMap(currentLocation) {
    try {
        console.log(currentLocation);

        const { latitude, longitude } = await fetchLocationData(currentLocation);
        initializeMap(latitude, longitude, currentLocation);
    } catch (error) {
        console.error('Error during fetch:', error);
        // Handle errors
    }
}

async function fetchLocationData(location) {
    try {
        console.log(location);

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ee16cdd2901442cdabd52206240703&q=${location}&days=7`);
        const data = await response.json();
        console.log(data);

        return { latitude: data.location.lat, longitude: data.location.lon };
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
}
