const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".num");
const clearButton = document.querySelector("#clear");
const positiveNegative = document.querySelector("#positive-negative");
const percentageButton = document.querySelector("#percentage");
const operators = document.querySelectorAll(".oper");
const equal = document.querySelector(".equal");
const point = document.querySelector(".point");

let memory = {
    firstOperand: null,
    oper: "",
    secondOperand: null,
    waiting: false,
};

let displayContent = "0";

window.addEventListener("keydown",keypad);

function keypad(e) {
    const key = document.querySelector(`.btn[data-code="${e.keyCode}"]`);
    key.click();
}   
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

equal.addEventListener("click", () => {
    saveDisplayContent();
    if (memory["oper"] !== "") {
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
    }
    displayContent = "";
});

point.addEventListener("click", (e) => {
    if (displayContent.includes(".")) {
        return;
    }
    if (displayContent == "") {
        displayContent = "0";
    }
    displayContent += e.target.textContent;
    updateDisplay(displayContent);
});

percentageButton.addEventListener("click", () => {
    displayContent = parseFloat(display.textContent) / 100;
    updateDisplay(displayContent);
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
        if (displayContent == "0") {
            displayContent = "";
        }
        displayContent += e.target.textContent;
        updateDisplay(displayContent);
    })
);

function saveDisplayContent() {
    if (memory["waiting"] && displayContent != "") {
        memory["secondOperand"] = parseFloat(displayContent);
        memory["waiting"] = false;
    } else if (displayContent != "") {
        memory["firstOperand"] = parseFloat(displayContent);
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
    displayContent = "0";
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
    return (a * 10000000000 + b * 10000000000) / 10000000000;
}

function subtract(a, b) {
    return (a * 10000000000 - b * 10000000000) / 10000000000;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "Error";
    }
    return a / b;
}
