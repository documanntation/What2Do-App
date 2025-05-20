const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    // Redirect to the profile or main page
    alert("Login successful!");
    window.location.href = "/src/dashboard.html"; // Or wherever you want to redirect
  } else {
    alert(`Error: ${data.message}`);
  }
});
