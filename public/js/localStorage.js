// JavaScript Document

console.log("local storage linked");

const form = document.querySelector("form");
const next = document.querySelector("#next-page");

// 1. selected buttons input function
// if the radio is checked that the data and store the 'key' and 'value' as a string
function saveRadio() {
	// console.log(form.elements.mass.value);
	const selectedRadio = form.querySelector('input[type="radio"]:checked');
	//when an radio button is selected store the key and values -> then stringify
	console.log(selectedRadio);

	if (selectedRadio) {
		alert('Data saved!');
		const value = selectedRadio.getAttribute('value');
		const propertyName = selectedRadio.getAttribute('name');
		// let str = JSON.stringify(value);
		localStorage.setItem(propertyName, value);
	}
}

// 2. selected range input function 
// if the range input is checked that the data and store the 'key' and 'value' as a valueing
function saveRanges() {
	// console.log(form.elements.mass.value);
	const selectedRanges = form.querySelectorAll('input[type="range"]');
	//when an slider knob is moved store the key and values -> then stringify

	if (selectedRanges) {
		selectedRanges.forEach((selectedRange) => {
			if (selectedRange) {
				alert('Data saved!');
				const value = selectedRange.value;
				const propertyName = selectedRange.getAttribute('name');
				// let str = JSON.stringify(value);
				localStorage.setItem(propertyName, value);
			}
		});
	}

}

// 3. Riding style selection when an option grab is selected store the(activeIndex# number) key and values -> then stringify
// when the saveBikeBtn(contine button) is clicked, save then the selected bike will be stored in local storage
const saveBikeBtn = document.getElementById('saveBikeBtn');
if (saveBikeBtn) {
	saveBikeBtn.addEventListener('click', saveBike);
}

function saveBike() {
	const bikeData = [
		"Mountain Bike",
		"Cyclocross",
		"Road Bike",
		"Hydrid",
		"Active"

	];

	const selectedBike = bikeData[swiper.activeIndex];
	localStorage.setItem('bike', selectedBike);
}

// 4. Rim type selection when an option grab is selected store the(activeIndex# number) key and values -> then stringify
const saveRimTypeBtn = document.getElementById('saveRim');
if (saveRimTypeBtn) {
	saveRimTypeBtn.addEventListener('click', saveRim);
}

function saveRim() {
	const rimData = [
		"Inner Tube",
		"Tubular",
		"Hookless-Rim",
		"Hookless-Tubeless"
	];

	alert('Data saved!');

	const selectedRim = rimData[swiper.activeIndex];
	localStorage.setItem('rim-type', selectedRim);
}

// 5. ranger slider indicator
// checking the range to see if it exist and add an event listener to it, it not then skip it.
// add an event listener when you have a range
const ranges = document.querySelectorAll('input[type="range"]');

// forloop 
// adding the LBS and KG to the rider weight 
// adding the LBS and KG to the rider weight 
ranges.forEach((range) => {
	const indicator = range.parentNode.querySelector('.indicator');
	if (range) {
		range.addEventListener('input', (e) => {
			const slider = e.target;
			const min = parseInt(slider.getAttribute('min'), 10);
			const max = parseInt(slider.getAttribute('max'), 10);
			let val = parseInt(slider.value, 10);
			const weightUnit = localStorage.getItem('weight-unit');
			const scalar = (((val - min) / (max - min)) * 100);

			indicator.style.left = `${scalar}%`;

			if (slider.getAttribute('name') === 'rider-weight') {

				if (weightUnit === 'LBS') {
					val *= 2.206;
				}
				indicator.innerHTML = `${Math.floor(val)} ${weightUnit}`;
			} else {
				indicator.innerHTML = `${Math.floor(val)}`;

			}

		});
	}
});

// 7. wheel diameter
const wheelDiameter = document.getElementById('wheelDiameter');
if (wheelDiameter) {
	wheelDiameter.addEventListener('click', saveWheel);
}

function saveWheel() {
	const wheelData = [
		"650a",
		"650b",
		"700c"
	];

	alert('Data saved!');

	const selectedWheel = wheelData[swiper.activeIndex];
	localStorage.setItem('wheel-diameter', selectedWheel);
}

