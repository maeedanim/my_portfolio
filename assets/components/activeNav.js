const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        if (window.scrollY >= section.offsetTop - 120) {

            current = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove(
            "text-primary",
            "font-semibold"
        );

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add(
                "text-primary",
                "font-semibold"
            );

        }

    });

});