import { SortOption } from './enums';

// Immutable: with() and reset() return new objects so React re-renders.
export class FilterCriteria {
  constructor({
    genreId = null,
    year = null,
    minRating = null,
    length = null,
    sortBy = SortOption.MOST_POPULAR,
  } = {}) {
    this.genreId = genreId;
    this.year = year;
    this.minRating = minRating;
    this.length = length;
    this.sortBy = sortBy;
  }

  with(key, value) {
    return new FilterCriteria({ ...this, [key]: value });
  }

  isEmpty() {
    return this.genreId === null && this.year === null && this.minRating === null && this.length === null;
  }

  reset() {
    return new FilterCriteria();
  }
}