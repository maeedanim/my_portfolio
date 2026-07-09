function portfolio() {
    return {
        darkMode: localStorage.getItem("theme") === "dark",
        mobileMenu: false,
        showTopButton: false,
        activeSection: "home",

        init() {

            this.$watch("darkMode", (value) => {

                localStorage.setItem(
                    "theme",
                    value ? "dark" : "light"
                );

            });

            window.addEventListener("scroll", () => {

                this.showTopButton = window.scrollY > 500;

            });

        }
    };
}