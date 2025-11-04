
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. DARK MODE LOGIC ---
    const themeToggle = document.getElementById('checkbox');
    const logoImage = document.querySelector('.nav-brand img');

    themeToggle.addEventListener('click', function() {
        if (themeToggle.checked) {
            document.body.classList.add('dark-mode');
            logoImage.src = 'courtlogo1.png'; // Dark mode logo
        } else {
            document.body.classList.remove('dark-mode');
            logoImage.src = 'courtlogo.png'; // Light mode logo
        }
    });


    // --- 2. CREATE OUR ARRAY ---
    // This array will hold all our posts, but only while the page is open.
    let allPosts = [];

    // --- 3. FIND ALL THE POST ELEMENTS ---
    const postButton = document.getElementById('add-post-btn');
    const postTextInput = document.getElementById('post-text-input');
    const postList = document.querySelector('.post-list');

    // --- 4. FUNCTION TO ADD A POST TO THE FEED ---
    function addPostToFeed(postData) {
        // Find and remove the "empty" message
        const emptyMessage = document.querySelector('.post-item-empty');
        if (emptyMessage) {
            emptyMessage.remove();
        }

        // Create a new list item
        const newPost = document.createElement('li');
        newPost.className = 'feed-post'; // Use the CSS class

        // Build the HTML for the post
        newPost.innerHTML = 
            '<div class="post-header">' +
                '<div class="post-avatar"></div>' +
                '<div class="post-user">' +
                    '<strong>' + postData.user + '</strong>' +
                    '<span>' + postData.time + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="post-body">' +
                // Use a <p> tag for the text
                '<p>' + postData.text + '</p>' +
            '</div>';
        
        // This inserts the newPost *before* the first child of the list
        postList.insertBefore(newPost, postList.firstChild);
    }

    // --- 5. EVENT LISTENER FOR THE "ADD POST" BUTTON ---
    postButton.addEventListener('click', function() {
        // Get the text from the box
        const postText = postTextInput.value;

        // --- Simple Validation ---
        // Check if the text is empty or just spaces
        if (postText.trim() === "") {
            alert('Please write something in your post!');
            return; // Stop the function
        }

        // --- Create the new post object ---
        const newPostData = {
            id: Date.now(), // Unique ID
            user: 'You (The Player)',
            time: 'Just now',
            text: postText
        };

        // --- Add to our array (at the beginning) ---
        // 'unshift' adds a new item to the start of an array
        allPosts.unshift(newPostData);

        // --- Add the new post to the visible HTML feed ---
        addPostToFeed(newPostData);

        // --- Clear the text box ---
        postTextInput.value = "";
    });

});