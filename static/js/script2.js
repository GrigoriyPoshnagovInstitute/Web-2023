const titleField = document.querySelector("#title-field");
const descriptionField = document.querySelector("#description-field");
const nameField = document.querySelector("#name-field");
const dateField = document.querySelector("#date-field");
const uploadAvatarButton = document.querySelector("#upload-avatar-button");
const uploadAvatarHidden = document.querySelector("#upload-avatar-hidden");
const removeAvatarButton = document.querySelector("#remove-avatar");
const heroField = document.querySelector("#hero-field");
const uploadHeroButton = document.querySelector("#upload-hero-button");
const uploadHeroHidden = document.querySelector("#upload-hero-hidden");
const removeHeroButton = document.querySelector("#remove-hero");
const formatInformation = document.querySelector("#format-information");
const publishButton = document.querySelector("#publish-button");
const content = document.querySelector("#content");
const smallCamera = document.querySelector("#small-camera-avatar");
const avatarField = document.querySelector("#avatar-field");
const cardAvatar = document.querySelector("#card-avatar");
const previewHero = document.querySelector("#preview-image");
const cardHero = document.querySelector("#card-image");
const previewTitle = document.querySelector("#preview-title");
const cardTitle = document.querySelector("#card-title");
const previewDescription = document.querySelector("#preview-description");
const cardDescription = document.querySelector("#card-description");
const cardName = document.querySelector("#card-name");
const cardDate = document.querySelector("#card-date");

let avatarImage = "";
let heroImage = "";

titleField.addEventListener("input", inputTitle);
descriptionField.addEventListener("input", inputDescription);
nameField.addEventListener("input", inputName);
dateField.addEventListener("input", inputDate);
uploadAvatarButton.addEventListener("click", clickUploadAvatar);
uploadAvatarHidden.addEventListener("change", uploadAvatar);
removeAvatarButton.addEventListener("click", removeAvatar);
heroField.addEventListener("click", clickUploadHero);
uploadHeroButton.addEventListener("click", clickUploadHero);
uploadHeroHidden.addEventListener("change", uploadHero);
removeHeroButton.addEventListener("click", removeHero);
publishButton.addEventListener("click", publish);

function inputTitle() {
  if (titleField.value) {
    titleField.classList.remove("field-input-empty");
    titleField.classList.add("field-input-not-empty");
  } else {
    titleField.classList.remove("field-input-not-empty");
    titleField.classList.add("field-input-empty");
  }
  previewTitle.innerHTML = titleField.value;
  cardTitle.innerHTML = titleField.value;
}

function inputDescription() {
  if (descriptionField.value) {
    descriptionField.classList.remove("field-input-empty");
    descriptionField.classList.add("field-input-not-empty");
  } else {
    descriptionField.classList.remove("field-input-not-empty");
    descriptionField.classList.add("field-input-empty");
  }
  previewDescription.innerHTML = descriptionField.value;
  cardDescription.innerHTML = descriptionField.value;
}

function inputName() {
  if (nameField.value) {
    nameField.classList.remove("field-input-empty");
    nameField.classList.add("field-input-not-empty");
  } else {
    nameField.classList.remove("field-input-not-empty");
    nameField.classList.add("field-input-empty");
  }
  cardName.innerHTML = nameField.value;
}

function inputDate() {
  if (dateField.value) {
    dateField.classList.remove("field-input-empty");
    dateField.classList.add("field-input-not-empty");
  } else {
    dateField.classList.remove("field-input-not-empty");
    dateField.classList.add("field-input-empty");
  }
  cardDate.innerHTML = dateField.valueAsDate.toLocaleDateString("en-US");
}

function clickUploadAvatar() {
  document.querySelector("#upload-avatar-hidden").click();
}

function uploadAvatar() {
  const file = document.querySelector("#upload-avatar-hidden").files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      avatarField.src = reader.result;
      cardAvatar.src = reader.result;
      smallCamera.classList.remove("hidden");
      removeAvatarButton.classList.remove("hidden");
      uploadAvatarButton.innerHTML = "Upload new";
      avatarImage = reader.result.substring(23);
    },
    false
  );
  reader.readAsDataURL(file);
}

function removeAvatar() {
  avatarField.src = "/static/img/camera.png";
  cardAvatar.src = "/static/img/gray.png";
  smallCamera.classList.add("hidden");
  removeAvatarButton.classList.add("hidden");
  uploadAvatarButton.innerHTML = "Upload";
}

function clickUploadHero() {
  document.querySelector("#upload-hero-hidden").click();
}

function uploadHero() {
  const file = document.querySelector("#upload-hero-hidden").files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      heroField.src = reader.result;
      previewHero.src = reader.result;
      cardHero.src = reader.result;

      uploadHeroButton.classList.remove("hidden");
      removeHeroButton.classList.remove("hidden");
      formatInformation.classList.add("hidden");
      heroImage = reader.result.substring(23);
    },
    false
  );
  reader.readAsDataURL(file);
}

function removeHero() {
  heroField.src = "/static/img/hero-image.png";
  previewHero.src = "/static/img/gray2.png";
  cardHero.src = "/static/img/gray3.png";
  uploadHeroButton.classList.add("hidden");
  removeHeroButton.classList.add("hidden");
  formatInformation.classList.remove("hidden");
}

function publish() {
  if (
    titleField.value != "" &&
    descriptionField.value != "" &&
    nameField.value != "" &&
    dateField.value != "" &&
    avatarImage != "" &&
    heroImage != "" &&
    content.value != ""
  ) {
    const post = {
      title: titleField.value,
      description: descriptionField.value,
      name: nameField.value,
      date: dateField.value,
      avatar: avatarImage,
      heroImage: heroImage,
      content: content.value,
    };
    console.log(post);
  } else {
    console.log("mda...");
  }
}
