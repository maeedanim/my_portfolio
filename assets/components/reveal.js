const revealElements =
    document.querySelectorAll(".reveal");

let ticking = false;

function revealSections() {

    revealElements.forEach(element => {

        if (
            element.getBoundingClientRect().top <
            window.innerHeight - 80
        ) {

            element.classList.add("active");

        }

    });

    ticking = false;

}

window.addEventListener("scroll", () => {

    if (!ticking) {

        requestAnimationFrame(revealSections);
        ticking = true;

    }

}, { passive: true });

revealSections();