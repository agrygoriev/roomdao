var windowWidth = $(window).width();
var header = document.getElementsByTagName("header")[0];
var doc = document.documentElement;
var navMenu = document.getElementsByClassName("menu-list");
var menuLinks = navMenu[0].getElementsByTagName("a");
var navLogoPath = document.querySelectorAll(".logo > svg > path.logo-fill0");
var mobileMenu = document.querySelector(".mobile-menu");
var colorWhite = "#ffffff";
var colorBlack = "#202020";
var colorGreen = "#00d9a2";
var sideButton = $("header .side-button");
var colorInitial = "#ffffff";
var done = false;
var closeSideButton = $("header .side-button .close-side-btn");
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var player;
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var deadline = new Date(2018, 3, 20);

function onYouTubeIframeAPIReady() {
  var video = $("iframe[src^='//www.youtube.com']");
  var videoCont = $(".video-container");
  video.each(function() {
    $(this)
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');
  });
  $(window).resize(function() {
	  var newWidth = videoCont.width();
	  video.each(function() {
	    var $el = $(this);
	    $el
	        .width(newWidth)
	        .height(newWidth * $el.attr('data-aspectRatio'));
	  });
	}).resize();
  player = new YT.Player('ytvideo', {
    // height: 'auto',
    // width: '100%',
    videoId: 'kv9RXavURq8',
    events: {
      'onReady': onPlayerReady,
    }
  });
}
function onPlayerReady(event) {
  player.addEventListener('onStateChange', function(e) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  });
}
function stopVideo() {
  player.stopVideo();
}
function changeColor(elementsList, elColor) {
  var array = Array.from(elementsList);
  array.forEach(function(el)  {
    el.style.color = elColor;
  });
}
function changeSvgFill(elementsList, elColor) {
  var array = Array.from(elementsList);
  array.forEach(function(el)  {
    el.style.fill = elColor;
  });
}

