'use strict';

//#region Functions declaration
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(s) {
  return !isNumber(s); // && ?
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
  income: {}, // основные источники дохода
  addIncome: {}, // дополнительные источники дохода
  expenses: {}, // обязательные статьи расхода
  addExpenses: [], // возможные статьи расхода
  deposit: false, // наличие вклада в банке
  percentDeposit: 0, // годовой % по вкладу
  moneyDeposit: 0, // первоначальная сумма вклада
  mission: 50000, // сумма, которую стремимся накопить
  period: 3, // период накопления
  budget: money, // бюджет
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm('Есть ли у Вас дополнительный заработок?')) {
      let itemIncome = '',
        cashIncome = 0;
      do {
        itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
      } while (!isString(itemIncome));
      do {
        cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', 10000);
      } while (!isNumber(cashIncome));
      appData.addIncome[itemIncome.trim()] = cashIncome;
    }

    let itemExpenses = '',
      cashExpenses = 0;
    for (let i = 0; i < 2; i++) {
      do {
        itemExpenses = prompt('Введите обязательную статью расходов:', 'языковой центр');
      } while (!isString(itemExpenses));
      do {
        cashExpenses = prompt('Во сколько это обойдется?', 3900);
      } while (!isNumber(cashExpenses));
      appData.expenses[itemExpenses] = parseFloat(cashExpenses);
    }

    let addExpenses = prompt('Перечислите возможные дополнительные расходы за рассчитываемый период через запятую');
    if (addExpenses === null)
      addExpenses = '';
    appData.addExpenses = addExpenses.toLowerCase().split(",");

    appData.deposit = confirm('Есть ли у Вас вклад в банке?');

    // old code:
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
    return appData.budgetDay > 1200 ? 'У Вас высокий уровень дохода' :
      appData.budgetDay > 600 ? 'У Вас средний уровень дохода' :
      appData.budgetDay === 600 ? 'Ваш уровень дохода между средним и низким' :
      appData.budgetDay > 0 ? 'К сожалению, у Вас уровень дохода ниже среднего' :
      appData.budgetDay === 0 ? 'Странно, что Вы ещё живы' :
      'Что-то пошло не так (Ваш доход < 0)';
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент по вкладу?', 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getInfoDeposit();
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
let addIncome = '';
for (let key in appData.addIncome) {
  addIncome += key.substr(0, 1).toUpperCase() + key.substring(1).toLowerCase() + ', ';
}
if (addIncome.length > 0)
  addIncome = addIncome.substr(0, addIncome.length - 2);
console.log('Возможные дополнительные доходы: ' + addIncome);

let addExpenses = '';
for (let item of appData.addExpenses) {
  item = String(item).trim();
  addExpenses += String(item).substr(0, 1).toUpperCase() + String(item).substring(1) + ', ';
}
if (addExpenses.length > 0)
  addExpenses = addExpenses.substr(0, addExpenses.length - 2);
console.log('Возможные дополнительные расходы: ' + addExpenses);