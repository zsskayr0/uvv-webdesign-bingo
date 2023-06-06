// Array to store the players
let players = [];

// Function to add a player to the list and create the table
function addPlayer() {
  const playerNameInput = document.getElementById("player-name");
  const playerName = playerNameInput.value;
  
  if (playerName !== "") {
    players.push(playerName);
    playerNameInput.value = "";

    updateTable();
  }
}

// Function to start the game
function startGame() {
  const tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = "";
  
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";
  
  // Shuffle the players array
  players = shuffleArray(players);
  
  // Create the game table
  const gameTable = document.createElement("table");
  gameTable.className = "game-table";
  
  // Add a row for each player
  players.forEach(player => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = player;
    row.appendChild(cell);
    gameTable.appendChild(row);
  });
  
  // Append the game table to the container
  gameContainer.appendChild(gameTable);
}

// Function to update the players table
function updateTable() {
  const tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = "";
  
  // Create the table
  const table = document.createElement("table");
  table.className = "player-table";
  
  // Add a row for each player
  players.forEach(player => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = player;
    row.appendChild(cell);
    table.appendChild(row);
  });
  
  // Append the table to the container
  tableContainer.appendChild(table);
}

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
