function toggleTheme() {
    const theme = document.getElementById('darkmode-toggle').checked ? 'light' : 'dark';
    document.body.setAttribute("data-bs-theme", theme);
}
const checkbox = document.getElementById('check-unit');

const apiKey = 'ee16cdd2901442cdabd52206240703';
const baseURL = 'https://api.weatherapi.com/v1/';

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

// Function to fetch and update weather data for current weather
async function currentWeather(location) {
    const data = await fetchData(`forecast.json?q=${location}&days=7&aqi=yes&alerts=yes`);

    // Update DOM elements with weather data
    document.getElementById("current-city").innerHTML = data["location"]["name"];
    document.getElementById("current-country").innerHTML = data["location"]["country"];
    // document.getElementById("date&time").innerHTML = ;

    // temprature
    document.getElementById("current-temparature").innerHTML = data["current"]["temp_c"];
    //document.getElementById("current-cloud-condition").innerHTML = data["current"]["condition"]["text"];
    document.getElementById("current-feel-temparature").innerHTML = data["current"]["feelslike_c"];
    document.getElementById("current-high-temparature").innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}`;
    document.getElementById("current-low-temparature").innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}`;
    document.getElementById("current-cloud-condition-icon").src = data["current"]["condition"]["icon"];

    // Current details
    document.getElementById("visibility").innerHTML = data["current"]["vis_km"];
    // document.getElementById("dew-point").innerHTML = `${data.forecast.forecastday[0].hour[0].dewpoint_c}`;
    document.getElementById("wind").innerHTML = data["current"]["wind_kph"];
    document.getElementById("humidity").innerHTML = data["current"]["humidity"];
    // document.getElementById("cloudiness").innerHTML = data["current"]["cloud"];
    // var rainChance = `${data.forecast.forecastday[0].day.daily_chance_of_rain}`;
    //  document.getElementById("rainChance").innerHTML = rainChance;

    // if (rainChance > 49) {
    //     document.getElementById("umbrella-required").innerHTML = "Umbrella Required";
    // }
    // else {
    //     document.getElementById("umbrella-required").innerHTML = "No Umbrella Required";
    // }

    // sunset and sunrise   
    document.getElementById("sun-rise").innerHTML = `${data.forecast.forecastday[0].astro.sunrise}`;
    document.getElementById("sun-set").innerHTML = `${data.forecast.forecastday[0].astro.sunset}`;
    // Update additional elements as needed

    // checkbox.addEventListener('change', function () {
    //     let reop = {
    //         method: 'GET'
    //     };
    //     if (this.checked) {
    //         // Checkbox is checked, switch to Fahrenheit
    //         currentUnit.textContent = '°F';
    //         changingUnit.textContent = '°C';
    //         document.getElementById("current-temparature").innerHTML = data["current"]["temp_f"];
    //         document.getElementById("current-feel-temparature").innerHTML = data["current"]["feelslike_f"];
    //         document.getElementById("current-high-temparature").innerHTML = `${data.forecast.forecastday[0].day.maxtemp_f}`;
    //         document.getElementById("current-low-temparature").innerHTML = `${data.forecast.forecastday[0].day.mintemp_f}`;
    //     } else {
    //         // Checkbox is unchecked, switch to Celsius
    //         currentUnit.textContent = '°C';
    //         changingUnit.textContent = '°F';
    //         document.getElementById("current-temparature").innerHTML = data["current"]["temp_c"];
    //         document.getElementById("current-feel-temparature").innerHTML = data["current"]["feelslike_c"];
    //         document.getElementById("current-high-temparature").innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}`;
    //         document.getElementById("current-low-temparature").innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}`;
    //     }
    // });
}