function windowScrolled() {
  colorInitial = colorBlack;
  // $("nav.mobile-menu .logo svg > path.logo-fill0").addClass("logo-fill-black");
  // changeSvgFill(navLogoPath, colorBlack);
  header.style.background = colorWhite;
  header.style.zIndex = "100";
  header.style["box-shadow"] = "0 0 14px 0 rgba(41, 70, 112, .25)";
  mobileMenu.style.background = colorWhite;
  mobileMenu.style.boxShadow = "2px 2px 18px rgba(32, 32, 32, .25)";
  $("header .sandwich span").addClass("dark-background");
  $("nav .logo > svg path.logo-fill0").css("fill", colorBlack);
  changeColor(navMenu, colorBlack);
  $(menuLinks).addClass("black-color");
  $("nav .logo").addClass("logo-scrolled");
  $("header nav ul.menu-list").addClass("ul-scrolled");
  $("body.faq-body header .mobile-menu .logo svg path.logo-fill0").css("fill", "#202020");
}
function overlayLogoColor () {
  if ($(".sandwich").hasClass("sandwich-open")) {
    $("nav .logo > svg path.logo-fill0").css("fill", colorBlack);
  } else {
    $("nav .logo > svg path.logo-fill0").css("fill", colorWhite);
  }
}
function windowUnscrolled() {
  // $("nav.mobile-menu .logo svg > path.logo-fill0").removeClass("logo-fill-black");
  // changeSvgFill(navLogoPath, colorWhite);
  // colorInitial = colorWhite;
  header.style.background = "none";
  header.style["box-shadow"] = "none";
  mobileMenu.style.background = "none";
  mobileMenu.style.boxShadow = "none";
  // $("header .sandwich span").removeClass("dark-background")
  $("nav .logo > svg path.logo-fill0").css("fill", colorWhite);
  changeColor(navMenu, colorWhite);
  $(menuLinks).removeClass("black-color");
  $("nav .logo").removeClass("logo-scrolled");
  $("header nav ul.menu-list").removeClass("ul-scrolled");
  if ($(".overlay-menu").hasClass("overlay-active")) {
    $("nav .logo > svg path.logo-fill0").css("fill", colorBlack);
    $("header .sandwich span").addClass("dark-background");
  } else {
    $("header .sandwich span").removeClass("dark-background");
  }
  $("body.faq-body header .mobile-menu .logo svg path.logo-fill0").css("fill", "#202020");
}
function getTimeRemaining() {
  var endtime = new Date(2018, 3, 20);
  // console.log("Endtime = " + endtime);
  var remainingTimeInMs = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((remainingTimeInMs / 1000) % 60);
  var minutes = Math.floor((remainingTimeInMs / 1000 / 60) % 60);
  var hours = Math.floor((remainingTimeInMs / (1000 * 60 * 60)) % 24);
  var days = Math.floor(remainingTimeInMs / (1000 * 60 * 60 * 24));
  return {
    // total: remainingTimeInMs,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}
function updateClock() {
  var daysSpan = document.querySelectorAll(".days");
  var hoursSpan = document.querySelectorAll(".hours");
  var minutesSpan = document.querySelectorAll(".minutes");
  var secondsSpan = document.querySelectorAll(".seconds");
  var time = getTimeRemaining();
  // console.log(time);
  Array.from(daysSpan).forEach(function(element) {
    element.innerHTML = prefixZero(parseInt(time.days));
  });
  Array.from(hoursSpan).forEach(function(element) {
    element.innerHTML = prefixZero(parseInt(time.hours));
  });
  Array.from(minutesSpan).forEach(function(element) {
    element.innerHTML = prefixZero(parseInt(time.minutes));
  });
  Array.from(secondsSpan).forEach(function(element) {
    element.innerHTML = prefixZero(parseInt(time.seconds));
  });
  function prefixZero(n) {
    return (n < 10 ? '0' : '') + n;
  }
}
$(document).ready(function() {
  if (window.scrollY) {
    windowScrolled();
  }
  $("body.faq-body header .mobile-menu .logo svg path.logo-fill0").css("fill", "#202020");
  $("nav .logo").click(function(ev) {
    ev.preventDefault();
    if (window.location.href === "http://roomdao.io/") {
      window.setTimeout(function () {
          $('html, body').animate({ scrollTop: 0 }, "slow");
      }, 0);
    } else {
      window.location.href = "http://roomdao.io/";

    }
    return false;
  });
  setInterval(function () { updateClock(); }, 1000);
  $(".info .youtube-video").click(
    function() {
      $(".video-modal").fadeIn(300);
    }
  );

  $(".video-modal-wrap, .video-modal-close-btn").click(function() {
    stopVideo();
    $(".video-modal").fadeOut(300);
  });
  $(closeSideButton).click(function() {
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
    overlayLogoColor();
    $("body.faq-body header .mobile-menu .logo svg path.logo-fill0").css("fill", "#202020");
  });
  $(window).scroll(function (ev) {
    var scroll = $(window).scrollTop();
    // console.log('Window is scrolled for '+ scroll + ' px');
    if (scroll) {
      windowScrolled();
    } else {
      windowUnscrolled();
    }
  });
  $(".faq-collapse-btn").click(
    function() {
      $(this).toggleClass("clicked");
      $(this).siblings(".faq-heading").toggleClass("closed-text-margin-bottom");
      $(this).parent().siblings(".faq-section-text").children("p.faq-text").toggle(400);
    }
  );
  $(".faq-heading").click(
    function() {
      $(this).toggleClass("closed-text-margin-bottom");
      $(this).siblings(".faq-collapse-btn").toggleClass("clicked");
      $(this).parent().siblings(".faq-section-text").children("p.faq-text").toggle(400);
    }
  );
  // $(".desktop-menu ul.menu-list > li > a").click(
  //   function(ev) {
  //     ev.preventDefault();
  //     var hrefGoTo = $(this).attr("href");
  //     if (window.location.href === "http://localhost:3000/") {
  //       if (hrefGoTo === "#faq") {
  //         window.location.href="faq.html";
  //       } else {
  //         var position = $(hrefGoTo).offset().top - 80;
  //         window.setTimeout(function() {
  //           $("html, body")
  //             .animate({ scrollTop: position }, 500);
  //         }, 0);
  //       }
  //     }
  //     if (window.location.href === "http://localhost:3000/faq.html") {
  //       if (hrefGoTo === "#mission" || hrefGoTo === "#desc" || hrefGoTo === "#roadmap-h2" || hrefGoTo === "#our-team-h2" ) {
  //         window.location.href="http://localhost:3000/" + hrefGoTo;
  //         var position = window.location.href.offset().top - 80;
  //         window.setTimeout(function() {
  //           $("html, body")
  //             .animate({ scrollTop: position }, 500);
  //         }, 0);
  //       } else {
  //         var position = $(hrefGoTo).offset().top - 80;
  //         window.setTimeout(function() {
  //           $("html, body")
  //             .animate({ scrollTop: position }, 500);
  //         }, 0);
  //       }
  //     }
  //   }
  // );
  // $(".overlay-menu ul li a").click(
  //   function(ev) {
  //     ev.preventDefault();
  //     var hrefGoTo = $(this).attr("href");
  //     var position = $(hrefGoTo).offset().top - 60;
  //     $(".sandwich").click();
  //     $(".overlay-menu").removeClass("overlay-active");
  //     if (hrefGoTo === "#faq") {
  //       window.location.href="faq.html";
  //     } else {
  //       // console.log(hrefGoTo);
  //       window.location.href="index.html";
  //       window.setTimeout(function() {
  //         $("html, body")
  //           .animate({ scrollTop: position }, 500);
  //       }, 0);
  //     }
  //   }
  // );
  if (windowWidth < 1025) {
    if (windowWidth < 601) {
      $(".our-team.cards").owlCarousel({
        startPosition: "#owl-start",
        stagePadding: 100,
        autoWidth: true,
        // loop: true,
        center: false,
        items: 1,
        // margin: 30,
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
//   Array.from(menuLinks).forEach(function(element) {
//     element.addEventListener("mouseenter", function(event) {
//       event.target.style.color = colorGreen;
//       event.target.style.borderBottom = "2px solid #00d9a2";
//     });
//     element.addEventListener("mouseleave", function(event) {
//       event.target.style.color = colorInitial;
//       event.target.style.borderBottom = "none";
//     });
//   });
});
