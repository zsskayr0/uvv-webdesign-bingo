// Array to store the players
let players = [];

// Function to add a player to the list and create the table
function addPlayer() {
  const playerNameInput = document.getElementById("playername");
  const playerName = playerNameInput.value.trim();

  if (playerName !== "") {
    const player = {
      playerName: playerName,
      isWinner: false
    };
    

    players.push(player);
    playerNameInput.value = "";
    playerNameInput.focus();
    createTable();
    console.log(players);
  }
}

// Event listener to add a player when Enter key is pressed
const playerNameInput = document.getElementById("playername");
playerNameInput.addEventListener("keyup", function (event) {
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
    playerDiv.appendChild(playerNameHeader);

    const table = document.createElement("table");
    table.id = player.playerName;
    table.classList.add("player-table");

    // Generate the word "BINGO" in the header row
    const headerRow = document.createElement("tr");
    const bingoWord = ["B", "I", "N", "G", "O"];
    bingoWord.forEach((letter) => {
      const cell = document.createElement("th");
      cell.textContent = letter;
      headerRow.appendChild(cell);
    });
    table.appendChild(headerRow);

    // Array to store the column ranges
    const columnRanges = [
      { min: 1, max: 15 },
      { min: 16, max: 30 },
      { min: 31, max: 45 },
      { min: 46, max: 60 },
      { min: 61, max: 75 }
    ];

    // Generate random numbers for each column of the table
    for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
      const column = document.createElement("tr");

      // Generate random numbers for each row of the column
      for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        const cell = document.createElement("td");
        const minNumber = columnRanges[columnIndex].min;
        const maxNumber = columnRanges[columnIndex].max;
        const randomNumber = generateUniqueRandomNumber(minNumber, maxNumber, table);
        const number = formatNumber(randomNumber);
        cell.textContent = number;

        column.appendChild(cell);
      }

      table.appendChild(column);
    }

    playerDiv.appendChild(table);
    containerGame.appendChild(playerDiv);
  });
}

// Function to start the game
function startGame() {
  generateGameTable();
}
