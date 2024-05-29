
const hamburger = document.getElementsByClassName("hamburger")[0];


hamburger.addEventListener("click", () => {
    document.getElementsByClassName("dropdown")[0].classList.toggle("sm-show");
})