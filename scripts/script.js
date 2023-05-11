const field1 = document.getElementById("field1");
const field2 = document.getElementById("field2");
const field3 = document.getElementById("field3");
const field4 = document.getElementById("field4");
const upload1 = document.getElementById("upload1");
const upload2 = document.getElementById("img3");
const removeButton = document.getElementById("remove-button");
const SmallCamToHide = document.getElementById("small-cam-to-hide");
const UploadText = document.getElementById("upload-text");
const replaceButton1 = document.getElementById("replace1");
const span1 = document.getElementById("span1");
const removeButton1 = document.getElementById("remove-button1");

function uploadimg() {
  document.getElementById("getFile").click();
}

function uploadimg2() {
  if (span1.style.display == "block") {
    document.getElementById("getFile2").click();
  }
}

function uploadimg3() {
  document.getElementById("getFile2").click();
}

function previewFile() {

  const preview = document.getElementById("img1");
  const preview2 = document.getElementById("img2");
  const file = document.querySelector("#getFile").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      preview.src = reader.result;
      preview2.src = reader.result;
      removeButton.style.display = "flex";
      SmallCamToHide.style.display = "block";
      UploadText.innerHTML = "Upload new";
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function removeImg() {
  const preview = document.getElementById("img1");
  const preview2 = document.getElementById("img2");
  preview.src = "/static/img/camera.png";
  preview2.src = "/static/img/gray.png";
  removeButton.style.display = "none";
  SmallCamToHide.style.display = "none";
  UploadText.innerHTML = "Upload";
}

function handler(event) {
  const elem = event.target;
  if (elem.value) {
    elem.style.backgroundColor = "#F7F7F7";
  } else {
    elem.style.backgroundColor = "#FFFFFF";
  }
}

function previewHeroFile() {
  const preview = document.getElementById("img3");
  const preview2 = document.getElementById("img4");
  const file = document.querySelector("#getFile2").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      preview.src = reader.result;
      preview2.src = reader.result;
      replaceButton1.style.display = "flex";
      removeButton1.style.display = "flex";
      span1.style.display = "none";
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function removeImg1() {
  const preview = document.getElementById("img3");
  const preview2 = document.getElementById("img4");
  preview.src = "/static/img/hero-image.png";
  preview2.src = "/static/img/gray2.png";
  removeButton1.style.display = "none";
  replaceButton1.style.display = "none";
  span1.style.display = "block";
}

field1.addEventListener("input", handler);
field2.addEventListener("input", handler);
field3.addEventListener("input", handler);
field4.addEventListener("input", handler);
upload1.addEventListener("click", uploadimg);

upload2.addEventListener("click", uploadimg2);

replaceButton1.addEventListener("click", uploadimg3);
