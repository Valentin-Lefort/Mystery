// Récupérer l'élément HTML où afficher la liste des joueurs
const playerListAndScore = document.getElementById("playerList");

// Fonction pour mettre à jour la liste des joueurs et les scores
function updatePlayerListAndScore() {
  // Récupérer les données des salles depuis localStorage
  let rooms = JSON.parse(localStorage.getItem("rooms")) || {};

  // Récupérer l'ID de la salle depuis les paramètres de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const currentRoomId = urlParams.get("roomId");

  // Vérifier si la salle existe
  if (!currentRoomId || !rooms[currentRoomId]) {
    console.error("Room not found");
    return;
  }

  // Récupérer les joueurs de la salle actuelle
  const currentRoom = rooms[currentRoomId];
  console.log("Current room players:", currentRoom.players);

  // Effacer le contenu précédent de la liste des joueurs
  playerListAndScore.innerHTML = "<h2>Liste des joueurs:</h2>";

  // Créer une liste non ordonnée pour les joueurs
  const playersList = document.createElement("ul");
  playersList.style.listStyle = "none";
  playersList.style.padding = "0";

  // Ajouter chaque joueur à la liste
  currentRoom.players.forEach((player) => {
    const playerItem = document.createElement("li");
    playerItem.style.margin = "10px 0";
    playerItem.style.padding = "8px";
    playerItem.style.backgroundColor = "#f0f0f0";
    playerItem.style.borderRadius = "4px";
    playerItem.innerHTML = `<strong>${player}</strong>`;
    playersList.appendChild(playerItem);
  });

  // Ajouter la liste des joueurs à l'élément HTML
  playerListAndScore.appendChild(playersList);
}

// Fonction pour ajouter un joueur à une salle
function addPlayerToRoom(roomId, username) {
  // Récupérer les données des salles depuis localStorage
  let rooms = JSON.parse(localStorage.getItem("rooms")) || {};

  // Vérifier si la salle existe
  if (!rooms[roomId]) {
    rooms[roomId] = { players: [] };
  }

  // Ajouter le joueur à la salle (si il n'est pas deja present)
  if (!rooms[roomId].players.includes(username)) {
    rooms[roomId].players.push(username);
  }

  // Mettre à jour localStorage
  localStorage.setItem("rooms", JSON.stringify(rooms));

  // Mettre à jour la liste des joueurs
  updatePlayerListAndScore();
}

// Mettre à jour la liste des joueurs au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  updatePlayerListAndScore();
});

// Mettre à jour la liste des joueurs lorsque localStorage est modifié (dans un autre onglet)
window.addEventListener("storage", function (e) {
  if (e.key === "rooms") {
    updatePlayerListAndScore();
  }
});

// Gérer la fermeture de la fenêtre pour supprimer le joueur de la salle
window.addEventListener("beforeunload", function () {
  // Récupérer l'ID de la salle et le nom d'utilisateur depuis les paramètres de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const currentRoomId = urlParams.get("roomId");
  const username = urlParams.get("username");

  // Vérifier si la salle et le nom d'utilisateur existent
  if (currentRoomId && username) {
    // Récupérer les données des salles depuis localStorage
    let rooms = JSON.parse(localStorage.getItem("rooms")) || {};
    const currentRoom = rooms[currentRoomId];

    // Supprimer le joueur de la salle
    if (currentRoom) {
      currentRoom.players = currentRoom.players.filter(
        (player) => player !== username,
      );

      // Si la salle est vide, la supprimer
      if (currentRoom.players.length === 0) {
        delete rooms[currentRoomId];
      }

      // Mettre à jour localStorage
      localStorage.setItem("rooms", JSON.stringify(rooms));
    }
  }
});

// Ajouter un joueur à la salle si l'ID de la salle et le nom d'utilisateur sont présents dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const currentRoomId = urlParams.get("roomId");
const username = urlParams.get("username");

if (currentRoomId && username) {
  addPlayerToRoom(currentRoomId, username);
}
