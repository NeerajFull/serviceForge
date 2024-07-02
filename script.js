
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
        } else {
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




const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");

const userInfo = {
    name: "",
    email: "",
    password: ""
}

function getInput(element) {
    return function () {
        const input = element.value;
        userInfo[element.getAttribute("name")] = input;
    }
}

nameInput.onchange = getInput(nameInput);
emailInput.onchange = getInput(emailInput);
passwordInput.onchange = getInput(passwordInput);
loginEmailInput.onchange = getInput(loginEmailInput);
loginPasswordInput.onchange = getInput(loginPasswordInput);

function showErrorMessage(error, popup) {
    let errorElement;
    if (popup === "login") {
        errorElement = document.getElementById("loginError");
    } else {
        errorElement = document.getElementById("error")
    }

    errorElement.innerText = error;

    setTimeout(() => {
        errorElement.innerText = ``
    }, 3000)
}


const validateFields = (userInfo, requiredFields, popup) => {
    for (let field of requiredFields) {
        if (!userInfo[field]?.trim()) {
            showErrorMessage(`Please fill all the fields.`, popup);
            return false;
        }
    }
    return true;
}


const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("userInfo");
    return user ? JSON.parse(user) : null;
}

const createUserInLocalStorage = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify({
        name: userInfo.name.trim(),
        email: userInfo.email.trim().toLowerCase(),
        password: userInfo.password
    }));
}

const validateEmailFormat = (email, popup) => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email.trim())) {
        showErrorMessage(`Incorrect email format`, popup);
        return false;
    }
    return true;
}

const compareInputs = (userInput, storedInput) => {
    if (userInput.trim() === storedInput.trim()) {
        return true;
    }
    return false;
}


const handleLogin = (e) => {
    e.preventDefault();

    //missing fields check
    if (!validateFields(userInfo, ["email", "password"], "login")) return;

    const user = getUserFromLocalStorage();
    //checking if the user already exists
    if (!user) {
        showErrorMessage("User doesn't exist", "login");
        return;
    }

    if (!validateEmailFormat(userInfo.email, "login")) {
        return;
    }

    // user is there, now check email
    if (compareInputs(userInfo.emailtoLowerCase(), user.email)) {
        if (compareInputs(userInfo.password, user.password)) {
            closePopup("login");
        } else {
            showErrorMessage("Incorrect password", "login");
            return;
        }
    } else {
        showErrorMessage("User doesn't exists", "login");
        return;
    }

}

const handleSignup = (e) => {
    e.preventDefault();

    //missing fields check
    if (!validateFields(userInfo, ["name", "email", "password"], "singup")) return;

    //name and password are of more than 2 and 4 chars respectively
    if (userInfo.name.trim().length > 2) {
        if (userInfo.password.length > 4) {
            //checking if the user already exists
            const user = getUserFromLocalStorage();
            if (user) {
                if (!validateEmailFormat(userInfo.email, "signup")) return;

                if (compareInputs(userInfo.email.toLowerCase(), user.email)) {
                    showErrorMessage("User already exists", "signup");
                    return;
                } else {
                    //create user
                    createUserInLocalStorage(userInfo);
                    closePopup("signup");
                }
            } else {
                //create user
                createUserInLocalStorage(userInfo);
                closePopup("signup");
            }

        } else {
            showErrorMessage(`Password should be more than 4 chars.`, "signup")
            return;
        }
    } else {
        showErrorMessage(`Name should be more than 2 chars.`, "signup")
        return;
    }

}