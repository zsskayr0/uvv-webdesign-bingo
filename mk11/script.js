// Array to store the players
let players = [];

// Function to add a player to the list and create the table
function addPlayer() {
  const playerNameInput = document.getElementById("playername");
  const playerName = playerNameInput.value.trim();

  if (playerName !== "") {
    const player = {
      playerName: playerName,
      isWinner: false,
      table: [] // Array to store the generated numbers for the player's table
    };

    players.push(player);
    playerNameInput.value = "";
    playerNameInput.focus();
    createTable();
    showMessage("Jogador Adicionado");
    console.log(players);
  } else {
    showMessage("Por Favor insira um Nome Válido");
  }
}

// Function to show the player message
function showMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  messageContainer.textContent = message;

  const containerGame = document.getElementById("container-message");
  containerGame.appendChild(messageContainer);

  setTimeout(function () {
    messageContainer.style.opacity = "1";
  }, 100);

  setTimeout(function () {
    messageContainer.style.opacity = "0";
    setTimeout(function () {
      messageContainer.remove();
    }, 300);
  }, 2300);
}

function seeWinner(message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  messageContainer.textContent = message;

  const containerGame = document.getElementById("container-message");
  containerGame.appendChild(messageContainer);

  setTimeout(function () {
    messageContainer.style.opacity = "1";
  }, 100);
}

// Event listener to add a player when Enter key is pressed
const playerNameInput = document.getElementById("playername");
playerNameInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addPlayer();
  }
});

// Function to generate random numbers
function generateRandomNumber(quantity, min, max) {
  var numbers = [];

  while (numbers.length < quantity) {
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(random)) {
      numbers.push(random);
    }
  }

  return numbers;
}

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
    const columnRange = [
      { min: 1, max: 15 },
      { min: 16, max: 30 },
      { min: 31, max: 45 },
      { min: 46, max: 60 },
      { min: 61, max: 75 },
    ];

    // Array to store the generated numbers for each column
    const columnNumbers = [];

    // Generate random numbers for each column of the table
    for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
      const column = document.createElement("tr");

      // Generate random numbers for each row of the column
      const columnNumber = generateUniqueRandomNumbers(5, columnRange[columnIndex].min, columnRange[columnIndex].max, columnNumbers);
      columnNumbers.push(...columnNumber);

      for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        const cell = document.createElement("td");
        if (columnIndex === 2 && rowIndex === 2) {
          cell.textContent = " ";
          cell.classList.add("marked");
        } else {
          const number = formatNumber(columnNumber[rowIndex]);
          cell.textContent = number;
        }

        column.appendChild(cell);
      }

      table.appendChild(column);
    }

    playerDiv.appendChild(table);
    containerGame.appendChild(playerDiv);
  });
}

// Function to generate unique random numbers within a range
function generateUniqueRandomNumbers(quantity, min, max, existingNumbers) {
  const numbers = [];

  while (numbers.length < quantity) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!existingNumbers.includes(random) && !numbers.includes(random)) {
      numbers.push(random);
    }
  }

  return numbers;
}


// Function to generate unique random numbers within a range
function generateUniqueRandomNumbers(quantity, min, max, existingNumbers) {
  const numbers = [];

  while (numbers.length < quantity) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!numbers.includes(random) && !existingNumbers.includes(random)) {
      numbers.push(random);
      existingNumbers.push(random);
    }
  }

  return numbers;
}


// Function to generate unique random numbers for a specific player's table
function generateUniqueRandomNumbers(quantity, min, max, playerTable) {
  const numbers = [];

  while (numbers.length < quantity) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!numbers.includes(random) && !playerTable.includes(random)) {
      numbers.push(random);
      playerTable.push(random);
    }
  }

  return numbers;
}

// Function to format the number by adding a leading zero if it's less than 10
function formatNumber(number) {
  return number < 10 ? "0" + number : number.toString();
}

