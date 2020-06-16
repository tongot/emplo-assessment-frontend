<template>
<div>
    <loader v-if="loader==true"></loader>
  <ul v-for="course in courses" class="column">
    <div class="card">
      <router-link style="padding:0px;" v-bind:to="'/syllabus/'+course.name+'/'+ course.courseId" href="#" class="btn btn-primary">
    <!--<img class="card-img-top"  src="../../assets/bk1.jpg" alt="Card image">-->
    <font-awesome-icon style="font-size:50px" icon="graduation-cap"/>
    </router-link>
    <div class="card-body">
      <h4 class="card-title">{{course.name}}</h4>
      <p style="width:150px; height:40px; text-overflow:ellipsis; white-space:nowrap;overflow:hidden;" class="card-text">{{course.discription}}</p>
    </div>
    </div>
   </ul>
   <div v-if="courses.length==0" class="alert alert-warning">
      <center>you are not recruited in any course</center>
  </div>
  </div>
  
</template>
<script>
export default {
    data()
    {
        return{
             course:{
                courseId:'',
                name:'',
                expiryDate:'',
                discription:'',
                createdBy:'',
                dateCreated:'',
                
            },
            courses:[],
            loader:false,
        }
    },
    methods:{
        openC(name,id)
        {
            this.$router.push('/syllabus/'+name+'/'+id)
        },
         getCouses(){
             this.loader=true;
             this.$http.get('http://localhost:1833/api/getCourseForUser'
                ).then(function(data){
                    this.loader=false;
                for(var i,i=0;i<data.body.length;i++)
                    {
                        this.course.name=data.body[i].name;
                        this.course.expiryDate=data.body[i].expiryDate;
                        this.course.discription=data.body[i].discription;
                        this.course.createdBy=data.body[i].creater;
                        this.course.dateCreated=data.body[i].dateCreated;
                        this.course.courseId=data.body[i].CourseId;

                        this.courses.push(this.course);
                        this.course={};

                    }
                })
        },
    },
    created()
    {
        this.getCouses();
    }
}
</script>
<style>
.card{
  width: 200px;
  float:left;
  overflow: hidden;
  margin: 2px;
}
.courseDiv{
    background-color: #f0f0f0;
    margin: 2px;
}
.courseDiv:hover{
    background-color: #d8f3e2;
}


</style>



