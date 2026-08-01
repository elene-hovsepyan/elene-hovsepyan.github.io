// ======================================================
// Portfolio Website JavaScript
// Elene Hovsepyan
// ======================================================


// ======================================================
// ELEMENTS
// ======================================================

const siteHeader = document.getElementById("siteHeader");

const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");

const menuButton = document.getElementById("menuButton");
const mobileNavigation = document.getElementById(
    "mobileNavigation"
);

const currentYear = document.getElementById(
    "currentYear"
);

const revealElements = document.querySelectorAll(
    ".reveal"
);

const cursorGlow = document.getElementById(
    "cursorGlow"
);


// ======================================================
// FOOTER YEAR
// ======================================================

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


// ======================================================
// FLOATING HEADER
// ======================================================

function updateHeader() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );
}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


// ======================================================
// THEME TOGGLE
// ======================================================

const savedTheme = localStorage.getItem(
    "portfolio-theme"
);

if (savedTheme === "dark") {
    document.body.classList.add(
        "dark-theme"
    );

    if (themeIcon) {
        themeIcon.textContent = "☀";
    }
}

if (themeButton) {
    themeButton.addEventListener(
        "click",
        () => {
            document.body.classList.toggle(
                "dark-theme"
            );

            const darkThemeIsActive =
                document.body.classList.contains(
                    "dark-theme"
                );

            if (themeIcon) {
                themeIcon.textContent =
                    darkThemeIsActive
                        ? "☀"
                        : "☾";
            }

            localStorage.setItem(
                "portfolio-theme",
                darkThemeIsActive
                    ? "dark"
                    : "light"
            );
        }
    );
}


// ======================================================
// MOBILE MENU
// ======================================================

function closeMobileMenu() {
    if (!menuButton || !mobileNavigation) {
        return;
    }

    mobileNavigation.classList.remove(
        "open"
    );

    menuButton.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "menu-open"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );
}

if (menuButton && mobileNavigation) {
    menuButton.addEventListener(
        "click",
        () => {
            const menuIsOpen =
                mobileNavigation.classList.toggle(
                    "open"
                );

            menuButton.classList.toggle(
                "active",
                menuIsOpen
            );

            document.body.classList.toggle(
                "menu-open",
                menuIsOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(menuIsOpen)
            );
        }
    );

    mobileNavigation
        .querySelectorAll("a")
        .forEach((link) => {
            link.addEventListener(
                "click",
                closeMobileMenu
            );
        });
}


// ======================================================
// REVEAL ON SCROLL
// ======================================================

if ("IntersectionObserver" in window) {
    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(
                    (entry) => {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(
        (element) => {
            revealObserver.observe(
                element
            );
        }
    );
} else {
    revealElements.forEach(
        (element) => {
            element.classList.add(
                "visible"
            );
        }
    );
}


// ======================================================
// ACTIVE NAVIGATION LINK
// ======================================================

const pageSections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".desktop-navigation a, " +
        ".mobile-navigation a"
    );

function updateActiveNavigation() {
    let activeSection = "";

    pageSections.forEach(
        (section) => {
            const top =
                section.offsetTop - 180;

            const bottom =
                top + section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {
                activeSection =
                    section.getAttribute(
                        "id"
                    );
            }
        }
    );

    navigationLinks.forEach(
        (link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                    `#${activeSection}`
            );
        }
    );
}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


// ======================================================
// CURSOR GLOW
// ======================================================

const precisePointer =
    window.matchMedia(
        "(pointer: fine)"
    );

if (
    cursorGlow &&
    precisePointer.matches
) {
    window.addEventListener(
        "mousemove",
        (event) => {
            cursorGlow.style.opacity =
                "1";

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;
        }
    );

    document.addEventListener(
        "mouseleave",
        () => {
            cursorGlow.style.opacity =
                "0";
        }
    );
}


// ======================================================
// CAREER TIMELINE PROGRESS
// ======================================================

const careerTimeline =
    document.getElementById(
        "careerTimeline"
    );

const timelineProgress =
    document.getElementById(
        "timelineProgress"
    );

const timelineItems =
    document.querySelectorAll(
        ".timeline-item"
    );

function updateTimelineProgress() {
    if (
        !careerTimeline ||
        !timelineProgress
    ) {
        return;
    }

    const timelineBox =
        careerTimeline
            .getBoundingClientRect();

    const viewportTrigger =
        window.innerHeight * 0.58;

    const travelledDistance =
        viewportTrigger -
        timelineBox.top;

    const availableDistance =
        timelineBox.height;

    const progress =
        Math.max(
            0,
            Math.min(
                travelledDistance,
                availableDistance
            )
        );

    timelineProgress.style.height =
        `${progress}px`;

    timelineItems.forEach(
        (item) => {
            const itemBox =
                item.getBoundingClientRect();

            const markerReached =
                itemBox.top <
                viewportTrigger;

            item.classList.toggle(
                "timeline-reached",
                markerReached
            );
        }
    );
}

window.addEventListener(
    "scroll",
    updateTimelineProgress,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateTimelineProgress
);

updateTimelineProgress();


// ======================================================
// SKILL FAMILY ACCORDIONS
// ======================================================

const skillFamilies =
    document.querySelectorAll(
        ".skill-family"
    );

