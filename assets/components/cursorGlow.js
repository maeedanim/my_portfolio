const glow =
    document.getElementById("cursorGlow");

document.addEventListener("mousemove", e => {

    if (!glow) return;

    glow.animate({

        left: `${e.clientX - 140}px`,
        top: `${e.clientY - 140}px`

    }, {

        duration: 500,
        fill: "forwards"

    });

});