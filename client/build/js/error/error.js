export default function error(msg)
{
    const errorDialog = document.getElementsByClassName("error")[0];
    const text = document.querySelector('div.error > p:nth-child(2)');

    errorDialog.style.display = "flex";
    text.textContent = msg;

    setTimeout(() => {
        errorDialog.style.display = "none";
        text.textContent = "";
    }, 3000)
}