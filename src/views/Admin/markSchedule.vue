<template>
<div class="mainDiv">
    <div>
        <div class="navDiv" >
        <button class="btn btn-sm navLink">search filter</button> 
        <h4 class="badge badge-primary float-right">Mark Schedule</h4> 
      </div>
    </div>
    <hr>

    <table>
            <thead>
                <td>First Name</td>
                <td>Surname</td>
                <td>Department</td>
                <td>Course</td>
                <td>Test</td>
                <td>Mark</td>
                <td>State</td>
                <td>Attempts</td>
            </thead>
            <tr>
                <td>
                    <input v-model="FirstName" class="textSearch" type="text">
                </td>
                <td><input v-model="Surname" class="textSearch" type="text"></td>
                <td><input v-model="Department" class="textSearch" type="text"></td>
                <td><input v-model="Course" class="textSearch" type="text"></td>
                <td><input v-model="Test" class="textSearch" type="text"></td>
                <td>
                    <div class="textWarning" v-if="errorMark!=''">{{errorMark}}</div>
                    from<input v-model="fromMark" @change="filter" class="textSearchNum" type="number">to
                <input v-model="toMark" @change="filter" class="textSearchNum" type="number">
                </td>
                <td><select v-model="State">
                    <option value="fail">failed</option>
                    <option value="pass">passed</option>
                    </select></td>
                <td>
                    <div class="textWarning" v-if="errorAttempt!=''">{{errorAttempt}}</div>
                    <input v-model="Attempts" @change="filter" class="textSearchNum" type="number">
                </td>
            </tr>
        </table>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            errorMark:'',
            errorAttempt:'',
            FirstName:'',
            Surname:'',
            Department:'',
            Course:'',
            Test:'',
            fromMark:'',
            toMark:'',
            State:'',
            Attempts:'',
        }
    },
    methods:{

        //filter for common errors on search values 
        filter(){
            this.errorMark='';
            this.errorAttempt='';
            if(this.fromMark>this.toMark){
                this.errorMark='from mark must be less than to mark'
            }
            if(this.fromMark==NaN||this.toMark==NaN)
            {
                this.errorMark='Not a number'
            }
            if(this.Attempts==NaN)
            {
                this.errorAttempt='Not a number'
            }
            if(this.Attempts<0)
            {
                this.errorAttempt='number not absolute'
            }
        },
        postSearch(){
            this.$http.get('http://localhost:1833/api/markSchedule',
            {
                firstName:this.FirstName,
                surname:this.Surname,
                department:this.Department,
                course:this.Course,
                Test :this.Test,
                fromMark :this.fromMark,
                toMark :this.toMark,
                state :this.State,
                attempts :this.Attempts

            }).then((data)=>{
                
            })
        }
    }
}
</script>
<style>
.textSearch{
    width: 100px;
    border-radius: solid 3px;
    height: 25px;
}
.textSearchNum{
    width: 65px;
    border-radius: solid 3px;
    height: 20px;
}
.textWarning
{
    color:red;
    font-size: 12px;
    margin:0px;
    padding: 0%;
}
</style>