// js function housiting 
// 6. saving username * it's bad to store personal data in localstorage :(
const submitButton = document.getElementById('submit');

if (submitButton) {
	submitButton.addEventListener('click', saveUser)

}

//Saving the username from input field to the Local Storage - key is user
function saveUser() {
	const username = document.getElementById("userName").value;
	localStorage.setItem('user', username);
	alert('Go to Dashboard - Saved User!');

	window.location.href = "/pressure-suggestion";

}

// 8. calculation with localstorage
// On click event function
const linkBtns = document.querySelectorAll('[data-save-then-goto]');

linkBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		const href = e.target.getAttribute('data-save-then-goto');

		saveRadio();
		saveRanges();

		// Make final calculations
		// just before you go to the pressure suggestion page, do this…
		// ** pass the stringify data back through as a JSON.parse to get rid ofb the strings
		// calculate
		if (href === '/pressure-suggestion') {
			const wetGround = localStorage.getItem('road-surface') === 'WET';
			let humanWeight = parseInt(localStorage.getItem('rider-weight'), 10);
			const weightUnit = localStorage.getItem('weight-unit');
			const pressureUnit = localStorage.getItem('pressure-unit');

			// Convert to KG if using LBS
			if (weightUnit === 'LBS') {
				humanWeight *= 0.453592;
			}

			const tireWidth = parseInt(JSON.parse(localStorage.getItem('tire-width')), 10);

			let environmentalInfluences = 1;
			environmentalInfluences = (wetGround ? environmentalInfluences * 0.93 : (environmentalInfluences * 1));
			let optimumAirPressure = ((humanWeight / (2.55 + humanWeight / 10) * environmentalInfluences));

			console.warn(humanWeight, environmentalInfluences);

			// 25mm -> as default
			if (tireWidth === 23) {
				optimumAirPressure += 0.5;
			} else if (tireWidth === 28) {
				optimumAirPressure -= 1;
			}


			if (pressureUnit === 'PSI') {
				const psi = optimumAirPressure * 14.5038;
				// returns the value of a number rounded to the nearest integer.
				localStorage.setItem('front_pressure', `${Math.round(psi, 0)} PSI`);
				localStorage.setItem('rear_pressure', `${Math.round(psi, 0)} PSI`);
			}
			else {
				localStorage.setItem('front_pressure', `${Math.round(optimumAirPressure, 1).toFixed(1)} BAR`);
				localStorage.setItem('rear_pressure', `${Math.round(optimumAirPressure, 1).toFixed(1)} BAR`);
			}

			// console.log(pressureUnit);

			// after calculation 
			let theUser = localStorage.getItem('userID');
			let pressureUnit2 = localStorage.getItem('pressure-unit');
			let massUnit = localStorage.getItem('weight-unit');
			let riderStyle = localStorage.getItem('bike');
			let humanWeight2 = localStorage.getItem('rider-weight');
			let tireWidth2 = localStorage.getItem('tire-width');
			let rimType = localStorage.getItem('rim-type');
			let roadSurface = localStorage.getItem('road-surface');
			let wheelDiameter = localStorage.getItem('wheel-diameter');
			let frontPressure = localStorage.getItem('front_pressure');
			let rearPressure = localStorage.getItem('rear_pressure');

			// In the local storage listed the data and wrote a fetch request to the route if successful, rewrite it .
			// after the calculation sends the to the compass all the data we be saved in from local storage then displayed 
			// Saves it as a json format
			const data = JSON.stringify({
				'userID': theUser,
				'pressure-unit': pressureUnit2,
				'weight-unit': massUnit,
				'bike': riderStyle,
				'rider-weight': humanWeight2,
				'tire-width': tireWidth2,
				'rim-type': rimType,
				'road-surface': roadSurface,
				'wheel-diameter': wheelDiameter,
				'front-pressure': frontPressure,
				'rear-pressure': rearPressure,
				'timestamp': new Date()
			});

			fetch('/users/add_input', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
			})
				.then((res) => res.json())
				.then((data) => {
					console.log('response!', data);
					window.location.href = href;
				});
		}
		else {
			window.location.href = href;
		}

	});
});

