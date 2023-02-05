let firstNum = "";
let secondNum = "";
let currentOperation = null;
let doresetScreen = false;

const numSubmit = document.querySelectorAll("[data-number]")
const opButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("eqa");
const lastOp = document.getElementById("last-op");
const currOp = document.getElementById("current-op");

window.addEventListener("keydown", handleKeyboardInput);
equalsButton.addEventListener("click", equate);

numSubmit.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

opButtons.forEach((button) =>
    button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number){
    if (currOp.textContent === "0" || doresetScreen)
        resetScreen()
        currOp.textContent += number
};

function resetScreen(){
    currOp.textContent = ""
    doresetScreen = false
};

function equate(){
    if (currentOperation === null || doresetScreen) return
    if (currentOperation === "/" && currOp.textContent === "0"){
        alert("You can't do that silly!")
        return
    }
    secondNum = currOp.textContent
    currOp.textContent = roundNum(
        operate(currentOperation, firstNum, secondNum)
    )
    lastOp.textContent = `${firstNum} ${currentOperation} ${secondNum} =`
    currentOperation = null
}

function roundNum(number){
    return Math.round(number * 10000) / 10000
}

function changeOperator(keyboardOperator) {
    if (keyboardOperator === "/") return "/"
    if (keyboardOperator === "*") return "x"
    if (keyboardOperator === "-") return "-"
    if (keyboardOperator === "+") return "+"
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === "=" || e.key === "Enter") equate();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
        setOperation(changeOperator(e.key))
}

function setOperation(operator){
    if (currentOperation !== null) equate()
    firstNum = currOp.textContent
    currentOperation = operator
    lastOp.textContent = `${firstNum} ${currentOperation}`
    doresetScreen = true
}

function addNum(x,y){
    return x + y
};

function subNum(x,y){
    return x - y
};

function divNum(x,y){
    return x / y
};

function mulNum(x,y){
    return x * y
};

function operate(operator,x,y){
    x = Number(x);
    y = Number(y);
    switch (operator){
        case "+":
            return addNum(x,y)
        case "-":
            return subNum(x,y)
        case "x":
            return mulNum(x,y)
        case "/":
            if (y === 0) return null
            else return divNum(x,y)
        default:
            return null
    }
};

