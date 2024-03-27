function getWeatherByLocation() {
    const locationInput = document.getElementById('location');
    const location = locationInput.value.trim();

    if (!location) {
        alert('Please enter a valid location.');
        return;
    }

    const apiKey = '42d7323936c0710f4e4a782af3390eb4';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {

            // Extract relevant weather information
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;
            const windSpeed = data.wind.speed;
            const countryName = data.sys.country;

            // Update HTML content
            locationDetect.innerHTML = data.sys.country
            temp.innerText = `${(data.main.temp).toFixed(1)}°C`
            des.innerHTML = data.weather[0].description
            winds.innerHTML = `${data.wind.speed} km/h`
            hum.innerHTML = `${data.main.humidity} %`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function getWeatherWithLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);

                getWeatherByCoordinates(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

function getWeatherByCoordinates(latitude, longitude) {
    const apiKey = '42d7323936c0710f4e4a782af3390eb4';

    // Making an API request to OpenWeatherMap using coordinates
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // Extract relevant weather information
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const description = data.weather[0].description;
            const windSpeed = data.wind.speed;
            const cityName = data.name;

            // Update HTML content
            locationDetect.innerHTML = data.name
            temp.innerHTML = `${(data.main.temp).toFixed(1)}°C`
            des.innerHTML = data.weather[0].description
            winds.innerHTML = `${data.wind.speed} km/h`
            hum.innerHTML = `${data.main.humidity} %`
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
