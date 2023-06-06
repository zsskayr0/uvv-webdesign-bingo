function createTable() {
    var players = [
      document.getElementById("N1").value.trim(),
      document.getElementById("N2").value.trim(),
      document.getElementById("N3").value.trim()
    ];
  
    var tableContainer = document.getElementById("container-game");
    tableContainer.innerHTML = "";
  
    for (var i = 0; i < players.length; i++) {
      var player = players[i].trim();
  
      if (player !== '') {
        var tableDiv = document.createElement("div");
        tableDiv.classList.add("table-container", "player-table");
  
        var playerTitle = document.createElement("h3");
        playerTitle.innerText = player;
        playerTitle.style.marginBottom = '10px';
        tableDiv.appendChild(playerTitle);
  
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
  
        var logRow = document.createElement("tr");
        logRow.innerHTML = "<th>B</th><th>I</th><th>N</th><th>G</th><th>O</th>";
        tbody.appendChild(logRow);
  
        var numbers = [];
  
        for (var j = 1; j <= 75; j++) {
          numbers.push(j);
        }
  
        for (var j = 0; j < 5; j++) {
          var row = document.createElement("tr");
          for (var k = 0; k < 5; k++) {
            var cell = document.createElement("td");
            var randomNumber = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
            var formattedNumber = randomNumber < 10 ? '0' + randomNumber : randomNumber;
            cell.innerText = formattedNumber;
            row.appendChild(cell);
          }
          tbody.appendChild(row);
        }
  
        tableDiv.appendChild(table);
        tableContainer.appendChild(tableDiv);
      }
    }
  }
  