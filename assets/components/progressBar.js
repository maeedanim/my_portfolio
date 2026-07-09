window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        document.getElementById("progressBar");

    if (!progress) return;

    progress.style.width =
        (scrollTop / scrollHeight) * 100 + "%";

});