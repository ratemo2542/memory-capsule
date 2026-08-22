const memoryForm = document.getElementById("memoryForm");

memoryForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const recipient = document.getElementById("recipient").value;
    const occasion = document.getElementById("occasion").value;
    const message = document.getElementById("message").value;

    localStorage.setItem("recipient", recipient);
    localStorage.setItem("occasion", occasion);
    localStorage.setItem("message", message);

    window.location.href = "capsule.html";
});