let playernum;
let turn;


socket.on("sendingGrid", data => {
    showGrid(data.grid);
    console.log(data);
    playernum = data.playernum;
    console.log(playernum);
    turn = data.turn;
});

socket.on("updatedGrid", data => {
    document.getElementById("table").remove();
    turn = data.turn;
    showGrid(data.grid);
    if(data.done == true) {
        let button = document.createElement("button");
        button.setAttribute("onclick", "setup()");
        button.innerHTML = "Start new game";
        document.getElementById("body").appendChild(button);
    }
})

function showGrid(grid) {
    let table = document.createElement("table");
    table.setAttribute("id", "table");
    for(let i = 0; i < grid.length; i++) {
        let rows = document.createElement("tr");
        for(let j = 0; j < grid[i].length; j++) {
            let col = document.createElement("td");
            let tdName = i+ ","+j;
            col.setAttribute("id", tdName);
            let symbol = grid[i][j] == 0 ? "X" : grid[i][j] == 1 ? "O" : "";
            let text = document.createTextNode(symbol);
            col.appendChild(text);
            col.setAttribute("onclick", "insertXorO("+i+", "+j+")");
            rows.appendChild(col);
        }
        table.appendChild(rows);
    }
    document.getElementById("body").appendChild(table);
}


function insertXorO(row, col) {
    if(playernum == turn) {
        socket.emit("placeOnGrid", {row, col})
    }
}

function setup() {
    document.getElementById("body").innerHTML = "";
    let title = document.createTextNode("TicTacToe Game");
    let header = document.createElement("h1");
    header.appendChild(title);
    document.getElementById("body").appendChild(header);
    socket.emit("setup", {oldnum: playernum == undefined ? undefined : playernum});
}
