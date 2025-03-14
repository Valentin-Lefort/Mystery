document.addEventListener("DOMContentLoaded", function () {
  fetch("word.json")
    .then((response) => response.json())
    .then((data) => {
      const themes = data.words;
      let currentRoom = null;
      const gameBoard = document.getElementById("gameBoard");
      const cardContainer = document.getElementById("cardContainer");
      // loops create card for each theme in word.json with background color and theme name in gameBoard

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
