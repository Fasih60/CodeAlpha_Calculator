let currentOperand = "0";
let previousOperand = "";
let operation = undefined;
let resetScreen = false;
let calculationHistory = [];

const currentOperandElement = document.getElementById("current-operand");
const previousOperandElement = document.getElementById("previous-operand");
const historyContent = document.getElementById("history-content");

function updateDisplay() {
    currentOperandElement.innerText = currentOperand;
    previousOperandElement.innerText = previousOperand;
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyContent.innerHTML = '';
    calculationHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = item;
        historyContent.appendChild(historyItem);
    });
}

function appendNumber(number) {
    if (currentOperand === "0" || resetScreen) {
        currentOperand = "";
        resetScreen = false;
    }
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === "") return;

    if (previousOperand !== "" && operation && !resetScreen) {
        calculate();
    }

    operation = op;
    previousOperand = `${currentOperand} ${operation}`;
    currentOperand = "";
    resetScreen = false;
    updateDisplay();
}

function calculate() {
    if (operation == null) return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operation) {
        case "+": result = prev + current; break;
        case "-": result = prev - current; break;
        case "*": result = prev * current; break;
        case "/": result = prev / current; break;
        default: return;
    }

    const calculationEntry = `${prev} ${operation} ${current} = ${result}`;
    calculationHistory.unshift(calculationEntry);
    
    previousOperand = calculationEntry;
    currentOperand = result.toString();
    operation = undefined;
    resetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentOperand = "0";
    previousOperand = "";
    operation = undefined;
    calculationHistory = [];
    updateDisplay();
}

function deleteLastChar() {
    if (currentOperand.length === 1) {
        currentOperand = "0";
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
    else if (e.key === ".") appendNumber(".");
    else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        appendOperator(e.key);
    } else if (e.key === "Enter" || e.key === "=") calculate();
    else if (e.key === "Escape") clearAll();
    else if (e.key === "Backspace") deleteLastChar();
});

updateDisplay();