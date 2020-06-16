<template>
  <div id="app">
   <div>
     <router-view></router-view>
   </div>
  </div>
</template>

<script>
 
 export default {

}
</script>
<style>
/*.btn-sm{
  height: 20px;
  padding: 0px 2px 0px 2px ;
}*/
.form-control{
  height: 30px;
}
.loader {
  animation: spin 2s linear infinite;
}
.mainDiv{
        margin-right: 5%;
        margin-left: 5%;
        background-color: #f0f0f0;
        padding: 1%;
      }

/*pagination style start*/
       .page-item{
        list-style-type: none;
       float: left; 
       background-color:#c8e0d0;
        margin: 1px;
        min-width: 20px;
        text-align: center;
        padding: 2px;
    }
    .container-item{
        display: inline-block;
        padding-left:20px;
        border-radius: 4px;
        border: 1px solid;
        padding-right: 20px;
        
    }
    .pagination{
        border:solid 1px;
        width: 400px;
        text-align: center
    }
    .prev-item
    {
        list-style-type: none;
        float: left;
        padding: 2px;

    }.next-item
    {
        list-style-type: none;
        float: left;
        padding: 2px;
    }
/*pagination style end*/
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>



