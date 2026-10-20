import { MediaList } from '../models/MediaList';
import { STRINGS } from '../constants/strings';
import { storage } from './storage';

const STORAGE_KEY = 'lumina.lists';

export class ListManager {
  constructor(lists = []) {
    this.lists = lists;
    if (this.lists.length === 0) {
      this.lists = [new MediaList('default', STRINGS.myList.defaultName)];
    }
  }

  createList(name) {
    const clean = name.trim();
    if (!clean) return null;
    const list = new MediaList(`list-${Date.now()}`, clean);
    this.lists = [...this.lists, list];
    return list;
  }

  // --- NEW METHOD: Rename a list ---
  renameList(listId, newName) {
    const clean = newName.trim();
    if (!clean) return; // Don't allow empty names
    
    const list = this.getList(listId);
    if (list) {
      list.name = clean;
    }
  }

  // --- NEW METHOD: Delete a list ---
  deleteList(listId) {
    // Safeguard: Prevent deleting the default list ('default')
    if (listId === 'default') return;
    
    // Filter out the list that matches the ID
    this.lists = this.lists.filter((l) => l.id !== listId);
  }

  getDefaultList() {
    return this.lists[0];
  }

  getList(listId) {
    return this.lists.find((l) => l.id === listId) ?? null;
  }

  addToList(listId, title) {
    this.getList(listId)?.add(title);
  }

  removeFromList(listId, titleId) {
    this.getList(listId)?.remove(titleId);
  }

  isSaved(titleId) {
    return this.lists.some((l) => l.has(titleId));
  }

  removeEverywhere(titleId) {
    this.lists.forEach((l) => l.remove(titleId));
  }

  clone() {
    return new ListManager(this.lists.map((l) => new MediaList(l.id, l.name, [...l.items])));
  }

  save() {
    storage.write(
      STORAGE_KEY,
      this.lists.map((l) => ({ id: l.id, name: l.name, itemIds: l.items.map((t) => t.id) })),
    );
  }

  static load(catalog) {
    const saved = storage.read(STORAGE_KEY);
    if (!Array.isArray(saved)) return new ListManager();
    const lists = saved.map(
      (l) => new MediaList(l.id, l.name, (l.itemIds ?? []).map((id) => catalog.getById(id)).filter(Boolean)),
    );
    return new ListManager(lists);
  }
}