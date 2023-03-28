let menuDiv = document.createElement('div');
menuDiv.className = 'game-menu';

let soundDiv = document.createElement('div');
soundDiv.className = "sound-place";

let imgSound = document.createElement('IMG');
imgSound.src = 'images/volume.svg';
imgSound.width = "50";
imgSound.height = "50";
soundDiv.appendChild(imgSound);
let soundChecker = true;
const audio = new Audio();

menuDiv.append(soundDiv);

let buttonPanel = document.createElement('div');
buttonPanel.className = "button-panel";


let restartBut = document.createElement('button');
restartBut.className = 'reload-game';
restartBut.textContent = 'Restart';
buttonPanel.append(restartBut);

let saveBut = document.createElement('button');
saveBut.className = 'save-game';
saveBut.textContent = 'Save';
saveBut.disabled = true;
buttonPanel.append(saveBut);

menuDiv.append(buttonPanel);

let results = "";
let tableWithResults = [];
let oneResult = {};

let backgroundDiv = document.createElement('div');
backgroundDiv.classList = "background-table";
backgroundDiv.classList.add('hide');
document.body.append(backgroundDiv);

let tableDiv = document.createElement('div');
tableDiv.className = "table-results";
// tableDiv.classList.add('hide-table');
backgroundDiv.append(tableDiv);

let lineDivFirst = document.createElement('div');
lineDivFirst.className = "line-of-cross";

let lineDivSecond = document.createElement('div');
lineDivSecond.className = "line-of-cross";

let crossDiv = document.createElement('div');
crossDiv.className = "cross-place";
crossDiv.append(lineDivFirst);
crossDiv.append(lineDivSecond);
tableDiv.append(crossDiv);

let tableSpace = document.createElement('div');
tableSpace.className = "table-space";
tableDiv.append(tableSpace);

let tableBut = document.createElement('button');
tableBut.className = 'show-table';
tableBut.textContent = "Results";
buttonPanel.append(tableBut);

let moveCounter = 0;
let moveCounterDiv = document.createElement('div');
moveCounterDiv.className = "move-counter";
moveCounterDiv.innerHTML = `Moves ${moveCounter}`;

let timerFlag = true;
let seconds = 0;
let minutes = 0;
let timeCounterDiv = document.createElement('div');
timeCounterDiv.className = "time-counter"
timeCounterDiv.innerHTML = `Time ${minutes}:${seconds}`;

let counterContainerDiv = document.createElement('div');
counterContainerDiv.className = "counter-container";
counterContainerDiv.append(moveCounterDiv);
counterContainerDiv.append(timeCounterDiv);
menuDiv.append(counterContainerDiv);

let gridDiv = document.createElement('div');
let cellArray = [];
let numberOfCellsInRow = 4;
gridDiv.className = 'game-grid';
gridDiv.classList.add('four');
let num, cells;



let game = { moves: [], minutes: 0, seconds: 0 };

let numClasses = ['tree', 'four', 'five', 'six', 'seven', 'eight'];
let sizeDiv = document.createElement('div');
for (let i = 3; i < 9; i++) {
    let sizeItem = document.createElement('p');
    sizeItem.innerHTML = `${i}x${i}`;
    sizeItem.className = "size-item";
    sizeItem.classList.add(numClasses[i - 3]);
    if (i == numberOfCellsInRow) {
        sizeItem.classList.add('choosen');
        gridDiv.classList.add(numClasses[i - 3]);
    }
    sizeDiv.append(sizeItem);
}
sizeDiv.className = "size-place";


function exchangeCells(cellOne, cellTwo, side) {
    if (soundChecker) {
        audio.src = "sounds/sound.wav";
        audio.currentTime = 0;
        audio.play();
    }
    moveCounter += 1;
    moveCounterDiv.innerHTML = `Moves ${moveCounter}`;
    let middle = cellOne.innerHTML;
    cellOne.innerHTML = cellTwo.innerHTML;
    cellTwo.innerHTML = middle;
}

