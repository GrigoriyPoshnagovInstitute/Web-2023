const titleField = document.getElementById("title-field");
const descriptionField = document.getElementById("description-field");
const nameField = document.getElementById("name-field");
const dateField = document.getElementById("date-field");
const uploadAvatarButton = document.getElementById("upload-avatar-button");
const uploadAvatarHidden = document.getElementById("upload-avatar-hidden");
const removeAvatarButton = document.getElementById("remove-avatar");
const heroField = document.getElementById("hero-field");
const uploadHeroButton = document.getElementById("upload-hero-button");
const uploadHeroHidden = document.getElementById("upload-hero-hidden");
const removeHeroButton = document.getElementById("remove-hero");
const formatInformation = document.getElementById("format-information");
const publishButton = document.getElementById("publish-button");
const content = document.getElementById("content");

let avatarImage = "";
let heroImage = "";

titleField.addEventListener("input", inputField);
descriptionField.addEventListener("input", inputField);
nameField.addEventListener("input", inputField);
dateField.addEventListener("input", inputField);
uploadAvatarButton.addEventListener("click", clickUploadAvatar)
uploadAvatarHidden.addEventListener("change", uploadAvatar)
removeAvatarButton.addEventListener("click", removeAvatar)
heroField.addEventListener("click", clickUploadHero)
uploadHeroButton.addEventListener("click", clickUploadHero)
uploadHeroHidden.addEventListener("change", uploadHero)
removeHeroButton.addEventListener("click", removeHero)
publishButton.addEventListener("click", publish)

function inputField(event) {
  const elem = event.target;
  if (elem.value) {
    elem.style.backgroundColor = "#F7F7F7";
  } else {
    elem.style.backgroundColor = "#FFFFFF";
  }
  if (elem == titleField) {
    const previewTitle = document.getElementById("preview-title");
    const cardTitle = document.getElementById("card-title");
    previewTitle.innerHTML = titleField.value;
    cardTitle.innerHTML = titleField.value;
  } else if (elem == descriptionField) {
    const previewDescription = document.getElementById("preview-description");
    const cardDescription = document.getElementById("card-description");
    previewDescription.innerHTML = descriptionField.value;
    cardDescription.innerHTML = descriptionField.value;
  } else if (elem == nameField) {
    const cardName = document.getElementById("card-name");
    cardName.innerHTML = nameField.value;
  } else {
    const cardDate= document.getElementById("card-date");
    cardDate.innerHTML = dateField.valueAsDate.toLocaleDateString("en-US");
  }
}

function clickUploadAvatar() {
  document.getElementById("upload-avatar-hidden").click();
}

function uploadAvatar() {
  const smallCamera = document.getElementById("small-camera-avatar");
  const avatarField = document.getElementById("avatar-field");
  const cardAvatar = document.getElementById("card-avatar");
  const file = document.querySelector("#upload-avatar-hidden").files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      avatarField.src = reader.result;
      cardAvatar.src = reader.result;
      smallCamera.style.display = "block";
      removeAvatarButton.style.display = "flex";
      uploadAvatarButton.innerHTML = "Upload new";
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", () => {
      avatarImage = reader.result.substring(23);
    });
  } 
}

function removeAvatar() {
  const smallCamera = document.getElementById("small-camera-avatar");
  const avatarField = document.getElementById("avatar-field");
  const cardAvatar = document.getElementById("card-avatar");
  avatarField.src = "/static/img/camera.png";
  cardAvatar.src = "/static/img/gray.png";
  smallCamera.style.display = "none";
  removeAvatarButton.style.display = "none";
  uploadAvatarButton.innerHTML = "Upload";  
}

function clickUploadHero() {
  document.getElementById("upload-hero-hidden").click();
}

function uploadHero() {
  const heroField = document.getElementById("hero-field");
  const previewHero = document.getElementById("preview-image");
  const cardHero = document.getElementById("card-image");
  const file = document.querySelector("#upload-hero-hidden").files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      heroField.src = reader.result;
      previewHero.src = reader.result;
      cardHero.src = reader.result;

      uploadHeroButton.style.display = "flex";
      removeHeroButton.style.display = "flex";
      formatInformation.style.display = "none";
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", () => {
      heroImage = reader.result.substring(23);
    });
  }
}

function removeHero() {
  const heroField = document.getElementById("hero-field");
  const previewHero = document.getElementById("preview-image");
  const cardHero = document.getElementById("card-image");
  heroField.src = "/static/img/hero-image.png";
  previewHero.src = "/static/img/gray2.png";
  cardHero.src = "/static/img/gray3.png";
  uploadHeroButton.style.display = "none";
  removeHeroButton.style.display = "none";
  formatInformation.style.display = "block";
}

function publish(){
  if ((titleField.value != "") &&
     (descriptionField.value != "") &&
     (nameField.value != "") &&
     (dateField.value != "") &&
     (avatarImage != "") &&
     (heroImage != "") &&
     (content.value != "")) {

    const post = {
      title: titleField.value,
      description: descriptionField.value,
      name: nameField.value,
      date: dateField.value,
      avatar: avatarImage,
      heroImage: heroImage,
      content: content.value
    }
    console.log(post);
  } else {
    console.log("mda...");
  }

}