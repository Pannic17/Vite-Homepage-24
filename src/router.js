import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Works from "./views/Works.vue";
import Projects from "./views/Projects.vue";
import GCS from "./views/pages/GCS.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/works',
        name: 'Works',
        component: Works,
        children: [
            {
                path: 'gcs',
                component: GCS
            }
        ]
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('./views/Page.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
