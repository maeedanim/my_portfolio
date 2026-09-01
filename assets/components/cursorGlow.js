const glow =
    document.getElementById("cursorGlow");

// Disable cursor glow on touch/mobile devices for performance
const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 768;

if (isTouchDevice && glow) {

    glow.style.display = "none";

} else {

    document.addEventListener("mousemove", e => {

        if (!glow) return;

        glow.style.left = `${e.clientX - 140}px`;
        glow.style.top = `${e.clientY - 140}px`;

    }, { passive: true });

}