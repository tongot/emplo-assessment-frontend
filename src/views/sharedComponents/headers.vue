<template>
<div>
 <b-navbar toggleable="md" type="dark" :variant="color">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <img  src="../../assets/logo.jpg" class="imgLogo float-left"/>&nbsp;
  <b-navbar-brand>E-Learning Hub</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
     
    </b-navbar-nav>
    
        <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
    
    <b-navbar-nav right>
          <b-nav-item v-if="user==''||user==null" href="#/register" >Register</b-nav-item>
          <b-nav-item v-if="user==''||user==null" href="#/login" >Login</b-nav-item>
    </b-navbar-nav>
      <b-nav-item-dropdown v-if="user!=null" right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>Hello {{user}}!</em>
        </template>
        <b-dropdown-item>Profile</b-dropdown-item>
        <b-dropdown-item href="#" @click="logout()">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>


</div>
</template>

<script>

export default {
  props:['color'],
 data(){
    return{

    }
 },
 methods:{
   //sign out method 
      logout(){
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
 },
 computed:{
   //set the username 
   user(){
     console.log(this.$store.state.username)
     return this.$store.state.username;
   }
 }
}
</script>

<style>
.imgLogo
{
  height: 40px;
}
</style>