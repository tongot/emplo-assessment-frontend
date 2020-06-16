<template>
     <b-container>
         <div class="row justify-content-md-center" v-if="loader==true"> 
            <strong>loading..</strong>  <br>
             <font-awesome-icon class="loader" icon="spinner"/> 
             </div>
             <table border="1">
                 <thead>           
                     <td><strong>Test</strong></td>
                     <td><strong>Date Last modified</strong></td>
                     <td><strong>Actions</strong></td>
                 </thead>
                     <tr v-for="(Test,index) in Test">           
                     <td>{{Test.name}}</td>
                     <td>{{Test.dateCreated}}</td>
                     <td>
                         <router-link v-bind:to="'/editTest/'+ Test.TestId">
                            <font-awesome-icon icon="edit"/>
                           </router-link>
                          &nbsp;
                         <a class="btn btn-sm" v-b-modal.modalDelet @click="deleteConfirm(Test.TestId,index)"><font-awesome-icon icon="trash"/></a>
                         </td>
                 </tr>
                 <tr v-if="numberOfPages>1">
                <td colspan="7"> 
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
            </tr>
             </table>

             <!--
                 delete confirm
             -->
            <b-modal id="modalDelet" ref="modalDelete2" title="Are you sure to delete!">
            <div class="divModal">
                <div>
                    <div class="alert alert-danger">{{deleteTestName}}</div>
                    </div>
            </div>
                <div slot="modal-footer" class="w-100">
                    <b-btn variant="danger float-right" @click="deleteTest()">Delete</b-btn>
                    </div>   
        </b-modal>
        </b-container>
</template>
<script>

export default {
    data()
    {
        return{
            numberOfPages:1,
                 Test:[],
                loader:false,
                testDeleteId:'',
                testDeleteIndx:'',
                deleteTestName:'',
        }   
    },
methods:{

    deleteConfirm(id,index)
    {
        console.log(id)
        this.deleteTestName=this.Test[index].name;
        this.testDeleteId=id;
        this.testDeleteIndx=index;
    },
    getPageNumber(page)
    {
        this.getDepartment(page)
    },
     getdata(page)
    {
        this.loader=true;
       this.$http.get('http://localhost:1833/api/Test/'+page).then(function(data){
        this.Test=data.body.obj;
        this.numberOfPages=data.body.numberOfPages;
        this.loader=false;
        this.numberOfItems=this.Test.numberOfItems
       })
       //this.loader=false;
     },
     deleteTest()
     {
         this.$http.delete('http://localhost:1833/api/Tests/'+this.testDeleteId)
         .then(function(date){
             this.Test.splice(this.testDeleteIndx,1);
             alert("delete")
         })
     }
},
created(){
    this.getdata(1);
}
}
</script>
<style>

</style>
