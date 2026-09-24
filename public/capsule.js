let capsule = null;

try {
  capsule = JSON.parse(localStorage.getItem("memoryCapsule") || "null");
} catch (_error) {
  localStorage.removeItem("memoryCapsule");
}
const emptyState = document.getElementById("emptyState");
const capsuleContent = document.getElementById("capsuleContent");

if (!capsule || !capsule.recipient || !capsule.message) {
  emptyState.hidden = false;
} else {
  capsuleContent.hidden = false;
  document.getElementById("recipientName").textContent = capsule.recipient;
  document.getElementById("occasionName").textContent = capsule.occasion;
  document.getElementById("memoryMessage").textContent = capsule.message;

  const photos = Array.isArray(capsule.photos) ? capsule.photos : [];
  const gallery = document.getElementById("photoGallery");
  if (photos.length) {
    photos.forEach((source, index) => {
      const image = document.createElement("img");
      image.src = source;
      image.alt = `Memory ${index + 1} for ${capsule.recipient}`;
      gallery.appendChild(image);
    });
  } else {
    gallery.remove();
  }
}

document.querySelectorAll("[data-create-another]").forEach((button) => {
  button.addEventListener("click", () => window.location.assign("Create.html"));
});

document.getElementById("clearCapsule").addEventListener("click", () => {
  localStorage.removeItem("memoryCapsule");
  window.location.assign("Create.html");
});
