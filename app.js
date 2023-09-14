const apiKey = "d3eb4753e8e957dd4c114803d283b46e";

const WheatherData = document.getElementById("wheter-data");

const inputCity = document.getElementById("City");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
	event.preventDefault();
	const CityValue = inputCity.value;
	getWheatherData(CityValue);
});

async function getWheatherData(CityValue) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${CityValue}&appid=${apiKey}&units=metric`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		console.log(data);
		const temperature = Math.round(data.main.temp);
		const description = data.weather[0].description;
		const icon = data.weather[0].icon;
		const details = [
			`Feels like : ${Math.round(data.main.feels_like)}°C`,
			`
                          Humadity : ${data.main.humidity}%`,
			`Wind speed : ${data.wind.speed}m/s`,
		];

		WheatherData.querySelector(".icon").innerHTML = `<img
						src=" https://openweathermap.org/img/wn/${icon}.png"
						alt="Wheter icon"
					/>`;
		WheatherData.querySelector(
			".temperature"
		).innerHTML = `${temperature} <span class="degree-sybmol">°C</span>`;

		WheatherData.querySelector(".description").textContent = description;
		WheatherData.querySelector(".details").innerHTML = details
			.map(
				(details) =>
					`<div>
					 ${details} 
				</div>`
			)
			.join("");
	} catch (error) {}
}
