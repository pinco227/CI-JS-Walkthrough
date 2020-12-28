// Wait for the DOM to finish loading before running the game
// Get button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if(this.getAttribute('data-type') == 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        });
    }

    document.getElementById('answer-box').addEventListener("keydown", function(event) {
        if(event.key === 'Enter') {
            checkAnswer();
        }
    });

    runGame('addition');
});

function runGame(gameType) {

    // Generate 2 random numbers between 1 and 25
    // Math floor rounds down the whole number
    // Math random generates a random number between 0 and 1

    let num1 = Math.floor(Math.random() * 25)+1;
    let num2 = Math.floor(Math.random() * 25)+1;

    if(gameType == 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if(gameType == 'subtract') {
        displaySubtractQuestion(num1, num2);
    } else if(gameType == 'multiply') {
        displayMultiplyQuestion(num1, num2);
    } else if(gameType == 'division') {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }

    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();
}

function checkAnswer() {

    // Check the answer against the first element in
    // the returned calculatedCorrectAnswer array

    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if(isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }
    
    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
    // Gets the operands and the operator from the DOM
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if(operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if(operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if(operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if(operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }
}

function incrementScore() {

    // Gets the current score from the DOM and increments it

    let score = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++score;
}

function incrementWrongAnswer() {

    // Gets the current incorrect answers from the DOM and increments it

    let incorrect = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++incorrect;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '/';
}