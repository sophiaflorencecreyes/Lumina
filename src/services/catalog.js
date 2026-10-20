import { CatalogService } from './CatalogService';
import { TITLES } from '../data/titles';

export const catalog = new CatalogService(TITLES);