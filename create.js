create.js
const memoryForm = document.getElementById("memoryForm");

memoryForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const recipient =
        document.getElementById("recipient").value;

    const occasion =
        document.getElementById("occasion").value;

    const message =
        document.getElementById("message").value;

    const photoFiles =
        document.getElementById("photos").files;

    const photos = [];
    let loaded = 0;

    if (photoFiles.length === 0) {

        saveCapsule(recipient, occasion, message, photos);

        return;
    }

    for (let i = 0; i < photoFiles.length; i++) {

        const reader = new FileReader();

        reader.onload = function(event) {

            photos.push(event.target.result);

            loaded++;

            if (loaded === photoFiles.length) {

                saveCapsule(
                    recipient,
                    occasion,
                    message,
                    photos
                );

            }

        };

        reader.readAsDataURL(photoFiles[i]);
    }

});

function saveCapsule(
    recipient,
    occasion,
    message,
    photos
) {

    localStorage.setItem(
        "recipient",
        recipient
    );

    localStorage.setItem(
        "occasion",
        occasion
    );

    localStorage.setItem(
        "message",
        message
    );

    localStorage.setItem(
        "photos",
        JSON.stringify(photos)
    );

    window.location.href = "capsule.html";
}