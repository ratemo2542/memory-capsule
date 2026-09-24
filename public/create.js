const memoryForm = document.getElementById("memoryForm");
const MAX_PHOTOS = 6;
const MAX_PHOTO_SIZE = 1_500_000;

const setError = (id, message) => {
  document.getElementById(id).textContent = message;
};

memoryForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const recipient = document.getElementById("recipient").value.trim();
  const occasion = document.getElementById("occasion").value;
  const message = document.getElementById("message").value.trim();
  const photoFiles = [...document.getElementById("photos").files];
  let isValid = true;

  setError("recipientError", "");
  setError("occasionError", "");
  setError("messageError", "");
  setError("formError", "");

  if (!recipient) {
    setError("recipientError", "Please add the recipient's name.");
    isValid = false;
  }
  if (!occasion) {
    setError("occasionError", "Please choose an occasion.");
    isValid = false;
  }
  if (!message) {
    setError("messageError", "Please write a message.");
    isValid = false;
  }
  if (photoFiles.length > MAX_PHOTOS) {
    setError("formError", `Please choose no more than ${MAX_PHOTOS} images.`);
    isValid = false;
  }
  if (photoFiles.some((file) => !file.type.startsWith("image/") || file.size > MAX_PHOTO_SIZE)) {
    setError("formError", "Each photo must be an image smaller than 1.5 MB.");
    isValid = false;
  }
  if (!isValid) return;

  const submitButton = memoryForm.querySelector("button[type=submit]");
  submitButton.disabled = true;
  submitButton.querySelector(".button-label").textContent = "Building capsule…";

  try {
    const photos = await Promise.all(photoFiles.map(readFile));
    localStorage.setItem("memoryCapsule", JSON.stringify({
      recipient,
      occasion,
      message,
      photos,
      createdAt: new Date().toISOString()
    }));
    window.location.assign("capsule.html");
  } catch (error) {
    setError("formError", "Your photos could not be saved. Try smaller images or fewer photos.");
    submitButton.disabled = false;
    submitButton.querySelector(".button-label").textContent = "Save capsule";
  }
});

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
