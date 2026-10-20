import { SettingDefinition } from '../models/SettingDefinition';
import { VideoQuality } from '../models/enums';

export const SETTING_DEFINITIONS = [
  new SettingDefinition({
    key: 'autoPlay',
    label: 'Auto play',
    description: 'How titles open when clicked and automatically.',
    controlType: 'toggle',
  }),
  new SettingDefinition({
    key: 'quality',
    label: 'Quality',
    description: 'Auto adapts to your connection.',
    controlType: 'select',
    options: Object.values(VideoQuality),
  }),
  new SettingDefinition({
    key: 'autoplayNextEpisode',
    label: 'Autoplay next episode',
    description: 'When an episode ends, start the next one after a short countdown. Off: the Up next card waits for you.',
    controlType: 'toggle',
  }),
  new SettingDefinition({
    key: 'skipIntros',
    label: 'Skip intros',
    description: 'Jump past intros and recaps automatically, on episodes where their timing is known.',
    controlType: 'toggle',
  }),
  new SettingDefinition({
    key: 'watchHistory',
    label: 'Watch history',
    description: 'Save what you watch so you can pick up where you left off.',
    controlType: 'toggle',
  }),
  new SettingDefinition({
    key: 'recentSearches',
    label: 'Recent searches',
    description: 'Keep your last few searches in the search panel.',
    controlType: 'toggle',
  }),
];