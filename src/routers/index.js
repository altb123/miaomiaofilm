import Vue from 'vue'
import Router from 'vue-router'
import Cinema from './Cinema'
import Movie from './Movie'
import Mine from './Mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'miaomiao',
  routes: [
    Cinema,
    Movie,
    Mine,
   {
     path : '/*',
     redirect : '/movie'
   }
  ]
})
