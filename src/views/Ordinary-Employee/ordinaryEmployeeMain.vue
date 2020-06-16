
<template>
    <div>
    <navigations color="dark"></navigations>

     <compontent v-bind:is="component"></compontent>
    <!--Modal for admin login-->
    </div>

</template>
<script>
  import Register from "../logInRegistration/register.vue"
  import Home from "./homeMain.vue"

  export default {

    components:{
    'register-reg':Register,
    'home-v':Home,
},
  data()
  {
      return{
          component:'home-v',
          //variable for logging in
           password:'',
             username:'',
             responseUsername:'',
             responsePassword:''
      }
    },
        methods:
     {
            //post for log in
        login(){
            this.$http.post('http://localhost:1833/token',
                   'username='+this.username+'&password='+this.password+'&grant_type=password'
            ).then(function(response){
                this.response=response.body;
                console.log(response)
                localStorage.setItem('myToken',this.response.access_token)
                localStorage.setItem('role',this.response.role)
                localStorage.setItem('username',this.response.userName)
                this.$router.push('/DashUser')
            })
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
     }
 }
</script>
<style>
.formBackground{
    background-color: #c8e0d0;
    padding: 2%;
    border-radius:1%;
}

</style>
