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


// Função para criar a tabela de jogadores
function createTable() {
  const containerPlayerTable = document.getElementById("container-player-table");
  containerPlayerTable.innerHTML = "";

  players.forEach(player => {
    const table = document.createElement("table");
    const letters = ["B", "I", "N", "G", "O"];

    const row = document.createElement("tr");
    const playerCell = document.createElement("th");
    playerCell.textContent = "Jogador: " + player;
    row.appendChild(playerCell);

    table.appendChild(row);

    for (let i = 0; i < 5; i++) {
      const numberRow = document.createElement("tr");

      for (let j = 0; j < 5; j++) {
        const cell = document.createElement("td");
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        cell.textContent = randomNumber;
        numberRow.appendChild(cell);
      }

      table.appendChild(numberRow);
    }

    const letterRow = document.createElement("tr");
    letters.forEach(letter => {
      const letterCell = document.createElement("th");
      letterCell.textContent = letter;
      letterRow.appendChild(letterCell);
    });

    table.appendChild(letterRow);
    containerPlayerTable.appendChild(table);
  });
}

// Função para criar o elemento de resultado
function createResultBox() {
  const resultBox = document.getElementById("result-box");
  resultBox.innerHTML = "";
  
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  caption.textContent = "Resultado";
  table.appendChild(caption);
  
  // Criar as células com números aleatórios
  for (let i = 0; i < 5; i++) {
    const row = document.createElement("tr");
    
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("td");
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      cell.textContent = randomNumber;
      row.appendChild(cell);
    }
    
    table.appendChild(row);
  }
  
  resultBox.appendChild(table);
}
