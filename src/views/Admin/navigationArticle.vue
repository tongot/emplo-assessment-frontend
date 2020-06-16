<template>
<div class="mainDiv">
    <div class="col-md-03">
        <div class="navDiv">
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
import Articles from './Articles.vue'
import listOfArtcle from './viewArticles'

export default {
    
components:{
    'article-art':Articles,
    'list-artcles':listOfArtcle,
},
   data()
   {
       return{
           component:'list-artcles',
           title:'List of Articles',
       }
   } ,
   methods:{
       changeTolist(state)
       {
           if(state=='list'){
               this.title='List of Articles';
               this.component='list-artcles'
           }else
           {
               this.title='Add new Article';
               this.component='article-art'
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
  .mainDiv{
    margin-right: 5%;
    margin-left: 5%;
    background-color: #f0f0f0;
    padding: 1%;
  }
  
</style>
