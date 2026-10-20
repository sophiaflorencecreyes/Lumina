// All static UI wording lives here, so components never contain hardcoded text.
export const STRINGS = {
  appName: 'LUMINA',
  nav: {
    search: 'Search',
    settings: 'Settings',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    main: 'Main navigation',
  },
  hero: {
    play: 'Play',
    moreInfo: 'More Info',
    slide: (n) => `Show slide ${n}`,
  },
  rows: {
    trending: 'Trending Now',
    popularMovies: 'Popular Movies',
    popularShows: 'Popular TV Shows',
  },
  types: { movie: 'Movie', series: 'Series' },
  rankGroups: { movie: 'movies', series: 'shows' },
  discover: {
    filters: { genre: 'Genre', year: 'Year', rating: 'Rating', length: 'Length', sort: 'Sort' },
    sortPrefix: 'Sort:',
    all: { genre: 'All Genres', year: 'All Years', rating: 'Any Rating', length: 'Any Length' },
    emptyTitle: 'No titles found',
    emptyText: 'Try changing or clearing your filters.',
    reset: 'Reset filters',
  },
  myList: {
    defaultName: 'My List',
    newList: '+ new list',
    namePlaceholder: 'List name',
    create: 'Create',
    cancel: 'Cancel',
    choose: 'Choose a list',
    emptyText: 'Save a movie or show and it will appear here.',
    remove: 'Remove from list',
    add: 'Add to My List',
  },
  search: {
    eyebrow: 'LUMINA SEARCH',
    heading: 'What are you watching?',
    subheading: 'Search movies and TV shows, then pick up exactly where you left off.',
    placeholder: 'Search movies, series, people...',
    label: 'Search titles',
    trending: 'Trending Now',
    recent: 'Recent searches',
    clear: 'Clear',
    noResults: (q) => `No results for "${q}"`,
    noResultsHint: 'Check the spelling or try a different title, genre, or actor.',
  },
  settings: {
    heading: 'Settings',
    note: 'Changes save on this device instantly.',
  },
  details: {
    back: 'Go back',
    addToList: 'Add to List',
    inList: 'In My List',
    download: 'Download',
    downloaded: 'Downloaded',
    fullMovie: 'Full Movie',
    fullSeries: 'Full Series',
    play: 'Play',
    pause: 'Pause',
    nowPlaying: 'Now playing',
    quality: 'Quality',
    cast: 'Cast',
    castSubtitle: 'The cast behind this title',
    noCast: 'Cast details are not available yet.',
    notFoundTitle: 'Title not found',
    notFoundText: "We couldn't find that title.",
    backHome: 'Back to Home',
  },
  notFound: {
    code: '404',
    heading: 'Page not found',
    text: "The page you're looking for doesn't exist.",
    home: 'Back to Home',
  },
  // formatting helpers
  titleCount: (n) => `${n} ${n === 1 ? 'Title' : 'Titles'}`,
  listCount: (n) => `${n} ${n === 1 ? 'title' : 'titles'}`,
  resultCount: (n) => `${n} ${n === 1 ? 'result' : 'results'}`,
  seasons: (n) => `${n} ${n === 1 ? 'Season' : 'Seasons'}`,
  rankLabel: (rank, group) => `#${rank} in ${group}`,
  roleLabel: (name, role) => `${name} (${role})`,
  duration: (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h}hr`;
    return `${h}hr ${m} min`;
  },
};