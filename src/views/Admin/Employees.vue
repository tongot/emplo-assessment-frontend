
<template>
  <div class="mainDiv">
   <h2>Employees</h2>
   <hr/>
   <div>
     <table border="1">
                 <thead>   
                   <td><strong>Name</strong></td>        
                     <td><strong>Surname</strong></td>
                     <td><strong>Email</strong></td>
                     <td><strong>Empl No.</strong></td>
                     <td><strong>department</strong></td>                 
                 </thead>
                     <tr v-for="user in users.users">    
                     <td>{{user.name}}</td>
                     <td>{{user.surname}}</td>
                     <td><a class=" btn btn-sm btn-link" @click="setUserId(user.userId)" v-b-modal.modalAssignRole>{{user.email}}</a></td>
                     <td>{{user.employeeNumber}}</td>
                     <td>{{user.department}}</td>
                     <td>
                         <b-button class="tableBtn" @click="setId(user.Id)"  v-b-modal.modalUploadfile  size="sm"><font-awesome-icon icon="trash"/></b-button> 
                         <input type="checkbox">                        
                      </td>
                 </tr>
                 <tr>
                   <td v-if="numberOfItems>10" colspan="4">
                        <b-pagination @input="changePage()" align="center" size="sm" :total-rows="numberOfItems" v-model="currentPage" :per-page="numberOfItems">
                        </b-pagination>
                   </td>

                 </tr>
             </table>
   </div>

   <!--
     the modals to this page 
   -->

  <div>
      <b-modal  id="modalAssignRole" title="Select Roles">
        <b-container>
              <div class="form-check form-check-inline">
                <label v-for="role in userRoles" class="form-check-label">
                   <input type="checkbox" :value="role.roleName" v-model="role.isChecked"/>
                   {{role.roleName}}
                </label>         
              </div>
        </b-container>
        <div slot="modal-footer" class="w-100">
            <b-btn @click="addToRoles" variant="success"><font-awesome-icon icon="thumbs-up"/> Ok</b-btn>
        </div>
      </b-modal>
  </div>

  </div>
</template>

<script>

 export default {
  data()
  {
    return{
      users:[],
      userRoles:[],
      rolesSected:true,
      userId:null,
      currentPage:-1,
      numberOfItems:0,
    }
  },
  methods:
  {
    setUserId(userId)
    {
      this.userId=userId;
      this.getRoles();
    },
    getRoles(){

      this.$http.get('http://localhost:1833/api/roles/'+this.userId).then(function(data){
        this.userRoles=data.body;

    })
    },
    addToRoles()
    {
      this.$http.post('http://localhost:1833/api/addRoles',
          {
            userId:this.userId,
            userRoles:this.userRoles
          }).then(function(data)
          {
            console.log(data.body)
          }),function(error)
          {
              alert("failed to load the document "+error)
          }
    }
  },
  created()
  {
     this.$http.get('http://localhost:1833/api/user/'+this.currentPage).then(function(data){
      this.users=data.body;
      this.numberOfItems=this.users.numberOfEmployees
    })
  }
 }
</script>

<style>

</style>