<template>
    <div class="mainDiv">
    <table>
        <thead>
            <td>Course Name</td>
            <td>Test Name</td>
            <td>Employee</td>
            <td>Score</td>
            <td>Attempts</td>
            <td>Pass</td>
            <td>Date Taken</td>
        </thead>
        <tr v-for="report in Reports">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
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
    </table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            Reports:[],
            numberOfPages:'',
        }
    },
    methods:{
        getReport(page){
          this.$http.get('http://localhost:1833/api/Department?pageNumber='+page)
          .then((data)=>{
              this.Reports=data.body.obj;
              this.numberOfPages=data.body.numberOfPages
          })
    },
    getPageNumber(page)
    {
        this.getReport(page)
    }
}
}
</script>
