"use strict";

const difficultForm = document.querySelector(".difficultForm");
const board = document.querySelector(".board");
const btn = document.getElementById("restart");
let difficult = 4;
let start = new Date();
const winStatus = [];
let boardStatus = [...winStatus, ''];

difficultForm.addEventListener("submit", function(event) {
    event.preventDefault();
    difficult = this.querySelector("input:checked").value;
    makeField(difficult);
    restart();
});

makeField(difficult);

board.addEventListener("click", function (e) {
    if (e.target.classList.contains("chip")) {
        const indexOfTargetChip = boardStatus.indexOf(e.target.textContent);
        const indexOfEmptyChip = findEmptyChip(indexOfTargetChip, boardStatus);
        if (indexOfEmptyChip || indexOfEmptyChip === 0) {
            let temp = boardStatus[indexOfTargetChip];
            boardStatus[indexOfTargetChip] = boardStatus[indexOfEmptyChip];
            boardStatus[indexOfEmptyChip] = temp;
            renderBoard();
            if (checkIfWin()) {
                showWin();
            }
        }
    }
});


btn.addEventListener("click", (event) => restart());

restart();

function renderBoard() {
    board.innerHTML = '';
    boardStatus.forEach((num) => {
        let chip = document.createElement("div");
        chip.classList.add("chip");
        chip.textContent = num;
        if (!num.length) {
            chip.classList.add("empty");
        }
        board.append(chip);
    });
}

function findEmptyChip(i , board) {
    const side = Math.sqrt(board.length);
    let emptyChipIndex;
    if (i > side - 1) {
        if (!board[i - side].length) {
            emptyChipIndex = i - side;
        }
    }
    if (i < board.length - side) {
        if (!board[i + side].length) {
            emptyChipIndex = i + side;
        }
    }
    if (i % side !== 0) {
        if (!board[i - 1].length) {
            emptyChipIndex = i - 1;
        }
    }
    if (i % side !== side - 1) {
        if (!board[i + 1].length) {
            emptyChipIndex = i + 1;
        }
    }
    return emptyChipIndex;

}

function checkIfWin() {
    return boardStatus.slice(0, winStatus.length).join() == winStatus.join();

}

function shuffleBoard() {
    start = new Date();
    board.children[getRandomIndex()].dispatchEvent(new Event("click", {bubbles: true}));
}

function restart() {
    renderBoard();
    for(let i = 0; i < 1000; i++) {
        shuffleBoard();
    }
    while (!board.lastElementChild.textContent == '') {
        shuffleBoard();
    }
    document.querySelector(".winMessage")
    && document.querySelectorAll(".winMessage").forEach(el => el.remove());
}

function makeField(num) {
    winStatus.length = 0;
    for(let i = 1; i < num ** 2; i++) {
        winStatus.push(`${i}`);
    }
    boardStatus = [...winStatus, ''];
    board.style.width = `${73 * num}px`;
    board.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${num}, 1fr)`;
}

function getRandomIndex() {
    return Math.floor(Math.random() * (difficult ** 2));
}

function showWin() {
    let end = new Date();
    const minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();
    seconds = seconds < 0 ? 60 + seconds : seconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let timeOfGame = `${minutes}:${seconds}`;
    let winMessage = document.createElement("div");
    winMessage.classList.add("winMessage");
    winMessage.textContent = `Ура! Вы решили головоломку за ${timeOfGame}`;
    board.after(winMessage);
}