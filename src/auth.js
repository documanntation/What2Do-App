import { API_URL } from "../backend/config/db"; // Example for Login Request
const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Store the token in localStorage or use as needed
      localStorage.setItem("token", data.token);
      alert("Login successful");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function register(email, password) {
  try {
    const res = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
  }
}
