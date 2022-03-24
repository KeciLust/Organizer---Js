export default class Settings {
  constructor() {
    this.white = document.querySelector('#white');
    this.black = document.querySelector('#black');
    this.body = document.querySelector('body');
    this.list = document.querySelector('.controlPanelList');
  }

  theme() {
    this.white.addEventListener('change', () => {
      this.body.style.color = 'black';
      this.list.setAttribute('color', 'black');
      this.body.style.backgroundColor = 'white';
    });
    this.black.addEventListener('change', () => {
      this.body.style.color = 'white';
      this.list.setAttribute('color', 'white');
      this.body.style.backgroundColor = 'black';
    });
  }
}
