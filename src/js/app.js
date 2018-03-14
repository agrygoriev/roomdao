var windowWidth = window.innerWidth;
var header = document.getElementsByTagName("header")[0];
var doc = document.documentElement;
var navMenu = document.getElementsByClassName("menu-list");
var menuLinks = navMenu[0].getElementsByTagName("a");
var mobileMenu = document.querySelector(".mobile-menu");
var colorWhite = "#ffffff";
var colorBlack = "#202020";
var colorGreen = "#00d9a2";
var sideButton = $("header .side-button");
var closeSideButton = $("header .side-button .close-side-button");
function changeColor(elementsList, elColor) {
  var array = Array.from(elementsList);
  array.forEach(function(el)  {
    el.style.color = elColor;
  });
}
var deadline = new Date(2018, 3, 20);
function windowScrolled() {
  $("nav .logo svg > path.logo-fill0").addClass("logo-fill-black");
  header.style.background = colorWhite;
  header.style.zIndex = "100";
  header.style["box-shadow"] = "0 0 14px 0 rgba(41, 70, 112, .25)";
  mobileMenu.style.background = colorWhite;
  mobileMenu.style.boxShadow = "2px 2px 18px rgba(32, 32, 32, .25)";
  $(".sandwich span").css("background-color", colorBlack);
  $("nav .logo > svg path.st0").css("fill", colorBlack);
  changeColor(navMenu, colorBlack);
  $(menuLinks).addClass("black-color");
};
function windowUnscrolled() {
  $("nav .logo svg > path.logo-fill0").removeClass("logo-fill-black");
  header.style.background = "none";
  header.style["box-shadow"] = "none";
  mobileMenu.style.background = "none";
  mobileMenu.style.boxShadow = "none";
  $(".sandwich span").css("background-color", colorWhite);
  $("nav .logo > svg path.st0").css("fill", colorWhite);
  changeColor(navMenu, colorWhite);
  $(menuLinks).removeClass("black-color");
}
function getTimeRemaining(endtime) {
  var remainingTimeInMs = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((remainingTimeInMs / 1000) % 60);
  var minutes = Math.floor((remainingTimeInMs / 1000 / 60) % 60);
  var hours = Math.floor((remainingTimeInMs / (1000 * 60 * 60)) % 24);
  var days = Math.floor(remainingTimeInMs / (1000 * 60 * 60 * 24));
  return {
    total: remainingTimeInMs,
    days,
    hours,
    minutes,
    seconds
  };
}
function initializeClock(id, endtime) {
  var clock = document.querySelector(id);
  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");
  function updateClock() {
    var time = getTimeRemaining(endtime);
    var timeInterval = setInterval(updateClock, 1000);
    daysSpan.innerHTML = `${time.days}`;
    hoursSpan.innerHTML = `0${time.hours}`.slice(-2);
    minutesSpan.innerHTML = `0${time.minutes}`.slice(-2);
    secondsSpan.innerHTML = `0${time.seconds}`.slice(-2);

    if (time.total <= 0) {
      clearInterval(timeInterval);
    }
  };
  updateClock();
};
$(document).ready(function() {
  initializeClock(".counter", deadline);
  initializeClock("#counter-2", deadline);

  $(".close-side-btn").click(function() {
    sideButton.addClass("closed");
    closeSideButton.toggle(200);
  });
  $("header .side-button img").click(function() {
    sideButton.toggleClass("closed");
    closeSideButton.toggle(200);
  });
  $(".sandwich").click(function() {
    $(".sandwich").toggleClass("sandwich-open");
    $("nav .logo svg > path.logo-fill0").toggleClass("logo-fill-black");
    $("nav .logo").css("z-index", "150");
    $(".overlay-menu").toggleClass("overlay-active");
    $("header .sandwich span").toggleClass("dark-background");
  });
  $(window).scroll(function (ev) {
    var scroll = $(window).scrollTop();
    // console.log('Window is scrolled for '+ scroll + ' px');
    if (scroll > 10) {
      windowScrolled();
    } else {
      windowUnscrolled();
    }
  });
  $(".desktop-menu ul.menu-list > li > a").click(
    function(ev) {
      ev.preventDefault();
      var hrefGoTo = $(this).attr("href");
      var position = $(hrefGoTo).offset().top - 80;
      console.log('Menu clicked');
    }
  )
  $(".overlay-menu ul li a").click(
    function(ev) {
      ev.preventDefault();
      var hrefGoTo = $(this).attr("href");
      var position = $(hrefGoTo).offset().top - 60;
      $(".sandwich").click();
      $(".overlay-menu").removeClass("overlay-active");
      window.setTimeout(() => {
        $("html, body")
          .stop()
          .animate({ scrollTop: position }, 500);
      }, 0);
    }
  );
  console.log('Window width is '+ windowWidth + ' px');
  if (windowWidth < 1025) {
    if (windowWidth < 601) {
      $(".our-team.cards").owlCarousel({
        stagePadding: 15,
        autoWidth: true,
        loop: false,
        center: true,
        items: 2,
        margin: 0,
        dots: true,
        dotsEach: true
      });
    } else {
      $(".our-team.cards").owlCarousel({
        stagePadding: 50,
        autoWidth: true,
        loop: false,
        center: false,
        items: 3,
        margin: 0,
        dots: true,
        dotsEach: true
      });
    }
  }
  Array.from(menuLinks).forEach(function(element) {
    element.addEventListener("mouseenter", function(event) {
      event.target.style.color = colorGreen;
      event.target.style.borderBottom = "2px solid #00d9a2";
    });
    element.addEventListener("mouseleave", function(event) {
      event.target.style.color = "inherit";
      event.target.style.borderBottom = "none";
    });
  });
});