function moveCell(num, cell, cells) {
    let prev = num - 1;
    let next = num + 1;
    let above = num - numberOfCellsInRow;
    let under = +num + +numberOfCellsInRow;

    // console.log(cells[prev], cells[next], cells[under], cells[above]);
    // console.log(prev, next, above, under);

    if (cells[prev]) {
        if (num % numberOfCellsInRow != 0 && num != numberOfCellsInRow ** 2 - numberOfCellsInRow) {
            if (cells[prev].innerHTML == "") {
                // console.log("left");
                exchangeCells(cell, cells[prev], "left");
            }
        }

    }
    if (cells[next]) {
        if (num % numberOfCellsInRow != numberOfCellsInRow - 1) {
            if (next > 0 && cells[next].innerHTML == "") {
                // console.log("right");
                exchangeCells(cell, cells[next], "right");
            }
        }
    }
    if (cells[under]) {
        if (under > 0 && cells[under].innerHTML == "") {
            // console.log("down");
            exchangeCells(cell, cells[under], "down");
        }
    }
    if (cells[above]) {
        if (cells[above].innerHTML == "") {
            // console.log("up");
            exchangeCells(cell, cells[above], "up");
        }
    }

}

function buttonsListeners() {
    cells = gridDiv.querySelectorAll('.game-cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            moveCell(i, cells[i], cells);
        })
    }
}

function createList() {
    for (let i = 0; i < numberOfCellsInRow ** 2; i++) {
        let cellDiv = document.createElement('div');
        cellDiv.className = 'game-cell';
        cellDiv.innerHTML = +i + 1;
        cellArray.push(cellDiv);
    }
}

function reloadGame(numbers) {
    if (typeof numbers != 'object') {
        for (let i = 0; i < numberOfCellsInRow ** 2; i++) {
            num = (Math.floor(Math.random() * cellArray.length));
            if (cellArray[num].innerHTML != numberOfCellsInRow ** 2) {
                gridDiv.append(cellArray[num]);
            } else {
                cellArray[num].innerHTML = "";
                gridDiv.append(cellArray[num]);
            }
            cellArray.splice(num, 1);

        };

    } else {
        for (let i = 0; i < numberOfCellsInRow ** 2; i++) {
            gridDiv.append(cellArray[i]);
        }
    }
    buttonsListeners();
}

function removePrevious() {
    cells = gridDiv.querySelectorAll('.game-cell');
    for (let i of cells) {
        gridDiv.removeChild(i);
    }
}

menuDiv.append(gridDiv);
menuDiv.append(sizeDiv);
document.body.append(menuDiv);

function timerStop() {
    seconds = 0;
    minutes = 0;
}

function showTime() {
    if (seconds < 60) {
        seconds += 1;
    } else {
        seconds = 0;
        minutes += 1;
    }
    timeCounterDiv.innerHTML = `Time ${minutes}:${seconds}`;
    setTimeout(showTime, 1000);
}

restartBut.addEventListener('click', () => {
    timerStop();
    if (timerFlag) {
        showTime();
        timerFlag = false;
    }

    saveBut.disabled = false;
    removePrevious();
    createList();
    moveCounter = 0;
    moveCounterDiv.innerHTML = `Moves ${moveCounter}`;
    reloadGame();
});


function generateResults() {
    let otherTable = [];
    let listWithSteps = [];
    let listWithSortedSteps = [];
    let max = 0;
    let ind;

    for (let item of tableWithResults) {
        listWithSteps.push(+item.steps);
    }
    let lengthList = listWithSteps.length;

    for (let i = 0; i < lengthList; i++) {
        max = Math.max(...listWithSteps);
        ind = listWithSteps.indexOf(max);
        listWithSortedSteps.push(max);
        listWithSteps.splice(ind, 1);
    }


    for (let i = 0; i < listWithSortedSteps.length; i++) {

        for (elem of tableWithResults) {
            if (elem.steps == listWithSortedSteps[i]) {
                otherTable.push(elem);
            }
        }
    }

    for (let i = 0; i < otherTable.length; i++) {
        results += `${otherTable[i].day} ${otherTable[i].time} - ${otherTable[i].steps}, ${otherTable[i].gameTime}|`;
    }
    if (tableWithResults.length < 10) {
        for (let i = 0; i < 10 - tableWithResults.length; i++) {
            results += `00/00/0000 00:00 - 0, 00:00|`;
        }
    }

}

