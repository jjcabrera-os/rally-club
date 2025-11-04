document.addEventListener('DOMContentLoaded', function() {

    // --- 1. FIND THE ELEMENTS ---
    // Find the checkbox for the dark mode toggle
    const themeToggle = document.getElementById('checkbox');
    
    // NEW: Find the logo image
    // document.querySelector looks for the first <img> tag inside an element with the class "nav-brand"
    const logoImage = document.querySelector('.nav-brand img');


    // --- 2. ADD EVENT LISTENER ---
    // Listen for a 'click' event on the toggle
    themeToggle.addEventListener('click', function() {
        
        // --- 3. CHECK THE TOGGLE STATE ---
        // 'themeToggle.checked' will be true if it's on
        
        if (themeToggle.checked) {
            // --- TURN DARK MODE ON ---
            
            // Add the 'dark-mode' class to the <body>
            document.body.classList.add('dark-mode');
            
            // NEW: Change the image source
            logoImage.src = 'courtlogo1.png';

        } else {
            // --- TURN DARK MODE OFF ---
            
            // Remove the 'dark-mode' class
            document.body.classList.remove('dark-mode');
            
            // NEW: Change the image back to the original
            logoImage.src = 'courtlogo.png';
        }

    });

});