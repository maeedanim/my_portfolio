// ==========================================
// EmailJS Initialization
// ==========================================

emailjs.init("DzqXIglXEC691vvKu");

// ==========================================
// Contact Form
// ==========================================

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();

        // ==========================================
        // Validation
        // ==========================================

        if (!name || !email || !subject || !message) {

            alert("Please fill in all fields.");
            return;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");
            return;

        }

        // ==========================================
        // Button Loading State
        // ==========================================

        const submitButton =
            form.querySelector("button");

        submitButton.disabled = true;
        submitButton.innerText = "Sending...";

        // ==========================================
        // Send Email
        // ==========================================

        emailjs.send(

            "service_0bj7jrm",
            "template_k2lumfb",

            {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            }

        )

        .then(() => {

            // Show Success Modal

            const modal =
                document.getElementById("successModal");

            modal.classList.remove("hidden");
            modal.classList.add("flex");

            // Reset Form

            form.reset();

        })

        .catch((error) => {

            console.error("EmailJS Error:", error);

            alert(
                error.text ||
                error.message ||
                "Failed to send message."
            );

        })

        .finally(() => {

            submitButton.disabled = false;
            submitButton.innerText = "Send Message";

        });

    });

}

// ==========================================
// Success Modal Close Button
// ==========================================

const closeButton =
    document.getElementById("closeSuccessModal");

if (closeButton) {

    closeButton.addEventListener("click", () => {

        const modal =
            document.getElementById("successModal");

        modal.classList.remove("flex");
        modal.classList.add("hidden");

    });

}

// ==========================================
// Close Modal When Clicking Outside
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("successModal");
    const closeButton = document.getElementById("closeSuccessModal");

    if (closeButton) {

        closeButton.addEventListener("click", () => {

            modal.classList.remove("flex");
            modal.classList.add("hidden");

        });

    }

    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {

                modal.classList.remove("flex");
                modal.classList.add("hidden");

            }

        });

    }

});