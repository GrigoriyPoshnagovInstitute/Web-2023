const email = document.getElementById("email");
const password = document.getElementById("password");
const eye = document.getElementById("eye");
const loginButton = document.getElementById("login");

email.addEventListener("input", inputField);
password.addEventListener("input", inputField);
eye.addEventListener("click", hide);
loginButton.addEventListener("click", login);

function inputField(event) {
  const elem = event.target;
  if (elem.value) {
    elem.style.backgroundColor = "#F7F7F7";
  } else {
    elem.style.backgroundColor = "#FFFFFF";
  }
}

function hide() {
  if (password.type == "password") {
    password.type = "text"
  } else {
    password.type = "password"
  }
}

function login(){
  if ((email.value != "") &&
     (password.value != "")) {

    const logi = {
      email: email.value,
      password: password.value,
    }
    console.log(logi);
  } else {
    console.log("mda...");
  }

}