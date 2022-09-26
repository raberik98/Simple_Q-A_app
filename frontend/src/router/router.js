import {createRouter,createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Questions from '../views/Questions.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/questions', component: Questions},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router