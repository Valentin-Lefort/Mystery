// Objet pour stocker les rooms créées
let rooms = {};

document.addEventListener("DOMContentLoaded", function () {
  const createRoomForm = document.getElementById("createRoomForm");
  const roomNameInput = document.getElementById("roomName");
  const maxPlayersInput = document.getElementById("maxPlayers");
  const usernameInput = document.getElementById("username");
  const messageDiv = document.getElementById("message");

  if (
    createRoomForm &&
    roomNameInput &&
    maxPlayersInput &&
    usernameInput &&
    messageDiv
  ) {
    createRoomForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const roomName = roomNameInput.value;
      const maxPlayers = maxPlayersInput.value;
      const username = usernameInput.value;

      // Check if room name already exists
      for (let roomId in rooms) {
        if (rooms[roomId].name === roomName) {
          messageDiv.innerHTML = "Le nom de la partie existe déjà!";
          messageDiv.style.color = "#ff0000";
          return;
        }
      }

      const roomId = Date.now().toString();

      // Check if room ID already exists (highly unlikely but for completeness)
      if (rooms[roomId]) {
        messageDiv.innerHTML = "Erreur lors de la création de la partie!";
        messageDiv.style.color = "#ff0000";
        return;
      }

      rooms[roomId] = {
        name: roomName,
        maxPlayers: maxPlayers,
        players: [username],
      };

      console.log("Nouvelle room ajoutée:", rooms[roomId]);
      messageDiv.innerHTML = "Partie créée avec succès!";
      messageDiv.style.color = "#008000";

      updateRoomsList();
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
                         <a href="#" onclick="joinRoom('${roomId}')">Rejoindre</a>`;
    roomsListDiv.appendChild(roomDiv);
  }
}

function joinRoom(roomId) {
  if (rooms[roomId]) {
    if (rooms[roomId].players.length < rooms[roomId].maxPlayers) {
      let username = prompt("Entrez votre pseudo:");
      if (username) {
        rooms[roomId].players.push(username);
        updateRoomsList();
        alert("Vous avez rejoint la partie!");
      } else {
        alert("Pseudo non valide.");
      }
    } else {
      alert("Cette partie est pleine.");
    }
  } else {
    alert("Partie non trouvée.");
  }
}

// Initial call to show existing rooms (if any)
updateRoomsList();
