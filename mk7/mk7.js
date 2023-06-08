// Array to store the players
let players = [];

// Function to add a player to the list and create the table
function addPlayer() {
  const playerNameInput = document.getElementById("playername");
  const playerName = playerNameInput.value.trim();

  var player = {
    playerName: playerName,
  }

  if (playerName !== "") {
    players.push(player);
    playerNameInput.value = "";
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
  }, 3000);
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
