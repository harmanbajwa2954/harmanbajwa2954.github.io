// Initialize Animations
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
        });

        // Navbar blur on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
        });


        // dynamic text animation
        const words = ["a ML Engineer","a Web Developer", "a Data Analyst", "a Data Scientist",];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const textElement = document.getElementById("dynamic-text");

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.innerText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.innerText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start the effect
    setTimeout(typeEffect, 1000);