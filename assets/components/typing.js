document.addEventListener("DOMContentLoaded", () => {

    const typingElement = document.getElementById("typingText");

    if (!typingElement) return;

    const titles = [
        "Backend Developer",
        "Software Engineer",
        "NestJS Developer",
        "API Designer",
        "Problem Solver"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const current = titles[titleIndex];

        if (!deleting) {

            typingElement.textContent =
                current.substring(0, charIndex);

            charIndex++;

            if (charIndex > current.length) {

                deleting = true;

                setTimeout(type, 1400);

                return;
            }

        } else {

            typingElement.textContent =
                current.substring(0, charIndex);

            charIndex--;

            if (charIndex < 0) {

                deleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                charIndex = 0;

            }

        }

        setTimeout(type, deleting ? 45 : 110);

    }

    type();

});