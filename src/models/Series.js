import { Title } from './Title';
import { TitleType } from './enums';
import { STRINGS } from '../constants/strings';

export class Series extends Title {
  constructor(data) {
    super(data);
    this.seasons = data.seasons;
    this.totalEpisodes = data.totalEpisodes;
    this.avgEpisodeMinutes = data.avgEpisodeMinutes;
  }

  get type() {
    return TitleType.SERIES;
  }
  getTypeLabel() {
    return STRINGS.types.series;
  }
  getRuntimeMinutes() {
    return this.avgEpisodeMinutes;
  }
  getDurationLabel() {
    return STRINGS.seasons(this.seasons);
  }
}