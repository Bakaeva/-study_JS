'use strict';

let expenses = [];

//#region Functions declaration
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function start() {
  let inc;
  do {
    inc = prompt('Ваш месячный доход ?');
  } while (!isNumber(inc));
  return parseFloat(inc);
}

function getExpensesMonth() {
  let sum = 0;
  let amount;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов:');
    do {
      amount = prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));
    sum += parseFloat(amount);
  }
  console.log(expenses);
  return sum;
}

function getAccumulatedMonth(inc, exp) {
  return inc - exp;
}

function getTargetMonth(target, accumMonth) {
  return Math.ceil(target / accumMonth);
}

function getStatusIncome(inc) {
  return inc > 1200 ? 'У вас высокий уровень дохода' :
    inc > 600 ? 'У вас средний уровень дохода' :
    inc === 600 ? 'Ваш уровень дохода между средним и низким' :
    inc > 0 ? 'К сожалению, у вас уровень дохода ниже среднего' :
    inc === 0 ? 'Странно, что Вы ещё живы' :
    'Что-то пошло не так';
}

function showTypeOf(data) {
  console.log(data, typeof data);
}
//#endregion Functions declaration

let money = start();
showTypeOf(money);

let income = 'фриланс';
showTypeOf(income);

let deposit = confirm('Есть ли у вас депозит в банке?');
showTypeOf(deposit);

let expensesMonth = getExpensesMonth();
console.log('Расходы за месяц: ' + String(expensesMonth));

let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
//console.log('Бюджет на месяц: ' + accumulatedMonth);

// let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// if (addExpenses === null)
//   addExpenses = '';
// let arr = addExpenses.toLowerCase().split(",");
// console.log(arr);

let mission = prompt('Введите сумму, которую нужно накопить:');
if (Number.isNaN(mission))
  mission = 0;
let period = getTargetMonth(mission, accumulatedMonth);
console.log('Цель - ' + mission + ' рублей - ' +
  (period >= 0 ? 'будет достигнута за ' + period + ' месяцев' :
    'не будет достигнута'));

let budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + budgetDay + ' ~ ' + Math.floor(budgetDay));

console.log(getStatusIncome(budgetDay));