let firstNum = "";
let secondNum = "";
let currentOperation = null;
let doresetScreen = false;
let inputField = document.querySelector("#current-op");
const MAX_DIGITS = 11;
const MAX_FONT_SIZE = 60;

const numSubmit = document.querySelectorAll("[data-number]");
const opButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("eqa");
const lastOp = document.getElementById("last-op");
const currOp = document.getElementById("current-op");
const decimalBtn = document.getElementById('dec');

document.getElementById("del-ac").addEventListener("click", clearScreen);
document.getElementById("del-c").addEventListener("click", eraseOne);

window.addEventListener("keydown", handleKeyboardInput);
equalsButton.addEventListener("click", equate);

numSubmit.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

opButtons.forEach((button) =>
    button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number) {
    if (inputField.textContent.length >= MAX_DIGITS) {
      doresetScreen = true;
      return;
    }
    if (currOp.textContent === "0" && number !== ".") {
      currOp.textContent = "";
    }
    currOp.textContent += number;
    updateFontSize();
    doresetScreen = false;
};


function resetScreen() {
    currOp.textContent = "";
    doresetScreen = false;
  }

function clearScreen() {
    document.getElementById("last-op").innerText = "";
    document.getElementById("current-op").innerText = "0";
    firstNum = "";
    secondNum = "";
    currentOperation = null;
    doresetScreen = false;
    currOp.textContent = "0";
    lastOp.textContent = "";
  }

function eraseOne() {
    let inputLength = inputField.textContent.length;
    if (inputLength > 1) {
        inputField.textContent = inputField.textContent.slice(0, inputLength - 1);
    } else {
        inputField.textContent = "0";
    }
}

function equate(){
    if (currentOperation === null) return
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
    firstNum = ""
}

function roundNum(number){
    if (number.toString().length >= 10) {
        return number.toExponential(2);
    } else {
        return Math.round(number * 10000) / 10000;
    }
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
};

function setOperation(operator) {
    if (currentOperation !== null) {
      equate();
    } if (firstNum === "" && currOp.textContent !== "") {
      firstNum = currOp.textContent;
      currentOperation = operator;
      lastOp.textContent = `${firstNum} ${currentOperation}`;
      currOp.textContent = "";
      doresetScreen = true;
    } else if (firstNum !== "" && currOp.textContent !== "") {
      secondNum = currOp.textContent;
      currOp.textContent = roundNum(
        operate(currentOperation, firstNum, secondNum)
      );
      firstNum = currOp.textContent;
      lastOp.textContent = `${firstNum} ${operator}`;
      currentOperation = operator;
      doresetScreen = true;
    } else {
      currentOperation = operator;
      lastOp.textContent = `${firstNum} ${currentOperation}`;
      doresetScreen = true;
    }
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

decimalBtn.addEventListener('click', () => {
    let currentOp = document.getElementById('current-op').textContent;
    if (!currentOp.includes('.')) {
        document.getElementById('current-op').textContent += '.';
      }
    });

function updateFontSize() {
        const length = inputField.textContent.replace(".", "").length;
        const fontSize = Math.min(MAX_FONT_SIZE, MAX_FONT_SIZE - (length - MAX_DIGITS) * 4);
        inputField.style.fontSize = `${fontSize}px`;
}