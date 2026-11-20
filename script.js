
const contactForm = document.getElementById("form-bg");

if (contactForm) {
    const formStatus = document.getElementById("form-status");
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (typeof emailjs === "undefined") {
            formStatus.textContent = "Email service is unavailable. Please try again later.";
            return;
        }

        const parameters = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim(),
        };

        submitButton.disabled = true;
        formStatus.textContent = "Sending your message...";

        try {
            emailjs.init({ publicKey: "YGXOILXlLLpuDZY-t" });
            await emailjs.send("service_non6r39", "template_66nt7cb", parameters);
            formStatus.textContent = "Your message has been sent. Thank you!";
            contactForm.reset();
        } catch (error) {
            console.error("EmailJS send failed:", error);
            formStatus.textContent = "Sorry, your message could not be sent. Please try again later.";
        } finally {
            submitButton.disabled = false;
        }
    });
}