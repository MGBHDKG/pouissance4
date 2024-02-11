import displayGrid from "../grid/displayGrid";

export default function displayNewPlayer(pseudo){
    const players = document.querySelectorAll(".player");
    const p2 = players[1].querySelector("p");

    p2.textContent = pseudo;

    let yourTurn = document.querySelectorAll("h2");
    yourTurn[0].style.display = "block";

    displayGrid();
}