'use strict';

let money = parseInt(prompt('Ваш месячный доход ?'));
if (Number.isNaN(money))
  money = 0;
console.log('typeof money: ' + typeof money);

let income = 'фриланс';
console.log('typeof income: ' + typeof income);

let deposit = confirm('Есть ли у вас депозит в банке?');
console.log('typeof deposit: ' + typeof deposit);

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
if (addExpenses === null)
  addExpenses = '';
console.log('addExpenses.length: ' + addExpenses.length);
let arr = addExpenses.toLowerCase().split(",");
console.log(arr);

let mission = 100000;
console.log('Цель: заработать ' + mission + ' рублей');

let expenses1 = prompt('Введите обязательную статью расходов:');
let amount1 = parseInt(prompt('Во сколько это обойдется?'));
if (Number.isNaN(amount1))
  amount1 = 0;
let expenses2 = prompt('Введите обязательную статью расходов:');
let amount2 = parseInt(prompt('Во сколько это обойдется?'));
if (Number.isNaN(amount2))
  amount2 = 0;

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ' + budgetMonth);

let period = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за ' + period + ' месяцев');

let budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ' + budgetDay + ' ~ ' + Math.floor(budgetDay));

console.log(budgetDay > 1200 ? 'У вас высокий уровень дохода' :
  budgetDay === 1200 ? 'Ваш уровень дохода между высоким и средним' :
  budgetDay > 600 ? 'У вас средний уровень дохода' :
  budgetDay === 600 ? 'Ваш уровень дохода между средним и низким' :
  budgetDay > 0 ? 'К сожалению, у вас уровень дохода ниже среднего' :
  budgetDay === 0 ? 'Странно, что Вы ещё живы' :
  'Что-то пошло не так');