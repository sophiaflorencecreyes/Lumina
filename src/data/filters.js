import { LengthRange } from '../models/LengthRange';
import { SortOption } from '../models/enums';

export const RATING_OPTIONS = [
  { label: '5.0+', value: 5 },
  { label: '6.0+', value: 6 },
  { label: '7.0+', value: 7 },
  { label: '8.0+', value: 8 },
  { label: '9.0+', value: 9 },
  { label: '10', value: 10 },
];

export const LENGTH_RANGES = [
  new LengthRange({ id: 'under-90', label: 'Under 90 min', minMinutes: 0, maxMinutes: 89 }),
  new LengthRange({ id: '1hr-plus', label: '1hr+', minMinutes: 60 }),
  new LengthRange({ id: '2hr-plus', label: '2hrs+', minMinutes: 120 }),
  new LengthRange({ id: '3hr-plus', label: '3hrs+', minMinutes: 180 }),
];

export const SORT_OPTIONS = [
  { label: 'Most Popular', value: SortOption.MOST_POPULAR },
  { label: 'Highest Rated', value: SortOption.HIGHEST_RATED },
  { label: 'Newest', value: SortOption.NEWEST },
  { label: 'Oldest', value: SortOption.OLDEST },
];