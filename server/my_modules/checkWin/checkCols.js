export default function checkCols(grid, playerCoin)
{
    for(let i=0; i<7; i++)
    {
        for(let k=0; k<7; k++)
        {
            if(i<4)
            {
                if(grid[i][k] === playerCoin && grid[i+1][k] === playerCoin && grid[i+2][k] === playerCoin && grid[i+3][k] === playerCoin)
                {
                    console.log("cols")
                    return true
                }
            }
        }
    }

    return false;
}