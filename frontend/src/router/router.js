import {createRouter,createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Questions from '../views/Questions.vue'
import Question from '../views/Question.vue'
import QuestionEditor from '../views/QuestionEditor.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/questions', component: Questions},
    {path: '/question/:Id', component: Question},
    {path: '/editquestion/:Id', component: QuestionEditor},
    {path: '/askquestion/:Id', component: QuestionEditor},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router