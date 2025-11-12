document.addEventListener('DOMContentLoaded', function() { 
    // run code when page is fully loaded

    // dark mode toggle
    const themeToggle = document.getElementById('checkbox'); // the checkbox
    const logoImage = document.querySelector('.nav-brand img'); // logo image

    themeToggle.addEventListener('click', function() {  
        if (themeToggle.checked) {  
            document.body.classList.add('dark-mode'); // add dark mode class
            logoImage.src = 'courtlogo1.png'; // switch logo to dark version
        } else {  
            document.body.classList.remove('dark-mode'); // remove dark mode class
            logoImage.src = 'courtlogo.png'; // switch back to light logo
        }
    });

    // array to store posts temporarily
    let allPosts = []; 

    // grab post elements
    const postButton = document.getElementById('add-post-btn'); 
    const postTextInput = document.getElementById('post-text-input'); 
    const postList = document.querySelector('.post-list'); 

    // function to add post to feed
    function addPostToFeed(postData) {  
        const emptyMessage = document.querySelector('.post-item-empty');  
        if (emptyMessage) emptyMessage.remove(); // remove "no posts yet" message if exists

        const newPost = document.createElement('li'); 
        newPost.className = 'feed-post'; // class for styling

        // put html inside the new post
        newPost.innerHTML = 
            '<div class="post-header">' +
                '<div class="post-avatar"></div>' +
                '<div class="post-user">' +
                    '<strong>' + postData.user + '</strong>' +
                    '<span>' + postData.time + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="post-body">' +
                '<p>' + postData.text + '</p>' +
            '</div>';

        postList.insertBefore(newPost, postList.firstChild); 
        // insertBefore(new, firstChild) = adds new post at the top
    }

    // click event to add a post
    postButton.addEventListener('click', function() {
        const postText = postTextInput.value; 

        if (postText.trim() === "") {  
            alert('write something first!'); 
            return; // stop if empty
        }

        const newPostData = {  
            id: Date.now(), // unique timestamp id
            user: 'you (the player)', 
            time: 'just now', 
            text: postText 
        };

        allPosts.unshift(newPostData); // add to start of array
        addPostToFeed(newPostData); // show in html

        postTextInput.value = ""; // clear input box
    });

});
