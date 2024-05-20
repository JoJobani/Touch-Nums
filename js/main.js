'use strict'


// var gGameSize = prompt("choose difficulty")
var gGameSize = 6
var numArray = shuffleNums()
var gNextNum
var gStartTime
var gTimer

function onInit() {
    gNextNum = 1
    createBoard()
}

function shuffleNums() {
    var array = []
    for (var i = 1; i < (gGameSize ** 2) + 1; i++) {
        array.push(i)
    }
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

function createBoard() {
    var elTable = document.querySelector('table')
    var strHTML = ''
    for (var i = 0; i < gGameSize; i++) {
        var rowHTML = '<tr>'
        for (var j = 0; j < gGameSize; j++) {
            var poppedNum = numArray.pop()
            rowHTML += `<td class="unmarked" onclick="numClicked(this)">${poppedNum}</td>`
        }
        rowHTML += '</tr>'
        strHTML += rowHTML
    }
    elTable.innerHTML = strHTML
}

function numClicked(cell) {
    var cellNum = parseInt(cell.textContent)
    if (cellNum === gNextNum) {
        if (gNextNum === 1) {
            startTime()
        }
        cell.classList.remove("unmarked")
        cell.classList.add("marked")
        gNextNum++
        if (gNextNum > gGameSize ** 2) {
            stopTimer()
        }
    }
}


function startTime() {
    gStartTime = new Date()
    gTimer = setInterval(updateTimer, 1000)
}

function stopTimer() {
    clearInterval(gTimer)
}

function updateTimer() {
    var elapsedTime = new Date() - gStartTime
    var seconds = Math.floor(elapsedTime / 1000) % 60
    var minutes = Math.floor(elapsedTime / 60000)
    document.querySelector(".time").innerHTML = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}