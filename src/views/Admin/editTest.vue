<template>
    <div>
        <navigations color="info"/>
        <div class="mainDiv">
       <h3><router-link v-bind:to="'/admin/test-ts'"><font-awesome-icon icon="angle-double-left"/></router-link>
           edit test</h3>
       <div>
            <div >
            <div style="margin:5px; border-radius:3px;" class="row justify-content-between">
                <div class="form-group form-inline">
                        <span>Name</span>&nbsp;<input v-model="Test.name" type="text" placeholder="test name" class="form-control"/>                        
                    </div>
                    <div class="form-group form-inline">
                        <span>Time(mins)</span>&nbsp;<input v-model="Test.time" type="number" placeholder="time" class="form-control"/>                        
                    </div>
                     <div class="form-group form-inline">
                        <span>Attempts</span>&nbsp;<input v-model="Test.attempts" type="number" placeholder="time" class="form-control"/>                        
                    </div>
                    <div class="form-group form-inline">
                        <span>Negetive marking</span>&nbsp;
                        <select class="form-control" v-model="Test.negetiveMarking" style="height:35px;" name="" id="">
                            <option value=false :selected="Test.negetiveMarking==='true'">No</option>
                            <option value=true :selected="Test.negetiveMarking==='false'">Yes</option>
                        </select>
                        <!--<input v-model="Test.attempts" type="text" placeholder="test name" class="form-control"/>-->                      
                    </div>
                    <div class="form-group form-inline">
                    <span>Min-mark</span><input v-model="Test.minimumPassMark" type="number" placeholder="minimum mark" class="form-control"/>                    
                    </div>
            </div> 
            <div class="">
                        <button @click="editTest" class="btn btn-success float-right">Edit Test</button>
                   </div>
         </div>
         <hr>
       </div>
       </div>
       <div class="row">
           <div class="col-4">
                <div class="well sm divTitle">
                    <h6>Existing Questios</h6>
                </div>
                <div>
                    <ul>
                        <li class="list" v-for="(qns,index) in QnAssosiated">
                            <button @click="removeExist(index)"  class="btn btn-sm btn-danger">Remove</button>
                            {{qns.question}}
                            </li>
                    </ul>
                </div>
           </div>
           <div class="col-4">
                <div class="well sm divTitle">
                    <h6>Questions To choose from</h6>
                </div>
                 <div>
                    <ul>
                        <li class="list" v-for="(qns,index) in OtherQuestions">
                            <button @click="addFromNewList(index)" class="btn btn-sm btn-success">Add</button>
                            {{qns.question}}
                            </li>
                    </ul>
                </div>
               
           </div>
           <div class="col-4">
                <div class="well sm divTitle">
                    <h6>Questions Removed</h6>
                </div>  
                <div>
                    <ul>
                        <li class="list" v-for="(qns,index) in RemovedQn">
                            <button @click="addBackToExist(index)"  class="btn btn-sm btn-warning">Add Back</button>
                            {{qns.question}}
                            </li>
                    </ul>
                </div> 
           </div>
       </div>
    </div>
</template>

<script>


export default {
    
    data()
    {
         return{
             numberTocollect:0,
             Test:{},
             TestId:this.$route.params.id,
             QnAssosiated:[],
             OtherQuestions:[],
             RemovedQn:[]
        }
    },
    methods:{

        //get the questions that exist already
        getTestDetail(){
            this.$http.get('http://localhost:1833/api/testToedit/'+this.TestId)
            .then(function(data){
                this.Test=data.body.test;
                for (let index = 0; index < data.body.QnAssociate.length; index++) {
                    this.QnAssosiated.push(data.body.QnAssociate[index]);
                }
            }).catch(function (data){
              alert("Load failed "+data.bodyText) 
            }),function(errr){
                alert("Connection Bad");
            }
            console.log(this.QnAssosiated)
        },
        //get the questions that are not on the test already 
        getQuestionsToChoose(){
            if(this.OtherQuestions==[])
            {
                this.numberTocollect=0;
            }else{
               this.numberTocollect= (this.OtherQuestions.length)
            }
             this.$http.get('http://localhost:1833/api/OtherQuestions/'+this.TestId+'/'+this.numberTocollect)
            .then(function(data){
                for (let index = 0; index < data.body.length; index++) {
                        this.OtherQuestions.push(data.body[index])
                    }
                if(this.OtherQuestions==[]||this.OtherQuestions==null)
                {
                    alert("no more questions found")
                }
            }).catch(function (data){
              alert("Load failed"+data.bodyText) 
            }),function(errr){
                alert("Connection Bad");
            }
            console.log(this.OtherQuestions)
        },
        //post questions after eddit()
        postTest(){
             this.$http.put('http://localhost:1833/api/testEdit/'+this.TestId,{
                 test:this.Test,
                 QnAssociate:this.QnAssosiated
             })
            .then(function(data){
                alert("data edited succesfuly")
                this.$router.push('/admin/test-ts')
            }).catch (error=>{
                if(error.data.Message=="0")
                {
                    alert("test with this title already exist try another name")
                }
                alert("failed to save\n make sure your connected \n Your time is in minutes \n Your passmark is between 100 and 0");
            })
            ,function(errr){
                alert("Connection Bad");
            }

        },
        editTest()
        {
            console.log(isNaN(this.Test.minimumPassMark))
            console.log(this.Test.time)

            if(this.Test.time<0||this.Test.minimumPassMark<0||this.Test.minimumPassMark>100){
                alert("please not that time  and pass mark are numbers greater or equal to zero \n pass mark is a pecentage within 100%")
                return;
            }if(this.Test.name=='')
            {
                alert("please insert name for test")
                return;
            }
            this.postTest()
        },
        //remove test from existing list
        removeExist(index){
            this.RemovedQn.push(this.QnAssosiated[index]);
            this.QnAssosiated.splice(index,1);  
        },
        //and from the otherquestions to the exist
        addFromNewList(index){

            this.QnAssosiated.push(this.OtherQuestions[index]);
            this.OtherQuestions.splice(index,1);
        },
        //add back to the existing
         addBackToExist(index){
            this.QnAssosiated.push(this.RemovedQn[index]);
            this.RemovedQn.splice(index,1);
        }
    },
    created()
    {
       this.getTestDetail();
       this.getQuestionsToChoose();
    }
}

</script>
<style>
.divTitle{
    background-color:#ffff;
    border:gray;
    padding: 5px;
    padding-bottom: 1px;
    border-width: thin;
    border-style: solid;
    text-align: center;
    border-radius: 4px;
    height: 30px;
    margin: 4px;
}
</style>
