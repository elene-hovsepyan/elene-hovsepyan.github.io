const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navigationItems = navLinks.querySelectorAll("a");
const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();

menuButton.addEventListener("click", () => {
    const menuIsOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
    );

    menuButton.textContent = menuIsOpen ? "✕" : "☰";
});

navigationItems.forEach((navigationItem) => {
    navigationItem.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
    });
});
