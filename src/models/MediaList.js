export class MediaList {
  constructor(id, name, items = []) {
    this.id = id;
    this.name = name;
    this.items = items;
  }

  add(title) {
    if (!this.has(title.id)) this.items = [...this.items, title];
  }

  remove(titleId) {
    this.items = this.items.filter((t) => t.id !== titleId);
  }

  has(titleId) {
    return this.items.some((t) => t.id === titleId);
  }

  count() {
    return this.items.length;
  }
}