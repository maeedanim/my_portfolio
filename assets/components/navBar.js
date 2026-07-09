const header =
    document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    header.classList.toggle(
        "shadow-xl",
        window.scrollY > 50
    );

});