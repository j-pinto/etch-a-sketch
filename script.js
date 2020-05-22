//initial drawgrid and sketchlisten
drawGrid();
sketchListen();

//listen for grid re-size from user
const gridDimSubmit = document.getElementById("grid-dim-submit");
gridDimSubmit.addEventListener('click', resize);

//when user re-sizes grid, re-draw and re-initiate sketch listeners
function resize()
{
    drawGrid();
    sketchListen();
}

function sketchListen()
{
    const gridListen = document.querySelector("#container");
    gridListen.addEventListener('mouseover', function(e)
    {
        sketch(e.target);
    });
}

function sketch(gridCell)
{
    let currentOpacity = gridCell.getAttribute("data-opacity");
    if (currentOpacity == "1")
    {
        return;
    }
    //console.log("curr", currentOpacity);
    let numberCurrentOpacity = Math.round(Number(currentOpacity) * 10) / 10;
    //console.log("num", numberCurrentOpacity);
    let numberNewOpacity = Math.round((0.1 + numberCurrentOpacity) * 10) / 10;
    //console.log("NUMnew", numberNewOpacity);
    let newOpacity = numberNewOpacity.toString();
    //console.log("new", newOpacity);                                                    
    gridCell.setAttribute("data-opacity", `${newOpacity}`);                                                      
    gridCell.style.backgroundColor = `rgb(0,0,0,${newOpacity})`;
}

function drawGrid()
{
    //clear content and/or children in grid container
    const container = document.querySelector("#container");
    container.innerHTML = "";

    //get grid dimension from user input, handle improper values
    let gridDimensionInput = document.getElementById("number").value;
    if (!gridDimensionInput)
    {
        gridDimensionInput = 25; //use for initial grid draw
        document.getElementById("number").value = "25";
    }
    else if (gridDimensionInput < 1)
    {
        gridDimensionInput = 1;
        document.getElementById("number").value = "1";
    }
    else if (gridDimensionInput > 100)
    {
        document.getElementById("number").value = "25";
        alert("max grid dimension is 100");
        return;
    }

    //set any decimal value to integer, set grid size accordingly through css
    let gridDimension = Math.floor(gridDimensionInput);
    let gridSize = Math.pow(gridDimension, 2);

    document.getElementById("container").style.gridTemplateColumns = `repeat(${gridDimension}, auto)`;
    document.getElementById("container").style.gridTemplateRows = `repeat(${gridDimension}, auto)`;

    //draw the grid
    for (let i = 0; i < gridSize; i++)
    {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("data-opacity", "0.2"); //data-opacity will be used in sketch
        newDiv.classList.add("item");

        container.appendChild(newDiv);
    }
}