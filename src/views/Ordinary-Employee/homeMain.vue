<template>
<div class="divContainer">
    <br></br>
 <div class="jumbotron bgImage">
    <h1>Old Mutual school</h1>
    <p class="lead">We start with you to make our company great.</p>
    <p><a href="#/login" class="btn btn-success btn-lg">knock knock!! &raquo;</a></p>
</div>
<div class="row">
    <div class="col-md-4 sammary">
        <h3>Getting started</h3>
        <p>You just have to register with you old mutual detail and you are good to go.</p>
        <p><a class="btn btn-default" href="#/register">Register &raquo;</a></p>
    </div>
    <div class="col-md-4 sammary">
        <h3>Old Mutual group of companies</h3>
        <p>OMSS,OMLAC,CABS...</p>
        <p><a class="btn btn-default" href="http://go.microsoft.com/fwlink/?LinkId=301871">Learn more &raquo;</a></p>
    </div>
    <div class="col-md-4 sammary">
        <h3>More about Us</h3>
        <p>We provide investment, savings, life assurance, asset management, banking and property & casualty insurance in Africa, Europe, the Americas and Asia. We have over 16 million customers and approximately 57 000 employees</p>
        <p><a class="btn btn-default" href="http://go.microsoft.com/fwlink/?LinkId=301872">Learn more &raquo;</a></p>
    </div>
</div>
</div>
</template>
<script>
export default {
    data(){
    
    },
    created(){
        
    },
    compute(){

        }
}
</script>
<style>
 .bgImage{
     background-image: url('../../assets/bk1.jpg');
     max-width: 100%;
     max-height: 100%;
     background-repeat: no-repeat;
     position: relative;
     background-size: cover;
     background-position:center
 }
 .divContainer
 {
     margin-left: 100px;
     margin-right: 100px;
 }.sammary
 {
     background-color: #f0f0f0;
     border-radius: 5px;
 border: solid #fff 1px;
 }

</style>
