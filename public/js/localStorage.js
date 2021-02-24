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
