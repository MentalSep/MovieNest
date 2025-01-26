const token = document.cookie.split("=")[1];
if (token) {
  alert("You are already logged in!");
  window.location.href = "/";
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      //   alert("Login successful!");
      window.location.href = "/";
    } else {
      alert(data.msg || "An error occurred");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
