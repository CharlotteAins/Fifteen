"use strict";

let start = new Date();

const winStatus = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

const board = document.querySelector(".board");

const boardStatus = [...winStatus, ''];

board.addEventListener("click", function (e) {
    if (e.target.classList.contains("chip")) {
        const indexOfTargetChip = boardStatus.indexOf(e.target.textContent);
        const indexOfEmptyChip = findEmptyChip(indexOfTargetChip);
        if (indexOfEmptyChip || indexOfEmptyChip == 0) {
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

function findEmptyChip(i) {
    let emptyChipIndex;
    if (i > 3) {
        if (!boardStatus[i - 4].length) {
            emptyChipIndex = i - 4;
        }
    }
    if (i < 12) {
        if (!boardStatus[i + 4].length) {
            emptyChipIndex = i + 4;
        }
    }
    if (i % 4 != 0) {
        if (!boardStatus[i - 1].length) {
            emptyChipIndex = i - 1;
        }
    }
    if (i % 4 != 3) {
        if (!boardStatus[i + 1].length) {
            emptyChipIndex = i + 1;
        }
    }
    return emptyChipIndex;
}

function checkIfWin() {
    return boardStatus.slice(0, 15).join() == winStatus.join();
}

const btn = document.getElementById("restart");
btn.addEventListener("click", (e) => {
    // shuffle(boardStatus)
    document.querySelector(".winMessage") && document.querySelector(".winMessage").remove();
    restart();
});

function shuffleBoard() {
    board.children[getRandomIndex()].dispatchEvent(new Event("click", {bubbles: true}));
    document.querySelector(".winMessage") && document.querySelector(".winMessage").remove();
}

function getRandomIndex() {
    return Math.floor(Math.random() * (15 - 0 + 1)) + 0;
}

function restart() {
    renderBoard();
    for(let i = 0; i < 1000; i++) {
        shuffleBoard();
    }
    while (!board.lastElementChild.textContent == '') {
        shuffleBoard();
    }
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