// 9. If pressure displays are on page, render data
const frontPresDOM = document.getElementById('front-pres');
const rearPresDOM = document.getElementById('rear-pres');

if (frontPresDOM && rearPresDOM) {
	frontPresDOM.innerHTML = localStorage.getItem('front_pressure');
	rearPresDOM.innerHTML = localStorage.getItem('rear_pressure');
}

// 10. save the user name from login to the welcome page
const yourName = document.getElementById('yourName');

if (yourName) {
	yourName.innerHTML = localStorage.getItem('user');
}

// 11. let's leverage the current weight, tire width and road surface data for the user to view
const currentweightDOM = document.getElementById('currentWeight');

if (currentweightDOM) {
	// ket values 
	// parse string again
	currentweightDOM.innerHTML = JSON.parse(localStorage.getItem('rider-weight'));
}

// 12. Display Value amount
const currentTireWidthDOM = document.getElementById('currentTireWidth');

if (currentTireWidthDOM) {
	currentTireWidthDOM.innerHTML = JSON.parse(localStorage.getItem('tire-width'));
}

// 13. Display value amount
const currentsurfaceDOM = document.getElementById('currentSurface');

if (currentsurfaceDOM) {
	currentsurfaceDOM.innerHTML = localStorage.getItem('road-surface');
}

// don't over stringify


//13. Register user form
const reg_form = document.getElementById('register_form');

if (reg_form) {
	const username = document.getElementById('userName');
	const password = document.getElementById('password');

	reg_form.addEventListener('submit', (e) => {
		e.preventDefault();

		fetch('/users/register_user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: username.value,
				password: password.value
			})
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 'user_created') {
					// User was created successfully
					localStorage.setItem('user', data.user.name);
					alert('Register success!');
					window.location.href = "/welcome";
				}
				else {
					alert('User name already taken!');
				}
			});
	});
}

//14. login_form
const login_form = document.getElementById('login_form');

if (login_form) {
	const username = document.getElementById('userName');
	const password = document.getElementById('password');

	login_form.addEventListener('submit', (e) => {
		e.preventDefault();

		fetch('/users/login_user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: username.value,
				password: password.value
			})
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 'success') {
					// Do success
					alert('Go to DashboardLogin success!');
					localStorage.setItem('user', data.user.name);
					localStorage.setItem('userID', data.user._id);
					window.location.href = '/pressure-suggestion';
				}
				else {
					// Do fail
					alert('Incorrect user name or password! Please try again.');
				}
			});
	});
}

// Google Chart viz
// to collect user id data from DBMonogo
fetch('/users/get_user_chart', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		userID: localStorage.getItem('userID')
	})
})
	.then((res) => res.json())
	.then((result) => {

		console.log(localStorage.getItem('userID'))

		//1. Check if Google charts is NOT undefined, then proceed from HTML
		if (typeof google !== 'undefined' && typeof google.charts !== 'undefined') {
			const monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];

			//2. Pull out data from result
			let { data } = result;

			//3.Sort the data by timestamp
			data.sort((a, b) => {
				return (new Date(a.timestamp).getTime() > new Date(b.timestamp).getTime());
			});

			//3.  Get only the three variable for now. timestamp, weight and tirewidth form my story…
			let chartData = [['Time', 'Rider Weight', 'Tire Width']];

			data.forEach((point) => {
				const newPoint = [
					monthNames[new Date(point['timestamp']).getMonth()],
					parseInt(point['rider-weight'], 10),
					parseInt(point['tire-width'], 10)
				];

				// ES6 way of doing chartData.push, use spread operator -> safe array expansionit 
				chartData = [
					...chartData,
					newPoint
				];
			});

			google.charts.load('current', { 'packages': ['corechart'] });
			google.charts.setOnLoadCallback(drawChart);
			// The Line Charts with Dynamic JSON 
			function drawChart() {
				var data = google.visualization.arrayToDataTable(chartData);

				var options = {
					// title: 'Company Performance',
					curveType: 'function',
					legend: { position: 'bottom' },
					series: {
						0: { color: '#f28e25' },
						1: { color: '#3b3c43' }
					}

				};

				var chart = new google.visualization.LineChart(document.getElementById('visualization'));

				chart.draw(data, options);
			}
		}
	});