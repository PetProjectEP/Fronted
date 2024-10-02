import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUpView.vue';
import SignInView from '../views/SignInView.vue';
import CreatePostView from '../views/CreatePostView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignInView
    },
    {
      path: '/create-post',
      name: 'createPost',
      component: CreatePostView
    }
  ]
})

export default router
