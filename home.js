document.addEventListener('DOMContentLoaded', function() { 
    // run code when page is fully loaded

    // grab the checkbox for dark mode
    const themeToggle = document.getElementById('checkbox');

    // grab the logo image inside the nav-brand class
    const logoImage = document.querySelector('.nav-brand img');

    // listen for clicks on the toggle
    themeToggle.addEventListener('click', function() {
        if (themeToggle.checked) {
            // if checkbox is checked, turn dark mode on
            document.body.classList.add('dark-mode'); // add dark mode class
            logoImage.src = 'courtlogo1.png'; // switch logo to dark version
        } else {
            // if checkbox is not checked, turn dark mode off
            document.body.classList.remove('dark-mode'); // remove dark mode class
            logoImage.src = 'courtlogo.png'; // switch logo back to light version
        }
    });

});
