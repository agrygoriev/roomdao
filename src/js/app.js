const windowWidth = window.innerWidth;
const header = document.getElementsByTagName("header")[0];
const doc = document.documentElement;
const navMenu = document.getElementsByClassName("menu-list");
const menuLinks = navMenu[0].getElementsByTagName("a");
// const langSwitch = document.getElementsByClassName("lang-switch")[0];
// const langSwitchBorder = langSwitch.firstElementChild;
const mobileMenu = document.querySelector(".mobile-menu");
const colorWhite = "#ffffff";
const colorBlack = "#202020";
const colorGreen = "#00d9a2";
const changeColor = (elementsList, elColor) => {
  const array = Array.from(elementsList);
  array.forEach(el => {
    el.style.color = elColor;
  });
};
$(document).ready(function() {
  $("header .side-button .close-btn").click(() => {
    $("header .side-button").toggleClass("closed");
    $("header .side-button .close-btn").fadeToggle();
  });
  window.onscroll = () => {
    const scroll = (this.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (scroll > 10) {
      $("#logo-img > path.logo-fill0").addClass("logo-fill-black");
      header.style.background = colorWhite;
      header.style.zIndex = "100";
      header.style["box-shadow"] = "0 0 14px 0 rgba(41, 70, 112, .25)";
      mobileMenu.style.background = colorWhite;
      mobileMenu.style.boxShadow = "2px 2px 18px rgba(32, 32, 32, .25)";
      // $("nav .lang-switch").css("color", colorBlack);
      // $("nav .lang-switch select").css("border-color", colorBlack);
      $(".sandwich span").css("background-color", colorBlack);
      $("nav .logo > #logo-img path.st0").css("fill", colorBlack);
      // langSwitchBorder.style.borderColor = colorBlack;
      // changeColor(langSwitch, colorBlack);
      changeColor(navMenu, colorBlack);
      $(menuLinks).addClass("black-color");
    } else {
      $("#logo-img > path.logo-fill0").removeClass("logo-fill-black");
      header.style.background = "none";
      header.style["box-shadow"] = "none";
      mobileMenu.style.background = "none";
      mobileMenu.style.boxShadow = "none";
      // $("nav .lang-switch").css("color", colorWhite);
      // $("nav .lang-switch select").css("border-color", colorWhite);
      $(".sandwich span").css("background-color", colorWhite);
      $("nav .logo > #logo-img path.st0").css("fill", colorWhite);
      changeColor(navMenu, colorWhite);
      // changeColor(langSwitch, colorWhite);
      // langSwitchBorder.style.borderColor = colorWhite;
      $(menuLinks).removeClass("black-color");
    }
  };

  window.onload = () => {
    const getTimeRemaining = endtime => {
      const remainingTimeInMs = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor((remainingTimeInMs / 1000) % 60);
      const minutes = Math.floor((remainingTimeInMs / 1000 / 60) % 60);
      const hours = Math.floor((remainingTimeInMs / (1000 * 60 * 60)) % 24);
      const days = Math.floor(remainingTimeInMs / (1000 * 60 * 60 * 24));
      return {
        total: remainingTimeInMs,
        days,
        hours,
        minutes,
        seconds
      };
    };

    const initializeClock = (id, endtime) => {
      const clock = document.querySelector(id);
      const daysSpan = clock.querySelector(".days");
      const hoursSpan = clock.querySelector(".hours");
      const minutesSpan = clock.querySelector(".minutes");
      const secondsSpan = clock.querySelector(".seconds");
      const updateClock = () => {
        const time = getTimeRemaining(endtime);
        const timeInterval = setInterval(updateClock, 1000);
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

    const deadline = new Date(2018, 1, 20);
    initializeClock(".counter", deadline);
    initializeClock("#counter-2", deadline);
  };
  $(".sandwich").click(() => {
    $(this).toggleClass("close-btn");
    $(".overlay-menu").toggleClass("overlay-active");
    $("header .sandwich span").toggleClass("dark-background");
  });

  $(".overlay-menu ul li a, .desktop-menu ul li a").click(ev => {
    const hrefGoTo = $(this).attr("href");
    let position = $(hrefGoTo).offset().top - 90;
    ev.preventDefault();
    if (windowWidth <= 1024) {
      $(".overlay-menu").toggleClass("overlay-active");
      $(".sandwich").toggleClass("close-btn");
    } else if (windowWidth <= 375) {
      position = $(hrefGoTo).offset().top - 60;
    }
    $("html, body").animate({ scrollTop: position }, "slow");
  });
  const prevArrow =
    '<span class="slide-prev"><svg class="prev-button arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 40"><path d="M4.2 40L.1 34.9l14-14.5L0 5l4.4-5L23 20.5 4.2 40z"/></svg></span>';
  const nextArrow =
    '<span class="slide-next"><svg class="next-button arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 40"><path d="M4.2 40L.1 34.9l14-14.5L0 5l4.4-5L23 20.5 4.2 40z"/></svg></span>';

  if (windowWidth <= 1024) {
    if (windowWidth < 600) {
      $(".about-us.slider .slides").slick({
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1
        // autoplay: true
      });
    } else {
      $(".about-us.slider .slides").slick({
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1
        // autoplay: true
      });
    }
    $(".videos.cards.slider .slides").slick({
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      variableWidth: true
      // autoplay: true
    });
    $(".our-team.cards").slick({
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true
    });
  } else {
    $(".about-us.slider .slides").slick({
      arrows: true,
      prevArrow,
      nextArrow,
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1
      // autoplay: true
    });
    $(".videos.cards.slider .slides").slick({
      arrows: true,
      prevArrow,
      nextArrow,
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1
      // autoplay: true
    });
  }
  Array.from(menuLinks).forEach(element => {
    element.addEventListener("mouseenter", event => {
      event.target.style.color = colorGreen;
      event.target.style.borderBottom = "2px solid #00d9a2";
    });
    element.addEventListener("mouseleave", event => {
      event.target.style.color = "inherit";
      event.target.style.borderBottom = "none";
    });
  });
});
