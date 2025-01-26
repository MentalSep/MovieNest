document.addEventListener("DOMContentLoaded", () => {
  const token = document.cookie.split("=")[1];

  const navList = document.querySelector(".navbar-nav");

  if (token) {
    const loginLink = document.querySelector(
      ".nav-link .bi-person-circle"
    ).parentElement;
    if (loginLink) {
      loginLink.remove();
    }

    const accountDropdown = document.createElement("li");
    accountDropdown.className = "nav-item dropdown";
    accountDropdown.innerHTML = `
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="accountDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person-circle"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
          <li><a class="dropdown-item" href="/favourites">Favourites</a></li>
          <li><a class="dropdown-item" id="logoutButton" href="#">Log Out</a></li>
        </ul>
      `;
    navList.appendChild(accountDropdown);

    document.querySelector("#logoutButton").addEventListener("click", () => {
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      window.location.href = "/";
    });
  }
});
