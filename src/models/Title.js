import { STRINGS } from '../constants/strings';

export class Title {
  constructor(data) {
    if (new.target === Title) {
      throw new Error('Title is abstract. Create a Movie or a Series instead.');
    }
    this.id = data.id;
    this.name = data.name;
    this.tagline = data.tagline ?? '';
    this.synopsis = data.synopsis ?? '';
    this.releaseYear = data.releaseYear;
    this.rating = data.rating;
    this.country = data.country ?? '';
    this.posterUrl = data.posterUrl ?? '';
    this.bannerUrl = data.bannerUrl ?? '';
    this.logoUrl = data.logoUrl ?? '';
    this.trailerUrl = data.trailerUrl ?? '';
    this.popularity = data.popularity ?? 0;
    this.trendingRank = data.trendingRank ?? null;
    this.isFeatured = data.isFeatured ?? false;
    this.videoFormats = data.videoFormats ?? [];
    this.genres = data.genres ?? [];
    this.cast = data.cast ?? [];
  }

  get type() {
    throw new Error('type must be implemented by a subclass');
  }
  getTypeLabel() {
    throw new Error('getTypeLabel must be implemented by a subclass');
  }
  getRuntimeMinutes() {
    throw new Error('getRuntimeMinutes must be implemented by a subclass');
  }
  getDurationLabel() {
    throw new Error('getDurationLabel must be implemented by a subclass');
  }

  getMetaLine() {
    return [this.rating.toFixed(1), this.releaseYear, this.getTypeLabel(), this.country].join(' | ');
  }

  getDetailedMetaLine() {
    return [this.getMetaLine(), this.getDurationLabel(), ...this.videoFormats].join(' | ');
  }

  getRankLabel() {
    if (this.trendingRank == null) return '';
    return STRINGS.rankLabel(this.trendingRank, STRINGS.rankGroups[this.type]);
  }

  matchesQuery(query) {
    const q = query.trim().toLowerCase();
    if (!q) return false;
    const searchable = [
      this.name,
      this.tagline,
      ...this.genres.map((g) => g.name),
      ...this.cast.map((c) => c.name),
    ];
    return searchable.some((text) => text.toLowerCase().includes(q));
  }
}