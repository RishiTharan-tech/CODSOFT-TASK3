const previous = document.getElementById("previous");
const current = document.getElementById("current");
const buttons = document.querySelectorAll("button");

let currentValue = "";
let previousValue = "";
let operator = "";

buttons.forEach(btn => {
    btn.addEventListener("click", () => handleInput(btn.textContent));
});

document.addEventListener("keydown", e => {
    if (!isNaN(e.key) || e.key === ".") handleInput(e.key);
    if (["+", "-", "*", "/"].includes(e.key)) handleInput(convertOperator(e.key));
    if (e.key === "Enter") handleInput("=");
    if (e.key === "Backspace") handleInput("DEL");
    if (e.key === "Escape") handleInput("AC");
});

function handleInput(value) {
    if (!isNaN(value) || value === ".") {
        if (value === "." && currentValue.includes(".")) return;
        currentValue += value;
    }
    else if (value === "AC") {
        currentValue = "";
        previousValue = "";
        operator = "";
    }
    else if (value === "DEL") {
        currentValue = currentValue.slice(0, -1);
    }
    else if (value === "=") {
        if (!operator || !currentValue) return;
        currentValue = calculate();
        operator = "";
        previousValue = "";
    }
    else {
        if (!currentValue) return;
        operator = value;
        previousValue = currentValue;
        currentValue = "";
    }
    updateDisplay();
}

function calculate() {
    let a = Number(previousValue);
    let b = Number(currentValue);

    if (operator === "+") return a + b;
    if (operator === "−") return a - b;
    if (operator === "×") return a * b;
    if (operator === "÷") return a / b;
}

function updateDisplay() {
    current.textContent = currentValue || "0";
    previous.textContent = operator ? `${previousValue} ${operator}` : "";
}

function convertOperator(key) {
    if (key === "+") return "+";
    if (key === "-") return "−";
    if (key === "*") return "×";
    if (key === "/") return "÷";
}
