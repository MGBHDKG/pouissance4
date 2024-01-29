export default function drawCoin(x, y, color)
{
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext('2d');

    let xGrid = canvas.offsetLeft;
    let yGrid = canvas.offsetTop;

    context.fillStyle = color;

    context.beginPath();
    context.arc(40 + x*70, 40 + y*70, 30, 0, Math.PI * 2, false);
    context.fill();

}