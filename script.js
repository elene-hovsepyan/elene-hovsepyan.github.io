const siteHeader = document.querySelector(".site-header");
const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");
const menuButton = document.getElementById("menuButton");
const mobileNavigation = document.getElementById("mobileNavigation");
const mobileLinks = mobileNavigation.querySelectorAll("a");
const currentYear = document.getElementById("currentYear");
const revealElements = document.querySelectorAll(".reveal");

currentYear.textContent = new Date().getFullYear();

function updateHeader() {
    if (window.scrollY > 20) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader);
updateHeader();

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const darkThemeIsActive =
        document.body.classList.contains("dark-theme");

    themeIcon.textContent = darkThemeIsActive ? "☀" : "☾";
});

menuButton.addEventListener("click", () => {
    const menuIsOpen =
        mobileNavigation.classList.toggle("open");

    menuButton.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
    );
});

mobileLinks.forEach((mobileLink) => {
    mobileLink.addEventListener("click", () => {
        mobileNavigation.classList.remove("open");
        menuButton.classList.remove("active");
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
