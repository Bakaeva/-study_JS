'use strict';

//#region Functions declaration
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(s) {
  return !isNumber(s); // && ?
}
//#endregion Functions declaration

const btnCalc = document.getElementById('start');

// on the left:
const buttonsPlus = document.getElementsByTagName('button');
const btnIncomePlus = buttonsPlus[0];
const btnExpensesPlus = buttonsPlus[1];
const txtSalaryAmount = document.querySelector('.salary-amount'); // Месячный доход
let incomeItems = document.querySelectorAll('.income-items');
const txtAddIncomeItems = document.querySelectorAll('.additional_income-item'); // Возможные доходы
let expensesItems = document.querySelectorAll('.expenses-items');
const txtAdditionalExpensesItem = document.querySelector('.additional_expenses-item'); // Возможные расходы
const chkDeposit = document.querySelector('#deposit-check'); // Депозит
const txtTargetAmount = document.querySelector('.target-amount'); // Цель
const rangePeriod = document.querySelector('.period-select'); // Период расчета (контрол с ползунком)
const periodAmount = document.querySelector('.period-amount'); // Период расчета (div с кол-вом месяцев)

// on the right:
const txtBudgetMonth = document.getElementsByClassName('budget_month-value')[0]; // Доход за месяц (доходы - расходы)
const txtBudgetDay = document.getElementsByClassName('budget_day-value')[0]; // Дневной бюджет
const txtExpensesMonth = document.getElementsByClassName('expenses_month-value')[0]; // Расходы за месяц
const txtAdditionalIncome = document.getElementsByClassName('additional_income-value')[0]; // Возможные доходы
const txtAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0]; // Возможные расходы
const txtIncomePeriod = document.getElementsByClassName('income_period-value')[0]; // Накопления за период
const txtTargetMonth = document.getElementsByClassName('target_month-value')[0]; // Срок достижения цели в месяцах

let appData = {
  budget: 0, // величина основного дохода
  budgetMonth: 0, // доход за месяц (обязат.доход + доп.доходы - обязат.расходы)
  budgetDay: 0, // доход за день
  income: {}, // дополнительные доходы
  incomeMonth: 0, // сумма дополнительных доходов за месяц
  addIncome: [], // возможные доходы
  expenses: {}, // обязательные расходы
  expensesMonth: 0, // сумма обязательных расходов за месяц
  addExpenses: [], // возможные расходы
  deposit: false, // наличие вклада в банке
  //percentDeposit: 0, // годовой % по вкладу
  //moneyDeposit: 0, // первоначальная сумма вклада
  start: function () {
    appData.budget = parseFloat(txtSalaryAmount.value);
    appData.getIncome(); // Дополнительные доходы
    appData.getAddIncome(); // Возможные доходы
    appData.getIncomeMonth(); // Cумма дополнительных доходов за месяц

    appData.getExpenses(); // Обязательные расходы
    appData.getAddExpenses(); // Возможные расходы
    appData.getExpensesMonth(); // Cумма обязательных расходов за месяц

    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    txtBudgetMonth.value = appData.budgetMonth;
    txtBudgetDay.value = appData.budgetDay;
    txtExpensesMonth.value = appData.expensesMonth;
    txtAdditionalIncome.value = appData.addIncome.join(', ');
    txtAdditionalExpenses.value = appData.addExpenses.join(', ');
    txtIncomePeriod.value = appData.calcSavedMoney();
    let period = appData.getTargetMonth();
    txtTargetMonth.value = period >= 0 ? period : 'не выполнимо';
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomePlus.style.display = 'none';
    }
  },
  getIncome: function () { // Дополнительные доходы 
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value; //Наименование
      let cashIncome = item.querySelector('.income-amount').value; // Сумма
      if (isString(itemIncome) && isNumber(cashIncome)) {
        appData.income[itemIncome] = parseFloat(cashIncome);
      }
    });
  },
  getAddIncome: function () { // Возможные доходы
    appData.addIncome = [];
    txtAddIncomeItems.forEach(function (item) {
      item = item.value.trim();
      if (item !== '') {
        appData.addIncome.push(item);
      }
    });
  },
  getIncomeMonth: function () {
    appData.incomeMonth = 0;
    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesPlus.style.display = 'none';
    }
  },
  getExpenses: function () { // Обязательные расходы 
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value; //Наименование
      let cashExpenses = item.querySelector('.expenses-amount').value; // Сумма
      if (isString(itemExpenses) && isNumber(cashExpenses)) {
        appData.expenses[itemExpenses] = parseFloat(cashExpenses);
      }
    });
  },
  getAddExpenses: function () { // Возможные расходы 
    let addExpenses = txtAdditionalExpensesItem.value.toLowerCase().split(',');
    appData.addExpenses = [];
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getExpensesMonth: function () {
    appData.expensesMonth = 0;
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () { // сумма, которую стремимся накопить
    if (isNumber(txtTargetAmount.value)) {
      return Math.ceil(parseFloat(txtTargetAmount.value) / appData.budgetMonth);
    } else {
      return 0;
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * rangePeriod.value;
  },
  periodChanged: function () {
    periodAmount.textContent = rangePeriod.value;
    txtIncomePeriod.value = appData.calcSavedMoney();
  },
  resetBtnCalc: function () {
    if (!isNumber(txtSalaryAmount.value)) {
      alert('Ошибка: в поле "Месячный доход" нужно ввести число!');
      btnCalc.enabled = false;
    } else {
      btnCalc.enabled = true;
    }
  },
  // getInfoDeposit: function () {
  //   if (appData.deposit) {
  //     do {
  //       appData.percentDeposit = prompt('Какой годовой процент по вкладу?', 10);
  //     } while (!isNumber(appData.percentDeposit));
  //     do {
  //       appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
  //     } while (!isNumber(appData.moneyDeposit));
  //   }
  // },
};

btnCalc.addEventListener('click', appData.start);
btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);
rangePeriod.addEventListener('input', appData.periodChanged);
txtSalaryAmount.addEventListener('change', appData.resetBtnCalc);