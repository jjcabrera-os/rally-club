// Wait for the HTML document to be fully loaded
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


    // --- 2. CREATE OUR ARRAYS ---
    let allGames = [];
    let myJoinedGames = [];

    // --- 3. FIND ALL THE GAME ELEMENTS ---
    const createButton = document.querySelector('.btn-create');
    const gameList = document.querySelector('.queue-list .game-list');
    const myGameList = document.querySelector('.my-games .my-game-list');
    
    // Get all the form inputs
    const locationInput = document.getElementById('location');
    const dateInput = document.getElementById('date');
    const maxPlayersInput = document.getElementById('maxPlayers');
    const priceInput = document.getElementById('price');
    const skillInput = document.getElementById('skill');
    const startHourInput = document.getElementById('start-hour');
    const startMinInput = document.getElementById('start-min');
    const startAmPmInput = document.getElementById('start-am-pm');
    const endHourInput = document.getElementById('end-hour');
    const endMinInput = document.getElementById('end-min');
    const endAmPmInput = document.getElementById('end-am-pm');
    
    // --- 4. FUNCTION TO ADD A GAME TO THE "AVAILABLE" LIST ---
    function addGameToList(gameData) {
        const emptyMessage = document.querySelector('.game-item-empty');
        if (emptyMessage) {
            emptyMessage.remove();
        }

        const newGame = document.createElement('li');
        newGame.className = 'game-item';
        newGame.setAttribute('data-id', gameData.id);

        let playersText = gameData.players + ' / ' + gameData.maxPlayers + ' Players';

        newGame.innerHTML = 
            '<div class="game-info">' +
                '<span class="game-location">' + gameData.location + '</span>' +
                '<span class="game-item-details">' +
                    gameData.date + ' @ ' + gameData.time + ' | ' +
                    'Skill: ' + gameData.skill + ' | Price: ₱' + gameData.price +
                '</span>' +
                '<span class="game-item-players">' + playersText + '</span>' +
            '</div>' +
            '<a href="#" class="game-join-btn" data-id="' + gameData.id + '">Join Game</a>';
        
        gameList.appendChild(newGame);

        const newJoinButton = newGame.querySelector('.game-join-btn');
        newJoinButton.addEventListener('click', onJoinGameClick);
    }

    // --- 5. FUNCTION: ADD A GAME TO THE "MY GAMES" LIST ---
    function addGameToMyList(gameData) {
        const emptyMessage = document.querySelector('.my-game-item-empty');
        if (emptyMessage) {
            emptyMessage.remove();
        }

        const newGame = document.createElement('li');
        newGame.className = 'my-game-item';
        newGame.setAttribute('data-id', gameData.id);

        newGame.innerHTML = 
            '<div class="game-info">' +
                '<span class="game-location">' + gameData.location + '</span>' +
                '<span>' +
                    gameData.date + ' @ ' + gameData.time + ' | ' +
                    'Skill: ' + gameData.skill + ' | Price: ₱' + gameData.price +
                '</span>' +
            '</div>' +
            '<div class="my-game-actions">' +
                '<span class="my-game-players">' + gameData.players + ' / ' + gameData.maxPlayers + ' Joined</span>' +
                '<button class="game-delete-btn" data-id="' + gameData.id + '">Delete</button>' +
            '</div>';
        
        myGameList.appendChild(newGame);

        const deleteButton = newGame.querySelector('.game-delete-btn');
        deleteButton.addEventListener('click', onDeleteGameClick);
    }

    // --- 6. FUNCTION: HANDLE "JOIN GAME" CLICK ---
    function onJoinGameClick(event) {
        event.preventDefault(); 
        const gameId = event.target.getAttribute('data-id');

        let alreadyJoined = false;
        for (let i = 0; i < myJoinedGames.length; i++) {
            if (myJoinedGames[i].id == gameId) {
                alreadyJoined = true;
                break;
            }
        }
        if (alreadyJoined) {
            alert('You have already joined this game!');
            return; 
        }

        let gameToUpdate = null;
        for (let i = 0; i < allGames.length; i++) {
            if (allGames[i].id == gameId) {
                gameToUpdate = allGames[i]; 
                break;
            }
        }
        if (gameToUpdate === null) {
            return;
        }

        let currentPlayers = parseInt(gameToUpdate.players);
        let maxPlayers = parseInt(gameToUpdate.maxPlayers);

        if (currentPlayers >= maxPlayers) {
            alert('This game is already full!');
            return;
        }

        gameToUpdate.players = currentPlayers + 1;
        myJoinedGames.push(gameToUpdate);
        addGameToMyList(gameToUpdate); 
        
        const availableListItem = document.querySelector('.game-item[data-id="' + gameId + '"]');
        if (availableListItem) {
            const playerText = availableListItem.querySelector('.game-item-players');
            playerText.innerHTML = gameToUpdate.players + ' / ' + gameToUpdate.maxPlayers + ' Players';
        }

        // --- NEW: Add the alert ---
        alert('You have successfully joined the queue!');
    }

    // --- 7. FUNCTION: HANDLE "DELETE GAME" CLICK ---
    function onDeleteGameClick(event) {
        const gameId = event.target.getAttribute('data-id');

        let newJoinedGames = [];
        for (let i = 0; i < myJoinedGames.length; i++) {
            if (myJoinedGames[i].id != gameId) {
                newJoinedGames.push(myJoinedGames[i]);
            }
        }
        myJoinedGames = newJoinedGames; 

        const myListItem = document.querySelector('.my-game-item[data-id="' + gameId + '"]');
        if (myListItem) {
            myListItem.remove();
        }

        if (myJoinedGames.length === 0) {
            myGameList.innerHTML = '<li class="my-game-item-empty"><p>You have not joined any games.</p></li>';
        }

        let gameToUpdate = null;
        for (let i = 0; i < allGames.length; i++) {
            if (allGames[i].id == gameId) {
                allGames[i].players = allGames[i].players - 1;
                gameToUpdate = allGames[i];
                break;
            }
        }

        if (gameToUpdate) {
            const availableListItem = document.querySelector('.game-item[data-id="' + gameId + '"]');
            if (availableListItem) {
                const playerText = availableListItem.querySelector('.game-item-players');
                playerText.innerHTML = gameToUpdate.players + ' / ' + gameToUpdate.maxPlayers + ' Players';
            }
        }
    }


    // --- 8. EVENT LISTENER FOR THE "CREATE" BUTTON ---
    createButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        const location = locationInput.value;
        const date = dateInput.value;
        const maxPlayers = maxPlayersInput.value; 
        const price = priceInput.value;
        const skill = skillInput.value;
        const startHour = startHourInput.value;
        let startMin = startMinInput.value;
        const startAmPm = startAmPmInput.value;
        const endHour = endHourInput.value;
        let endMin = endMinInput.value;
        const endAmPm = endAmPmInput.value;
        
        if (!location || !date || !maxPlayers || !price) {
            alert('Please fill out all fields: location, date, max players, and price.');
            return;
        }
        if (!startHour || !endHour) {
            alert('Please fill out at least the start and end hour.');
            return;
        }

        if (startMin.length === 1) { startMin = '0' + startMin; }
        if (startMin === "") { startMin = '00'; }
        if (endMin.length === 1) { endMin = '0' + endMin; }
        if (endMin === "") { endMin = '00'; }

        const formattedTime = startHour + ':' + startMin + ' ' + startAmPm + ' to ' + endHour + ':' + endMin + ' ' + endAmPm;
        const formattedDate = new Date(date + 'T00:00:00').toDateString();

        const newGameData = {
            id: Date.now(), 
            location: location,
            date: formattedDate,
            time: formattedTime,
            maxPlayers: parseInt(maxPlayers),
            price: parseInt(price),
            skill: skill,
            players: 1 
        };
 
        allGames.push(newGameData);
        addGameToList(newGameData);


    });

});