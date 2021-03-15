// JavaScript Document

console.log("local storage linked");

const form = document.querySelector("form");
const next = document.querySelector("#next-page");

// 1. selected buttons function
function saveRadio() {
  // console.log(form.elements.mass.value);
  const selectedRadio = form.querySelector('input[type="radio"]:checked');
  //when an radio button is selected store the key and values -> then stringify
  console.log(selectedRadio);

  if (selectedRadio) {
    alert('Data saved!');
    const value = selectedRadio.getAttribute('value');
    const propertyName = selectedRadio.getAttribute('name');
    let str = JSON.stringify(value);
    localStorage.setItem(propertyName, str);
  }
}

// 2. selected range function
function saveRange() {
  // console.log(form.elements.mass.value);
  const selectedRange = form.querySelector('input[type="range"]');
    //when an slider knob is moved store the key and values -> then stringify
  console.log(selectedRange);

  if (selectedRange) {
    alert('Data saved!');
    const value = selectedRange.value;
    const propertyName = selectedRange.getAttribute('name');
    let str = JSON.stringify(value);
    localStorage.setItem(propertyName, str);
  }
}

// 3. Riding style selection when an option grab is selected store the(activeIndex# number) key and values -> then stringify
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
const indicator = document.getElementById('slider-input-content');
const range = document.querySelector('input[type="range"]');

if (range) {
  range.addEventListener('input', (e) => {
    const slider = e.target;
    const min = parseInt(slider.getAttribute('min'), 10);
    const max = parseInt(slider.getAttribute('max'), 10);
    const val = parseInt(slider.value, 10);

    const scalar = (((val - min) / (max - min)) * 100);

    indicator.style.left = `${scalar}%`;
    indicator.innerHTML = `${Math.floor(val)}`;
  });
}

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

if(submitButton) {
  submitButton.addEventListener('click', saveUser)
 
}

function saveUser(){
    //Saving the username from input field to the Local Storage
  const username=document.getElementById("userName").value;
  localStorage.setItem('user',username);
  alert('Saved User!');
  // linked i
  window.location.href="/welcome";

}


// calculation with localstorage
// On click event function
const linkBtns = document.querySelectorAll('[data-save-then-goto]');

linkBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const href = e.target.getAttribute('data-save-then-goto');

    saveRadio();
    saveRange();

    // Make final calculations
    if (href === '/pressure-suggestion') {
      const wetGround = (localStorage.getItem('road-surface') === 'WET');
      let humanWeight = parseInt(localStorage.getItem('rider-weight').replace(/"/g, ''), 10);
      const weightUnit = localStorage.getItem('weight-unit');
      const pressureUnit = localStorage.getItem('pressure-unit');

      // Convert to KG if using LBS
      if (weightUnit === 'LBS') {
        humanWeight *= 0.453592;
      }
      
      const tireWidth = parseInt(localStorage.getItem('tire-width').replace(/"/g, ''), 10);
      
      let environmentalInfluences = 1;
      environmentalInfluences = (wetGround ? environmentalInfluences * 0.93 : (environmentalInfluences * 1));
      let optimumAirPressure = ((humanWeight/(2.55+humanWeight/10)*environmentalInfluences));

      console.warn(humanWeight, environmentalInfluences);
      
      // 25mm -> as default
      if (tireWidth === 23){
        optimumAirPressure += 0.5;
      }else if (tireWidth === 28){
        optimumAirPressure -= 1;
      }
      
      
      if (pressureUnit === 'PSI') {
        const psi = optimumAirPressure * 14.5038;
        
        localStorage.setItem('front_pressure', `${round(psi, 0)} PSI`);
        localStorage.setItem('rear_pressure', `${round(psi, 0)} PSI`);
      }
      else {
        localStorage.setItem('front_pressure', `${round(optimumAirPressure, 1).toFixed(1)} BAR`);
        localStorage.setItem('rear_pressure', `${round(optimumAirPressure, 1).toFixed(1)} BAR`);
      }
    }

    window.location.href = href;

  });
});
