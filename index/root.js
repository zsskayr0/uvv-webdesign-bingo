function createTable() {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    var row1 = document.createElement("tr");
    row1.innerHTML = "<th>B</th><th>I</th><th>N</th><th>G</th><th>O</th>";
    tbody.appendChild(row1);

    var row2 = document.createElement("tr");
    for (var i = 0; i < 5; i++) {
        var cell = document.createElement("td");
        cell.innerText = Math.floor(Math.random() * 100); // Gera um número aleatório de 0 a 99
        row2.appendChild(cell);
    }
    tbody.appendChild(row2);

    document.getElementById("conteiner-game").appendChild(table);
}