import { createRouter, createWebHistory } from 'vue-router';
import SomePage from 'Pages/SomePage.vue'


const routes = [
    {
        path: '/benefits',
        component: SomePage,
        name: 'somepage'
    },
    {
        path: '/prices',
        component: SomePage,
        
    },
    {
        path: '/special-offers',
        component: SomePage,
        
    },
    {
        path: '/promo',
        component: SomePage,
      
    },
    {
        path: '/esim',
        component: SomePage,
     
    },
    {
        path: '/connection',
        component: SomePage,
       
    },
 
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'somepage' }
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(),

})

export default router