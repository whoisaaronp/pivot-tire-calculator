// JavaScript Document

console.log("local storage linked");

const form = document.querySelector("form");
const next = document.querySelector("#next-page");

// 1. selected buttons function
function getData() {
  // console.log(form.elements.mass.value);
  const selectedRadio = form.querySelector('input[type="radio"]:checked');
  //change to range, for the sliders
  console.log(selectedRadio);

  if (selectedRadio) {
    alert('saved!');
    const value = selectedRadio.getAttribute('value');
    const propertyName = selectedRadio.getAttribute('name');
    let str = JSON.stringify(value);
    localStorage.setItem(propertyName, str);
  }
}

// 2. selected range function
function getData() {
  // console.log(form.elements.mass.value);
  const selectedRange = form.querySelector('input[type="range"]');
  //change to range, for the sliders
  console.log(selectedRange);

  if (selectedRadio) {
    alert('saved!');
    const value = selectedRange.getAttribute('value');
    const propertyName = selectedRange.getAttribute('name');
    let str = JSON.stringify(value);
    localStorage.setItem(propertyName, str);
  }
}

// 3. Bike functions
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

// next.addEventListener("click", getData);
// On click event function
const linkBtns = document.querySelectorAll('[data-save-then-goto]');

linkBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const href = e.target.getAttribute('data-save-then-goto');

    getData();

    window.location.href = href;

  });
});