/* eslint-disable no-param-reassign */
import Api from './Api';

export default class Settings {
  constructor() {
    this.white = document.querySelector('#white');
    this.black = document.querySelector('#black');
    this.body = document.querySelector('body');
    this.list = document.querySelector('.controlPanelList');
    this.item = document.querySelectorAll('.controlPanelitem');
    this.avatarImg = document.querySelector('.avatar');
    this.api = new Api('http://localhost:7070/file');
    this.inputAvatar = document.querySelector('.avatarSettings');
    this.newAvatar = document.querySelector('.inputSettings');
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

  avatar() {
    this.inputAvatar.addEventListener('change', async (e) => {
      e.preventDefault();
      if (/image/.test(this.newAvatar.files[0].type)) {
        this.avatarImg.src = URL.createObjectURL(this.newAvatar.files[0]);
        const form = new FormData();
        const response = await this.api.add({
          type: 'avatar',
        });
        const data = await response.json();
        form.append('file', this.newAvatar.files[0]);
        await this.api.addFile(form, data.id);
        URL.revokeObjectURL(this.avatarImg.src);
      }
    });
  }
}
