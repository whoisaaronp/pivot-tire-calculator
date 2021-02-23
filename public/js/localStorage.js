// JavaScript Document

console.log("local storage linked");

const form = document.querySelector("#mass-measurement");
const next = document.querySelector("#next-page");

function getData() {
  console.log(form.elements.mass.value);
  //code to write to local storage goes here.
}

next.addEventListener("click", getData);