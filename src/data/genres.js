import { Genre } from '../models/Genre';

export const GENRES = {
  action: new Genre({ id: 'action', name: 'Action' }),
  adventure: new Genre({ id: 'adventure', name: 'Adventure' }),
  animation: new Genre({ id: 'animation', name: 'Animation' }),
  comedy: new Genre({ id: 'comedy', name: 'Comedy' }),
  drama: new Genre({ id: 'drama', name: 'Drama' }),
  fantasy: new Genre({ id: 'fantasy', name: 'Fantasy' }),
  horror: new Genre({ id: 'horror', name: 'Horror' }),
  mystery: new Genre({ id: 'mystery', name: 'Mystery' }),
  romance: new Genre({ id: 'romance', name: 'Romance' }),
  scifi: new Genre({ id: 'scifi', name: 'Sci-Fi' }),
  thriller: new Genre({ id: 'thriller', name: 'Thriller' }),
};