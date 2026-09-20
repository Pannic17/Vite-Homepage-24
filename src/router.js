import {createRouter, createWebHistory} from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Works from './views/Works.vue';
import Projects from './views/Projects.vue';
import ProjectDetail from './views/ProjectDetail.vue';
import NotFound from './views/NotFound.vue';
import {pagePaths} from './routePaths';
import {detailEntries} from './content/portfolio';

const routes = [
  {path:pagePaths.home,name:'Home',component:Home},
  {path:pagePaths.about,name:'About',component:About,meta:{titleKey:'menu.about'}},
  {path:pagePaths.works,name:'Works',component:Works,meta:{titleKey:'menu.works'}},
  {path:pagePaths.projects,name:'Projects',component:Projects,meta:{titleKey:'menu.projects'}},
  ...detailEntries.map(entry => ({
    path:entry.detail.path, name:entry.id, component:ProjectDetail, props:{id:entry.id},
    meta:{parent:entry.detail.parent,titleKey:entry.titleKey},
  })),
  ...(import.meta.env.DEV ? [{path:pagePaths.test,name:'Test',component:() => import('./views/Page.vue'),meta:{titleKey:'menu.test'}}] : []),
  {path:'/:pathMatch(.*)*',name:'NotFound',component:NotFound,meta:{notFound:true,titleKey:'status.notFound'}},
];
export default createRouter({
  history:createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to,from,savedPosition) { return savedPosition || {left:0,top:0}; },
});