skillFamilies.forEach(
    (family) => {
        const heading =
            family.querySelector(
                ".skill-family-heading"
            );

        const toggle =
            family.querySelector(
                ".family-toggle"
            );

        if (!heading) {
            return;
        }

        heading.addEventListener(
            "click",
            () => {
                const collapsed =
                    family.classList.toggle(
                        "collapsed"
                    );

                heading.setAttribute(
                    "aria-expanded",
                    String(!collapsed)
                );

                if (toggle) {
                    toggle.textContent =
                        collapsed
                            ? "+"
                            : "−";
                }
            }
        );
    }
);


// ======================================================
// SKILLS SETTLE INTO THEIR GROUPS WHILE SCROLLING
// ======================================================

const skillChips =
    document.querySelectorAll(
        ".skill-chip"
    );

skillChips.forEach(
    (chip, index) => {
        const horizontalDirections =
            [
                "-80px",
                "65px",
                "-45px",
                "90px",
                "-70px",
                "55px"
            ];

        const verticalDirections =
            [
                "34px",
                "48px",
                "28px",
                "55px",
                "38px",
                "42px"
            ];

        chip.style.setProperty(
            "--skill-start-x",
            horizontalDirections[
                index %
                horizontalDirections.length
            ]
        );

        chip.style.setProperty(
            "--skill-start-y",
            verticalDirections[
                index %
                verticalDirections.length
            ]
        );

        chip.style.setProperty(
            "--skill-delay",
            `${(index % 6) * 65}ms`
        );
    }
);

if ("IntersectionObserver" in window) {
    const skillFamilyObserver =
        new IntersectionObserver(
            (entries) => {
                entries.forEach(
                    (entry) => {
                        entry.target.classList.toggle(
                            "skills-settled",
                            entry.isIntersecting
                        );
                    }
                );
            },
            {
                threshold: 0.28,
                rootMargin:
                    "0px 0px -8% 0px"
            }
        );

    skillFamilies.forEach(
        (family) => {
            skillFamilyObserver.observe(
                family
            );
        }
    );
} else {
    skillFamilies.forEach(
        (family) => {
            family.classList.add(
                "skills-settled"
            );
        }
    );
}


// ======================================================
// SKILL DETAILS MODAL
// ======================================================

const skillModal =
    document.getElementById(
        "skillModal"
    );

const skillModalBackdrop =
    document.getElementById(
        "skillModalBackdrop"
    );

const skillModalClose =
    document.getElementById(
        "skillModalClose"
    );

const skillModalTitle =
    document.getElementById(
        "skillModalTitle"
    );

const skillModalDescription =
    document.getElementById(
        "skillModalDescription"
    );

const skillModalLearned =
    document.getElementById(
        "skillModalLearned"
    );

let previouslyFocusedElement = null;


function openSkillModal(chip) {
    if (!skillModal || !chip) {
        return;
    }

    previouslyFocusedElement =
        document.activeElement;

    const title =
        chip.dataset.title || "";

    const description =
        chip.dataset.description || "";

    const learned =
        chip.dataset.learned || "";

    if (skillModalTitle) {
        skillModalTitle.textContent =
            title;
    }

    if (skillModalDescription) {
        skillModalDescription.textContent =
            description;
    }

    if (skillModalLearned) {
        skillModalLearned.textContent =
            learned;
    }

    document
        .querySelectorAll(
            ".skill-chip.active"
        )
        .forEach((activeChip) => {
            activeChip.classList.remove(
                "active"
            );
        });

    chip.classList.add("active");

    skillModal.classList.add("open");

    skillModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "menu-open"
    );

    if (skillModalClose) {
        skillModalClose.focus();
    }
}


function closeSkillModal() {
    if (!skillModal) {
        return;
    }

    skillModal.classList.remove(
        "open"
    );

    skillModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "menu-open"
    );

    document
        .querySelectorAll(
            ".skill-chip.active"
        )
        .forEach((activeChip) => {
            activeChip.classList.remove(
                "active"
            );
        });

    if (
        previouslyFocusedElement &&
        typeof previouslyFocusedElement
            .focus === "function"
    ) {
        previouslyFocusedElement.focus();
    }
}


skillChips.forEach(
    (chip) => {
        chip.addEventListener(
            "click",
            () => {
                openSkillModal(chip);
            }
        );
    }
);

if (skillModalClose) {
    skillModalClose.addEventListener(
        "click",
        closeSkillModal
    );
}

if (skillModalBackdrop) {
    skillModalBackdrop.addEventListener(
        "click",
        closeSkillModal
    );
}


// ======================================================
// TECHNOLOGY TAG HOVER ACCESSIBILITY
// ======================================================

const technologyTags =
    document.querySelectorAll(
        ".technology-list span"
    );

technologyTags.forEach(
    (tag) => {
        tag.setAttribute(
            "tabindex",
            "0"
        );
    }
);


// ======================================================
// WINDOW RESIZE
// ======================================================

window.addEventListener(
    "resize",
    () => {
        if (
            window.innerWidth > 760
        ) {
            closeMobileMenu();
        }

        updateTimelineProgress();
    }
);


// ======================================================
// KEYBOARD ACCESSIBILITY
// ======================================================

document.addEventListener(
    "keydown",
    (event) => {
        if (event.key !== "Escape") {
            return;
        }

        if (
            skillModal &&
            skillModal.classList.contains(
                "open"
            )
        ) {
            closeSkillModal();
            return;
        }

        closeMobileMenu();
    }
);
