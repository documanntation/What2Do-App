window.addEventListener("load", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "./login.html"; // Redirect to login if not logged in
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/protected/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Display user info (e.g., email)
      document.querySelector(".profile-info h3").innerText = data.user.email;
    } else {
      alert("Error fetching profile data");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred, please try again later");
  }
});
