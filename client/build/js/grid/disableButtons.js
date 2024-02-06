export default function disableButtons()
{
    const buttonInsertCoins = document.getElementsByClassName("buttonInsertCoins");

    for (const button of buttonInsertCoins){
        button.disabled = true;
    }
}