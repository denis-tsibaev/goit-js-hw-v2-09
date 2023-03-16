// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateInput: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let inervalId = null;
let deadline = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr) {
    // console.log('selectedDate: ', selectedDates[0]);
    // console.log('Date.now: ', Date.now());
    console.log('dateStr: ', dateStr);
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please, choose a date in the future');
      //   alert('Please, choose a date in the future');
      refs.startBtn.disabled = true;
      return;
    }
    deadline = new Date(selectedDates[0]);

    refs.startBtn.disabled = false;
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
  return num.toString().padStart(2, 0);
}

function onStartBtnClick() {
  refs.dateInput.disabled = true;
  refs.startBtn.disabled = true;

  inervalId = setInterval(() => {
    if (deadline - Date.now() <= 0) {
      clearInterval(inervalId);
      Notiflix.Notify.info('Time is up!');
      //   alert('Time is up!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deadline - Date.now());
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

flatpickr('input#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartBtnClick);
