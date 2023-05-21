const email = document.getElementById("email");
const password = document.getElementById("password");
const eye = document.getElementById("eye");
const loginButton = document.getElementById("login");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const oops = document.getElementById("oops");

email.addEventListener("input", emailInputField);
password.addEventListener("input", passwordInputField);
eye.addEventListener("click", hide);
loginButton.addEventListener("click", login);

function emailInputField(event) {
  if (email.value) {
    email.classList.remove("field-input-empty");
    email.classList.add("field-input-not-empty");
    emailError.classList.remove("error-appear");
    email.classList.remove("error-field");
  } else {
    email.classList.remove("field-input-not-empty");
    email.classList.add("field-input-empty");
  }
}

function passwordInputField(event) {
  if (password.value) {
    password.classList.remove("field-input-empty");
    password.classList.add("field-input-not-empty");
    passwordError.classList.remove("error-appear");
    password.classList.remove("error-field");
    eye.classList.remove("error-eye");
  } else {
    password.classList.remove("field-input-not-empty");
    password.classList.add("field-input-empty");
  }
}

function hide() {
  if (password.type == "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

function logi() {
  oops.classList.add("height-44");
  if (email.value == "") {
    emailError.classList.add("error-appear");
    email.classList.add("error-field");
  }
  if (password.value == "") {
    passwordError.classList.add("error-appear");
    password.classList.add("error-field");
    eye.classList.add("error-eye");
  }
}

function login() {
  if (email.value != "" && password.value != "") {
    const logi = {
      email: email.value,
      password: password.value,
    };
    console.log(logi);
    oops.classList.remove("height-44");
  } else {
    logi();
  }
}
