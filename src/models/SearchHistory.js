import { storage } from '../services/storage';

const STORAGE_KEY = 'lumina.searches';
const MAX_TERMS = 10;

export class SearchHistory {
  constructor(terms = []) {
    this.terms = terms;
  }

  add(term) {
    const clean = term.trim();
    if (!clean) return;
    this.terms = [clean, ...this.terms.filter((t) => t.toLowerCase() !== clean.toLowerCase())].slice(0, MAX_TERMS);
  }

  getRecent(limit = 5) {
    return this.terms.slice(0, limit);
  }

  clear() {
    this.terms = [];
  }

  clone() {
    return new SearchHistory([...this.terms]);
  }

  save() {
    storage.write(STORAGE_KEY, this.terms);
  }

  static load() {
    const saved = storage.read(STORAGE_KEY);
    return new SearchHistory(Array.isArray(saved) ? saved : []);
  }
}