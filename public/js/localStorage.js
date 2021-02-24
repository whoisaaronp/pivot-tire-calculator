// JavaScript Document

console.log("local storage linked");

const form = document.querySelector("#mass-measurement");
// next is continue button-> when click do this…
const next = document.querySelector("#next-page");

function getData() {
  console.log(form.elements.mass.value);
  //code to write to local storage goes here.
  // collecting, storing and submitting alax call
  let kg = "kg";
  let str = JSON.stringify(kg);
  localStorage.setItem("KG", kg);

}

next.addEventListener("click", getData);

// local storage job don't first then -> redirect
// remove the a tag from html, redirect through JS
// data attrituve on the continue button -> redirect to that page
// localstorage can work on each page 