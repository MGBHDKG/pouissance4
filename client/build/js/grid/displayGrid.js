import drawGrid from "./drawGrid.js";

export default function displayGrid(){
    const waitScreen = document.getElementById("waitScreen");
    const canva = document.querySelector("canvas");
    const yellowCoin = document.getElementsByClassName("cercle");
    const buttonDiv = document.getElementById("insertCoinButtons");
    const points = document.querySelectorAll("h4");

    waitScreen.style.display = "none";
    canva.style.display = "block";
    buttonDiv.style.display = "flex";
    yellowCoin[1].style.display = "block";
    points[0].style.display = "block";
    points[1].style.display = "block";
    
    drawGrid();
}