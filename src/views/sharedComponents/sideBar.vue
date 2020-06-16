<template>
<div class="row">


<div class="col-md-3 list-group">
      <div class="sideBar">
          <a v-for="(menu,index) in menuValues" @click="changeClass(index,menu.function)" :class="menu.lclass" href="#/dashUser">
          <font-awesome-icon class="float-left" :icon="menu.icon"/>
          &nbsp;&nbsp;{{menu.name}}</a>
    </div>
</div>
<div class="col-md-9">
    <div class="divContent">
        <div class="breadcrumb">
        <div class="breadcrumb-item"><router-link v-bind:to="'/DashUser'"><font-awesome-icon icon="home"/> Home</router-link></div>
    </div>
     <compontent v-bind:is="component"></compontent>
    </div>
      
  </div>
</div>
</template>

<script>
import ViewAllCousers from '../Ordinary-Employee/viewAllCourses.vue';
import News from '../Ordinary-Employee/news.vue'
import Articles from '../Ordinary-Employee/viewAllArticles.vue'
import Assess from '../Ordinary-Employee/assessment.vue'
export default {
props:['menuValues'],
 components:{
        'c-courses':ViewAllCousers,
        'n-news':News,
        'a-assessment':Assess,
        'a-articles':Articles
    },
    data(){
        return{
            component:'n-news'
        }
    }  
    ,methods:{
            changeClass(index,func){
    
                this.component=this.menuValues[index].component;
                for (let i = 0; i < this.menuValues.length; i++) {
                    if(index==i)
                    {
                        this.menuValues[i].lclass="linkVisited"
                    }else{
                        this.menuValues[i].lclass="sideLink"
                    }
                }
            }
         
    }
}
</script>
<style>
.sideBar{
    background-color:  #343A40;
    padding-top: 50px;
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 2px;
    margin-left: 20px;
    margin-top: 28px;
}
.sideLink:link, .sideLink:visited {
  background-image:linear-gradient(to right, #031121c2 , #03112199);
  color: white;
  padding: 14px 25px;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  margin-bottom: 1px;

}
.sideLink:hover, .sideLink:active{
  background-image:linear-gradient(to left, #2EA642 , #09795B);
}


.linkVisited:link, .linkVisited:visited {
  background-image:linear-gradient(to left, #2EA642 , #09795B);
  color: white;
  padding: 14px 25px;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  margin-bottom: 1px;
}
.divContent
{
    margin-right: 10px
}
</style>

