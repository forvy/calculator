const display1 = document.querySelector('.display');
const display2 = document.querySelector('.display2');
const number_cons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.oper');
const equal_btn = document.querySelector('.equal');
const clr = document.querySelector('.clear');
const ce_btn = document.querySelector('.ce_clear');

let dis1_num = '';
let dis2_num = '';
let result = null;
let last_oper = '';
let dot_btn = false;
let ce = false;

number_cons.forEach(number => {

  number.addEventListener('click', (e) => {

    if (e.target.innerText == '.' && !dot_btn) {
      if (String(dis2_num).includes('.')) return;
      dot_btn = true;
    } else if (e.target.innerText == '.' && dot_btn) {
      return;
    }

    dis2_num += e.target.innerText == '.' && !String(dis2_num).includes('.') && dis2_num.length < 1 ? '0.' : e.target.innerText.split('.')[0] == '' && String(dis2_num).includes('.') ? '0' + e.target.innerText : e.target.innerText;
    display2.innerText = dis2_num;
  })

})


operators.forEach(oper => {
  oper.addEventListener('click', (e) => {
    if (!dis2_num) return;
    dot_btn = false;

    const operation = e.target.innerText;
    logic(operation);
  })

})


function clearVar(operation = '') {
  dis1_num += dis2_num + ' ' + operation + ' ';
  display1.innerText = dis1_num;
  dis2_num = '';
  display2.innerText = '';
}

function logic(operation) {
  if (dis2_num && operation == '%') {
    result = parseFloat(dis2_num) / 100;
    display2.innerText = result;
    dis1_num = result;
    display1.innerText = dis1_num;
    last_oper = operation;
    ce = false;
    return;
  } else if (dis1_num && dis2_num && last_oper && !ce && last_oper != '%') {
    math_operation();
    clearVar(operation);
  } else if (last_oper == '%') {
    if (!ce) {
      dis1_num += ' ' + operation + ' ';
      display1.innerText = dis1_num;
      dis2_num = '';
      display2.innerText = '';
      last_oper = operation;
      return;
    }
    result = parseFloat(dis2_num);
    dis1_num = dis2_num + ' ' + operation + ' ';
    display1.innerText = dis1_num;
    dis2_num = '';
    display2.innerText = '';
    last_oper = operation;
    ce = false;
    return;
  } else {
    result = parseFloat(dis2_num);
    clearVar(operation);
  }
  last_oper = operation;
  ce = false;
}


function math_operation() {
  if (last_oper == 'x') {
    result = parseFloat(result) * parseFloat(dis2_num);
  } else if (last_oper == '+') {
    result = parseFloat(result) + parseFloat(dis2_num);
  } else if (last_oper == '-') {
    result = parseFloat(result) - parseFloat(dis2_num);
  } else if (last_oper == '/') {
    result = parseFloat(result) / parseFloat(dis2_num);
  }
}


equal_btn.addEventListener('click', (e) => {
  if (!dis1_num || !dis2_num) return;
  dot_btn = false;
  math_operation();
  clearVar();
  display2.innerText = result;
  dis2_num = result;
  if (last_oper == '%') {
    dis1_num = result;
    return;
  }
  dis1_num = '';
})


clr.addEventListener('click', (e) => {
  display1.innerText = '0';
  display2.innerText = '0';
  dis2_num = '';
  dis1_num = '';
  result = '';
})


ce_btn.addEventListener('click', (e) => {
  display2.innerText = '';
  dis2_num = '';
  ce = true;
  dot_btn = false
});


window.addEventListener('keydown', (e) => {
  if (e.key == '0' ||
    e.key == '1' ||
    e.key == '2' ||
    e.key == '3' ||
    e.key == '4' ||
    e.key == '5' ||
    e.key == '6' ||
    e.key == '7' ||
    e.key == '8' ||
    e.key == '9' ||
    e.key == '.'
  ) {
    clickButton(e.key);
  } else if (
    e.key == '+' ||
    e.key == '-' ||
    e.key == '/' ||
    e.key == '%'
  ) {
    clickOper(e.key);
  } else if (e.key == '*') {
    e.key == '*';
    clickOper('x');
  } else if (e.key == 'Enter' || e.key == '=') {
    clickEqual();
  } else if (e.key == 'Backspace') {
    clickBack();
  } else if (e.key == 'Delete') {
    clickDel();
  }
})

function clickButton(key) {
  number_cons.forEach(button => {
    if (button.innerText == key) {
      button.click();
    }
  })
}



function clickOper(key) {
  operators.forEach(button => {
    if (button.innerText == key) {
      button.click();
    }
  })
}

function clickEqual() {
  equal_btn.click();
}

function clickBack() {
  ce_btn.click();
}

function clickDel() {
  clr.click();
}

function toggle() {
  document.body.classList.toggle("dark-mode");
  document.getElementById("calculator").classList.toggle("dark-mode");
  document.getElementById("screen").classList.toggle("dark-mode");
  const buttons = document.getElementsByClassName('buttons');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle("dark-mode");
  }
  const themeButton = document.getElementById('theme-button');
  const lightTheme = 'bx-moon';
  const blackTheme = 'bx-sun';

  if (themeButton.classList.contains(lightTheme)) {
    themeButton.classList.remove(lightTheme);
    themeButton.classList.add(blackTheme);
  } else {
    themeButton.classList.add(lightTheme);
    themeButton.classList.remove(blackTheme);
  }
}
