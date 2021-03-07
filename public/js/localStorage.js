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



// next.addEventListener("click", getData);
// On click event function
const linkBtns = document.querySelectorAll('[data-save-then-goto]');

linkBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const href = e.target.getAttribute('data-save-then-goto');

    saveRadio();
    saveRange();

    window.location.href = href;

  });
});