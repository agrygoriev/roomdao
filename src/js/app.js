let windowWidth = $(window).width();
let header = document.getElementsByTagName("header")[0];
let doc = document.documentElement;
let logo = document.getElementById("logo-img");
let navMenu = document.getElementsByClassName("menu-list");
// console.log(navMenu);
let menuLinks = navMenu[0].getElementsByTagName("a");
// console.log(menuLinks);
let signin = document.getElementsByClassName("signin")[0];
let langSwitch = document.getElementsByClassName("lang-switch")[0];
let langSwitchBorder = langSwitch.firstElementChild;
let mobileMenu = document.querySelector(".mobile-menu");
// console.log(mobileMenu);
let colorWhite = "#ffffff";
let colorBlack = "#202020";
window.onscroll = function(ev) {
    let scroll = (this.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (scroll > 10) {
        logo.style.display = "block";
        header.style.background = colorWhite;
        header.style.zIndex = "100";
        header.style["box-shadow"] = "0 0 14px 0 rgba(41, 70, 112, .25)";
        mobileMenu.style.background = colorWhite;
        // mobileMenu.css('box-shadow','2px 2px 18px rgba(32, 32, 32, .25)')
        mobileMenu.style.boxShadow = "2px 2px 18px rgba(32, 32, 32, .25)";
        changeColor(navMenu, colorBlack);
        $('nav .lang-switch').css('color', colorBlack);
        $('nav .lang-switch select').css('border-color', colorBlack);
        $('.sandwich span').css('background-color', colorBlack);
        $('nav .logo > #logo-img path.st0').css('fill', colorBlack);
        langSwitch.style.color = colorBlack;
        langSwitchBorder.style.borderColor = colorBlack;
        // signin.classList.remove("signin");
        // signin.classList.add("signin-dark");
        changeColor(menuLinks, colorBlack);
        // console.log("Page scrolled");
    } else {
        logo.style.display = "none";
        header.style.background = "none";
        header.style["box-shadow"] = "none";
        // mobileMenu.style["box-shadow"] = "none";
        mobileMenu.style.background = "none";
        mobileMenu.style.boxShadow = "none";
        $('nav .lang-switch').css('color', colorWhite);
        $('nav .lang-switch select').css('border-color', colorWhite);
        $('.sandwich span').css('background-color', colorWhite);
        $('nav .logo > #logo-img path.st0').css('fill', colorWhite);
        changeColor(navMenu, colorWhite);
        changeColor(menuLinks, colorWhite);
        langSwitch.style.color = colorWhite;
        // signin.classList.remove("signin-dark");
        // signin.classList.add("signin");
        langSwitchBorder.style.borderColor = colorWhite;
        // console.log("Page isn't scrolled");
    }
};
function changeColor(array, color) {
    for (let element of array) {
        element.style.color = color;
    }
}
window.onload = function() {
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
    }
    
    function initializeClock(id, endtime) {
        var clock = document.querySelector(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
        
        function updateClock() {
            var t = getTimeRemaining(endtime);
        
            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        
            if (t.total <= 0) {
            clearInterval(timeinterval);
            }
        }
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    };
    
    var deadline = new Date(2018, 0, 31);
    initializeClock('.counter', deadline);
    initializeClock('#counter-2', deadline);
};
$('.sandwich').click(function(){
    $(this).toggleClass('close-btn');
    $('.overlay-menu').toggleClass('overlay-active');
    $('header .sandwich span').toggleClass('dark-background');
});
$('.overlay-menu ul li a, .desktop-menu ul li a').click(function (ev) {
    var hrefGoTo = $(this).attr('href');
    var windowWidth = $(window).width();
    var position = $(hrefGoTo).offset().top - 90;
    ev.preventDefault();
    if (windowWidth <= 1024) {
        $('.overlay-menu').toggleClass('overlay-active');
        $('.sandwich').toggleClass('close-btn');
    } else if (windowWidth <= 375) {
        position = $(href).offset().top - 60;
    }
    $('html, body').animate({scrollTop: position}, 'slow');
});
$('.roadmap-slider').slick({
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dots: true,
    infinite: true,
    // autoplay: true
});
var prevArrow = '<span class="slide-prev"><svg class="prev-button arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 40"><path d="M4.2 40L.1 34.9l14-14.5L0 5l4.4-5L23 20.5 4.2 40z"/></svg></span>';
var nextArrow = '<span class="slide-next"><svg class="next-button arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 40"><path d="M4.2 40L.1 34.9l14-14.5L0 5l4.4-5L23 20.5 4.2 40z"/></svg></span>';


if (windowWidth <=1024) {
    
    $('.articles.slider .slides').slick({
        arrows: false,
        dots: true,
        // infinite: true,
        // centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        slidesToScroll: 1,
        // centerMode: true,
        variableWidth: true
        // autoplay: true
    });
    if (windowWidth <600) {
        $('.about-us.slider .slides').slick({
            arrows: false,
            dots: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            // autoplay: true
        });
    } else {
        $('.about-us.slider .slides').slick({
            arrows: false,
            dots: true,
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            // autoplay: true
        });
    }
    $('.videos.cards.slider .slides').slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true
        // autoplay: true
    });
    $('.our-team.cards').slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true
    })
} else {
    console.log(windowWidth);
    $('.articles.slider .slides').slick({
        arrows: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        // autoplay: true
    });
    $('.about-us.slider .slides').slick({
        arrows: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        // autoplay: true
    });
    console.log($('.about-us.slider .slides'));
    $('.videos.cards.slider .slides').slick({
        arrows: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay: true
    })
}
