const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 5000;

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html");
});

io.on("connection" , (socket) => {
    console.log("a user connected");
    socket.on("setup", data => {
        console.log(data);
        makeEmptyGrid();
        let package = {
            playernum: data.oldnum == undefined ? socket.client.conn.server.clientsCount-1 : data.oldnum, 
            grid,
            turn
        };
        socket.emit("sendingGrid", package);
        amountOfPlayers++;
    });

    socket.on("placeOnGrid", data => {
        console.log(data.row,data.col);
        if(grid[data.row][data.col] == -1) {
            grid[data.row][data.col] = turn;
            let done = checkForWin(data.row, data.col);
            turn = (turn+1) % 2
            io.emit("updatedGrid", {grid, turn, done});
        }
    });

    socket.on("disconnect", () => {
        amountOfPlayers--;
    });
    
});

server.listen(port, () =>  {
    console.log("running");
});


let grid = [];
let player1 = true;
let ongoingGame = false;
let amountOfPlayers = 0;
let turn = 0;


function checkForWin(row, col) {
    if(checkHorisontal(row) || checkVertical(col) || checkTopLeftToBottomRight() || checkTopRightToBottomLeft()) {
        console.log("you win"); 
        return true;
    }
}

function checkHorisontal(row) {
    for(let i = 0; i < 3; i++) {
        if(grid[row][i] != turn) {
            return false;
        } 
    }
    return true;
}

function checkVertical(col) {
    for(let i = 0; i < 3; i++) {
        if(grid[i][col] != turn) {
            return false;
        } 
    }
    return true;
}

function checkTopLeftToBottomRight(){
    for(let i = 0; i < 3; i++) {
        if(grid[i][i] != turn){
            return false;
        }
    }
    return true;
}

function checkTopRightToBottomLeft() {
    for(let i = 0; i < 3; i++){
        if(grid[i][2-i] != turn) {
            return false;
        }
    } 
    return true;
}

function makeEmptyGrid(){
    grid = [];
    for(let i = 0; i < 3; i++) {
        let row = [];
        for(let j = 0; j < 3; j++) {
            row.push(-1);
        }
        grid.push(row);
    }
}
