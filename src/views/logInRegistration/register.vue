
<template>
<div>
<navigations color="dark"></navigations>
    <div class="container">
        <h4 style="margin-top:10px"><img src="../../assets/logo.jpg" class="imgLogo"/> Employee registration</h4>
        <hr>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                    <div v-if="alertMessage!=''" class="alert alert-warning">
                    <span  class="errorInfor">{{alertMessage}}</span>
                 </div>

                <div class="row">
                        <div class="col-md-6">
                                <div >
                                <span>First Name</span>
                                    <b-form-input required v-model="user.name" id="name"/>
                                    <span  class="errorInfor">{{valid.name}}</span>
                                </div>

                                <div>
                                    <span>Surname</span>
                                    <b-form-input required v-model="user.surname" id="surname"/>
                                    <span  class="errorInfor">{{valid.surname}}</span>
                                </div>

                                <div>
                                    <span>Gender</span>
                                    <select class="custom-select" v-model="user.gender" id="inputGroupSelect01">
                                        <option selected></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <span  class="errorInfor">{{valid.gender}}</span>
                                </div>

                                <div>
                                    <span>Employee Number</span>
                                    <b-form-input required v-model="user.employeeNumber" id="employeeNumber"/>
                                    <span  class="errorInfor">{{valid.employeeNumber}}</span>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div>
                                    <span>Email</span>
                                    <b-form-input type="email" required v-model="user.Email" id="Email"/>
                                    <span  class="errorInfor">{{valid.Email}}</span>
                                    <span class="errorInfor">{{valid.EmailValid}}</span>
                                </div>

                                <div>
                                    <span>Password</span>
                                    <input class="form-control" required v-model="user.Password" type="password" id="Password"/>
                                    <span  class="errorInfor">{{valid.Password}}</span>
                                </div>

                                <div>
                                    <span>Confirm Password</span>
                                    <input class="form-control" required v-model="user.ConfirmPassword" type="password" id="ConfirmPassword"/>
                                    <span  class="errorInfor">{{valid.ConfirmPassword}}</span>
                                </div>

                                <div>
                                    <span>Select department</span>
                                    <loader v-if="loader==true"/>
                                    <select class="custom-select" id="department" v-model="user.departmentId" @input="setDepartment" >
                                            <option v-for="dep in departments" :value="dep.DepartmentId">{{dep.departmentName}}</option> 
                                        </select>
                                        <span  class="errorInfor">{{valid.departmentId}}</span>
                                </div>
                                <br>
                                <button class="btn-success float-right btn" @click="validateForm">Register</button>
                            </div>
                </div>
            </div>
            
  
            <div class="col-1"></div>

                <!-- sign in form begins -->

            </div>
            <hr>
        </div>
        </div> 
</template>

<script>

 export default {
  data()
  {
      return{

          validated:true,
          alertMessage:"",
          departments:[],
          user:{
                Email:null ,
                Password: null,
                ConfirmPassword: null ,
                name: null ,
                surname: null ,
                employeeNumber: null ,
                gender: null ,
                departmentId:null
          },
          valid:{
                Email:null ,
                Password: null,
                ConfirmPassword: null ,
                name: null ,
                surname: null ,
                employeeNumber: null ,
                gender: null ,
                departmentId:null,
                EmailValid:null,

          },
          loader:false
      }
  },
    methods:
    {
        setDepartment(department){
            console.log(this.user.departmentId)
        },
        //validating the form
        validateForm()
        {
            this.validated=true;

            if(!this.user.Email){
                this.valid.Email="please provide your email"
                this.validated=false;
            }
            if(!this.user.ConfirmPassword){
                this.valid.ConfirmPassword="please Confirm your Password"
                this.validated=false;
            }
            if(!this.user.Password){
                this.valid.Password="please provide your Password"
                this.validated=false;
            }
            if(!this.user.name){
                this.valid.name="please provide your name"
                this.validated=false;

            }
            if(!this.user.surname){
                this.valid.surname="please provide your surname"
                this.validated=false;

            }
            if(!this.user.employeeNumber){
                this.valid.employeeNumber="please provide your employeeNumber"
                this.validated=false;

            }
            if(!this.user.gender){
                this.valid.gender="please provide your gender"
                this.validated=false;

            }
            if(!this.user.departmentId){
                this.valid.departmentId="please provide your Department"
                this.validated=false;

            }
            if(!/@oldmutual.co.zw\s*$/.test(this.user.Email)){
                 this.valid.EmailValid="Email domain error"
                this.validated=false;
            }
            this.register(this.validated);
        },
        register(ok)
       {
           this.alertMessage='';
           if(ok)
           {

                this.$http.post('http://localhost:1833/api/Account/Register',{

                Email:this.user.Email,
                Password:this.user.Password,
                ConfirmPassword:this.user.ConfirmPassword,
                name:this.user.name,
                surname:this.user.surname,
                employeeNumber:this.user.employeeNumber,
                gender:this.user.gender,
                departmentId:this.user.departmentId

                }).then(function(data){
                    this.alertMessage="Register successful"
                    this.user={};
                    }).catch(function(data){
                     this.alertMessage=data.body.ModelState
                    }),function(e){
                        alert("Something went wrong "+e)
                 }; 
                 
           }else{
               this.alertMessage="please fill in all required fields"
           }
    
 }
    },
    created()
    {
        this.loader==true;
        this.$http.get('http://localhost:1833/api/DepartmentsList').then(function(data){
        this.departments=data.body;
        this.loader=false;
        })
    }
 }
</script>

<style>
.formBackground{
    background-color: #c8e0d0;
    padding: 2%;
    border-radius:1%;
}
.errorInfor{
    font-size: 13px;
    color:orangered
}
.divRegister{
    border: solid 1px;
    border-color: olivedrab;
    margin:50px;
    border-radius: 3px;
}
</style>