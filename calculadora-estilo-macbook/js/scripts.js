// Seleção dos elementos
const result = document.querySelector('.result');
const operand = document.querySelector('.operand');
const buttons = document.querySelectorAll('.buttons button');
const clearButton = document.querySelector('.clear-button');
const deleteLeftButton = document.querySelector('.delete-left');

// Variáveis para armazenar os valores e operações da calculadora.
let currentNumber = '0';
let firstOperand = null;
let operator = null;
let restart = false;
let operandText = '';

// Atualizar a exibição do resultado e operando.
function updateResult() {
    result.innerText = currentNumber.replace('.', ',');
    operand.innerText = operandText;
}

// Adicionar um dígito ao número atual.
function addDigit(digit) {
    if (restart) {
        currentNumber = digit;
        operandText = currentNumber;
        restart = false;
    } else if (currentNumber === '0') {
        if (digit === ',') {
            currentNumber += digit;
            operandText += currentNumber;
        } else if (!isNaN(parseInt(digit))) {
            currentNumber = digit;
            operandText = digit;
        }
    } else {
        currentNumber += digit;
        operandText += digit;
    }

    updateResult();
}

// Definir o operador da calculadora.
function setOperator(newOperator) {
    if (currentNumber) {
        if (operator) {
            calculate();
        } else {
            firstOperand = parseFloat(currentNumber.replace(',', '.'));
            operandText = `${firstOperand} ${newOperator} `;
            updateResult();
            currentNumber = '';
        }
    }

    operator = newOperator;
}

// Função para realizar cálculos.
function calculate() {
    if (operator === null || firstOperand === null) return;
    let secondOperand = parseFloat(currentNumber.replace(',', '.'));
    let resultValue;

    switch (operator) {
        case '+':
            resultValue = firstOperand + secondOperand;
            break;
        case '-':
            resultValue = firstOperand - secondOperand;
            break;
        case '×':
            resultValue = firstOperand * secondOperand;
            break;
        case '÷':
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    currentNumber = resultValue.toString();
    operandText = `${firstOperand} ${operator} ${secondOperand} =`;
    updateResult();

    operator = null;
    firstOperand = null;
    restart = true;
}

//Limpar o display.
function clearCalculator() {
    currentNumber = '';
    firstOperand = null;
    operator = null;
    operandText = '';
    updateResult();
}

//Calcular e tratar erros na porcentagem.
function setPercentage() {
    if (!currentNumber) return;

    let numericValue = parseFloat(currentNumber);

    if (isNaN(numericValue)) {
        alert('ERRO! VALOR INVÁLIDO PARA PORCENTAGEM: ' + currentNumber);
        return;
    }

    let result = numericValue / 100;

    if (['+', '-'].includes(operator)) {
        result = result * (firstOperand || 1);
    }

    currentNumber = result.toString();
    updateResult();
}

// Adicionar EventListener para o botão de exclusão à esquerda.
deleteLeftButton.addEventListener('click', () => {
    if (currentNumber.length > 0) {
        currentNumber = currentNumber.slice(0, -1);
        operandText = operandText.slice(0, -1);
        updateResult();
    }
});

// Adicionar EventListener para os botões da calculadora.
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (['+', '-', '×', '÷'].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === '=') {
            calculate();
        } else if (buttonText === 'AC') {
            firstOperand = null;
            operator = null;
            operandText = '';
            currentNumber = '0';
            restart = false;
            updateResult();
        } else if (buttonText === '+/-') {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ).toString();
            operandText = currentNumber;
            updateResult();
        } else if (buttonText === '%') {
            setPercentage();
        }
    });
});