// Function to generate the game table with random numbers
function generateGameTable() {
  const numbersTable = document.getElementById("numbers-table");
  numbersTable.innerHTML = "";

  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game-container");

  const table = document.createElement("table");
  table.classList.add("game-table");

  const gameNumbers = [];
  for (let i = 1; i <= 75; i++) {
    gameNumbers.push(i);
  }

  const intervalId = setInterval(() => {
    if (gameNumbers.length === 0 || isAnyPlayerFullyMarked()) {
      clearInterval(intervalId);
      checkWinners(); // Check winners after each number is marked

      const fullyMarkedPlayer = players.find(player => {
        const playerTable = document.getElementById(player.playerName);
        return playerTable && playerTable.classList.contains("fully-marked");
      });

      if (fullyMarkedPlayer) {
        seeWinner("Jogador completamente marcado: " + fullyMarkedPlayer.playerName);
      }

      return;
    }

    const cell = document.createElement("td");
    const index = Math.floor(Math.random() * gameNumbers.length);
    const number = formatNumber(gameNumbers[index]);
    cell.textContent = number;
    gameNumbers.splice(index, 1);

    const rows = table.getElementsByTagName("tr");
    let currentRow = rows[rows.length - 1];

    if (!currentRow || currentRow.children.length === 5) {
      currentRow = document.createElement("tr");
      table.appendChild(currentRow);
    }

    currentRow.appendChild(cell);

    // Check if any player's table has the current number and mark it
    players.forEach((player) => {
      const playerTable = document.getElementById(player.playerName);
      if (
        playerTable &&
        playerTable.classList.contains("player-table") &&
        !player.isWinner
      ) {
        const cells = playerTable.getElementsByTagName("td");
        for (let i = 0; i < cells.length; i++) {
          if (cells[i].textContent === number) {
            cells[i].classList.add("marked");
          }
        }
      }
    });
  }, 50);

  if (gameNumbers.length === 0 || isAnyPlayerFullyMarked()) {
    clearInterval(intervalId);
    checkWinners(); // Check winners after each number is marked

    const fullyMarkedPlayer = players.find(player => {
      const playerTable = document.getElementById(player.playerName);
      return playerTable && playerTable.classList.contains("fully-marked");
    });

    if (fullyMarkedPlayer) {
      seeWinner("O Vencedor é: " + fullyMarkedPlayer.playerName);
    }

    return;
  }

  gameContainer.appendChild(table);
  numbersTable.appendChild(gameContainer);
}

// Function to check if any player has any row fully marked
function isAnyPlayerFullyMarked() {
  let anyPlayerFullyMarked = false;
  players.forEach((player) => {
    const playerTable = document.getElementById(player.playerName);
    if (
      playerTable &&
      playerTable.classList.contains("player-table") &&
      !player.isWinner
    ) {
      const cells = playerTable.getElementsByTagName("td");
      let isPlayerFullyMarked = true;
      for (let i = 0; i < cells.length; i++) {
        if (!cells[i].classList.contains("marked")) {
          isPlayerFullyMarked = false;
          break;
        }
      }
      if (isPlayerFullyMarked) {
        playerTable.classList.add("fully-marked");
      } else {
        playerTable.classList.remove("fully-marked");
      }
      if (isPlayerFullyMarked) {
        player.isWinner = true;
        anyPlayerFullyMarked = true;
      }
    }
  });

  if (anyPlayerFullyMarked) {
    checkWinners();
  }

  return anyPlayerFullyMarked;
}

// Function to check if any player has won the game
function checkWinners() {
  players.forEach((player) => {
    const playerTable = document.getElementById(player.playerName);
    if (
      playerTable &&
      playerTable.classList.contains("player-table") &&
      !player.isWinner
    ) {
      const cells = playerTable.getElementsByTagName("td");
      let isPlayerWinner = true;
      for (let i = 0; i < cells.length; i++) {
        if (!cells[i].classList.contains("marked")) {
          isPlayerWinner = false;
          break;
        }
      }
      player.isWinner = isPlayerWinner;
      if (isPlayerWinner) {
        playerTable.classList.add("winner");
      } else {
        playerTable.classList.remove("winner");
      }
    }
  });
}

// Function to start the game
function startGame() {
  generateGameTable();
}
