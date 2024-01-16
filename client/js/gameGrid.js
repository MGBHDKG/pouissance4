export default function drawGrid()
{
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext('2d');

    let xGrid = canvas.offsetLeft;
    let yGrid = canvas.offsetTop;

    context.fillStyle = '#283618';
    context.beginPath();

    for(let i=0; i<7; i++){
        for(let k=0; k<7; k++){
            context.arc(40 + k*70, 40 + i*70, 30, 0, Math.PI * 2, false);
            context.fill();
            context.closePath();
        }
    }

    const buttonInsertCoins = document.getElementsByClassName("buttonInsertCoins");

    for(let i=0; i<7; i++){
        buttonInsertCoins[i].style.top = yGrid + "px";
        buttonInsertCoins[i].style.left = xGrid + i*70 + "px";
        buttonInsertCoins[i].style.height = 500 + "px";
    }
}