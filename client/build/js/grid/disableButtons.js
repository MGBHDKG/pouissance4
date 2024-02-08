export default function disableButtons(indexPlayer)
{
    const buttonInsertCoins = document.getElementsByClassName("buttonInsertCoins");

    for (const button of buttonInsertCoins){
        button.disabled = true;
    }

    let yourTurn = document.querySelectorAll("h2");
    yourTurn[indexPlayer].style.display = "none";
}