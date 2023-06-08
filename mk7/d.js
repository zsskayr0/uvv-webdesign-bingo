// Array to store the players
let players = [];

// Function to add a player to the list and create the table
function addPlayer() {
  const playerNameInput = document.getElementById("playername");
  const playerName = playerNameInput.value.trim();

  var player = {
    playerName: playerName,
    table: null // Initialize the table property with null
  }

  if (playerName !== "") {
    players.push(player);
    playerNameInput.value = "";
    playerNameInput.focus();
    createTable(player); // Pass the player object to the createTable function

    console.log(players);
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
function createTable(player) {
  const containerGame = document.getElementById("container-game");
  containerGame.innerHTML = "";

  const playerDiv = document.createElement("div");
  playerDiv.classList.add("table-container");

  const playerNameHeader = document.createElement("h3");
  playerNameHeader.textContent = player.playerName;

  const table = document.createElement("table");

  // Generate random numbers for each player's card
  for (let i = 0; i < 5; i++) {
    const row = document.createElement("tr");

    // Generate random numbers for each column of the row
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("td");
      const minNumber = j * 15 + 1; // Calculate the minimum number for the column
      const maxNumber = (j + 1) * 15; // Calculate the maximum number for the column
      const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      const number = formatNumber(randomNumber);
      cell.textContent = number;

      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  player.table = table; // Assign the table to the player's table property

  playerDiv.appendChild(playerNameHeader);
  playerDiv.appendChild(table);
  containerGame.appendChild(playerDiv);
}

// Function to format the number by adding a leading zero if it's less than 10
function formatNumber(number) {
  return number < 10 ? "0" + number : number.toString();
}