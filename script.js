
const hamburger = document.getElementsByClassName("hamburger")[0];


hamburger.addEventListener("click", () => {
    
    const dropDown = `<div class="container m-flex-column m-gap">
    <a href="#" class="maven-pro-normal wgt-400 fn-size-18">
        Home
    </a>
    <hr>
    <a href="#" class="maven-pro-normal wgt-400 fn-size-18 ">
        Why
    </a>
    <hr>
    <a href="#" class="maven-pro-normal wgt-400 fn-size-18 ">
        Features
    </a>
    <hr>
    <a href="#" class="maven-pro-normal wgt-400 fn-size-18 ">
        How it Works
    </a>
    <hr>
    <a href="#" class="maven-pro-normal wgt-400 fn-size-18 ">
        Pricing
    </a>
    <hr>
    <a href="#" class="maven-pro-normal wgt-400 fn-size-18">
        Log in
    </a>
    <hr>
    <a class="lato-normal wgt-600 fn-size-16">
        Sign Up
    </a>
</div>`
document.getElementsByClassName("dropdown")[0].innerHTML = dropDown;
document.getElementsByClassName("dropdown")[0].classList.toggle("m-show");


})