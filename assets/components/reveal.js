const revealElements =
    document.querySelectorAll(".reveal");

function revealSections() {

    revealElements.forEach(element => {

        if (
            element.getBoundingClientRect().top <
            window.innerHeight - 120
        ) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();