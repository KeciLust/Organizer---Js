export default function calendar() {
  const day = [...document.querySelectorAll('.day')];
  const date = new Date();
  const option = { month: 'long' };
  const mount = new Intl.DateTimeFormat('en-US', option).format(date);
  const dateFirst = new Date(`${mount} 1, ${date.getFullYear()}`);
  const dayFirst = dateFirst.getDay() === 0 ? 7 : dateFirst.getDay();
  const dayLast = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const mountRus = new Intl.DateTimeFormat('ru-RU', option).format(date);
  document.querySelector('.mouthCalendar').textContent = mountRus;
  let num = 0;
  for (let i = dayFirst - 1; i < dayLast + dayFirst - 1; i += 1) {
    num += 1;
    day[i].textContent = num;
    if(num === date.getDate()){
      day[i].classList.add('dayNow');
    }
  }
}
