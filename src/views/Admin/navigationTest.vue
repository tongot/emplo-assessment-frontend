<template>
<div class="mainDiv">
    <div>
        <div class="navDiv" >
        <button class="btn btn-sm navLink" @click="changeTolist('list')">List</button> 
        <button class="btn btn-sm navLink"   @click="changeTolist('add')">Add new</button>  
        <h4 class="badge badge-primary float-right">{{title}}</h4> 
      </div>
    </div>
    <div>
        <compontent v-bind:is="component"></compontent>
    </div>
</div>
</template>

<script>
import TestCreate from './createTest'
import TestView from './viewTest'

export default {
    
components:{
   'test-create':TestCreate,
    'test-view':TestView,
},
   data()
   {
       return{
           component:'test-view',
           title:'List of Test',
       }
   } ,
   methods:{
       changeTolist(state)
       {
           if(state=='list'){
               this.title='List of Tests';
               this.component='test-view'
           }else
           {
               this.title='Add new Test';
               this.component='test-create'
           }
       }
   }
}
</script>
<style>
.navLink{
    width: 100px;
}
.navDiv{
    padding: 5px;
    background:#ffff;
}
h3{
    font-family: Arial, Helvetica, sans-serif;
    color: #b2d1c7;
  }
  
</style>