
<template>
  <div>
     <navigations color="info"></navigations>
     <div class="mainDiv" v-if="user==''">
       session expired, log in again
     </div>
     <div class="mainDiv">
       <b-breadcrumb class="breadcrumb">
      <b-breadcrumb-item>
          <a @click="component='navigation-article'"><strong>Articles</strong></a>
      </b-breadcrumb-item>   

      <b-breadcrumb-item >
          <a @click="component='Employee-emp'"><strong>Employees</strong> </a>
        </b-breadcrumb-item> 

      <b-breadcrumb-item >
          <a @click="component='course-cos'"><strong>Courses</strong> </a>
        </b-breadcrumb-item>

        <b-breadcrumb-item >
          <a @click="component='test-ts'"><strong>Tests</strong> </a>
        </b-breadcrumb-item>

      <b-breadcrumb-item>
        <a @click="component='asses-as'">
          <strong>Assessments</strong>
          </a></b-breadcrumb-item>
    
       <b-breadcrumb-item>
        <a @click="component='mark-schedule'">
          <strong>Mark Schedule</strong>
          </a>
        </b-breadcrumb-item> 

        <b-breadcrumb-item>
        <a @click="component='current-report'">
          <strong>Report</strong>
          </a>
        </b-breadcrumb-item> 

      <b-breadcrumb-item  @click="component='department-dep'"><strong> Department</strong></b-breadcrumb-item>  
      </b-breadcrumb>
     </div>

    <div>      
  </div>
      <compontent v-bind:is="component"></compontent>
  </div>
</template>

<script>
import Test from './navigationTest'
import navigateToArticle from './navigationArticle'
import Employees from './Employees.vue'
import Department from './departments.vue'
import Courses from './createCourse'
import Assesments from './Assesment.vue'
import markSchedule from './markSchedule.vue'
import currentReport from './currentRepo.vue'

name="App2";
 export default {

    components:{
      'asses-as':Assesments,
    'Employee-emp':Employees,
    'department-dep':Department,
    'navigation-article':navigateToArticle,
    'test-ts': Test,
    'course-cos':Courses,
    'mark-schedule':markSchedule , 
    'current-report':currentReport
},

  data(){
      return{
        component:this.$route.params.component
      }
  },

methodes:{
  
},
computed:{
 user(){
     return this.$store.state.username;
   },
   roles(){
     return this.$store.state.role;
   }
}

 }

</script>

<style>
.breadcrumb{
  background-color: #c8e0d0
}
.menu-dropdown
{
  height: 80%;
  padding:0;
  margin: 0
}
table{
  width: 100%;
  border: gray;
  
}
thead{
  font-weight: bold;
  text-align: center;
  background:  #b2d1c7
}
</style>