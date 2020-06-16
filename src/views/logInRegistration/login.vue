
<template>
<div >
    <navigations color="success"></navigations>

    <div class="logInBg">
 <div class="row justify-content-md-center">
     
     <div class="logInForm">
         <div v-if="error!=''" class="alert alert-warning">{{error}}</div>
         <center><loader v-if="loader==true"></loader></center>
       <div >
           <div class="divHearding"><img src="../../assets/logo.jpg" alt="logo.jpg" height="53" width="29" /><strong>&nbsp;Login</strong></div>
       <div>
           <br>
           <b-form >
                <div class="form-group">
                    <span class="logIntxt"><font-awesome-icon icon="envelope-square"/> Email</span>
                    <b-form-input class="textBox" v-model="username" required id="username"/>
                    <span  class="errorInfor">{{responseUsername}}</span>
                </div>

                <div class="form-group">
                    <span class="logIntxt"><font-awesome-icon icon="unlock"/> Password</span>
                    <b-form-input type="password" class="textBox" v-model="password" required  id="password"/>
                    <span  class="errorInfor">{{responsePassword}}</span>
                </div> 
            </b-form>
           
        </div>
       </div>
        <div slot="modal-footer" class="w-100">
            <button class="btn btn-success float-right"  @click="validateLogIn"><font-awesome-icon icon="lock"/> LogIn </button>
        </div>
        </div>
    </div>
        </div>
</div>
</template>

<script>
import axios from 'axios'
 export default {
  data()
  {
      return{
 
          //variable for logging in
             password:'',
             username:'',
             responseUsername:'',
             responsePassword:'',
             error:'',
             loader:false
      }
    },
        methods:
     {
            //post for log in
        login(){
            this.error=''
            this.loader=true;
            this.$http.post('http://localhost:1833/token',
                   'username='+this.username+'&password='+this.password+'&grant_type=password'
            ).then(function(response){
                this.response=response.body;
                this.loader=false;
                //set the user log in information

                //store in local storage
                window.localStorage.setItem('username',this.response.userName)
                window.localStorage.setItem('role',this.response.role)
                window.localStorage.setItem('token',this.response.access_token)

                //intialise values
                this.$store.state.username=this.response.userName                
                this.$store.state.role=this.response.role
                this.$store.state.token=this.response.access_token

                if(!this.response.role.includes('Admin')&
                   !this.response.role.includes('Emplo')&
                   !this.response.role.includes('Dep')){

                    this.error='User not activated contact admin'
                    // log off the user if not active 
                    this.$http.post("http://localhost:1833/api/Account/Logout")
                   .then((data)=>{

                    // clear tokens 
                    this.$store.state.username=null
                    this.$store.state.role=null
                    this.$store.state.token=null

                    window.localStorage.clear();

                    this.$router.push('/login')
                    }),(error)=>{
                    alert("error signing out")
                    }
                }
                 else if(this.response.role.includes('Admin'))
                 {
                    this.$router.push('/admin/navigation-article')
                }else{
                    this.$router.push('/DashUser')
                }
            }).catch((data)=>{
                this.error='Error login timedout'
                this.loader=false;
            }),function(data){
               
            }
        },
        validateLogIn()
        {
            this.responseUsername='';
            this.responsePassword='';
            if(this.username=='')
            {
                this.responseUsername="please enter user name"
                return;
            }if(this.password=='')
            {
                this.responsePassword="please enter password"
                return
            }
          this.login();
          
        }
     },
 }
</script>

<style>
.logInForm{
    width: 400px;
    /*border:solid 1px olivedrab;*/
    background-image:linear-gradient(to left, #28BF69 , #88DC73);;
    padding: 10px;
    margin-top: 100px;
    height:300px
}
.divHearding{
    background-image:linear-gradient(to right, #28BF69 , #88DC73);;
    height: 40px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px; 
    color: #ffff;
}.textBox
{
   background-image:linear-gradient(to right, #28BF69 , #88DC73);;
   border-radius: 3px; 
   border: solid #fff 1px
}
.errorInfor{
    font-size: 13px;
    color:orangered
}
.logIntxt
{
    color:#fff
}
.logInBg{
    /* background-image: url('../../assets/bk2.jpg');*/
    max-width: 100%;
}

</style>