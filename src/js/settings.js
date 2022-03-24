/* eslint-disable no-param-reassign */
export default class Settings {
  constructor() {
    this.white = document.querySelector('#white');
    this.black = document.querySelector('#black');
    this.body = document.querySelector('body');
    this.list = document.querySelector('.controlPanelList');
    this.item = document.querySelectorAll('.controlPanelitem');
  }

  theme() {
    this.white.addEventListener('change', () => {
      this.body.style.color = 'black';
      this.list.setAttribute('color', 'black');
      [...this.item].forEach((el) => {
        if (!el.classList.contains('controlPickOut')) {
          el.style.color = this.list.getAttribute('color');
        }
      });
      this.body.style.backgroundColor = 'white';
    });
    this.black.addEventListener('change', () => {
      this.body.style.color = 'white';
      this.list.setAttribute('color', 'white');
      [...this.item].forEach((el) => {
        if (!el.classList.contains('controlPickOut')) {
          el.style.color = this.list.getAttribute('color');
        }
        this.body.style.backgroundColor = 'black';
      });
    });
  }
}
