/* -----------------
Stop Scrolling && Page Loader 
--------------*/

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch (e) {}

var wheelOpt = supportsPassive ? {
    passive: false
} : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}



window.addEventListener("load", function () {
    /* -------------------- Page Loader--------------------- */
    document.querySelector(".pageLoader").classList.add("fade-out");
    disableScroll();
    setTimeout(function () {
        document.querySelector(".pageLoader").style.display = "none";
        enableScroll();
    }, 2000);
});


/* -----------------
Toggle Navbar 
--------------*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNav);

function toggleNav() {
    navToggler.classList.toggle("active");
    document.querySelector(".navbar").classList.toggle("active");
}

/* -----------------
Close Nav when clicking on nav item 
--------------*/
document.addEventListener("click", function (e) {
    if (e.target.closest(".navbar a")) {
        toggleNav();
    }
});

/* -----------------
Navbar Sticky 
--------------*/
window.addEventListener("scroll", function () {
    if (this.scrollY > 60) {
        document.querySelector(".header").classList.add("sticky");
    } else {
        document.querySelector(".header").classList.remove("sticky");
    }
});

/* -----------------
Home Section Slider 
--------------*/
document.querySelectorAll(".imgSlider img").forEach(images => {

    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector(".mainHomeImg").src = src;
    };
});

/* -----------------
Initialize Swiper Slider 
--------------*/
var swiper = new Swiper(".reviewSlider", {

    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
    },
    keyboard: {
        enabled: true,
    },
    // effect: "flip",
    loop: true,
    grabCursor: true,
});

/* -----------------
Trigger To Top Button
--------------*/

$(window).scroll(function () {
    if ($(this).scrollTop()) {
        $('#toTop').fadeIn();
    } else {
        $('#toTop').fadeOut();
    }
});

$("#toTop").click(function () {
    //1 second of animation time
    //html works for FFX but not Chrome
    //body works for Chrome but not FFX
    //This strange selector seems to work universally
    $("html, body").animate({
        scrollTop: 0
    }, 40);
});

/* -----------------
Prevent anchor Link Behavior
--------------*/
$("#disabledLink").click(function (ev) {
    ev.preventDefault();
});

/* -----------------
Set attribute to all links
--------------*/
// var links = document.getElementsByTagName('a');
// var len = links.length;

// for (var i = 0; i < len; i++) {
//     links[i].target = "_blank";
// }