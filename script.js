const apiKey = "88d6b53b04de6a03cbc742be92cfa648";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

function getWeather() {


    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    document.getElementById("cityName").textContent = "Loading...";
    document.getElementById("temperature").textContent = "--";
    document.getElementById("humidity").textContent = "--";
    document.getElementById("windSpeed").textContent = "--";
    document.getElementById("weather").textContent = "--";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod != 200) {
                alert("City not found.");
                return;
            }


            document.getElementById("cityName").textContent =
                `${data.name}, ${data.sys.country}`;


            document.getElementById("temperature").textContent =
                `${Math.round(data.main.temp)}°C`;


            document.getElementById("humidity").textContent =
                `${data.main.humidity}%`;


            document.getElementById("windSpeed").textContent =
                `${data.wind.speed} m/s`;


            document.getElementById("weather").textContent =
                data.weather[0].description;


            document.getElementById("weatherIcon").src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;


            document.getElementById("feelsLike").textContent =
                `${Math.round(data.main.feels_like)}°C`;


            const sunrise = new Date(data.sys.sunrise * 1000);

            document.getElementById("sunrise").textContent =
                sunrise.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                });


            const sunset = new Date(data.sys.sunset * 1000);

            document.getElementById("sunset").textContent =
                sunset.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                });

        })
        .catch(error => {
            console.log(error);
            alert("Unable to fetch weather data.");
        });

}
