// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. FIND THE ELEMENTS ---
    // Find the checkbox for the dark mode toggle
    const themeToggle = document.getElementById('checkbox');
    
    // Find the logo image
    const logoImage = document.querySelector('.nav-brand img');


    // --- 2. ADD EVENT LISTENER ---
    // Listen for a 'click' event on the toggle
    themeToggle.addEventListener('click', function() {
        
        // --- 3. CHECK THE TOGGLE STATE ---
        // 'themeToggle.checked' will be true if it's on
        
        if (themeToggle.checked) {
            // --- TURN DARK MODE ON ---
            document.body.classList.add('dark-mode');
            logoImage.src = 'courtlogo1.png'; // Dark mode logo

        } else {
            // --- TURN DARK MODE OFF ---
            document.body.classList.remove('dark-mode');
            logoImage.src = 'courtlogo.png'; // Light mode logo
        }

    });

});