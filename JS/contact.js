import { toggleNavDisplay } from '/JS/functions.js';
import { hamburgerMenu } from '/JS/functions.js';
import { navDisplay } from '/JS/functions.js';
import { baseUrl } from '/JS/baseUrl.js'; // Import the baseUrl for WordPress API

const form = document.querySelector("#contactForm");
const userName = document.querySelector("#name");
const nameError = document.querySelector("#name-error");

const userSubject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const userMessage = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

const userEmail = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

function validateForm(event) {
    event.preventDefault();

    // Check form fields
    const isNameValid = checkLength(userName.value, 5);
    const isSubjectValid = checkLength(userSubject.value, 15);
    const isMessageValid = checkLength(userMessage.value, 25);
    const isEmailValid = validateEmail(userEmail.value);

    // Display error messages
    nameError.style.display = isNameValid ? "none" : "block";
    subjectError.style.display = isSubjectValid ? "none" : "block";
    messageError.style.display = isMessageValid ? "none" : "block";
    emailError.style.display = isEmailValid ? "none" : "block";

    // If all fields are valid, send data to WordPress
    if (isNameValid && isSubjectValid && isMessageValid && isEmailValid) {
        sendDataToWordPress();
    }
}

form.addEventListener("submit", validateForm);

function sendDataToWordPress() {
    const formData = {
        author_name: userName.value,
        email: userEmail.value,
        title: userSubject.value,
        content: userMessage.value
    };

    fetch('https://www.jarlerm.no/wp-json/wp/v2/comments?', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok) {
            alert('Message submitted successfully!');
            form.reset(); // Reset the form
        } else {
            alert('Failed to submit message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
}

function checkLength(value, len) {
    return value.trim().length >= len;
}

function validateEmail(email) {
    const regEx = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regEx.test(email);
}

toggleNavDisplay(hamburgerMenu, navDisplay, 700);
