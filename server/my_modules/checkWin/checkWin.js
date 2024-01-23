import checkCols from "./checkCols.js";
import checkDiags from "./checkDiags.js";
import checkRows from "./checkRows.js";

export default function checkWin(grid, playerCoin)
{
    return checkRows(grid, playerCoin) || checkCols(grid, playerCoin) || checkDiags(grid, playerCoin);
}