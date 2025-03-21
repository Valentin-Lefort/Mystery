document.addEventListener("DOMContentLoaded", function () {
  fetch("word.json")
    .then((response) => response.json())
    .then((data) => {
      const themes = data.words;
      const gameBoard = document.getElementById("gameBoard");
      const cardContainer = document.getElementById("cardContainer");

      // Function to get the room ID from the URL parameters
      function getRoomIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("roomId");
      }

      // Get the room ID from the URL
      const currentRoomId = getRoomIdFromUrl();

      // If there is no room ID in the URL, stop the script
      if (!currentRoomId) {
        console.error("No roomId found in the URL");
        return;
      }

      // Create invite link and copy button
      const inviteLink = `${window.location.origin}/mystery/game.html?roomId=${currentRoomId}`;
      const inviteLinkContainer = document.createElement("div");
      inviteLinkContainer.className = "invite-link-container";

      const inviteLinkDisplay = document.createElement("input");
      inviteLinkDisplay.type = "text";
      inviteLinkDisplay.value = inviteLink;
      inviteLinkDisplay.readOnly = true;
      inviteLinkDisplay.className = "invite-link-display";

      const copyButton = document.createElement("button");
      copyButton.textContent = "Copy Invite Link";
      copyButton.className = "copy-button";
      copyButton.addEventListener("click", () => {
        navigator.clipboard
          .writeText(inviteLink)
          .then(() => {})
          .catch((err) => {
            console.error("Failed to copy invite link: ", err);
          });
      });

      inviteLinkContainer.appendChild(inviteLinkDisplay);
      inviteLinkContainer.appendChild(copyButton);
      cardContainer.parentNode.insertBefore(inviteLinkContainer, cardContainer);

      themes.forEach((theme) => {
        const boxDiv = document.createElement("div");
        boxDiv.className = "box";

        const itemDiv1 = document.createElement("div");
        itemDiv1.className = "item";

        const itemDiv2 = document.createElement("div");
        itemDiv2.className = "item";

        const link = document.createElement("a");
        link.href = "#";
        link.className = "item_link";

        const itemBgDiv = document.createElement("div");
        itemBgDiv.className = "item_bg";
        itemBgDiv.style.backgroundColor = theme.color;

        const itemTitleDiv = document.createElement("div");
        itemTitleDiv.className = "item_title";
        itemTitleDiv.textContent = theme.theme.fr;

        link.appendChild(itemBgDiv);
        link.appendChild(itemTitleDiv);
        itemDiv2.appendChild(link);
        itemDiv1.appendChild(itemDiv2);
        boxDiv.appendChild(itemDiv1);
        cardContainer.appendChild(boxDiv);

        // Add event listener for each theme card to make it clickable and toggle the color of the item_bg
        let isToggled = false;

        link.addEventListener("click", () => {
          if (isToggled) {
            link.style.backgroundColor = "";
          } else {
            link.style.backgroundColor = theme.color;
          }
          isToggled = !isToggled;
        });
      });
    });
});
