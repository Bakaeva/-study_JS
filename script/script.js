'use strict';

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
//#endregion Functions declaration

let money = start();

let appData = {
  income: [], // основные источники дохода
  addIncome: [], // дополнительные источники дохода
  expenses: {}, // обязательные статьи расхода
  addExpenses: [], // возможные статьи расхода
  deposit: false, // наличие депозита в банке
  mission: 50000, // сумма, которую стремимся накопить
  period: 3, // период накопления
  budget: money, // бюджет
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    if (addExpenses === null)
      addExpenses = '';
    appData.addExpenses = addExpenses.toLowerCase().split(",");
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let expenseKey = '',
      amount = 0;
    for (let i = 0; i < 2; i++) {
      expenseKey = prompt('Введите обязательную статью расходов:');
      do {
        amount = prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));
      appData.expenses[expenseKey] = parseFloat(amount);
    }

    // let mission = prompt('Введите сумму, которую нужно накопить:');
    // appData.mission = Number.isNaN(mission) ? 0 : mission;
  },
  getExpensesMonth: function () {
    let expensesMonth = 0;
    for (let key in appData.expenses) {
      expensesMonth += appData.expenses[key];
    }
    appData.expensesMonth = expensesMonth;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    return appData.budgetDay > 1200 ? 'У вас высокий уровень дохода' :
      appData.budgetDay > 600 ? 'У вас средний уровень дохода' :
      appData.budgetDay === 600 ? 'Ваш уровень дохода между средним и низким' :
      appData.budgetDay > 0 ? 'К сожалению, у вас уровень дохода ниже среднего' :
      appData.budgetDay === 0 ? 'Странно, что Вы ещё живы' :
      'Что-то пошло не так (Ваш доход < 0)';
  }
};

appData.income[0] = 'фриланс';
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + String(appData.expensesMonth));

let period = appData.getTargetMonth(appData.mission, appData.budgetMonth);
console.log('Цель - ' + appData.mission + ' рублей - ' +
  (period >= 0 ? 'будет достигнута за ' + period + ' месяцев' :
    'не будет достигнута'));

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ':  ' + appData[key]);
}