function createTable() {
    var tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    var row1 = document.createElement("tr");
    row1.innerHTML = "<th>B</th><th>I</th><th>N</th><th>G</th><th>O</th>";
    tbody.appendChild(row1);

    for (var i = 0; i < 5; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 5; j++) {
            var cell = document.createElement("td");
            var randomNumber = Math.floor(Math.random() * 100);
            var formattedNumber = randomNumber < 10 ? '0' + randomNumber : randomNumber;
            cell.innerText = formattedNumber;
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    tableContainer.appendChild(table);
    document.getElementById("conteiner-game").appendChild(tableContainer);
}