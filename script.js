// Slider functionality
const slider = {
    currentSlide: 0,
    slides: document.querySelector('.slides'),
    totalSlides: document.querySelectorAll('.slide').length,
    
    init() {
        // Set up event listeners
        document.querySelector('.prev').addEventListener('click', () => this.moveSlide('prev'));
        document.querySelector('.next').addEventListener('click', () => this.moveSlide('next'));
        
        // Auto-advance slides
        setInterval(() => this.moveSlide('next'), 5000);
    },
    
    moveSlide(direction) {
        if (direction === 'next') {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        } else {
            this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        }
        
        this.slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
};

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    slider.init();
});

// Initialize EmailJS
(function () {
    emailjs.init("D0htYagxQScGDLP_N"); // Your EmailJS public key
})();

// Function to Show Toast Messages
function toast({ title, description }) {
    alert(`${title}\n${description}`);
}

// Event Listener for the Submit Button
document.getElementById("submitBtn").addEventListener("click", async function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const result = await emailjs.send(
            "service_a9kgneu", // Service ID
            "template_8lfhtk3", // Template ID
            { name, email, message }, // Template parameters
            "D0htYagxQScGDLP_N" // Public Key
        );

        console.log(result);
        toast({
            title: "Message sent!",
            description: "We'll get back to you as soon as possible.",
        });

        // Reset the form fields after success
        document.getElementById("contactForm").reset();
    } catch (error) {
        console.log(error);
        toast({
            title: "Error sending message.",
            description: "Please try again later.",
        });
    }
});