async function cityWeather(location, elementsPrefix) {
    let reop = {
        method: 'GET'
    };
    const data = await fetchData(`forecast.json?q=${location}&days=7&aqi=yes&alerts=yes`);

    // Update DOM elements with weather data
    document.getElementById(`${elementsPrefix}-name`).innerHTML = data["location"]["name"];
    document.getElementById(`${elementsPrefix}-country`).innerHTML = data["location"]["country"];
    document.getElementById(`${elementsPrefix}-temparature`).innerHTML = data["current"]["temp_c"];
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
            document.getElementById(`${elementsPrefix}-temparature`).innerHTML = data["current"]["temp_f"];
        } else {
            // Checkbox is unchecked, switch to Celsius
            currentUnit.textContent = '°C';
            changingUnit.textContent = '°F';
            document.getElementById(`${elementsPrefix}-temparature`).innerHTML = data["current"]["temp_c"];
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
    // document.getElementById(`${elementsPrefix}-country`).innerHTML = data["location"]["country"];
    document.getElementById(`${elementsPrefix}-temparature`).innerHTML = data["current"]["temp_c"];
    document.getElementById(`${elementsPrefix}-forecast`).src = data["current"]["condition"]["icon"];
    document.getElementById(`${elementsPrefix}-text`).innerHTML = data["current"]["condition"]["text"];

    // checkbox.addEventListener('change', function () {
    //     let reop = {
    //         method: 'GET',
    //         url: `${baseURL}current.json?key=${apiKey}&q=${location}`,
    //     };
    //     if (this.checked) {
    //         // Checkbox is checked, switch to Fahrenheit
    //         currentUnit.textContent = '°F';
    //         changingUnit.textContent = '°C';
    //         document.getElementById(`${elementsPrefix}-temparature`).innerHTML = data["current"]["temp_f"];
    //     } else {
    //         // Checkbox is unchecked, switch to Celsius
    //         currentUnit.textContent = '°C';
    //         changingUnit.textContent = '°F';
    //         document.getElementById(`${elementsPrefix}-temparature`).innerHTML = data["current"]["temp_c"];
    //     }
    // });

    // Update additional elements as needed
}

function futureSevnDays(location) {
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
                document.getElementById(`f-day${i + 1}-date-temp`).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c}`;
                document.getElementById(`f-day${i + 1}-date-wind`).innerHTML = `${data.forecast.forecastday[0].day.maxwind_kph}`;
                document.getElementById(`f-day${i + 1}-date-text`).innerHTML = `${data.forecast.forecastday[0].day.condition.text}`;
                document.getElementById(`f-day${i + 1}-date-rain`).innerHTML = `${data.forecast.forecastday[0].day.daily_chance_of_rain}`;

                // checkbox.addEventListener('change', function () {
                //     let reop = {
                //         method: 'GET'
                //     };
                //     if (this.checked) {
                //         // Checkbox is checked, switch to Fahrenheit
                //         currentUnit.textContent = '°F';
                //         changingUnit.textContent = '°C';
                //         document.getElementById(`f-day${i + 1}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_f}`;
                //         document.getElementById(`f-day${i + 1}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.mintemp_f}`;
                //     } else {
                //         // Checkbox is unchecked, switch to Celsius
                //         currentUnit.textContent = '°C';
                //         changingUnit.textContent = '°F';
                //         document.getElementById(`f-day${i + 1}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}`;
                //         document.getElementById(`f-day${i + 1}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}`;
                //     }
                // });


            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
}

function todayHourlyForcast(location) {



    fetch(`https://api.weatherapi.com/v1/forecast.json?q=Colombo&days=7&aqi=yes&alerts=yes&key=ee16cdd2901442cdabd52206240703`)
        .then(response => response.json())
        .then(data => {
            let hours = 0;
for (let i = 1; i <= 8; i++) {
    document.getElementById(`today-${i}-icon`).src = `${data.forecast.forecastday[0].hour[hours].condition.icon}`;
    document.getElementById(`today-${i}-text`).innerHTML = `${data.forecast.forecastday[0].hour[hours].condition.text}`;
    document.getElementById(`day-${i}-date-temp`).innerHTML = `${data.forecast.forecastday[0].hour[hours].temp_c}`;
    hours += 3;
}
           

            // checkbox.addEventListener('change', function () {
            //     let reop = {
            //         method: 'GET'
            //     };
            //     if (this.checked) {
            //         // Checkbox is checked, switch to Fahrenheit
            //         currentUnit.textContent = '°F';
            //         changingUnit.textContent = '°C';
            //         document.getElementById(`f-day${i + 1}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_f}`;
            //         document.getElementById(`f-day${i + 1}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.mintemp_f}`;
            //     } else {
            //         // Checkbox is unchecked, switch to Celsius
            //         currentUnit.textContent = '°C';
            //         changingUnit.textContent = '°F';
            //         document.getElementById(`f-day${i + 1}-date-max`).innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}`;
            //         document.getElementById(`f-day${i + 1}-date-min`).innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}`;
            //     }
            // });


        })
        .catch(error => {
            console.error("Error:", error);
        });

}


currentWeather('colombo');
futureSevnDays('colombo')
cityWeather('Kandy', 'city-1');
cityWeather('jaffna', 'city-2');
cityWeather('malabe', 'city-3');
todayHourlyForcast('colombo')