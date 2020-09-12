'use strict';

const books = document.querySelectorAll('.book');

books[1].after(books[0]); // книга2 после книга1
books[5].after(books[2]); // книга6 после книга5
books[4].after(books[3]); // книга4 после книга3

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

books[4].querySelectorAll('a')[0].textContent = 'Книга 3. this и Прототипы Объектов';

document.querySelector('.adv').remove(); // удалить рекламу

// Упорядочить главы в книге2:
const chapters2 = books[0].querySelectorAll('li');
chapters2[9].after(chapters2[2]); // ПриложениеC после ПриложениеB
chapters2[3].after(chapters2[6]); // Глава2 после Глава1
chapters2[6].after(chapters2[8]); // Глава3 после Глава2

// Упорядочить главы в книге5:
const chapters5 = books[5].querySelectorAll('li');
chapters5[4].after(chapters5[2]); // Глава4 после Глава3
chapters5[3].before(chapters5[9]); // Глава1 перед Глава2
chapters5[7].after(chapters5[5]); // ПриложениеA после Глава6

// Добавить главу в книгу6:
const chapters6 = books[2].querySelectorAll('li');
chapters6[8].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');