let players = [];

function addPlayer() {
  let playerNameInput = document.getElementById("playername");
  let playerName = playerNameInput.value;

  var player = {
    playerName: playerName,
  };

  if (playerName !== "") {
    players.push(player);
    playerNameInput.value = "";
    playerNameInput.focus();
    console.log(players);
  }
}

const playerNameInput = document.getElementById("playername");
playerNameInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addPlayer();
  }
});