export default class Control {
  constructor() {
    this.items = document.querySelectorAll('.controlPanelitem');
    this.list = document.querySelector('.controlPanelList');
  }

  pickOut() {
    this.list.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('controlPanelitem')) {
        if (e.target.classList.contains('controlPickOut')) {
          return;
        }
        e.target.style.color = 'rgb(13, 134, 68)';
        e.target.style.cursor = 'pointer';
      }
    });
    this.list.addEventListener('mouseout', (e) => {
      if (e.target.classList.contains('controlPanelitem')) {
        if (e.target.classList.contains('controlPickOut')) {
          return;
        }
        e.target.style.color = this.list.getAttribute('color');
        e.target.style.cursor = 'auto';
      }
    });
  }

  change() {
    this.list.addEventListener('click', (e) => {
      if (e.target.classList.contains('controlPickOut')) {
        return;
      }
      const item = document.querySelector('.controlPickOut');
      item.classList.remove('controlPickOut');
      item.style.color = this.list.getAttribute('color');
      e.target.classList.add('controlPickOut');
      e.target.style.color = 'blueviolet';
      e.target.style.cursor = 'auto';
    });
    this.list.addEventListener('click', (e) => {
      if (e.target.classList.contains('settingsItem')) {
        const item = document.querySelector('.panel');
        item.classList.remove('panel');
        item.style.display = 'none';
        document.querySelector('.settings').classList.add('panel');
        document.querySelector('.settings').style.display = 'flex';
      } else if (e.target.classList.contains('mainItem')) {
        const item = document.querySelector('.panel');
        item.classList.remove('panel');
        item.style.display = 'none';
        document.querySelector('.mainPanel').classList.add('panel');
        document.querySelector('.mainPanel').style.display = 'flex';
      }
    });
  }
}
