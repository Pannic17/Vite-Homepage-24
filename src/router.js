import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Works from "./views/Works.vue";
import Projects from "./views/Projects.vue";
import GCS from "./views/pages/GCS.vue";
import NotFound from './views/NotFound.vue';
import { pagePaths } from './routePaths';

const routes = [
    {
        path: pagePaths.home,
        name: 'Home',
        component: Home
    },
    {
        path: pagePaths.about,
        name: 'About',
        component: About
    },
    {
        path: pagePaths.works,
        name: 'Works',
        component: Works,
    },
    {
        path: pagePaths.gcs,
        name: 'GCS',
        component: GCS,
        meta: { parent: pagePaths.works },
    },
    {
        path: pagePaths.projects,
        name: 'Projects',
        component: Projects
    },
    {
        path: pagePaths.test,
        name: 'Test',
        component: () => import('./views/Page.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { notFound: true } },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 };
    },
});

export default router;
