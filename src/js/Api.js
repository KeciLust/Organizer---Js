export default class Api {
  constructor(url) {
    this.url = url;
    this.contentTypeHeader = { 'Content-Type': 'application/json' };
  }

  load() {
    return fetch(this.url);
  }

  add(file) {
    return fetch(this.url, {
      body: JSON.stringify(file),
      method: 'POST',
      headers: this.contentTypeHeader,
    });
  }

  addFile(form, id) {
    return fetch(`${this.url}/${id}`, {
      body: form,
      method: 'POST',
    });
  }

  remove(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }

  change(file, id) {
    return fetch(`${this.url}/${id}`, {
      body: JSON.stringify(file),
      method: 'PATCH',
      headers: this.contentTypeHeader,
    });
  }

  loadFile(id) {
    return fetch(`${this.url}/${id}`);
  }
}
