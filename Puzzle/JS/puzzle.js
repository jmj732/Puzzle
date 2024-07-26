const puzzle = document.getElementById("puzzle"); 
const size = 4;
let gtiles = [];
let gnums;
let emptytile = 0;
for(let y = 0; y < size; y++)
{
    for(let x = 0; x < size; x++)
    {
        gtiles.push(`${x * -100}px ${y * -100}px`)
    }
}
let tmp = 15
shuffle();

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function move(tile)
{
    const background = emptytile.style.background;
    emptytile.classList.remove('empty');
    emptytile.style.backgroundPosition = tile.style.backgroundPosition;
    emptytile.style.backgroundImage = tile.style.backgroundImage;

    tile.classList.add('empty');
    tile.style.background = background;
    
    emptytile = tile;
}

for(let i = 0; i < 16; i++)
{
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.addEventListener('click',() => {
        if(gtiles[i + 4] == gtiles[tmp]){
            move(tile);
            tmp -= 4;
        }
        else if(gtiles[i - 4] == gtiles[tmp]){
            move(tile);
            tmp += 4;
        }
        else if(gtiles[i - 1] == gtiles[tmp] && (i - 1) %  4 != 3){
            move(tile);
            tmp += 1;
        }
        else if(gtiles[i + 1] == gtiles[tmp]){
            move(tile);
            tmp -= 1;
        }
    });
    if(gtiles[i] != '-300px -300px'){
        tile.style.backgroundPosition = gtiles[gnums[i]];
    }
    else{
        tile.classList.add('empty');
        tile.style.background = "white";
        emptytile = tile;
    }
    puzzle.appendChild(tile);
}


function shuffle()
{
    let empty = 15;
    let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    for(let i = 0; i < 100; i++)
    {
        const rand = getRandomIntInclusive(1,4);
        
        if(rand == 1) // 위
        {
            if(empty - 4 >= 0){
                [tiles[empty], tiles[empty-4]] = [tiles[empty - 4], tiles[empty]]
                empty -= 4;
            }
        }
        else if(rand == 2) // 아래
        {
            if(empty + 4 <= 15){
                [tiles[empty], tiles[empty + 4]] = [tiles[empty + 4], tiles[empty]]
                empty += 4;
            }
        }
        else if(rand == 3) // 왼쪽
        {
            if(empty % 4 != 0){
                [tiles[empty], tiles[empty - 1]] = [tiles[empty - 1], tiles[empty]]
                empty -= 1;
            }
        }
        else if(rand == 4)            // 오른쪽
        {
            if((empty + 1) % 4 != 0){
                [tiles[empty], tiles[empty + 1]] = [tiles[empty + 1], tiles[empty]]
                empty += 1;
            }
        }
        else
            i--;
    }

    gnums = tiles;
}