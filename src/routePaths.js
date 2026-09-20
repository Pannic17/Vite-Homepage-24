import {detailEntries} from './content/portfolio.js';

// Stable legacy paths. Production details derive from the content catalog.
export const pagePaths = {home:'/',about:'/about',works:'/works',projects:'/projects',gcs:'/works/gcs',test:'/test'};
export const productionPaths = [pagePaths.home,pagePaths.about,pagePaths.works,pagePaths.projects,...detailEntries.map(entry => entry.detail.path)];
