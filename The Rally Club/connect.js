// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. CREATE OUR ARRAY ---
    // This array will hold all our posts, but only while the page is open.
    let allPosts = [];

    // --- 2. FIND ALL THE ELEMENTS ---
    const postButton = document.getElementById('add-post-btn');
    const postTextInput = document.getElementById('post-text-input');
    const postList = document.querySelector('.post-list');

    // --- 3. FUNCTION TO ADD A POST TO THE FEED ---
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
        
        // --- ADD TO TOP OF LIST ---
        // This is the classic, beginner-friendly way to add to the top
        // It inserts the newPost *before* the first child of the list
        postList.insertBefore(newPost, postList.firstChild);
    }

    // --- 4. EVENT LISTENER FOR THE "ADD POST" BUTTON ---
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