function addNewResult() {
    let now = new Date();

    oneResult.day = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    oneResult.time = `${now.getHours()}:${now.getMinutes()}`;
    oneResult.steps = moveCounter;
    oneResult.gameTime = `${minutes}:${seconds}`;
    tableWithResults.push(oneResult);
    oneResult = {};

}

function removePreviousResults() {

    elementsWithResults = document.querySelectorAll('.information');
    for (let i of elementsWithResults) {
        tableSpace.removeChild(i);
    }
}

function putResultsToList() {

    results = localStorage.getItem('results');
    let resultList = results.split('|');

    for (let i = 0; i < 10; i++) {
        resultInf = document.createElement('div');
        resultInf.className = "information";
        resultInf.innerHTML = resultList[i];
        tableSpace.append(resultInf);
    }
}

// здесь добавляется значение

function saveGame() {
    results = "";
    addNewResult();
    generateResults();
    game = "";
    for (let cell of gridDiv.querySelectorAll('.game-cell')) {
        game += `${cell.innerHTML}.`;
    }
    game += "|" + moveCounter;
    game += "|" + minutes;
    game += "|" + seconds;
    game += "|" + numberOfCellsInRow;
    localStorage.setItem('game', game);
    localStorage.setItem('results', results);
}

const sizeItems = document.querySelectorAll('.size-place .size-item');

function loadGame() {

    saveBut.disabled = false;
    game = (localStorage.getItem('game'));
    game = game.split('|');
    let numbers = game[0].split('.').slice(0, game[0].split('.').length - 1);
    numberOfCellsInRow = +game[4];
    for (let i = 0; i < game[4] ** 2; i++) {
        let cellDiv = document.createElement('div');
        cellDiv.className = 'game-cell';
        cellDiv.innerHTML = numbers[i];
        cellArray.push(cellDiv);
    }
    removeUnderline();
    sizeItems[numberOfCellsInRow - 3].classList.add('choosen');
    removePrevious();
    addNumberClass(numberOfCellsInRow);
    moveCounter = +game[1];
    minutes = +game[2];
    seconds = +game[3];

    moveCounterDiv.innerHTML = `Moves ${moveCounter}`;
    timeCounterDiv.innerHTML = `Time ${minutes}:${seconds}`;
    showTime();
    timerFlag = false;
    reloadGame(numbers);
    cellArray = [];
}

function getLocalStorage() {
    if (localStorage.getItem('game')) {
        loadGame();
    }
}

saveBut.addEventListener('click', () => {
    saveGame();
})

window.addEventListener('load', getLocalStorage)

function changePic() {
    let list = imgSound.src.split('/');
    if (list[list.length - 1].split('.')[0] == 'volume') {
        imgSound.src = "images/mute.svg";
        soundChecker = false;
    } else {
        imgSound.src = "images/volume.svg";
        soundChecker = true;
    }
}

soundDiv.addEventListener('click', () => {
    changePic();
})



function removeUnderline() {
    for (let i of sizeItems) {
        if (i.classList.contains('choosen')) {
            i.classList.remove('choosen');
            gridDiv.classList.remove(i.classList[1]);
        }
    }
}

function addNumberClass(i) {
    gridDiv.classList.add(numClasses[i - 3]);
}

for (let i of sizeItems) {
    i.addEventListener('click', () => {
        removeUnderline();
        i.classList.add('choosen');
        numberOfCellsInRow = event.target.innerHTML.split('x')[0];

        timerStop();
        if (timerFlag) {
            showTime();
            timerFlag = false;
        }

        removePrevious();
        addNumberClass(numberOfCellsInRow);
        createList();
        moveCounter = 0;
        moveCounterDiv.innerHTML = `Moves ${moveCounter}`;
        reloadGame();
    })
}

crossDiv.addEventListener('click', () => {
    backgroundDiv.classList.add('hide');
})

backgroundDiv.addEventListener('click', () => {
    backgroundDiv.classList.add('hide');
})

tableBut.addEventListener('click', () => {
    removePreviousResults();
    putResultsToList();
    backgroundDiv.classList.remove('hide');
})