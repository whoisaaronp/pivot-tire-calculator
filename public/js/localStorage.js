// JavaScript Document

console.log("local storage linked");

const form = document.querySelector("form");
const next = document.querySelector("#next-page");

// 1. selected buttons function
function saveRadio() {
  // console.log(form.elements.mass.value);
  const selectedRadio = form.querySelector('input[type="radio"]:checked');
  //change to range, for the sliders
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
  //for the sliders
  console.log(selectedRange);

  if (selectedRange) {
    alert('Data saved!');
    const value = selectedRange.value;
    const propertyName = selectedRange.getAttribute('name');
    let str = JSON.stringify(value);
    localStorage.setItem(propertyName, str);
  }
}

// 3. Bike functions or riding stlye page
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

// 4. ranger slider indicator
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

// 5 rim type
const saveRimTypeBtn = document.getElementById('saveRim');
if (saveRimTypeBtn) {
  saveRimTypeBtn.addEventListener('click', saveRim);
}

function saveRim() {
  const rimData = [
    "Inner Tube",
    "Hookless-Rim",
    "Hookless-Tubeless"
  ];

  const selectedRim = rimData[swiper.activeIndex];
  localStorage.setItem('bike', selectedRim);
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