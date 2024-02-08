export default function enableButtons(indexPlayer)
{
    const buttonInsertCoins = document.getElementsByClassName("buttonInsertCoins");

    for (const button of buttonInsertCoins){
        button.disabled = false;
    }

    let yourTurn = document.querySelectorAll("h2");
    yourTurn[indexPlayer].style.display = "block";
}