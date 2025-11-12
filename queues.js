document.addEventListener('DOMContentLoaded', function() {
    // wait for page to load, then run everything

    const themeToggle = document.getElementById('checkbox'); 
    // get the dark mode checkbox
    const logoImage = document.querySelector('.nav-brand img'); 
    // find first img inside nav-brand

    themeToggle.addEventListener('click', function() {
        // when checkbox clicked
        if (themeToggle.checked) {
            // checkbox on
            document.body.classList.add('dark-mode'); // add dark mode class
            logoImage.src = 'courtlogo1.png'; // change logo
        } else {
            // checkbox off
            document.body.classList.remove('dark-mode'); // remove dark mode
            logoImage.src = 'courtlogo.png'; // back to normal logo
        }
    });

    let allGames = []; // store all games
    let myJoinedGames = []; // store games i joined

    const createButton = document.querySelector('.btn-create'); 
    const gameList = document.querySelector('.queue-list .game-list'); 
    const myGameList = document.querySelector('.my-games .my-game-list'); 

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

    function addGameToList(gameData) {
        // show game in available list
        const emptyMessage = document.querySelector('.game-item-empty'); 
        if (emptyMessage) emptyMessage.remove(); // remove "no games" message

        const newGame = document.createElement('li'); 
        newGame.className = 'game-item';
        newGame.setAttribute('data-id', gameData.id); 
        // put game id inside li so we can find it later

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
        // put li at end of available games

        const newJoinButton = newGame.querySelector('.game-join-btn'); 
        // pick join button inside this li
        newJoinButton.addEventListener('click', onJoinGameClick); 
        // attach click listener
    }

    function addGameToMyList(gameData) {
        // show game in my joined list
        const emptyMessage = document.querySelector('.my-game-item-empty'); 
        if (emptyMessage) emptyMessage.remove(); 

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
        // attach delete listener
    }

    function onJoinGameClick(event) {
        event.preventDefault(); 
        // stop link default

        const gameId = event.target.getAttribute('data-id'); 
        // read game id

        let alreadyJoined = myJoinedGames.some(game => game.id == gameId); 
        // check if already joined
        if (alreadyJoined) {
            alert('you already joined this game!');
            return;
        }

        let gameToUpdate = allGames.find(game => game.id == gameId); 
        // find the game in available games
        if (!gameToUpdate) return;

        if (parseInt(gameToUpdate.players) >= parseInt(gameToUpdate.maxPlayers)) {
            alert('game is full!');
            return;
        }

        gameToUpdate.players = parseInt(gameToUpdate.players) + 1; 
        // increase player count

        myJoinedGames.push(gameToUpdate); 
        addGameToMyList(gameToUpdate); 
        // add to my list

        const availableListItem = document.querySelector('.game-item[data-id="' + gameId + '"]');
        if (availableListItem) {
            const playerText = availableListItem.querySelector('.game-item-players');
            playerText.innerHTML = gameToUpdate.players + ' / ' + gameToUpdate.maxPlayers + ' Players';
            // update available list count
        }

        alert('joined successfully!');
    }

    function onDeleteGameClick(event) {
        const gameId = event.target.getAttribute('data-id'); 

        // remove from myJoinedGames
        myJoinedGames = myJoinedGames.filter(game => game.id != gameId); 

        const myListItem = document.querySelector('.my-game-item[data-id="' + gameId + '"]');
        if (myListItem) myListItem.remove(); 

        if (myJoinedGames.length === 0) {
            myGameList.innerHTML = '<li class="my-game-item-empty"><p>you have not joined any games.</p></li>';
        }

        // update available games count
        let gameToUpdate = allGames.find(game => game.id == gameId);
        if (gameToUpdate) {
            gameToUpdate.players = parseInt(gameToUpdate.players) - 1;
            const availableListItem = document.querySelector('.game-item[data-id="' + gameId + '"]');
            if (availableListItem) {
                const playerText = availableListItem.querySelector('.game-item-players');
                playerText.innerHTML = gameToUpdate.players + ' / ' + gameToUpdate.maxPlayers + ' Players';
            }
        }
    }

    createButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        let location = locationInput.value;
        let date = dateInput.value;
        let maxPlayers = maxPlayersInput.value;
        let price = priceInput.value;
        let skill = skillInput.value;
        let startHour = startHourInput.value;
        let startMin = startMinInput.value || '00'; 
        let startAmPm = startAmPmInput.value;
        let endHour = endHourInput.value;
        let endMin = endMinInput.value || '00';
        let endAmPm = endAmPmInput.value;

        if (!location || !date || !maxPlayers || !price) {
            alert('please fill all required fields');
            return;
        }

        if (startMin.length === 1) startMin = '0' + startMin; 
        if (endMin.length === 1) endMin = '0' + endMin; 

        let formattedTime = startHour + ':' + startMin + ' ' + startAmPm + ' to ' + endHour + ':' + endMin + ' ' + endAmPm;
        let formattedDate = new Date(date + 'T00:00:00').toDateString(); 
        // convert date to readable format

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
