<template>
  <div class="mainDiv">
      
        <button v-b-modal.modalAdd  class="btn btn-sm navLink">Add new</button>                     
            <h4 class="badge badge-primary float-right">list of departments</h4>

     <!--
           add department modal
       -->
<b-modal id="modalAdd" @show="clear" title="Add new department">
       <div class="divModal">
       <div>
                    <div v-if="errors.length" :class="color">
                       <ul>
                           <li v-for="error in errors">{{error}}</li>
                       </ul>
                   </div>
       </div>
       <div>
           <b-form >
                <b-form-group label="Department name" label-for="name">
                       <b-form-input required v-model="department.departmentName" id="name"/>
                   </b-form-group>

                   <b-form-group label="Location" label-for="location">
                       <b-form-input required v-model="department.location" id="location"/>
                   </b-form-group>
               </b-form>
               </div>
       </div>
        <div slot="modal-footer" class="w-100">
            <b-btn variant="success" @click="validateForm">Add</b-btn>
        </div>
   </b-modal>
   
    <!--
          DELETE APPROVE
       -->
       <b-modal id="modalDelete" ref="modalDelete2" title="Are you sure to delete!">
       <div class="divModal">
        <div>
            <div class="alert alert-danger">All users on this department will be deleted</div>
            </div>
       </div>
        <div slot="modal-footer" class="w-100">
            <b-btn variant="danger float-right" @click="deleteDepartment()">Delete</b-btn>
            </div>   
   </b-modal>
       
   <hr/>
    <b-form-group class="form-inline alert-info">  
        <input type="radio" value="departmentName" name="category" v-model="category">&nbsp;
                Department Name &nbsp;
        <input type="radio" name="category" value="location" v-model="category">&nbsp;
                Location
        <b-form-input required v-model="searchValue" id="name"/>  
        <button class="btn btn-sm" @click="search" >search</button>
        </b-form-group> 
   <b-container>
             <table border="1">
                 <thead>           
                     <td><strong>Department</strong></td>
                     <td><strong>Location</strong></td>
                     <td><strong>Actions</strong></td>
                 </thead>
                     <tr v-for="(department,index) in departments">           
                     <td>{{department.departmentName}}</td>
                     <td>{{department.location}}</td>
                     <td>
                         <b-button variant="danger" v-b-modal.modalDelete @click="setDelete(department.DepartmentId,index)" size="sm">delete</b-button>
                         </td>
                 </tr>
                 <tr>
                <td v-if="numberOfPages>1" colspan="7"> 
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
     
   </b-container>
  </div>

</template>

<script>

 export default {
  data()
  {
      
      return{
          department:[],
          errors:[],
          departments:[],
          color:"alert alert-warning",
          numberOfPages:1,
          category:"location",
          searchValue:'',
          indexDelete:'',
          idDelete:''
        }
     
  },
  methods:{
      setDelete(id,index)
      {
        this.idDelete=id;
        this.indexDelete=index;
      },
      postDepartment:function(){
          this.$http.post('http://localhost:1833/api/Departments',{
              departmentName:this.department.departmentName,
              location:this.department.location
          }).then(function(data){
              this.departments.push(data.body);
              this.color= "alert alert-success"
              this.errors=[]
              this.errors.push("Record Added!")
    }),function(e){
        alert("Something went wrong "+e)
    };
 },
        deleteDepartment()
        {
                this.$http.delete('http://localhost:1833/api/Departments/'+this.idDelete
             ).then(function(data){
              this.departments.splice(this.indexDelete,1);
                 this.$refs['modalDelete2'].hide()   
            }),function(e){
             alert("Something went wrong "+e)
             };
        },
    validateForm()
    {
        this.color="alert alert-warning"
        if(this.department.departmentName && this.department.location)
        {
            this.postDepartment();
        }
        this.errors=[];

        if(!this.department.departmentName)
        {
            this.errors.push("please provide name")
        }
         if(!this.department.location)
        {
            this.errors.push("please provide location")
        }
    },
    clear()
    {
        this.errors=[];
        this.department=[];
    },
    //serach button 
    search(){
        this.getDepartment(1);
    },
    //get method for the departments 
    getDepartment(page)
    {
        this.$http.get('http://localhost:1833/api/Department?pageNumber='+page+'&searchValue='+this.searchValue+'&category='+this.category)
        .then(function(data){
        this.departments=data.body.obj;
        this.numberOfPages=data.body.numberOfPages;
        if(data.status==401)
        {
            alert("please log in with an authorised user")
        }
    }),function(error){
        alert("something happened "+error)
    }
    },
    //
    getPageNumber(page)
    {
        this.getDepartment(page)
    }
  },
  created()
  {
      //get data soon after loading
      this.getDepartment(1);
  }
 }
</script>

<style>
.formBackground{
    background-color: #c8e0d0;
    padding: 2%;
    border-radius:2%;
}
.divModal
{
    justify-content: center;
}
</style>