const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".num");
const clearButton = document.querySelector("#clear");
const positiveNegative = document.querySelector("#positive-negative");
const percentageButton = document.querySelector("#percentage");
const operators = document.querySelectorAll(".oper");

let memory = {
    firstOperand: null,
    oper: "",
    secondOperand: null,
    waiting: false,
};

let displayContent = "";

operators.forEach((operation) =>
    operation.addEventListener("click", (e) => {
        saveDisplayContent();
        if (!memory["waiting"] && memory["oper"] !== "") {
            memory["waiting"] = true;
            updateDisplay(
                operate(
                    memory["firstOperand"],
                    memory["oper"],
                    memory["secondOperand"]
                )
            );
            memory["firstOperand"] = operate(
                memory["firstOperand"],
                memory["oper"],
                memory["secondOperand"]
            );
        } else if (!memory["waiting"]) {
            memory["waiting"] = true;
        }
        displayContent = "";
        memory["oper"] = e.target.dataset.oper;
    })
);

percentageButton.addEventListener("click", () => {
    updateDisplay(parseInt(display.textContent) / 100);
});

positiveNegative.addEventListener("click", () => {
    if (displayContent == "") {
        return;
    }
    displayContent *= -1;
    updateDisplay(displayContent);
});

numbers.forEach((num) =>
    num.addEventListener("click", (e) => {
        displayContent += e.target.textContent;
        updateDisplay(displayContent);
    })
);

function saveDisplayContent() {
    if (memory["waiting"] && displayContent != "") {
        memory["secondOperand"] = parseInt(displayContent);
        memory["waiting"] = false;
    } else if (displayContent != "") {
        memory["firstOperand"] = parseInt(displayContent);
    }
}

clearButton.addEventListener("click", clearDisplay);

function updateDisplay(value) {
    display.textContent = value;
}

function clearDisplay() {
    memory["firstOperand"] = null;
    memory["secondOperand"] = null;
    memory["oper"] = "";
    memory["waiting"] = false;
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
        case "divide":
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
