let rooms = {};

document.addEventListener("DOMContentLoaded", function () {
  const createRoomForm = document.getElementById("createRoomForm");
  // const roomNameInput = document.getElementById("roomName");
  // const maxPlayersInput = document.getElementById("maxPlayers");
  const usernameInput = document.getElementById("username");
  const messageDiv = document.getElementById("message");

  if (
    createRoomForm &&
    // roomNameInput &&
    // maxPlayersInput &&
    usernameInput &&
    messageDiv
  ) {
    createRoomForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // const roomName = roomNameInput.value;
      // const maxPlayers = maxPlayersInput.value;
      const username = usernameInput.value;

      // Check if room name already exists
      // for (let roomId in rooms) {
      //   if (rooms[roomId].name === roomName) {
      //     messageDiv.innerHTML = "Le nom de la partie existe déjà!";
      //     messageDiv.style.color = "#ff0000";
      //     return;
      //   }
      // }

      const roomId = Date.now().toString();

      // Check if room ID already exists (highly unlikely but for completeness)
      if (rooms[roomId]) {
        messageDiv.innerHTML = "Erreur lors de la création de la partie!";
        messageDiv.style.color = "#ff0000";
        return;
      }

      rooms[roomId] = {
        // name: roomName,
        // maxPlayers: maxPlayers,
        players: [username],
      };

      console.log("Nouvelle room ajoutée:", rooms[roomId]);
      messageDiv.innerHTML = "Partie créée avec succès!";
      messageDiv.style.color = "#008000";

      // Redirection vers la page de la partie créée avec les paramètres
      window.location.href = `game.html?roomId=${roomId}&username=${encodeURIComponent(username)}`;
    });
  } else {
    console.error("Form or input elements not found in the DOM.");
  }
});

function updateRoomsList() {
  console.log("Mise à jour de la liste des rooms:", rooms);
  const roomsListDiv = document.getElementById("roomsList");
  roomsListDiv.innerHTML = "<h2>Parties disponibles:</h2>";

  for (let roomId in rooms) {
    let room = rooms[roomId];
    let roomDiv = document.createElement("div");
    roomDiv.innerHTML = `<strong>${room.name}</strong> (Max joueurs: ${room.maxPlayers}, Joueurs: ${room.players.length})
                         <a href="game.html?roomId=${roomId}&username=${encodeURIComponent(prompt("Entrez votre pseudo:") || "JoueurAnonyme")}">Rejoindre</a>`;
    roomsListDiv.appendChild(roomDiv);
  }
}

// Initial call to show existing rooms (if any)
updateRoomsList();
