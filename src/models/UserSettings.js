import { VideoQuality } from './enums';
import { storage } from '../services/storage';

const STORAGE_KEY = 'lumina.settings';

export class UserSettings {
  constructor({
    autoPlay = true,
    quality = VideoQuality.AUTO,
    autoplayNextEpisode = true,
    skipIntros = false,
    watchHistory = true,
    recentSearches = true,
  } = {}) {
    this.autoPlay = autoPlay;
    this.quality = quality;
    this.autoplayNextEpisode = autoplayNextEpisode;
    this.skipIntros = skipIntros;
    this.watchHistory = watchHistory;
    this.recentSearches = recentSearches;
  }

  update(key, value) {
    if (key in this) this[key] = value;
  }

  toJSON() {
    return {
      autoPlay: this.autoPlay,
      quality: this.quality,
      autoplayNextEpisode: this.autoplayNextEpisode,
      skipIntros: this.skipIntros,
      watchHistory: this.watchHistory,
      recentSearches: this.recentSearches,
    };
  }

  clone() {
    return new UserSettings(this.toJSON());
  }

  save() {
    storage.write(STORAGE_KEY, this.toJSON());
  }

  static load() {
    return new UserSettings(storage.read(STORAGE_KEY) ?? {});
  }
}