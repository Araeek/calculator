const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".num");
const clearButton = document.querySelector("#clear");
const positiveNegative = document.querySelector("#positive-negative");
const percentageButton = document.querySelector("#percentage");
const operators = document.querySelectorAll(".oper");

let memory = {
    firstOperand: 0,
    oper: "",
    secondOperand: 0,
};

let displayContent = "";

operators.forEach((operation) =>
    operation.addEventListener("click", (e) => {
        if (memory["oper"] !== "") {
            updateDisplay(operate(
                memory["firstOperand"],
                memory["oper"],
                memory["secondOperand"]
            ));
            memory["firstOperand"] = operate(
                memory["firstOperand"],
                memory["oper"],
                memory["secondOperand"]
            );
        }
        memory["oper"] = e.target.dataset.oper;
        displayContent = "";
    })
);

percentageButton.addEventListener("click", () => {
    updateDisplay(parseInt(display.textContent) / 100);
});

positiveNegative.addEventListener("click", () => {
    displayContent *= -1;
    updateDisplay(displayContent);
    saveDisplayContent();
});

numbers.forEach((num) =>
    num.addEventListener("click", (e) => {
        displayContent += e.target.textContent;
        saveDisplayContent();
        updateDisplay(displayContent);
    })
);

function saveDisplayContent() {
    if (memory["oper"] !== "") {
        memory["secondOperand"] = parseInt(displayContent);
    } else {
        memory["firstOperand"] = parseInt(displayContent);
    }
}

clearButton.addEventListener("click", clearDisplay);

function updateDisplay(value) {
    display.textContent = value;
}

function clearDisplay() {
    memory["firstOperand"] = 0;
    memory["secondOperand"] = 0;
    memory["oper"] = "";
    displayContent = "";
    updateDisplay("0");
}

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "add":
            return add(firstNumber, secondNumber);
        case "subtract":
            return subtract(firstNumber, secondNumber);
        case "multiply":
            return multiply(firstNumber, secondNumber);
        case "subtract":
            return divide(firstNumber, secondNumber);
        default:
            break;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
