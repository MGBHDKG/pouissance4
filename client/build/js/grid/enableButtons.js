export default function enableButtons()
{
    const buttonInsertCoins = document.getElementsByClassName("buttonInsertCoins");

    for (const button of buttonInsertCoins){
        button.disabled = false;
    }
}