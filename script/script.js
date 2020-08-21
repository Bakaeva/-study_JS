'use strict';

//#region Functions declaration
function getExpensesMonth() {
  let expenses1 = prompt('Введите обязательную статью расходов:');
  let amount1 = parseInt(prompt('Во сколько это обойдется?'));
  if (Number.isNaN(amount1))
    amount1 = 0;
  let expenses2 = prompt('Введите обязательную статью расходов:');
  let amount2 = parseInt(prompt('Во сколько это обойдется?'));
  if (Number.isNaN(amount2))
    amount2 = 0;
  return amount1 + amount2;
}

function getAccumulatedMonth(inc, exp) {
  return inc - exp;
}

function getTargetMonth(target, accumMonth) {
  return Math.ceil(target / accumMonth);
}

function showTypeOf(data) {
  console.log(data, typeof data);
}

function getStatusIncome(inc) {
  return inc > 1200 ? 'У вас высокий уровень дохода' :
    inc > 600 ? 'У вас средний уровень дохода' :
    inc === 600 ? 'Ваш уровень дохода между средним и низким' :
    inc > 0 ? 'К сожалению, у вас уровень дохода ниже среднего' :
    inc === 0 ? 'Странно, что Вы ещё живы' :
    'Что-то пошло не так';
}
//#endregion Functions declaration

let money = parseInt(prompt('Ваш месячный доход ?'));
if (Number.isNaN(money))
  money = 0;
showTypeOf(money);

let income = 'фриланс';
showTypeOf(income);

let deposit = confirm('Есть ли у вас депозит в банке?');
showTypeOf(deposit);

let expensesMonth = getExpensesMonth();
console.log('Расходы за месяц: ' + String(expensesMonth));

let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
//console.log('Бюджет на месяц: ' + accumulatedMonth);

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
if (addExpenses === null)
  addExpenses = '';
let arr = addExpenses.toLowerCase().split(",");
console.log(arr);

let mission = prompt('Введите сумму, которую нужно накопить:');
if (Number.isNaN(mission))
  mission = 0;
let period = getTargetMonth(mission, accumulatedMonth);
console.log('Цель - ' + mission + ' рублей - будет достигнута за ' + period + ' месяцев');

let budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + budgetDay + ' ~ ' + Math.floor(budgetDay));

console.log(getStatusIncome(budgetDay));