<template>
    <div class="mainDiv">
        <b-form-group class="form-inline alert-info">  
            <b-form-input required v-model="searchValue" id="name"/>   
            <select class="compoBox" v-model="numberToLoad" id="sel1">
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
            </select>  
            <button class="btn btn-sm" @click="search" >search</button>
            <h4 class="badge badge-primary float-right">Employee assessment list</h4>
            <div class="form-group">
         
            </div>
        </b-form-group>
        <div class="">
            <loader v-if="loader==true"/>
            <!--list for the employees-->
            <ul class="list-group">
                <li v-for="employee in Employees" class="list-group-item  list-group-item-success">
                    <h4>{{employee.user.name+" "+employee.user.surname}}</h4>
                    <!--list for courses of user-->
                    <ul class="list-group">
                        <li v-for="course in employee.courses" class="list-group-item  list-group-item-dark">
                            <strong>Course :</strong>{{course.courseId+" "+course.courseName}}
                             <div class="progress">
                                <div
                                class="progress-bar bg-info"
                                role="progressbar"
                                :style="progress(course.complition)"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                ><span class="badge">{{course.complition.toFixed(2)}}% completed</span></div>

                            </div>
                            <ul class="list-group">
                                <li v-for="test in course.Tests" class="list-group-item list-group-item-primary">
                                    <div class="well sm">
                                        <strong>Test :</strong>{{test.name}}
                                        <strong>Attempts :</strong><span class="badge alert-warning">{{test.attempts}}</span>
                                        <strong>Mark :</strong><span class="badge alert-success">{{test.mark}}</span>
                                    </div>
                                   
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <br>
            <center>
                <button @click="prevBtnFunc" class="btn btn-sm btn-success"><font-awesome-icon icon="angle-double-left"/> Prev</button>
                <button @click="nextBtnFunc" class="btn btn-sm btn-success">next <font-awesome-icon icon="angle-double-right"/></button>
            </center>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            searchValue:'',
            numberToLoad:5,
            Employees:[],
            pageNumber:1,
            numberOfPages:1,
            loader:false,
        }
    },
    methods:{
        //progress bar class
        progress(percent){
            return "width:"+percent+"%"
        },
        nextBtnFunc()
        {
            if(this.pageNumber<this.numberOfPages)
            {
                this.pageNumber++;
                getEmployees();
            }
        },
        prevBtnFunc()
        {
            if(this.pageNumber>1)
            {
                this.pageNumber--;
                getEmployees();
            }
        },
        search(){
            this.getEmployees();
        },
        getEmployees()
        {
            this.loader=true;
            this.$http.get("http://localhost:1833/api/asses/"+this.numberToLoad+"?searchValue="+this.searchValue+"&pageNumber="+this.pageNumber)
            .then((data)=>{
                this.Employees=data.body.obj;
                this.numberOfPages=data.body.numberOfPages;
                this.loader=false;
                console.log(this.Employees);
            }),(error)=>{
                elert("error "+error)
            }
        }
    },
    created(){
        this.getEmployees();
    }
}
</script>
<style>
    .compoBox{
        font-size: 16px;
        border-radius: 3px;
        margin-top:2px;
    }
</style>
