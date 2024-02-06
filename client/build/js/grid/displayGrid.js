import drawGrid from "./drawGrid.js";

export default function displayGrid(){
    const waitScreen = document.getElementById("waitScreen");
    const canva = document.querySelector("canvas");
    const yellowCoin = document.getElementsByClassName("cercle");
    const buttonDiv = document.getElementById("insertCoinButtons");

    waitScreen.style.display = "none";
    canva.style.display = "block";
    buttonDiv.style.display = "flex";
    yellowCoin[1].style.display = "block";

    drawGrid();
}