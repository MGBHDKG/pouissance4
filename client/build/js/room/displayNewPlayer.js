import displayGrid from "../grid/displayGrid.js";

export default function displayNewPlayer(pseudo){
    const players = document.querySelectorAll(".player");
    const p1 = players[1].querySelector("p");

    p1.textContent = pseudo;

    let yourTurn = document.querySelectorAll("h2");
    yourTurn[0].style.display = "block";

    displayGrid();
}