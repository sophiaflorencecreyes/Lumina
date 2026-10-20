import { Title } from './Title';
import { TitleType } from './enums';
import { STRINGS } from '../constants/strings';

export class Movie extends Title {
  constructor(data) {
    super(data);
    this.durationMinutes = data.durationMinutes;
  }

  get type() {
    return TitleType.MOVIE;
  }
  getTypeLabel() {
    return STRINGS.types.movie;
  }
  getRuntimeMinutes() {
    return this.durationMinutes;
  }
  getDurationLabel() {
    return STRINGS.duration(this.durationMinutes);
  }
}