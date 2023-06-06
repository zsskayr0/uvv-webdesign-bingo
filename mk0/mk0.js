function createTable() {
    // Obtém os valores dos campos de entrada e remove espaços em branco extras
    var players = [];
    players.push(document.getElementById("N1").value.trim());
    players.push(document.getElementById("N2").value.trim());
    players.push(document.getElementById("N3").value.trim());

    // Obtém a referência do contêiner da tabela
    var tableContainer = document.getElementById("container-game");
    tableContainer.innerHTML = ""; // Limpa o conteúdo existente

    // Itera sobre os jogadores fornecidos
    for (var i = 0; i < players.length; i++) {
        var player = players[i].trim();

        // Verifica se o nome do jogador não está vazio
        if (player !== '') {
            // Cria um elemento div para conter a tabela
            var tableDiv = document.createElement("div");
            tableDiv.classList.add("table-container");

            // Cria um elemento h3 para exibir o título do jogador
            var playerTitle = document.createElement("h3");
            playerTitle.innerText = player;
            playerTitle.style.marginBottom = '10px';
            tableDiv.appendChild(playerTitle);

            // Cria uma tabela e um tbody
            var table = document.createElement("table");
            var tbody = document.createElement("tbody");
            table.appendChild(tbody);

            // Cria a primeira linha da tabela com os cabeçalhos "B, I, N, G, O"
            var logRow = document.createElement("tr");
            logRow.innerHTML = "<th>B</th><th>I</th><th>N</th><th>G</th><th>O</th>";
            tbody.appendChild(logRow);

            // Preenche a tabela com números aleatórios
            for (var j = 0; j < 5; j++) {
                var row = document.createElement("tr");
                for (var k = 0; k < 5; k++) {
                    var cell = document.createElement("td");
                    var randomNumber = Math.floor(Math.random() * 100);
                    var formattedNumber = randomNumber < 10 ? '0' + randomNumber : randomNumber;
                    cell.innerText = formattedNumber;
                    row.appendChild(cell);
                }
                tbody.appendChild(row);
            }

            // Adiciona a tabela completa ao elemento div
            tableDiv.appendChild(table);

            // Adiciona o elemento div ao contêiner da tabela
            tableContainer.appendChild(tableDiv);
        }
    }
}

function generateNumbers() {
    // Gere os números aleatórios e preencha a tabela de números
    var numbersTable = document.getElementById("numbers-table");
    numbersTable.innerHTML = ""; // Limpa o conteúdo existente

    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    var numbers = [];

    // Gere um array com os números de 1 a 75
    for (var i = 1; i <= 75; i++) {
        numbers.push(i);
    }

    // Embaralhe o array de números aleatoriamente
    for (var i = numbers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
    }

    var count = 0;
    var maxCols = Math.floor(518.9 / 28); // Calcula o número máximo de colunas com base na largura máxima

    for (var row = 0; row < 4; row++) {
        var tr = document.createElement("tr");
        for (var col = 0; col < maxCols; col++) {
            var cell = document.createElement("td");
            cell.textContent = numbers[count++];
            tr.appendChild(cell);
            if (count >= 75) break; // Sai do loop se todos os números foram gerados
        }
        tbody.appendChild(tr);
        if (count >= 75) break; // Sai do loop se todos os números foram gerados
    }

    numbersTable.appendChild(table);

    // Exiba a div dos números gerados
    var containerGamenumber = document.getElementById("container-gamenumber");
    containerGamenumber.classList.add("show");
}
