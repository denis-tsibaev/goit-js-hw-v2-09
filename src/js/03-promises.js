// Задание 3 - генератор промисов
// Выполняй это задание в файлах 03 - promises.html и 03 - promises.js.
// Посмотри демо видео работы генератора промисов.
// В HTML есть разметка формы, в поля которой пользователь будет вводить
// первую задержку в миллисекундах, шаг увеличения задержки для каждого промиса
// после первого и количество промисов которое необходимо создать.
// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay)
//  столько раз, сколько ввели в поле amount.При каждом вызове передай ей номер создаваемого
// промиса(position) и задержку учитывая введенную пользователем первую задержку(delay)
// и шаг(step).
// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
// Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется
// или отклоняется через delay времени.Значением промиса должен быть объект, в котором будут
// свойства position и delay со значениями одноименных параметров.Используй начальный код функции
// для выбора того, что нужно сделать с промисом - выполнить или отклонить.
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
// Библиотека уведомлений
// ⚠️ Следующий функционал не обязателен при сдаче задания, но будет хорошей дополнительной
// практикой.
// Для отображения уведомлений пользователю вместо console.log() используй библиотеку notiflix.

import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  const delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);
  const amount = Number(formEl.elements.amount.value);

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;
    let currentDelay = delay + step * i;

    createPromise(position, currentDelay)
      .then(
        ({ position, delay }) =>
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )

      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

formEl.addEventListener('submit', onFormSubmit);
