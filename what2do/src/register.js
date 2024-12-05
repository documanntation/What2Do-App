const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:8000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    // Redirect to login page or show success message
    alert("Registration successful! Please log in.");
    window.location.href = "./login.html";
  } else {
    alert(`Error: ${data.message}`);
  }
});
