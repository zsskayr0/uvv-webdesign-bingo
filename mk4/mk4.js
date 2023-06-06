// Array para armazenar os jogadores
let players = [];

// Função para adicionar um jogador à lista e criar a tabela
function addPlayer() {
  const playerNameInput = document.getElementById("playername");
  const playerName = playerNameInput.value;

  if (playerName !== "") {
    players.push(playerName);
    playerNameInput.value = "";
    playerNameInput.focus();
    createTable();
  }
}

// Evento de tecla para adicionar jogador ao pressionar Enter
const playerNameInput = document.getElementById("playername");
playerNameInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addPlayer();
  }
});

// Função para criar a tabela de jogadores
function createTable() {
  const containerGame = document.getElementById("container-game");
  containerGame.innerHTML = "";

  players.forEach(player => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("table-container");

    const playerNameHeader = document.createElement("h3");
    playerNameHeader.textContent = player;

    const table = document.createElement("table");
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

// Função para formatar o número adicionando um zero na frente, se for menor que 10
function formatNumber(number) {
  return number < 10 ? "0" + number : number.toString();
}

function GameStart() {
  const numbersTable = document.getElementById("numbers-table");
  numbersTable.innerHTML = "";

  const numbers = [];
  for (let i = 1; i <= 75; i++) {
    numbers.push(i);
  }

  const divContainer = document.createElement("div");
  divContainer.classList.add("game-container");

  const table = document.createElement("table");
  table.classList.add("game-table");

  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 25; j++) {
      const cell = document.createElement("td");
      const index = Math.floor(Math.random() * numbers.length);
      const number = formatNumber(numbers[index]);
      cell.textContent = number;
      numbers.splice(index, 1);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  divContainer.appendChild(table);
  numbersTable.appendChild(divContainer);
}
