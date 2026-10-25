const display = document.getElementById('currentDisplay');
const history = document.getElementById('historyDisplay');
let newInput = true;
let selesaiHitung = false;

function fontSize() {
  let length = display.textContent.length;
  
  if (length <= 11) {
    display.style.fontSize = '3em';
  } else if (length <= 12) {
    display.style.fontSize = '2.8em';
  } else if (length <= 13) {
    display.style.fontSize = '2.6em';
  } else if (length <= 14) {
    display.style.fontSize = '2.4em';
  } else {
    display.style.fontSize = '2.2em';
  }
}

function inputNumber(value) {
  let length = display.textContent.length;

  display.textContent += value;
  display.scrollLeft = display.scrollWidth;
  
  if (newInput || selesaiHitung || display.textContent === '0') {
    display.textContent = value;
    selesaiHitung = false;
    newInput = false;
  }
  
  fontSize();
}

function inputOperator(value) {
  let lastDisplay = display.textContent.slice(-1);
  
  if (['+', '-', '*', '/'].includes(lastDisplay)) {
      display.textContent = display.textContent.slice(0, -1) + value;
      return;
    }
  
  display.textContent += value;
  display.scrollLeft = display.scrollWidth;
  newInput = false;
  
  if (selesaiHitung === true) {
    selesaiHitung = false;
  }
  
  fontSize();
}

function clearDisplay() {
  history.textContent = '';
  display.textContent = '0';
  newInput = true;
  
  fontSize();
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1);
  
  
  if (['', '0'].includes(display.textContent)) {
    display.textContent = '0';
    history.textContent = '';
    newInput = true;
  }
  
  fontSize();
}

function calculate() {
  try {
    let expression = display.textContent;
    let hasil = eval(display.textContent);
    
    if (hasil.toString().length >= 10) {
      hasil = hasil.toExponential();
    }
    
    history.textContent = expression + ' =';
    
    display.textContent = hasil;
    display.scrollLeft = display.scrollWidth;
    
    selesaiHitung = true;
    newInput = true;
  } catch (error) {
    console.log(error);
    display.textContent = 'Error';
    selesaiHitung = true;
    newInput = true;
  }
  
  fontSize();
}