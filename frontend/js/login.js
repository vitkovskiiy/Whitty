const form = document.getElementById("loginInput");
const loginField = document.getElementById("username");
const passwordField = document.getElementById("password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json(); 
    if (result.redirect) {
      window.location.href = result.redirect;
    } else {
      alert("Login failed: " + result.message);
    }
  } catch (err) {
    console.error("Error during login:", err);
  }
});