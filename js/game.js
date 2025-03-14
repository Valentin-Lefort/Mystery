document.addEventListener("DOMContentLoaded", function () {
  let rooms;
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("roomId");
  const username = urlParams.get("username");
  let currentRoom = null;

  // Get the latest rooms data from localStorage
  rooms = JSON.parse(localStorage.getItem("rooms")) || {};

  if (roomId && rooms.hasOwnProperty(roomId)) {
    currentRoom = rooms[roomId];
  } else {
    currentRoom = {
      id: roomId,
      themes: 30,
      players: [],
    };
    rooms[roomId] = currentRoom;
  }

  if (!currentRoom.players.includes(username)) {
    currentRoom.players.push(username);
    // Update localStorage immediately when players change
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }

  // Initialisation de la partie avec roomId et username
  console.log(
    "Room ID:",
    roomId,
    "Username:",
    username,
    "Themes:",
    currentRoom.themes,
    "Players:",
    currentRoom.players,
  );

  // Code pour le modal des mots
  const wordButton = document.getElementById("wordButton");
  const wordModal = document.getElementById("wordModal");
  const wordList = document.getElementById("wordList");

  const reloadButton = document.getElementById("reloadButton");

  if (wordButton && wordModal && wordList && reloadButton) {
    wordButton.addEventListener("click", () => openWordModal(true));
    document
      .querySelector("#wordModal .close")
      .addEventListener("click", closeWordModal);
    window.addEventListener("click", function (event) {
      if (event.target === wordModal) {
        closeWordModal();
      }
    });
    reloadButton.addEventListener("click", () => openWordModal(false)); // Add event listener for Reload button
  }

  function openWordModal(showModal) {
    wordList.innerHTML = ""; // Clear previous content
    fetch("word.json")
      .then((response) => response.json())
      .then((data) => {
        const themes = data.words;
        const selectedThemes = themes.slice(
          0,
          Math.min(currentRoom.themes, themes.length),
        );

        const uniqueWords = new Set();
        selectedThemes.forEach((theme) => {
          let wordAdded = false;
          while (!wordAdded && uniqueWords.size < currentRoom.themes) {
            const randomIndex = Math.floor(Math.random() * theme.words.length);
            const randomWord = theme.words[randomIndex].fr; // Select a random word in French
            if (!uniqueWords.has(randomWord)) {
              uniqueWords.add(randomWord);
              const wordItem = document.createElement("p");
              wordItem.style.backgroundColor = theme.color;
              wordItem.innerHTML = `<strong>${theme.theme.fr}:</strong> ${randomWord}`; // Add theme name in bold
              wordList.appendChild(wordItem);
              wordAdded = true;
            }
          }
        });
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des mots:", error),
      );
    if (showModal) {
      wordModal.style.display = "block";
    }
  }

  function closeWordModal() {
    wordModal.style.display = "none";
  }

  // TODO 1: Ajouter le nom du joueur auquel c'est le tour de jouer
  // TODO 4: au tour du joueur un input apparait pour proposer un mot -> une fois le mots envoyer l'input disparait et le mots ecris est envoyer dans un tableau
});

// Si rooms n'est pas défini globalement, vous pouvez essayer de le récupérer depuis localStorage:
let rooms = JSON.parse(localStorage.getItem("rooms")) || {};
