import displayGrid from "../grid/displayGrid.js";

export default function displayNewPlayer(pseudo){
    const players = document.querySelectorAll(".player");
    const p1 = players[1].querySelector("p");

    p1.textContent = pseudo;

    displayGrid();
}