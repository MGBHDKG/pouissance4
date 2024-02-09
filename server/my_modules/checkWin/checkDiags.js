export default function checkDiags(grid, playerCoin)
{
    for(let i=0; i<7; i++)
    {
        for(let k=0; k<7; k++)
        {
            if(i<4 && k<4)
            {
                if(grid[i][k] === playerCoin && grid[i+1][k+1] === playerCoin && grid[i+2][k+2] === playerCoin && grid[i+3][k+3] === playerCoin)
                {
                    return true
                }
            }
            if(i<4 && k>2)
            {
                if(grid[i][k] === playerCoin && grid[i+1][k-1] === playerCoin && grid[i+2][k-2] === playerCoin && grid[i+3][k-3] === playerCoin)
                {
                    return true
                }
            }
        }
    }

    return false;
}