// Array to store the players
let players = [];

// Function to add a player to the list and create the table
function addPlayer() {
  const playerNameInput = document.getElementById("playername");
  const playerName = playerNameInput.value.trim();

  if (playerName !== "") {
    players.push(playerName);
    playerNameInput.value = "";
    playerNameInput.focus();
    createTable();
  }
}

// Event listener to add a player when Enter key is pressed
const playerNameInput = document.getElementById("playername");
playerNameInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addPlayer();
  }
});

// Function to create the player table
function createTable() {
  const containerGame = document.getElementById("container-game");
  containerGame.innerHTML = "";

  players.forEach(player => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("table-container");

    const playerNameHeader = document.createElement("h3");
    playerNameHeader.textContent = player;

    const table = document.createElement("table");

    // Generate random numbers for each player's card
    for (let i = 0; i < 5; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 5; j++) {
        const cell = document.createElement("td");
        const randomNumber = Math.floor(Math.random() * 75) + 1;
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

// Function to format the number by adding a leading zero if it's less than 10
function formatNumber(number) {
  return number < 10 ? "0" + number : number.toString();
}

function generateGameTable() {
  const numbersTable = document.getElementById("numbers-table");
  numbersTable.innerHTML = "";

  const divContainer = document.createElement("div");
  divContainer.classList.add("game-container");

  const table = document.createElement("table");
  table.classList.add("game-table");

  const numbers = gerarNumerosAleatorios(75, 1, 75);

  const row = document.createElement("tr");
  table.appendChild(row);

  const intervalId = setInterval(() => {
    if (numbers.length === 0 || isAnyRowFullyMarked()) {
      clearInterval(intervalId);
      return;
    }

    if (numbers.length === 25) {
      const newRow = document.createElement("tr");
      table.appendChild(newRow);
      row = newRow;
    }
    
    const cell = document.createElement("td");
    const index = Math.floor(Math.random() * numbers.length);
    const number = formatNumber(numbers[index]);
    cell.textContent = number;
    numbers.splice(index, 1);

    row.appendChild(cell);

    // Check if any player's table has the current number and mark it
    players.forEach(player => {
      const playerTable = document.getElementById(player);
      if (playerTable && playerTable.classList.contains("player-table")) {
        const cells = playerTable.getElementsByTagName("td");
        for (let i = 0; i < cells.length; i++) {
          if (cells[i].textContent === number) {
            cells[i].classList.add("marked");
          }
        }
      }
    });

    if (row.children.length === 5) {
      const newRow = document.createElement("tr");
      table.appendChild(newRow);
      row = newRow;
    }
  }, 100);

  divContainer.appendChild(table);
  numbersTable.appendChild(divContainer);
}

// Function to start the game
function GameStart() {
  generateGameTable();
}
