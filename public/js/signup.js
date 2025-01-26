const token = document.cookie.split("=")[1];
if (token) {
  alert("You are already logged in!");
  window.location.href = "/";
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      //   alert("Signup successful! You can now log in.");
      window.location.href = "/";
    } else {
      if (data.errors) {
        // Display the first error message
        alert("Error first: " + data.errors[0].msg);
      } else {
        alert("Error: " + data.msg || "Unknown error");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
