import drawGrid from "../grid/drawGrid.js";

export default function restartGame()
{
    const endGameDiv = document.getElementById("winScreen");
    endGameDiv.style.display = "none";

    drawGrid();
}