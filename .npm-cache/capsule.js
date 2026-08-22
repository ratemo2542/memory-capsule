const recipient = localStorage.getItem("recipient");
const occasion = localStorage.getItem("occasion");
const message = localStorage.getItem("message");
const photos = JSON.parse(localStorage.getItem("photos") || "[]");

document.getElementById("recipient").textContent =
    `For ${recipient} ❤️`;

document.getElementById("occasion").textContent =
    occasion;

document.getElementById("message").textContent =
    message;

const photoContainer = document.getElementById("photos");

photos.forEach(photo => {

    const image = document.createElement("img");

    image.src = photo;

    photoContainer.appendChild(image);

});