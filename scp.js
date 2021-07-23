var arr;
var arr1;
var mangbandau;

var arrTemp;
resetTable();

function resetTable() {
    arr = taoMangHaiChieu(9);
    arr1 = taoMangCo(arr);

    mangbandau = taoMangHaiChieu(9);
    sodokoSolver(mangbandau);
    arrTemp = taoMangHaiChieuTam(9);
    drawTable();
}

function taoMangHaiChieuTam(size) {
    var board = [];
    for (let i = 0; i < size; i++) {
        board[i] = new Array();
        for (let j = 0; j < size; j++) {
            board[i][j] = new Array();
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board[i][j] = 0;
        }
    }
    return board;
}

function taoMangHaiChieu(size) {
    var board = [];
    for (let i = 0; i < size; i++) {
        board[i] = new Array();
        for (let j = 0; j < size; j++) {
            board[i][j] = new Array();
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board[i][j] = 0;
        }
    }

    taoHangDau(board);

    return board;
}

function hienThiMang(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            document.write(board[i][j] + "&nbsp;&nbsp");
        }
        document.write("<br>");
    }
}

function taoMangCo(board) {
    let count = Math.floor(board.length * board.length * 0.70);
    let count1 = board.length * board.length - count;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            var val = Math.floor(Math.random() * (board.length - 5) + 1);

            if (val != 1 && count > 0)
                count--;

            if (val == 1 && count1 > 0)
                count1--;

            if (count == 0) {
                board[i][j] = 1;
            }

            if (count1 == 0) {
                board[i][j] = 0;
            }

            if (val == 1 && count > 0 && count1 > 0)
                board[i][j] = 1;
            else if (val != 1 && count > 0 && count1 > 0)
                board[i][j] = 0;
        }
    }
    return board;
}

function taoHangDau(board) {
    board[0][0] = Math.floor(Math.random() * (board.length) + 1);
    while (board[0][1] == board[0][0]) {
        board[0][1] = Math.floor(Math.random() * (board.length) + 1);
    }

    while (board[0][1] == board[0][2]) {
        board[0][2] = Math.floor(Math.random() * (board.length) + 1);
    }
    return board;
}

function sodokoSolver(data) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (data[i][j] == 0) {
                for (let k = 1; k <= 9; k++) {
                    if (checkValid(data, i, j, k)) {
                        data[i][j] = `${k}`;
                        if (sodokoSolver(data)) {
                            return true;
                        } else {
                            data[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function checkValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}

function drawTable() {
    let table = "<table border='1' >";
    for (let i = 0; i < mangbandau.length; i++) {
        table += "<tr>";
        for (let j = 0; j < mangbandau.length; j++) {

            let printNumber = "";
            if (arr1[i][j] == 1) {
                printNumber = mangbandau[i][j];
            } else if (arr1[i][j] == 0) {
                if (arrTemp[i][j] == 0) {
                    printNumber = " ";
                } else {
                    printNumber = arrTemp[i][j];
                }
            }

            table += `<td id ="td_${i}_${j}" style="text-align:center" class="${arr1[i][j] != 1 ? 'bg-white' : 'bg-green'}" onclick="play(${i},${j})" onfocusout ='update(${i},${j})'
            class=" ${mangbandau[i][j] != arrTemp[i][j] ? 'bg-white' : 'bg-green'}" >
                    ${printNumber} </td>`
        }
        table += "</tr>";
    }
    table += "</table>";

    document.getElementById("sodoku-area").innerHTML = table;
}

drawTable();
alert("Không hợp lệ");
function play(row, col) {
    let td = document.getElementById(`td_${row}_${col}`);
    td.contentEditable = true;
}

function update(row, col) {

    if (arr1[row][col] == 0) {
        let num1 = -1;
        while (num1 < 1 || num1 > 9) {
            let td = document.getElementById(`td_${row}_${col}`);
            let num = parseInt(td.innerText);

            if (isNaN(num) == false ) {
                num1 = num;
                break;
            }

            play(row, col);
            break;
        }

        if (num1 >= 1 && num1 <= 9) {
            arrTemp[row][col] = num1;
        }

        if (mangbandau[row][col] == arrTemp[row][col]) {
            arr1[row][col] = 1;
        }

        drawTable();

        if (checkWin(arrTemp,mangbandau, arr1)) {
            alert("Bạn đã thắng!");
        }
    }
}

function kiemTra() {
    let table = "<table border='1';margin:auto' >";
    
    for (let i = 0; i < mangbandau.length; i++) {
        table += "<tr>";
        for (let j = 0; j < mangbandau.length; j++) {

            let printNumber = "";
            if (arr1[i][j] == 1) {
                printNumber = mangbandau[i][j];
            } else if (arr1[i][j] == 0) {
                if (arrTemp[i][j] == 0) {
                    printNumber = "";
                } else {
                    printNumber = arrTemp[i][j];
                }
            }

            table += `<td style="text-align:center" 
                class="${arr1[i][j] == 1 ? 'bg-green' : (arrTemp[i][j] == 0) ? 'bg-while' : 'bg-yellow'}" 
                onclick="play(${i},${j})">
                    ${printNumber} </td>`
        }
        table += "</tr>";
    }
    table += "</table>";

    document.getElementById("sodoku-area").innerHTML = table;

    //let tableDraw = drawTable();
    setTimeout(function () { drawTable() }, 3000);
}

function checkWin(arrTemp,mangbandau, arr1) {
    let table = "<table border='1';margin:auto' >";
    for (let i = 0; i < mangbandau.length; i++) {
        for (let j = 0; j < mangbandau[i].length; j++) {
            if (arr1[i][j] == 1) {
                arrTemp[i][j] == mangbandau[i][j];
            }
        }
    }
    for (let i = 0; i < arrTemp.length; i++) {
        for (let j = 0; j < arrTemp.length; j++) {
            if (arrTemp[i][j] == 0) {
                return false;
            }
        }
    }

    return true;
}
