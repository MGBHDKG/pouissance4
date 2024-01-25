export default function checkRows(grid, playerCoin)
{
    for(let i=0; i<7; i++)
    {
        for(let k=0; k<7; k++)
        {
            if(k<4)
            {
                if(grid[i][k] === playerCoin && grid[i][k+1] === playerCoin && grid[i][k+2] === playerCoin && grid[i][k+3] === playerCoin)
                {
                    console.log("rows")
                    return true
                }
            }
        }
    }

    return false;
}