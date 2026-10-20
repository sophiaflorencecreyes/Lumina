export class LengthRange {
  constructor({ id, label, minMinutes = 0, maxMinutes = Infinity }) {
    this.id = id;
    this.label = label;
    this.minMinutes = minMinutes;
    this.maxMinutes = maxMinutes;
  }

  includes(minutes) {
    return minutes >= this.minMinutes && minutes <= this.maxMinutes;
  }
}