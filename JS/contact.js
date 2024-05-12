const form = document.querySelector("#contactForm");
const userName = document.querySelector("#name");
const nameError = document.querySelector("#name-error");

const userSubject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const userMessage = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

const userEmail = document.querySelector("#email");
const emailError = document.querySelector("#email-error");


function validateForm() {

    event.preventDefault();

    if (checkLength(userName.value, 5) === true) {
        nameError.style.display = "none";}

    else {
        nameError.style.display = "block";
    }

    if (checkLength(userSubject.value, 15) === true) {
        subjectError.style.display = "none";}

    else {
        subjectError.style.display = "block";
    }

    if (checkLength(userMessage.value, 25) === true) {
        messageError.style.display = "none";}

    else {
        messageError.style.display = "block";
    }

    if (validateEmail(userEmail.value) === true){
        emailError.style.display = "none";
    }

    else {
        emailError.style.display = "block";
    }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
const regEx = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}