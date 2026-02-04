const form = document.getElementById("subscribe-form");
const msg = document.getElementById("form-message");

// Only attach behavior if the form exists on the page
if (form && msg) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    // allows only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!name || !nameRegex.test(name)) {
      msg.textContent = "Invalid Input. Please use letters only.";
      msg.className = "text-red-600";
      return;
    }

    if (!email.includes("@")) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "text-red-600";
      return;
    }

    msg.textContent = "Subscription successful";
    msg.className = "text-green-600";

    // Show confirmation alert
    alert("Subscription successful!");

    form.reset();
  });
}
