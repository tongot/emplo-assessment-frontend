<template>
    <div>
<br>
        <div >
            <div class="row justify-content-between">
                <div class="col-span-8 form-group form-inline">
                    &nbsp;<label for="name">Name*</label>
                        <input v-model="testTitle" id="name" type="text" placeholder="test name" class="form-control"/>
                    &nbsp;<label for="attempts">Attempts*</label>                         
                         <input v-model="testAttempts" id="attemps" type="number" placeholder="attempts" class="form-control"/>
                    &nbsp;<label for="Time">Time*</label>                                                  
                         <input v-model="testTime" type="number" placeholder="Time(Mins)" class="form-control"/>
                          &nbsp;<label for="Time">Minimum mark(%)*</label>                                                  
                         <input v-model="testMini" type="number" placeholder="Mini Mark(%)" class="form-control"/>
                        <button class="btn btn-primary form-control btn-sm" @click="setTest()">Set</button>
                         
                    </div>
            </div>
                    
                </div>
                <hr>
                 <span class="col-4">
                        <button :disabled="btnD" @click="postData()" class="btn btn-success">Save data</button>
                   </span>
        <div class="row">

            <!--Article quetions partition partition-->
            <div class="col-md-6">
                <div class="well sm divTitle">
                    <h6>Article and Questions</h6>
                </div>
                <div>
                        <div v-for="(article,index1) in articles.listOfArticles" style="margin:3;">
                            <!--title of the article-->
                            <strong>
                                <span>Art {{index1+1}}.</span>
                                {{article.title}}
                            </strong>
                                <!--list of questions to be asked-->
                                <table style="width:100%;">
                                <tr v-for="(question,index) in article.warmUpQuestions" style="padding:2px">
                                   <td> 
                                       <button @click="setTestQuestion(article,question,index,index1)" class="btn btn-sm btn-success">Add</button>
                                    </td>
                                    <td>{{question.question}}</td>
                                    </tr>   
                                </table>
                        </div>
                     
                    </div>

                </div> 
                
            <div class="col-md-6">
                 <div class="well sm divTitle">
                    <h6>Questions Selected</h6>
                </div>
                <div>
                    <div v-for="(qn,index) in selectedQuestion" style="padding:2px" class="list-group-item alert-information">
                        <button @click="removeQ(qn,index)" class="btn btn-sm btn-danger">Remove</button>                        
                        {{qn.question}}
                    </div> 
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
            btnD:true,
            currentPage:-1,
            articles:[],
            numberOfItems:0,
            testTitle:'',
            testAttempts:null,
            testTime:null,
            testMini:null,
            Questions:[],
            questionId:[],
            testId:0,
            //object for selected question
           selectedQuestion:[]
        }
    },
    methods:
    {  
        enableSave()
        {
            if(this.selectedQuestion.length<=0)
            {this.btnD= true;}
            else{ this.btnD= false;}
        },
        getArticledata:function()
            {
                this.getdata();
            },

            getArticledata:function()
            {
                this.$http.get('http://localhost:1833/api/articleQuestion/'+this.currentPage).then(function(data){
                this.articles=data.body;
                this.numberOfItems=this.articles.numberOfArticles
                })
            },
            setTestQuestion(questionTest,question,index,index1)
            {   
                if(this.testTitle!="")
                {
                    //add the quetion to savelist 
                   this.articles.listOfArticles[index1].warmUpQuestions.splice(index,1)
                    this.selectedQuestion.push({
                        "testName":this.testTitle,
                        "articleId":questionTest.ArticleId,
                        "questionId":question.warmUpQuestionsId,
                        "Addedby":question.Addedby,
                        "question":question.question,
                        "articlePostion":index1}
                    )
                    //update btn save 
                this.enableSave();
                }else{
                    alert("please set test name first")
                }
 
            },
            setTest(test)
            {
                 if(this.testTitle!=""&&this.testTime!=null && this.testAttempts!=null&&this.testTime>0
                    &&this.testAttempts>0&&this.testMini!=null && this.testMini>50 && this.testMini<=100)
                    {
                        //add the test to the database 
                        this.$http.post('http://localhost:1833/api/Tests/',{
                            name:this.testTitle,
                            time:this.testTime,
                            minimumPassMark:this.testMini,
                            attempts:this.testAttempts
                        }).then(function(data){
                                this.testId=data.body.TestId;
                                    this.getArticledata();
                                }     
                        ).catch (error=>{
                            if(error.data.Message=="0")
                            {
                                alert("test with this title already exist go to edit")
                            }
                        });
                    }
                else{
                        alert("-Enter all required fields with *\n-Make sure Mins, Minimum mark and Attempts are numbers greater than 0\n-Minimum mark is >50<=100")
                     }
            },
            postData()
            {
                //add ids to the questionids array 
                for(var i=0;i <this.selectedQuestion.length;i++)
                {
                    this.questionId.push(this.selectedQuestion[i].questionId)
                }
                //post the data
                this.$http.post('http://localhost:1833/api/testQuestion/',{
                    testId:this.testId, 
                    questionId:this.questionId
                },).then(function(data){
                    alert("Test Created");
                    this.btnD=true;
                    this.testTitle='';
                })
                this.arrayClear();
            },
            removeQ(rm,index){
                //remove question from the savelist
                this.selectedQuestion.splice(index,1);
                //send back question to its og position
                this.articles.listOfArticles[rm.articlePostion].warmUpQuestions.push(
                    {
                        "Addedby":rm.Addedby,
                        "question" : rm.question,
                        "warmUpQuestionsId" :rm.warmUpQuestionsId
                    }    
                );
                //update save btn
                this.enableSave()
            },
            arrayClear()
            {
                this.selectedQuestion=[];
                this.questionId=[];
                this.Questions=[];
                this.articles=[];
            }
           
    },
    created()
    {
        //this.getArticledata();
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
.divDivider
{
    border:gray;
    padding: 2px;
    padding-bottom: 1px;
    border-width: thin;
    border-right-style: solid;
    text-align: center;
    margin: 4px;
}
.divArticleList{
    height:30px; 
    padding:1px
}
.checkbox
{
    align-self:flex-end
}
</style>


