// JavaScript Document

console.log("swiper js is Linked up");

// swiper js function

var swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
    },
});