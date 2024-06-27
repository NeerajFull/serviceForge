
const hamburger = document.getElementsByClassName("hamburger")[0];


hamburger.addEventListener("click", () => {
    document.getElementsByClassName("dropdown")[0].classList.toggle("sm-show");
})

const slider = document.getElementsByClassName("slider");
const leftArrow = document.getElementsByClassName("left-arrow")[0];
const rightArrow = document.getElementsByClassName("right-arrow")[0];

slider[0].classList.remove("sm-hide");

let sl = 0;


leftArrow.addEventListener("click", () => {
    sl--;

    if (sl < 0) {
        sl = slider.length - 1;
    }

    hideOrShow(sl);
});

rightArrow.addEventListener("click", () => {
    sl++;

    if (sl > 3) {
        sl = 0;
    }
    hideOrShow(sl);
});

let intervalId;

function hideOrShow(sl) {
    for (let i = 0; i < slider.length; i++) {
        if (i == sl) {
            slider[i].classList.remove("sm-hide");
        } else {
            slider[i].classList.add("sm-hide");
        }
    }
}

const slideShow = document.getElementById("slideShow")


let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            intervalId = setInterval(() => {
                if (sl > 3) {
                    sl = 0;
                } else if (sl < 0) {
                    sl = slider.length - 1;
                }

                hideOrShow(sl);

                sl++;

            }, 2000);
        }else{
            clearInterval(intervalId);
        }
    });
}, {
    threshold: 0.5
});

observer.observe(slideShow);


//--------------------------
//login popup
let popup;

function closePopup(mode) {
    if (mode === "login") {
        popup = document.getElementById("loginPopup");
    }
    else {
        popup = document.getElementById("signupPopup");
    }
    document.getElementById("mainBody").classList.remove("blurred");
    popup.classList.add("hide");
}

function openPopup(mode) {
    if (mode === "login") {
        popup = document.getElementById("loginPopup");
    }
    else {
        popup = document.getElementById("signupPopup");
    }
    document.getElementById("mainBody").classList.add("blurred");
    popup.classList.remove("hide");
}