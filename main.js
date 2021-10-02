let grid = [];
let player1 = true;
let ongoingGame = false;

function makeEmptyGrid(){
    for(let i = 0; i < 3; i++) {
        let row = [];
        for(let j = 0; j < 3; j++) {
            row.push(-1);
        }
        grid.push(row);
    }
}



function showGrid() {
    let table = document.createElement("table");
    table.setAttribute("id", "table");
    for(let i = 0; i < 3; i++) {
        let rows = document.createElement("tr");
        for(let j = 0; j < 3; j++) {
            let col = document.createElement("td");
            let tdName = i+ ","+j;
            col.setAttribute("id", tdName);
            let text = document.createTextNode("");
            col.appendChild(text);
            col.setAttribute("onclick", "insertXorO("+i+", "+j+")");
            rows.appendChild(col);
        }
        table.appendChild(rows);
    }
    document.getElementById("body").appendChild(table);
}


function insertXorO(row, col) {
    if(player1) {
        document.getElementById(row+","+col).innerHTML = "X";
        grid[row][col] = 1;
    } else if(!player1) {
        document.getElementById(row+","+col).innerHTML = "O";
        grid[row][col] = 2;
    }
    checkForWin(row, col);
    player1 = !player1;
}

function checkForWin(row, col) {
    if(checkHorisontal(row) || checkVertical(col) || checkTopLeftToBottomRight() || checkTopRightToBottomLeft()) {
        console.log("you win"); 
    }
}

function checkHorisontal(row) {
    for(let i = 0; i < 3; i++) {
        if(player1) {
            if(grid[row][i] != 1) {
                return false;
            } 
        } else {
            if(grid[row][i] != 2) {
                return false;
            }
        }
    }
    return true;
}

function checkVertical(col) {
    for(let i = 0; i < 3; i++) {
        if(player1) {
            if(grid[i][col] != 1) {
                return false;
            } 
        } else {
            if(grid[i][col] != 2) {
                return false;
            } 
        }
    }
    return true;
}

function checkTopLeftToBottomRight(){
    for(let i = 0; i < 3; i++) {
        if(player1) {
            if(grid[i][i] != 1){
                return false;
            }
        } else {
            if(grid[i][i] != 2){
                return false;
            }
        }
    }
    return true;
}

function checkTopRightToBottomLeft() {
    for(let i = 0; i < 3; i++){
        if(player1) {
            if(grid[i][2-i] != 1) {
                return false;
            }
        } else {
            if(grid[i][2-i] != 2) {
                return false;
            }
        }
    } 
    return true;
}


    
function setup() {
    let table = document.getElementById("table");
    if(table != null){
        table.remove();
    }
    makeEmptyGrid();
    showGrid();
}
