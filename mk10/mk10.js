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
      showMessage("Jogador Adicionado");
      console.log(players);

    } else {
      showMessage("Por Favor insira um Nome Válido");
    }
  }

    // Function to show messages
    function showMessage(message) {
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("message-container");
      messageContainer.textContent = message;
  
      const containerGame = document.getElementById("container-game");
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
          if (columnIndex === 2 && rowIndex === 2) {
            cell.textContent = "X";
            cell.classList.add("marked");
          } else {
            const minNumber = columnRanges[columnIndex].min;
            const maxNumber = columnRanges[columnIndex].max;
            const randomNumber = generateUniqueRandomNumber(
              minNumber,
              maxNumber,
              table
            );
            const number = formatNumber(randomNumber);
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

  // Function to get the minimum number for a column
  function getColumnMinNumber(columnIndex) {
    const columnRanges = [
      { min: 1, max: 15 },
      { min: 16, max: 30 },
      { min: 31, max: 45 },
      { min: 46, max: 60 },
      { min: 61, max: 75 }
    ];

    return columnRanges[columnIndex].min;
  }

  // Function to get the maximum number for a column
  function getColumnMaxNumber(columnIndex) {
    const columnRanges = [
      { min: 1, max: 15 },
      { min: 16, max: 30 },
      { min: 31, max: 45 },
      { min: 46, max: 60 },
      { min: 61, max: 75 }
    ];

    return columnRanges[columnIndex].max;
  }

  // Function to generate a unique random number between min and max
  function generateUniqueRandomNumber(min, max, table) {
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (isNumberAlreadyUsed(randomNumber, table));

    return randomNumber;
  }

  // Function to check if a number is already used in the table
  function isNumberAlreadyUsed(number, table) {
    const cells = table.getElementsByTagName("td");

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent === number.toString()) {
        return true;
      }
    }

    return false;
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

    const numbers = [];
    for (let i = 1; i <= 75; i++) {
      numbers.push(i);
    }

    let drawCount = 0; // Contador de sorteios realizados

    const intervalId = setInterval(() => {
      if (drawCount > 74) {
        clearInterval(intervalId);
        checkWinners();
        return;
      }

      if (numbers.length === 0) {
        clearInterval(intervalId);
        checkWinners();
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
      players.forEach((player) => {
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

      drawCount++; // Incrementa o contador de sorteios realizados
    }, 75);

    if (drawCount > 74) {
      clearInterval(intervalId);
      checkWinners();
      return;
    }

    gameContainer.appendChild(table);
    numbersTable.appendChild(gameContainer);
  }

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