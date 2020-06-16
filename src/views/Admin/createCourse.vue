<template>
   <div class="mainDiv">
    <div>
        <div class="navDiv" >
        <button class="btn btn-sm navLink">List</button> 
        <button v-b-modal.modalAdd  class="btn btn-sm navLink">Add new</button>  
        <h4 class="badge badge-primary float-right">list of courses</h4> 
      </div>
    </div>
    <hr>
     <b-form-group class="form-inline alert-info">  
        <input type="radio" value="courseName" name="categoryCourse" v-model="categoryCourse">&nbsp;
                Course Name &nbsp;
        <input type="radio" name="categoryCourse" value="createdBy" v-model="categoryCourse">&nbsp;
                Created By
        <b-form-input required v-model="searchValue" id="name"/>
        <button class="btn btn-sm" @click="search" >search</button>
        </b-form-group> 
    <div>
        <table border="1">
            <thead>
                <td>Course No.</td>
                <td>Name</td>
                <td>Discription</td>
                <td>Created By</td>
                <td>Created On</td>
                <td>Expiry</td>
                <td>Actions</td>
             </thead>
             <tr v-for="cours in courses" class="text-center">
                <td>{{cours.courseId}}</td>
                <td>{{cours.name}}</td>
                <td>{{cours.discription}}</td>
                <td>{{cours.createdBy}}</td>
                <td>{{cours.dateCreated}}</td>
                <td>{{cours.expiryDate}}</td>
                <td>
                    <button class="btn btn-sm  btn-warning" @click="getTestForCourse(cours.courseId)" v-b-modal.selectTest>Add Test</button>
                    <button class="btn btn-sm btn-success"  @click="getArtForCourse(cours.courseId)" v-b-modal.selectArticle>Add Articles</button>
                    <button class="btn btn-sm btn-success" @click="setCourseId(cours.courseId)" v-b-modal.selectEmployees>Recruite</button>
                </td>
            </tr>
            <tr v-if="numberOfPages>1">
                <td colspan="7"> 
                    <div align="center">
                    <paginate
                    :page-count="numberOfPages"
                    :click-handler="getPageNumber"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'container-item'"
                    :page-class="'page-item'"
                    :prev-class="'prev-item'"
                    :next-class="'next-item'"
                    >
                    </paginate>
                    </div>
                </td>
            </tr>
        </table>
    </div>
<!--
  modal to add course
-->

<b-modal id="modalAdd" title="Add new Course">
       <div>
           <b-form>
                    <b-form-group label="Course" label-for="name">
                       <b-form-input required v-model="course.name" id="name"/>
                   </b-form-group>

                   <b-form-group label="Dispcription" label-for="discript">
                       <textarea class="form-control" required v-model="course.discription" id="discript"/>
                   </b-form-group>

                   <b-form-group label="Expiry Date" label-for="date">
                       <date-picker v-model="course.expiryDate" lang="en" type="date" for></date-picker>
                   </b-form-group>

               </b-form>
               </div>
        <div slot="modal-footer" class="w-100">
            <b-btn variant="success" @click="postCourse">Create</b-btn>
        </div>
   </b-modal>
<!--
    modal to select test
-->
<div>
<b-modal id="selectTest" title="Select Test">
       <div>
           <ul class="list-group">
               <li class="list-group-item" v-for="test in Tests">
                   <span>
                       <input :checked='test.checked' type="checkbox" value="true" v-model="test.checked"/>
                   </span>
                   {{test.name}}
               </li>
           </ul>
       </div>
        <div slot="modal-footer" class="w-100">
            <button class="btn btn-success float-right" @click="postTest">save</button>
        </div>
   </b-modal>
</div>
<!--modal for selecting articles-->

<div>
<b-modal id="selectArticle" title="Select Article">
       <div>
           <ul class="list-group">
               <li class="list-group-item" v-for="Article in Articles">
                   <span>
                       <input :checked='Article.checked' type="checkbox" value="true" v-model="Article.checked"/>
                   </span>
                   {{Article.name}}
               </li>
           </ul>
       </div>
        <div slot="modal-footer" class="w-100">
            <button class="btn btn-success float-right" @click="postArticle">save</button>
        </div>
   </b-modal>
</div>
<!--
    modal for recruiting for course
    -->
    <div>
<b-modal id="selectEmployees" title="Search Employees">
                <div class="form-inline">
                <input type="radio" value="department" name="category" v-model="category">&nbsp;
                department &nbsp;
                <input type="radio" name="category" value="name" v-model="category">&nbsp;                         
                Name
                </div><br>
                                            <b-form-group class="form-inline">
                                                    <b-form-input required v-model="searchString" id="name"/>
                                                    <button @click="searchEmployee" class="btn btn-sm">search</button>
                                            </b-form-group>
                <hr>
                <loader v-if="loader==true"></loader>
                <span v-if="message!=''">{{message}}</span>
       <div>
           <ul class="list-group">
               <li class="list-group-item" v-for="employee in employees">
                   <span>
                       <input :checked='employee.Checked' type="checkbox" value="true" v-model="employee.Checked"/>
                   </span>
                   {{employee.Fullname}}
                   <span class="badge alert-primary float-right">{{employee.Department}}</span>
               </li>
           </ul>
       </div>
        <div slot="modal-footer" class="w-100">
            <button class="btn float-right btn-success" @click="postRecruites">save</button>
        </div>
   </b-modal>
</div>
   </div>

