// Function to get URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Check if username exists in URL
let username = getUrlParameter("username");

// If username is missing, prompt the user
if (!username) {
  username = prompt("Please enter your username:");

  // If the user entered a username, redirect to the same page with the username
  if (username) {
    const roomId = getUrlParameter("roomId");
    window.location.href = `game.html?roomId=${roomId}&username=${encodeURIComponent(
      username,
    )}`;
  } else {
    // Handle the case where the user cancels the prompt
    alert("Username is required to join the game.");
    // You might want to redirect the user to a different page or take other actions here
  }
} else {
  // Load other scripts after username is handled
  let playerListScript = document.createElement("script");
  playerListScript.src = "js/player_list_and_score.js";
  document.body.appendChild(playerListScript);

  let gameScript = document.createElement("script");
  gameScript.src = "js/game.js";
  document.body.appendChild(gameScript);

  let boardGamesScript = document.createElement("script");
  boardGamesScript.src = "js/board_games.js";
  document.body.appendChild(boardGamesScript);
}
