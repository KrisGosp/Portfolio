// create a Calculator class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // reset values every time new calculator is created
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    // DEL button function
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        // check for decimal point
        if (number === '.' && this.currentOperand.includes('.')) return;
        // we only want to concatenate strings
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute()
        };
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        // if not a number do not calculate
        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+': 
                computation = prev + curr;
                break;
            case '-': 
                computation = prev - curr;
                break;
            case '*': 
                computation = prev * curr;
                break;
            case '÷': 
                computation = prev / curr;
                break;
                case '/': 
                computation = prev / curr;
                break;
            default: 
                return;
        };
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    update() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
        }
};

// retrieve all needed elements from the HTML
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// creating the calculator object we are going to use
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// attaching event listeners to all buttons and passing the pressed button value
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.update();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.update();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.update();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
});

// adding keyboard support
document.addEventListener('keydown', (e) => {
    // check first if the pressed key is number
    const reg = /^\d+$/;
    if (reg.test(e.key)) {

        calculator.appendNumber(Number(e.key));
        calculator.update();
    //check if it is any of the operators
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '÷' || e.key === '/') {
        calculator.chooseOperation(e.key);
        calculator.update();
    } else if (e.key === 'Enter') {
        console.log('wtf')
        calculator.compute(); 
        calculator.update();
    } else if (e.key === 'Escape') {
        calculator.clear();
        calculator.update();
    } else if (e.key === 'Delete') {
        calculator.delete();
        calculator.update();
    };
});