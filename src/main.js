import Vue from 'vue'
import bootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Routes from './routes'
import navBar from './views/sharedComponents/headers'
import sideBar from './views/sharedComponents/sideBar'
import navBarEmployee from './views/sharedComponents/headerEmployee'
import VueXgplayer from 'vue-xgplayer'
import Loader from './views/sharedComponents/loader.vue'
import {store} from './store/store'

import  VueEditor from 'vue2-editor'
//import V2table from 'v2-table'
import {library} from '@fortawesome/fontawesome-svg-core'
import Paginate from 'vuejs-paginate'

import {faCoffee,faTrash,faCheck,faAngleDoubleRight,
  faSquare,faNewspaper,faGraduationCap,faBookReader,
  faBook,faUserGraduate,faEdit,faAngleDoubleLeft,faEye,
  faFileUpload,faThumbsUp,faHome,faLock,faUnlock,faDoorOpen,
  faEnvelopeSquare,faPlayCircle, faRedo,faSpinner,faThumbsDown} from '@fortawesome/free-solid-svg-icons'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faCoffee,
  faNewspaper,faAngleDoubleRight,faCheck,faSquare,faTrash,
  faGraduationCap,faBookReader,faBook,faUserGraduate,faAngleDoubleLeft,
  faEdit,faEye,faFileUpload,faThumbsUp,faHome,faLock,faDoorOpen,
  faEnvelopeSquare,faUnlock,faPlayCircle,faRedo,faSpinner,faThumbsDown)


Vue.use(VueEditor)
Vue.use(bootstrapVue);
Vue.use(VueRouter);
Vue.use(Routes);
Vue.use(VueResource);

Vue.use(VueXgplayer, {
  // globalOptions
  playsinline: true
})

//Vue.use(V2table);
Vue.component('navigations',navBar);
Vue.component('font-awesome-icon',FontAwesomeIcon);
Vue.component('navigateEmployee',navBarEmployee)
Vue.component('side-bar',sideBar)
Vue.component('loader',Loader)
Vue.component('paginate',Paginate)



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'beautify-scrollbar/dist/index.css'
import 'v2-table/dist/index.css'

//http interceptor
Vue.http.interceptors.push((request,next)=>{
  request.headers.set('Authorization', 'Bearer '+ store.state.token)
  request.headers.set('Accept', 'application/json')
  next(res=>{
    if(res.status===401)
    {
      router.push('/accessDenied/401');
    }
    else if(res.status===0)
    {
      router.push('/accessDenied/0');
    }
})
});

//get routes and set the routing 
const router= new VueRouter({
routes:Routes
});
/*
router.beforeEach((to,from,next)=>{
//check for requiered auth gaurd
if(to.matched.some(record=>record.meta.requiredAuth))
{
  //check if not logged in
  if(!store.state.token)
  {
    next({
      path:'/login',
      query:{
        redirect:to.fullPath
      }
    });
  }else {
    if(to.matched.some(record=>record.meta.requireAdmin))
    {
      console.log('hit')
      var roles=store.state.role
      if(roles!=null)
      {
      if(roles.includes("Admin"))
      {
        console.log('hit2')
        next();
      }
     /* else if(roles.includes("Dep"))
      {
        next();
      }
      else if(roles.includes("Emplo"))
      {
       next();
      }
      else{
        router.push('/login')
        next({
          path:'/login',
          query:{
            redirect:to.fullPath
          }
        });
      }
    }else{

      router.push('/login')      
      next({
        path:'/login',
        query:{
          redirect:to.fullPath
        }
      });
    }
    }   
  }
}next()
});*/

new Vue({
  el: '#app',store: store,
  render: h => h(App),
  router
});


