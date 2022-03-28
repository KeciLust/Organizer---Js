/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import Api from './Api';
import time from './time';

export default class Notes {
  constructor() {
    this.text = document.querySelector('.textNote');
    this.api = new Api('http://localhost:7070/file');
    this.file = document.querySelector('.file');
    this.files = document.querySelector('.files');
    this.text = document.querySelector('.textNote');
    this.textButton = document.querySelector('.textButton');
    this.itemBox = document.querySelector('.itemBox');
    this.changeFile = document.querySelector('.changeFile');
    this.choiceDoFile = document.querySelector('.choiceDoFile');
    this.fixNote = document.querySelector('.fixNote');
    this.element = null;
  }

  // Проверка наличия заметок на сервере и загрузка заметок с сервера
  async loadNotes() {
    const response = await this.api.load();
    const data = await response.json();
    if (data.length > 0) {
      for (let i = 0; i < data.length; i += 1) {
        const elem = document.createElement('div');
        elem.innerHTML = `<span class="spanText">${data[i].text}</span><span class="spanTime">${data[i].time}</span>`;
        elem.classList.add('elemTextNote');
        elem.setAttribute('nameId', data[i].id);
        if (data[i].img) {
          const link = await this.api.loadFile(data[i].id);
          const img = document.createElement('img');
          img.src = `http://localhost:7070/${link}`;
          elem.insertAdjacentElement('afterbegin', img);
        }
        this.itemBox.insertAdjacentElement('afterbegin', elem);
      }
    }
  }

  // Добавление заметки в приложение и на сервер
  async addNote() {
    if (!this.text.value) {
      return;
    }
    const elem = document.createElement('div');
    elem.innerHTML = `<span class="spanText">${this.text.value}</span><span class="spanTime">${time()}</span>`;
    elem.classList.add('elemTextNote');
    this.itemBox.insertAdjacentElement('afterbegin', elem);
    const response = await this.api.add({
      text: `${this.text.value}`,
      time: `${time()}`,
    });
    const data = await response.json();
    elem.setAttribute('nameId', data.id);
    this.text.value = '';
  }

  // Изменение заметки
  async change(file) {
    await this.api.change({
      text: `${file.querySelector('.spanText').textContent}`,
      time: `${file.querySelector('.spanTime').textContent}`,
    }, `${file.getAttribute('nameId')}`);
  }

  // Установа слушателей на добавление заметки
  textListner() {
    this.textButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.addNote();
    });
    this.textButton.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        this.addNote();
      }
    });
    this.text.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        this.addNote();
      }
    });
    this.fixNote.querySelector('.fixButton').addEventListener('click', () => {
      this.fixNote.style.display = 'none';
      document.querySelector('.fix').style.display = 'block';
      document.querySelector('.fix').classList.remove('fix');
    });
    this.itemBox.addEventListener('click', (e) => {
      if (!e.target.classList.contains('spanText')) {
        return;
      }
      this.choiceDoFile.style.display = 'block';
      this.element = e.target.closest('.elemTextNote');
    });
    this.itemBox.addEventListener('click', (e) => {
      if (!e.target.classList.contains('choiceButton')) {
        return;
      }
      if (e.target.classList.contains('choiceDelete')) {
        this.api.remove(this.element.getAttribute('nameId'));
        this.element.remove();
        this.choiceDoFile.style.display = 'none';
      } else if (e.target.classList.contains('choiceDo')) {
        if (!this.itemBox.querySelector('.fix')) {
          this.fixNote.querySelector('.fixText').textContent = `${this.element.querySelector('.spanText').textContent}`;
          this.fixNote.style.display = 'flex';
          this.element.classList.add('fix');
          this.element.style.display = 'none';
          this.choiceDoFile.style.display = 'none';
        } else {
          this.choiceDoFile.style.display = 'none';
          document.querySelector('.fixNot').style.display = 'block';
          setTimeout(() => document.querySelector('.fixNot').style.display = 'none', 3000);
        }
      } else if (e.target.classList.contains('choiceChange')) {
        this.choiceDoFile.style.display = 'none';
        this.changeFile.style.display = 'block';
      }
    });
    this.changeFile.addEventListener('click', (e) => {
      if (!e.target.classList.contains('changeButton')) {
        return;
      }
      if (e.target.classList.contains('doChangeButton')) {
        const input = this.changeFile.querySelector('.changeInput');
        if (!input.value) {
          return;
        }
        this.element.querySelector('.spanText').textContent = `${input.value}`;
        this.element.querySelector('.spanTime').textContent = `${time()}`;
        input.value = '';
        this.changeFile.style.display = 'none';
        this.change(this.element);
      }
      if (e.target.classList.contains('closeChangeButton')) {
        this.changeFile.style.display = 'none';
      }
    });
    this.changeFile.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        const input = this.changeFile.querySelector('.changeInput');
        if (!input.value) {
          return;
        }
        this.element.querySelector('.spanText').textContent = `${input.value}`;
        this.element.querySelector('.spanTime').textContent = `${time()}`;
        input.value = '';
        this.changeFile.style.display = 'none';
        this.change(this.element);
      }
    });
    this.files.addEventListener('change', async (e) => {
      e.preventDefault();
      if (/image/.test(this.file.files[0].type)) {
        const elem = document.createElement('div');
        elem.innerHTML = `<span class="spanText">${this.file.files[0].name}</span><span class="spanTime">${time()}</span>`;
        elem.classList.add('elemTextNote');
        const img = document.createElement('img');
        img.src = URL.createObjectURL(this.file.files[0]);
        img.sizes = '100px';
        img.width = '100';
        elem.insertAdjacentElement('afterbegin', img);
        this.itemBox.insertAdjacentElement('afterbegin', elem);
        //  const blob = new Blob([this.file.files[0]], { type: `${this.file.files[0].type}` });
        const form = new FormData();
        const response = await this.api.add({
          text: `${this.file.files[0].name}`,
          time: `${time()}`,
        });
        const data = await response.json();
        elem.setAttribute('nameId', data.id);
        // form.append('id', data.id);
        form.append('file', this.file.files[0]);
        await this.api.addFile(form);
        URL.revokeObjectURL(img.src);
      }
      if (/audio/.test(this.file.files[0].type)) {
        const elem = document.createElement('div');
        elem.innerHTML = `<span class="spanText">${this.file.files[0].name}</span><span class="spanTime">${time()}</span>`;
        elem.classList.add('elemTextNote');
        const audio = document.createElement('audio');
        audio.src = URL.createObjectURL(this.file.files[0]);
        audio.controls = true;
        elem.insertAdjacentElement('afterbegin', audio);
        this.itemBox.insertAdjacentElement('afterbegin', elem);
      }
      if (/video/.test(this.file.files[0].type)) {
        const elem = document.createElement('div');
        elem.innerHTML = `<span class="spanText">${this.file.files[0].name}</span><span class="spanTime">${time()}</span>`;
        elem.classList.add('elemTextNote');
        const video = document.createElement('video');
        video.src = URL.createObjectURL(this.file.files[0]);
        video.controls = true;
        elem.insertAdjacentElement('afterbegin', video);
        this.itemBox.insertAdjacentElement('afterbegin', elem);
      }
    });
  }
}
