const form = document.getElementById("subscribeForm");
const emailInput = document.getElementById("email");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop page reload

  const email = emailInput.value.trim();

  // Simple email regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    message.textContent = "Email is required";
    message.className = "text-red-600";
    return;
  }

  if (!emailPattern.test(email)) {
    message.textContent = "Please enter a valid email address";
    message.className = "text-red-600";
    return;
  }

  // Success
  message.textContent = "Subscribed successfully!";
  message.className = "text-green-600";
  form.reset();
});
