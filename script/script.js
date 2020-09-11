'use strict';

const btnCalc = document.getElementById('start');

const buttonsPlus = document.getElementsByTagName('button');
const btnPlus1 = buttonsPlus[0];
const btnPlus2 = buttonsPlus[1];

const chkDeposit = document.querySelector('#deposit-check');

const txtAddIncomeItems = document.querySelectorAll('.additional_income-item'); // Возможные доходы

const txtBudgetMonth = document.getElementsByClassName('budget_month-value')[0];
const txtBudgetDay = document.getElementsByClassName('budget_day-value')[0];
const txtExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
const txtAdditionalIncome = document.getElementsByClassName('additional_income-value')[0];
const txtAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
const txtIncomePeriod = document.getElementsByClassName('income_period-value')[0];
const txtTargetMonth = document.getElementsByClassName('target_month-value')[0];

const txtSalaryAmount = document.querySelector('.salary-amount'); // Месячный доход
const txtIncomeTitle = document.querySelectorAll('.income-title')[1]; // Дополнительный доход (Наименование)
const txtIncomeAmount = document.querySelector('.income-amount'); // Дополнительный доход (Сумма)
const txtExpensesTitle = document.querySelectorAll('.expenses-title')[1]; // Обязательные расходы (Наименование)
const txtExpensesAmount = document.querySelector('.expenses-amount'); // Обязательные расходы (Сумма)
const txtAdditionalExpensesItem = document.querySelector('.additional_expenses-item'); // Возможные расходы
const txtTargetAmount = document.querySelector('.target-amount'); // Цель
const rangePeriod = document.querySelector('.period-select'); // Период расчета