let money = 40000;
let income = 'фриланс';
let addExpenses = 'квартплата, интернет, проезд, образование, питание, одежда';
let deposit = true;
let mission = 100000;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

let arr = addExpenses.toLowerCase().split(', ');
console.log(arr);

let budgetDay = money / 30;
console.log(budgetDay);