</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
 components: {DatePicker},
    data()
    {
        return{
            course:{
                courseId:'',
                name:'',
                expiryDate:'',
                discription:'',
                createdBy:'',
                dateCreated:''
            },
            Test:
            {
                TestId:'',
                name:'',
                numberOfQuestions:'',
                checked:''
            },
             Article:
            {
                ArticleId:'',
                name:'',
                checked:''
            },
            loader:false,
            numberOfPages:1,
            courses:[],
            Tests:[],
            Articles:[],
            courseId:'',
            categoryCourse:'courseName',
            searchValue:'',
            //employee searching 
            category:'name',
            searchString:'',
            message:'',
            employees:[],
                
        }
    },

    methods:
    {

        getPageNumber(page){
            this.getCouses(page)
        },
        setCourseId(id){
            this.employees=[];
            this.courseId=id
        },
        //post recruites
        postRecruites(){
            this.loader=true;
            this.$http.post('http://localhost:1833/api/uploadRecruites/'+this.courseId,{
                employees:this.employees
            }).then((data)=>{
                this.loader=false;
                this.employees=[];
                this.message="data saved"
            }).catch((error)=>{
                alert('error '+error)
            }),(error)=>{
                alert("connection error "+error)
            }
        },
        //get search
        searchEmployee(){
            this.message=''
            this.loader=true;
            let url ='http://localhost:1833/api/getEmployeeSearch/'+this.courseId+'?category='+this.category+'&search='+this.searchString
            this.$http.get(url)
            .then((data)=>{
                this.loader=false;
                this.employees=data.body;
                if(this.employees==null){
                    this.message="no records found";
                }
            }).catch((data)=>{
                alert('failed to connect '+data.bodyText)
            }),(error)=>{
                alert("failed to connect "+error)
            }
        },
        //post the course created
        postCourse(){
            //convfert date 
            let fd,dd,mm,yy,today;
            fd=this.course.expiryDate;
            today=new Date();
            dd=fd.getDate();mm=(fd.getMonth()+1);yy=fd.getFullYear();
            if(dd<10)
            {
                dd='0'+dd;
            }
            if(mm<10)
            {
                mm='0'+mm;
            }
            //create user
            if(fd<today)
            {
                alert("select date greater than today")
                return;
            }
            this.course.expiryDate=dd+'-'+mm+'-'+yy
         this.$http.post('http://localhost:1833/api/Courses',{
                    name:this.course.name, 
                    discription:this.course.discription,
                    expiryDate:this.course.expiryDate
                },).then(function(data){
                    alert("Course Created");
                        this.course.name=data.body.name;
                        this.course.expiryDate=data.body.expiryDate;
                        this.course.discription=data.body.discription;
                        this.course.createdBy=data.body.creater;
                        this.course.dateCreated=data.body.dateCreated;
                        this.course.courseId=data.body.CourseId;
                        
                        this.courses.push(this.course)
                        this.course={};
                })
        },
        //search value 
        search(){
            this.getCouses(1);
        },
        //get all courses
        getCouses(page){
            this.courses=[];
             this.$http.get('http://localhost:1833/api/courses?pageNumber='+page+'&searchValue='+this.searchValue+'&category='+this.categoryCourse
                ).then(function(data){
                    this.numberOfPages=data.body.numberOfPages
                    
                for(var i,i=0;i<data.body.obj.length;i++)
                    {
                        this.course.name=data.body.obj[i].name;
                        this.course.expiryDate=data.body.obj[i].expiryDate;
                        this.course.discription=data.body.obj[i].discription;
                        this.course.createdBy=data.body.obj[i].creater;
                        this.course.dateCreated=data.body.obj[i].dateCreated;
                        this.course.courseId=data.body.obj[i].CourseId;

                        this.courses.push(this.course);
                        this.course={};

                    }
                })
        },
         getTestForCourse(id){
             this.courseId=id
             this.$http.get('http://localhost:1833/api/getTestForCouse/'+id
                ).then(function(data){
                    this.Tests=[];
                     for(var i,i=0;i<data.body.length;i++)
                    {
                        this.Test.name=data.body[i].name;
                        this.Test.numberOfQuestions=data.body[i].numberOfQuestions;
                        this.Test.TestId=data.body[i].TestId;
                        this.Test.checked=data.body[i].Checked;

                        this.Tests.push(this.Test)
                        this.Test={};
                    }
                })
                },

            getArtForCourse(id){
             this.courseId=id
             this.$http.get('http://localhost:1833/api/getArtclesForCouse/'+id
                ).then(function(data){
                    this.Articles=[];
                     for(var i,i=0;i<data.body.length;i++)
                    {
                        this.Article.name=data.body[i].name;
                        this.Article.ArticleId=data.body[i].ArticleId;
                        this.Article.checked=data.body[i].Checked;

                        this.Articles.push(this.Article)
                        this.Article={};
                    }
                })
                },
            postTest()
            {
                this.$http.post('http://localhost:1833/api/TestC',{
                    courseId:this.courseId,
                    Tests:this.Tests
                },).then(function(data){
                    alert(data.body)
                })},

            postArticle()
            {
                this.$http.post('http://localhost:1833/api/ArticleC',{
                    courseId:this.courseId,
                    Articles:this.Articles
                },).then(function(data){
                    alert(data.body)
                })}
        },
    
    created()
    {
        this.getCouses(1);
    }
}
</script>
<style>

</style>

