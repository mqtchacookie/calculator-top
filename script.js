// VARS
const numbers = Array.from(document.querySelectorAll('[data-number]'));
const operators = document.querySelectorAll('[data-operator]');
const equals = document.querySelector('[data-equals]');
const allClear = document.querySelector('[data-ac]');
const del = document.querySelector('[data-del]');
const previousText = document.querySelector('[data-prev]');
const currentText = document.querySelector('[data-current]');

class Calculator {
	constructor(previousText, currentText) {
		this.previousText = previousText;
		this.currentText = currentText;
		this.clear();
	}
	clear() {
		this.previousNum = '';
		this.currentNum = '';
		this.operation = undefined;
	}

	del() {
		this.currentNum = this.currentNum.toString().slice(0, -1);
	}
	appendNum(num) {
		if (num === '.' && this.currentNum.includes('.')) return;
		this.currentNum = this.currentNum + num.toString();
	}
	selctOperate(operation) {
		if (this.currentNum === '') return;
		if (this.previousNum !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousNum = this.currentNum;
		this.currentNum = '';
	}
	compute() {
		let result;
		const prev = parseFloat(this.previousNum);
		const current = parseFloat(this.currentNum);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				result = prev + current;
				break;
			case '-':
				result = prev - current;
				break;

			case 'x':
				result = prev * current;
				break;
			case '÷':
				result = prev / current;
				break;
			default:
				return;
		}
		this.currentNum = result;
		this.previousNum = '';
		this.operation = undefined;
	}
	getNewNum(num) {
		return num;
	}
	update() {
		this.currentText.innerHTML = this.getNewNum(this.currentNum);
		this.previousText.innerHTML = `${this.getNewNum(this.previousNum)} ${
			this.operation === undefined ? '' : this.operation
		}`;
	}
}

const calculator = new Calculator(previousText, currentText);

numbers.forEach((number) => {
	console.log({ number });
	number.addEventListener('click', () => {
		calculator.appendNum(number.innerHTML);
		calculator.update();
	});
});

operators.forEach((operator) => {
	console.log({ operator });
	operator.addEventListener('click', () => {
		calculator.selctOperate(operator.innerHTML);
		calculator.update();
	});
});
equals.addEventListener('click', () => {
	calculator.compute();
	calculator.update();
});
allClear.addEventListener('click', () => {
	calculator.clear();
	calculator.update();
});
del.addEventListener('click', () => {
	calculator.del();
	calculator.update();
});
