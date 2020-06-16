<template>
    <div>
        <h3>Overal assesments</h3>
        <table class="table table-sm table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Test name</th>
                    <th>Attempts</th>
                    <th>Attempts left</th>
                    <th>Score %</th>
                    <th>Date Of Last Attempt</th>
                    <th>Course Name</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="report in reports">
                <td>{{report.testName}}</td>
                <td>{{report.attempts}}</td>
                <td>{{report.attemptsLeft}}</td>
                <td>{{report.score}}</td>
                <td>{{report.dateOfLastAttempt}}</td>
                <td>{{report.courseName}}</td>
                <td>
                    <div v-if="report.pass==true" class="badge alert-success">
                         Passed
                    </div>
                    <div v-if="report.attempts>0 && report.pass==false" class="badge alert-danger">
                         Failed
                    </div>
                </td>              
            </tr>
            </tbody>
            
            <loader v-if="loader==true"></loader>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{
                reports:[],
                loader:false,
        }
    },
    methods:{
           getReport(){
               this.loader=true
                this.$http.get('http://localhost:1833/api/reportListWorker')
                .then((data)=>{
                    this.loader=false;
                    this.reports=data.body;
                })
            }
    },
created(){
    this.getReport();
}
}
</script>
<style>

</style>



