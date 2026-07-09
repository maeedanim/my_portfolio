const counters =
    document.querySelectorAll(".counter");

counters.forEach(counter => {

    const animate = () => {

        const target =
            Number(counter.dataset.target);

        const current =
            Number(counter.innerText);

        const increment =
            target / 60;

        if (current < target) {

            counter.innerText =
                Math.ceil(current + increment);

            requestAnimationFrame(animate);

        } else {

            counter.innerText = target;

        }

    };

    animate();

});