import { FilterDefinition, FilterOption } from '../models/FilterDefinition';
import { SortOption } from '../models/enums';
import { STRINGS } from '../constants/strings';
import { RATING_OPTIONS, LENGTH_RANGES, SORT_OPTIONS } from '../data/filters';

export class CatalogService {
  constructor(titles) {
    this.titles = titles;
  }

  getAll() {
    return [...this.titles];
  }

  getById(id) {
    return this.titles.find((t) => t.id === id) ?? null;
  }

  getFeatured(type = null) {
    return this.titles
      .filter((t) => t.isFeatured && (type === null || t.type === type))
      .sort((a, b) => b.popularity - a.popularity);
  }

  getTrending(limit = 10) {
    return this.#byPopularity(this.titles).slice(0, limit);
  }

  getPopular(type, limit = 10) {
    return this.#byPopularity(this.titles.filter((t) => t.type === type)).slice(0, limit);
  }

  // Genres that are actually used by at least one title, A to Z.
  getGenres() {
    const seen = new Map();
    this.titles.forEach((t) => t.genres.forEach((g) => seen.set(g.id, g)));
    return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  // Years found in the catalog, newest first (adding a title adds its year).
  getAvailableYears() {
    return [...new Set(this.titles.map((t) => t.releaseYear))].sort((a, b) => b - a);
  }

  getFilterDefinitions() {
    const S = STRINGS.discover;
    return [
      new FilterDefinition('genreId', S.filters.genre, [
        new FilterOption(S.all.genre, null),
        ...this.getGenres().map((g) => new FilterOption(g.name, g.id)),
      ]),
      new FilterDefinition('year', S.filters.year, [
        new FilterOption(S.all.year, null),
        ...this.getAvailableYears().map((y) => new FilterOption(String(y), y)),
      ]),
      new FilterDefinition('minRating', S.filters.rating, [
        new FilterOption(S.all.rating, null),
        ...RATING_OPTIONS.map((o) => new FilterOption(o.label, o.value)),
      ]),
      new FilterDefinition('length', S.filters.length, [
        new FilterOption(S.all.length, null),
        ...LENGTH_RANGES.map((r) => new FilterOption(r.label, r)),
      ]),
      new FilterDefinition(
        'sortBy',
        S.filters.sort,
        SORT_OPTIONS.map((o) => new FilterOption(o.label, o.value)),
        S.sortPrefix,
      ),
    ];
  }

  search(query) {
    return this.#byPopularity(this.titles.filter((t) => t.matchesQuery(query)));
  }

  filter(criteria) {
    const matches = this.titles.filter(
      (t) =>
        (criteria.genreId === null || t.genres.some((g) => g.id === criteria.genreId)) &&
        (criteria.year === null || t.releaseYear === criteria.year) &&
        (criteria.minRating === null || t.rating >= criteria.minRating) &&
        (criteria.length === null || criteria.length.includes(t.getRuntimeMinutes())),
    );
    return this.#sort(matches, criteria.sortBy);
  }

  #byPopularity(list) {
    return [...list].sort((a, b) => b.popularity - a.popularity);
  }

  #sort(list, sortBy) {
    const sorted = [...list];
    switch (sortBy) {
      case SortOption.HIGHEST_RATED:
        return sorted.sort((a, b) => b.rating - a.rating || b.popularity - a.popularity);
      case SortOption.NEWEST:
        return sorted.sort((a, b) => b.releaseYear - a.releaseYear || b.popularity - a.popularity);
      case SortOption.OLDEST:
        return sorted.sort((a, b) => a.releaseYear - b.releaseYear || b.popularity - a.popularity);
      default:
        return sorted.sort((a, b) => b.popularity - a.popularity);
    }
  }
}