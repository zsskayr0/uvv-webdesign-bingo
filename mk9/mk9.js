// Array to store the players
let players = [];

// Function to add a player to the list and create the table

function addPlayer() {
  const playerNameInput = document.getElementById('playername');
  const playerName = playerNameInput.value.trim();

  if (playerName !== '') {
      players.push(playerName);
      playerNameInput.value = '';
      playerNameInput.focus();
      createTable();
      showMessage("Jogador adicionado");
      console.log(players);
  }
}

// Function to show the player message
function showMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  messageContainer.textContent = message;

  const containerGame = document.getElementById("container-game");
  containerGame.appendChild(messageContainer);

  setTimeout(function() {
    messageContainer.style.opacity = "1";
  }, 100);

  setTimeout(function() {
    messageContainer.style.opacity = "0";
    setTimeout(function() {
      messageContainer.remove();
    }, 300);
  }, 2300);
}


// Event listener to add a player when Enter key is pressed
const playerNameInput = document.getElementById("playername");
playerNameInput.addEventListener("keyup", function (event0) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addPlayer();
  }
});

// Function to create the player table
function createTable() {
  const containerGame = document.getElementById("container-game");
  containerGame.innerHTML = "";

  players.forEach((player) => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("table-container");

    const playerNameHeader = document.createElement("h3");
    playerNameHeader.textContent = player.playerName;

    const table = document.createElement("table");

// Generate the word "BINGO" in the player's card
  const bingoWordRow = document.createElement("tr");
  const bingoWord = ["B", "I", "N", "G", "O"];
  bingoWord.forEach((letter) => {
  const cell = document.createElement("td");
  cell.textContent = letter;
  cell.classList.add("bingo-letter"); // Adicionar a classe "bingo-letter"
  bingoWordRow.appendChild(cell);
  });
  table.appendChild(bingoWordRow);


    // Generate random numbers for each player's card
    for (let i = 0; i < 5; i++) {
      const row = document.createElement("tr");

      // Generate random numbers for each column of the row
      for (let j = 0; j < 5; j++) {
        const cell = document.createElement("td");
        const minNumber = j * 15 + 1; // Calculate the minimum number for the column
        const maxNumber = (j + 1) * 15; // Calculate the maximum number for the column
        const randomNumber =
          Math.floor(Math.random() * (maxNumber - minNumber + 1)) +
          minNumber;
        const number = formatNumber(randomNumber);
        cell.textContent = number;

        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    playerDiv.appendChild(playerNameHeader);
    playerDiv.appendChild(table);
    containerGame.appendChild(playerDiv);
  });
}


let playerAddedMessageTimer = null;


// Function to format the number by adding a leading zero if it's less than 10
function formatNumber(number) {
  return number < 10 ? "0" + number : number.toString();
}

// Function to generate the game table with random numbers
function generateGameTable() {
  const numbersTable = document.getElementById("numbers-table");
  numbersTable.innerHTML = "";

  const divContainer = document.createElement("div");
  divContainer.classList.add("game-container");

  const table = document.createElement("table");
  table.classList.add("game-table");

  const numbers = [];
  for (let i = 1; i <= 73; i++) {
    numbers.push(i);
  }

  const intervalId = setInterval(() => {
    if (numbers.length === 0 || isAnyRowFullyMarked()) {
      clearInterval(intervalId);
      return;
    }

    const cell = document.createElement("td");
    const index = Math.floor(Math.random() * numbers.length);
    const number = formatNumber(numbers[index]);
    cell.textContent = number;
    numbers.splice(index, 1);

    const rows = table.getElementsByTagName("tr");
    let currentRow = rows[rows.length - 1];

    if (!currentRow) {
      currentRow = document.createElement("tr");
      table.appendChild(currentRow);
    }

    if (currentRow.children.length === 5) {
      currentRow = document.createElement("tr");
      table.appendChild(currentRow);
    }

    currentRow.appendChild(cell);

    // Check if any player's table has the current number and mark it
    players.forEach(player => {
      const playerTable = document.getElementById(player.playerName);
      if (playerTable && playerTable.classList.contains("player-table")) {
        const cells = playerTable.getElementsByTagName("td");
        for (let i = 0; i < cells.length; i++) {
          if (cells[i].textContent === number) {
            cells[i].classList.add("marked");
          }
        }
      }
    });
  }, 100);

  divContainer.appendChild(table);
  numbersTable.appendChild(divContainer);
}

function startGame() {
  const startButton = document.getElementById('start-button');
  startButton.disabled = true;
  startButton.textContent = 'Jogo em andamento';

  const containerGame = document.getElementById('container-game');
  containerGame.innerHTML = '';

  for (let i = 0; i < players.length; i++) {
      const playerContainer = document.createElement('div');
      playerContainer.classList.add('player-container');
      playerContainer.textContent = players[i];
      containerGame.appendChild(playerContainer);
  }
}