// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. FIND THE ELEMENTS ---
    // Get the list we want to add to
    const gameList = document.querySelector('.upcoming-games .game-list');
    
    // --- 2. FUNCTION TO ADD A GAME TO THE LIST (from storage) ---
    function addGameToList(gameData) {
        // First, find and remove the "empty" message
        const emptyMessage = document.querySelector('.game-item-empty');
        if (emptyMessage) {
            emptyMessage.remove();
        }

        // Create the new list item
        const newGame = document.createElement('li');
        newGame.className = 'game-item';

        // Set its inner HTML from the game data
        // We use the data saved from the queues page
        newGame.innerHTML = `
            <div class.game-details">
                <strong>${gameData.date} @ ${gameData.time}</strong>
                <span>${gameData.location}</span>
            </div>
            <span class.game-players">${gameData.players} / ${gameData.maxPlayers} Players</span>
        `;
        
        // Add the new game to the list
        gameList.appendChild(newGame);
    }

    // --- 3. FUNCTION TO LOAD SAVED GAMES ---
    // This runs as soon as the page loads
    function loadSavedGames() {
        // Get the games from localStorage, or start an empty list if none
        // We'll use the same 'myGames' key as the queues page
        const savedGames = JSON.parse(localStorage.getItem('myGames')) || [];

        // If we have saved games, add each one to the list
        if (savedGames.length > 0) {
            savedGames.forEach(game => {
                addGameToList(game);
            });
        }
    }

    // --- 4. RUN THE LOAD FUNCTION! ---
    // This is the first thing we do when the page is ready.
    loadSavedGames();

});