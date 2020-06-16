
import Admin from './views/Admin/adminMain.vue'
import EditArt from './views/Admin/editArticle.vue'
import Register from './views/logInRegistration/register.vue'
import Employee from './views/Ordinary-Employee/ordinaryEmployeeMain.vue'
import login from './views/logInRegistration/login.vue'
import Dash from './views/Ordinary-Employee/DashUser.vue'
import syllabus from './views/Ordinary-Employee/courseSyllabus.vue'
import editTest from './views/Admin/editTest.vue'
import testAssesment from './views/Ordinary-Employee/questionAndAnswer.vue'
import viewArt from './views/Ordinary-Employee/articleView.vue'
import home from './views/Ordinary-Employee/homeMain.vue'
import accessDenied from './views/logInRegistration/Error.vue'



export default[
    {
        path:'/Admin',
        component:Admin, 
        meta:{requiredAuth:true, requireAdmin:true}
    },
    {
        path:'/employee',
        component:home},
    {
        path:'/Admin/:component',
        component:Admin, 
        meta:{requiredAuth:true, requireAdmin:true}
    },
    {
        path:'/editArt/:id',
        component:EditArt
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/login',
        component:login},
    {
        path:'/',
        component:Employee},
    {
        path:'/DashUser',
        component:Dash,
        meta:{requiredAuth:true}
    },
    {
        path:'/syllabus/:course/:id',
        component:syllabus
    },
    {
        path:'/editTest/:id',
        component:editTest
    },
    {
        path:'/DashUser/viewArt/:id',
        component:viewArt
    },

    {
        path:'/testAssesment/:id/:CourseId',
        query:{course:''},
        component:testAssesment,
    },
    {
        path:'/accessDenied/:state',
        component:accessDenied,
    }
]
