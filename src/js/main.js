$(document).ready(function () {

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1000,
    loop: true,
    breakpoints: {
      1440: {
        slidesPerView: 3,
        spaceBetweenSlides: 20
      },
      1100: {
        slidesPerView: 3,
        spaceBetweenSlides: 10,
      },
      767: {
        slidesPerView: 2,
        spaceBetweenSlides: 10,
      },
      320: {
        slidesPerView: 1,
        spaceBetweenSlides: 10,
      },

    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#menu').addClass('active')
    } else {
      $('#menu').removeClass('active')
    }
  })

});