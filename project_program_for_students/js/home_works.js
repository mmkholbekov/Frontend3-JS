// GMAIL CHECKER

 const gmailInput= document.querySelector('#gmail_input')
 const gmailButton= document.querySelector('#gmail_button')
 const gmailResult= document.querySelector('#gmail_result')

const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/

gmailButton.addEventListener('click', () => {
    const email = gmailInput.value;
    const isValid = isValidGmail(email);

    if (isValid) {
        gmailResult.textContent = 'Правильно!';
        gmailResult.style.color = '#00FA9A';
    } else {
        gmailResult.textContent = 'Неправильно! Повторите';
        gmailResult.style.color = 'red';
    }
});

function isValidGmail(email) {
    return gmailRegex.test(email);
}

// MOVE BLOCK

const childBlock = document.querySelector('.child_block')

let positionX = 0
let positionY = 0

const moveChildBlock = () => {
    if (positionX < 448 && positionY === 0) {
        positionX++
        childBlock.style.left = `${positionX}px`
        setTimeout(moveChildBlock, 5)
    } else if (positionX >= 448 && positionY < 448 ){
        positionY++
        childBlock.style.top = `${positionY}px`
        setTimeout(moveChildBlock, 5)
    } else if (positionX > 0 && positionY > 0) {
        positionX--
        childBlock.style.left = `${positionX}px`
        setTimeout(moveChildBlock, 5)
    } else if (positionX === 0 && positionY > 0) {
        positionY--
        setTimeout(moveChildBlock, 5)
        childBlock.style.top = `${positionY}px`
    }
}
moveChildBlock()


// COUNTER APP

document.addEventListener('DOMContentLoaded', function () {
    let minutes = 0
    let seconds = 0
    let mlSeconds = 0
    let intervalId

    const minutesElement = document.getElementById('minutesS')
    const secondsElement = document.getElementById('secondsS')
    const mlSecondsElement = document.getElementById('ml-secondsS')
    const startButton = document.getElementById('start')
    const stopButton = document.getElementById('stop')
    const resetButton = document.getElementById('reset')

    const updateTimer = () => {
        mlSeconds++
        if (mlSeconds === 100) {
            mlSeconds = 0
            seconds++
        }
        if (seconds === 60) {
            seconds = 0
            minutes++
        }

        updateDisplay()
    }

    const updateDisplay = () => {
        minutesElement.textContent = formatTime(minutes)
        secondsElement.textContent = formatTime(seconds)
        mlSecondsElement.textContent = formatTime(mlSeconds)
    }

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time
    }

    const startTimer = () => {
        intervalId = setInterval(updateTimer, 10)
    }

    const stopTimer = () => {
        clearInterval(intervalId)
        intervalId = null
    }

    const resetTimer = () => {
        minutes = 0
        seconds = 0
        mlSeconds = 0
        updateDisplay()
        stopTimer()
    }

    startButton.addEventListener('click', startTimer)
    stopButton.addEventListener('click', stopTimer)
    resetButton.addEventListener('click', resetTimer)
})

