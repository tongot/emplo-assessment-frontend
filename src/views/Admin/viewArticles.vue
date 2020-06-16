
<template>
  <div>
    <hr>
     <b-form-group class="form-inline alert-info">    
             <input type="radio" value="compiledBy" name="category" v-model="category">&nbsp;
                Compiled by &nbsp;
                <input type="radio" name="category" value="title" v-model="category">&nbsp;
                Title
            <b-form-input required v-model="searchValue" id="name"/>
            <button class="btn btn-sm" @click="search">search</button>&nbsp;
            <loader v-if="loader==true"></loader>
        </b-form-group>
   <div>
     <div class="row">
     <div :class="col1">
        <table border="1">
                 <thead>   
                   <td><strong>Article Number</strong></td>        
                     <td><strong>Article title</strong></td>
                     <td><strong>Compiled by</strong></td>
                     <td><strong>Date modified</strong></td>
                     <td></td>
                     
                 </thead>
                     <tr v-for="(article,index) in articles">    
                     <td>{{article.ArticleId}}</td>
                     <td>{{article.title}}</td>
                     <td>{{article.articleBy}}</td>
                     <td>{{article.dateAdded.slice(0,10)}}</td>
                     <td>
          
                         <b-dropdown style="height:33px; padding:2px;">
                           <template slot="button-content">
                             <em>Actions</em>
                            </template>
                        <b-dropdown-item> <b-button class="tableBtn" size="sm" @click="getQuestionById(article.ArticleId)">view questions</b-button></b-dropdown-item>
                         <b-dropdown-item><router-link v-bind:to="'/editArt/'+ article.ArticleId">
                            <font-awesome-icon icon="edit"/> edit
                           </router-link></b-dropdown-item>
                         <b-dropdown-item><b-button class="tableBtn" @click="setId(article.ArticleId,article.title)" v-b-modal.modalCorfirmDelete  size="sm"><font-awesome-icon icon="trash"/> delete</b-button> </b-dropdown-item>
                         <b-dropdown-item><b-button class="tableBtn" @click="setId(article.ArticleId,article.title)"  v-b-modal.modalUploadvideo  size="sm"><font-awesome-icon icon="play-circle"/> upload video</b-button></b-dropdown-item>
                         <b-dropdown-item><b-button class="tableBtn" @click="setId(article.ArticleId,article.title)"  v-b-modal.modalUploadfile  size="sm"><font-awesome-icon icon="file-upload"/> upload file</b-button> </b-dropdown-item>
                         <b-dropdown-item><b-button class="tableBtn" @click="setId(article.ArticleId,article.title)"  v-b-modal.addQuastion  size="sm">Add Qn</b-button></b-dropdown-item>
                         
                         </b-dropdown>
                         <button  v-if="article.publish==0 && roles.includes('Admin')" v-b-modal.modalCorfirmPublish @click="publishing(1,index,article.ArticleId)" class="btn btn-sm">publish</button>
                         <button  v-if="article.publish==1 && roles.includes('Admin')" v-b-modal.modalCorfirmPublish @click="publishing(0,index,article.ArticleId)" class="btn btn-sm">unpublish</button>
                  </td>
                 </tr>
                 <tr >
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
                 </tr>
             </table>
     </div>
     <div :class="col2" v-if="showQn==1">
          <table class="table">
                 <thead>
                   <th>Question</th>
                   <th>Action</th>
                   <th><span class="pull-right">
                     <button @click="Close" class="btn btn-sm btn-danger">close</button></span></th>
                 </thead>
                 <tr v-for="(qn,index) in questions">
                   <td>{{qn.question}}</td>
                   <td><button @click="deleteAddedQn(qn.warmUpQuestionsId,index)" class="btn btn-danger btn-sm"><font-awesome-icon icon="trash"/></button></td>
                 </tr>
               </table>
     </div>
   </div>
   </div>



<!--modals ans others -->
  <div>
<!--DELETE modal here-->
    <div>
      <b-modal @shown="clear" ref="modalDelete" id="modalCorfirmDelete" title="delete" @ok="handleOk">
        <b-container>
            <div class="alert alert-warning" v-if="deleteMessage!=''">{{deleteMessage.title
              +" "+"was deleted"}}</div>
            <p variant="information">Are you sure you want to delete article <s>{{ArtcleTitle}}</s></p><br/>
        </b-container>
        <div v-show="deleteMessage==''" slot="modal-footer" class="w-100">
            <b-btn variant="danger" right @click="deleteArticle">Yes</b-btn>
        </div>
      </b-modal>
    </div>
   

  </div> 
  <!--upload file modal here-->
 <div>
      <b-modal @shown="clear" id="modalUploadfile" title="Upload a file for article" @ok="handleOk">
        <b-container>
            <div class="alert alert-warning"  v-if="uploadMessage!=''">{{uploadMessage}}</div>
            <b-form-file v-model="file" accept=".pdf,.docx,.doc"  placeholder="select a file to upload"/>
        </b-container>
        <div slot="modal-footer" class="w-100">
            <b-btn variant="success" @click="uploadFile('file')"><font-awesome-icon icon="file-upload"/> Upload file</b-btn>
        </div>
      </b-modal>
    </div>


    <!--upload a video to the server-->
     <div>
      <b-modal @shown="clear" id="modalUploadvideo" title="Upload a video for the article" @ok="handleOk">
        <b-container>
            <div class="alert alert-warning"  v-if="uploadMessage!=''">{{uploadMessage}}</div>
            <b-form-file v-model="file" accept=".mp4"  placeholder="select a video to upload"/>
        </b-container>
        <div slot="modal-footer" class="w-100">
            <b-btn variant="success" @click="uploadFile('video')"><font-awesome-icon icon="file-upload"/> Upload file</b-btn>
        </div>
      </b-modal>
    </div>

<!--add question to the article-->
    <div>
      <b-modal @shown="clear" id="addQuastion" title="Add Session Questions">
        <b-container>
           <div>
              <div class="input-group mb3">
                <input v-model="question" type="text" class="form-control" placeholder="Enter question" aria-placeholder="Enter question"
                aria-describedby="basic-addons2">
                <button @click="validateAddQuestion" class="btn btn-primary btn-outline-secondary" type="submit">Add</button>
              </div>
           </div>
           <div>
               <table>
                 <thead>
                   <th>Added question</th>
                   <th>Action</th>
                 </thead>
                 <tr v-for="(qn,index) in questions">
                   <td>{{qn.question}}</td>
                   <td>
                     <div class="float-right">
                       <button @click="deleteAddedQn(qn.warmUpQuestionsId,index)" class="btn btn-danger btn-sm"><font-awesome-icon icon="trash"/></button>
                      <button v-b-modal.addAnswers @click="getQnId(qn.warmUpQuestionsId,qn.question)" class="btn btn-warning btn-sm">answers</button>
                     </div>
                      </td>
                   <td></td>
                 </tr>
               </table>
           </div>
        </b-container>
        <div slot="modal-footer" class="w-100">
          
        </div>
      </b-modal> 
      </div>
    <!--
      add answers to the article
    -->
    <div>
          <b-modal id="addAnswers" title="Add answers">
            <h6>{{questionToaddAnswer}}?</h6>
            <b-container>
              <div class="form-group">
                  Answer
                  <input class="form-control from-group-item" v-model="Answer"  type="text"/>
                  Score
                  <div class="form-inline justify-content-between">
                    <input v-model="Score" class="form-control form-group-item" type="number"/>
                    <button @click="answerToSaveList" class="btn btn-primary float-right">Add answer</button>
                  </div> 
              </div>
              <div class="form-inline">
                  <table>
                    <tr v-for="(answer,index) in answers">
                      <td>{{answer.answer}}</td>
                      <td>{{answer.score}}</td>
                      <td>
                        <input type="radio" @change="check(index)" :checked="answer.correct" name="rad" v-model="answer.correct" :value="true">
                      </td>
                      
                      <td>
                        <button @click="removeQn(index)" class="btn  btn-sm btn-warning float-right">Remove</button>
                      </td>
                    </tr>
                  </table>
              </div>
            </b-container>
            <div slot="modal-footer" class="w-100">
                <b-button class="btn-sm btn"  v-b-modal.addQuastion >Back</b-button>
                <button class="btn-success btn btn-md float-right" @click="checkAnswerValidit">save</button>
            </div>
          </b-modal>
        </div>

        <!--
          publishing confirm
        -->
        <div>
      <b-modal id="modalCorfirmPublish" ref="publishModal" title="Confirm" @ok="handleOk">
        <b-container>
            <div class="alert alert-warning" v-if="publish==1">
              <h4>are you sure you want to publish this article</h4>
            </div>
             <div class="alert alert-warning" v-if="publish==0">
              <h4>are you sure you want to unpublish this article</h4>
            </div>
        </b-container>
        <div v-show="deleteMessage==''" slot="modal-footer" class="w-100">
            <b-btn variant="danger" right @click="postPublish">Yes</b-btn>
        </div>
      </b-modal>
    </div>
  </div>
  
  
  
</template>


<script>
import axios from 'axios'
 export default {
data(){
  return{
    active:'disabled',
    currentPage:1,
    numberOfPages:0,
    id:null,
    file:null,
    deleteMessage:'',
    uploadMessage:'',
    selectedFile:null,
    articles:[],
    publish:0,
    setPublish:0,
    category:'title',
    searchValue:'',
    loader:true,
    //question variables
    question:null,
    questions:[],

    //answers variables
    Answer:'',
    Score:'',
    questionId:'',
    answerCorrect:true,

    answer:{
      warmUpQuestionsId:'',
      answer:'',
      score:'',
      correct:''
    },
    answers:[],
    questionToaddAnswer:"",
    //view controls
    col1:"col-md-12",
    col2:"col-md-0",
    showQn:0,
    ArtcleTitle:'',
  }
},
methods:{

//set the article to publish
  publishing(v,index,id)
  {
    this.id=id;
    this.setPublish=index;
    if(v==1)
    {
      this.publish=1;
    }
    else{
      this.publish=0;
    }
  },
//post article to publish
  postPublish()
  {
     //post delete
        this.$http.post('http://localhost:1833/api/Publish/'+this.id+'?publish='+this.publish,{
        }).then(function(data){
          this.deleteMessage=data.body;
          this.$refs.publishModal.hide();
          this.articles[this.setPublish].publish=this.publish;
        }),function(){
          alert("could not Publish the article ")
        }  
  },
  //run wen page number changes
  getPageNumber(page){
    this.currentPage=page;
    this.getdata();
  },
  //
  search(){
    this.getdata();
  },
  //function to get data
  getdata:function()
  {
    this.loader=true,
      this.articles=[]
       this.$http.get('http://localhost:1833/api/Articlesd/'+this.currentPage+'?searchValue='+this.searchValue+'&category='+this.category)
       .then(function(data){
        this.articles=data.body.obj;
        this.numberOfPages=data.body.numberOfPages;
        this.loader=false;
    }),function(error){
      this.loader=false;
      alert("something happen try reloading page")
    }
  },
  //funtion to delete added questions
  deleteAddedQn(id,index)
  {
      this.$http.delete('http://localhost:1833/api/warmUpQuestions/'+id)
      .then(data=>{
        try{
          this.questions.splice(index,1);
        }catch(e){
          this.questions.questions.splice(index,1);
        } 
      }),error=>{
        alert('delete failed '+error)
      }
  },

//delete function on modal
      deleteArticle:function()
      {
        //post delete
        this.$http.delete('http://localhost:1833/api/Articles/'+this.id).then(function(data){
          this.deleteMessage=data.body;
         this.getdata();
        }),function(){
          alert("could not delete the article ")
        }
      },
      //set the id of item to delete
      setId:function(id,title)
      {
          this.ArtcleTitle=title;
          this.id=id;
          this.loadQnForArticle(id);
      },
      //reset after delete
      handleOk:function()
      {
        this.id=null;
        this.deleteMessage='';
      },
      clear()
      {
        this.deleteMessage='';
        this.file=null;
        //this.id=null;
        this.question=null
        //this.questions=[]
      },
      
      //upload file function
      uploadFile(fileType)
      {
        
        let url=fileType!='video'?'http://localhost:1833/api/Files/fileUpload':'http://localhost:1833/api/video/videoUpload';
        if(this.file==null)
        {
          return this.uploadMessage="please select file to upload"
        }
        this.uploadMessage="Uploading please wait..."
        const formD=new FormData()
        formD.append("document",this.file,this.file.name)
        formD.append(this.id,"")

          this.$http.post(url,formD).then(function(data)
          {
              this.file=data.body
              this.uploadMessage=this.file.fileName+" file uploaded"
              this.file=null;
          }).catch((data)=>{
            this.uploadMessage=data.bodyText
          }),function(error)
          {
            this.uploadMessage=this.file.fileName+" file upload ,failed"
              alert("failed to load the document "+error)
          }
      },
      // questions
          //validate form 
          validateAddQuestion()
          {
            if(this.question==null)
            {
              alert('please enter some question')
                return;
            }else{
              this.AddQuestion();
            }
          },
          //post question to the api
          AddQuestion()
          {
              this.$http.post('http://localhost:1833/api/warmUpQuestions',
                {
                  question:this.question,
                  articleId:this.id
                }
              ).then(function(data){
                this.question=data.body;
                this.questions.push(this.question)

              this.question=null;
              }),function(error){
                alert('faild to add question '+error)
              }
          },
          //get questions by id
          getQuestionById(id)
          {
            this.col1="col-md-6";
            this.col2="col-md-6";
            this.showQn=1;
            this.loadQnForArticle(id);
          },
          loadQnForArticle(id)
          {
             this.$http.get('http://localhost:1833/api/warmUpQuestions/ArticleQn/'+id)
            .then(data=>{
              this.questions=data.body.questions
            }),error=>{
              alert('failed to get data')
            }
          },
          //close the question view
          Close(){
            this.col1="col-md-12";
            this.col2="col-md-0";
            this.showQn=0;
          },
          //adding aswers section 
          getQnId(qnId,qn)
          {
            this.questionToaddAnswer=qn;
            this.questionId=qnId;
            this.getAnswersFromQn();
          },
          //save list to sent
          answerToSaveList()
          { 
            if(this.Answer==''||this.Score=='')
            {
              alert("Note: Answer and Score are both required fields")
            } 
            else{
                this.answers.push(
                {
                  'warmUpQuestionsId':this.questionId,
                  'answer':this.Answer,
                  'score':this.Score,
                  //'correct':this.answer.correct
                });
              //clear text box
              this.Answer='';
              this.Score='';
            }       
            
          },
          postAnswers()
          {
            if(this.answers.length>5)
            {
              alert("Only a maximum 5 answers is allowed, Remove some");
            }
            else{
               this.$http.post('http://localhost:1833/api/Answers',{
               answers:this.answers,
               questionId:this.questionId,
               }
               ).then(function(data){
                alert('done')
             })
            }
           
          },
          getAnswersFromQn()
          {

             this.$http.get('http://localhost:1833/api/answerFor/'+this.questionId
            ).then(function(data){
              this.answers=[];

              for(var i,i=0;i<data.body.length;i++)
              {
                
                this.answer.warmUpQuestionsId=data.body[i].warmUpQuestionsId;
                this.answer.answer=data.body[i].answer;
                this.answer.score=data.body[i].score;
                this.answer.correct=data.body[i].correct;
                this.answers.push(this.answer)
                this.answer={};
              }

                });
                
              },
          removeQn(index)
          {
            this.answers.splice(index,1)
          },
          checkAnswerValidit()
          {

            var largest= this.answers[0].score;
            var index=0;
            var topNumber=[];
            var crr=''

            for(var i,i=1;i<this.answers.length;i++){
              if(largest<this.answers[i].score)
              {
                largest=this.answers[i].score;
                crr=this.answers[i].correct;
                index=i
              }
             
            } 
            //check if the count of top numbers i greater than 2
            for(var i,i=0;i<this.answers.length;i++)
            {
              if(this.answers[i].score==largest)
              {
                topNumber.push(largest);
              }
            }
            //CHECK answer integrity  SELECION
            if(this.answers[index].correct!=true||topNumber.length>1){
                alert('please select you correct answer\n NOTE:\n The correct answer should have the highest point\n Only 1 question can have top point')
              topNumber=[];
              }else{
                this.postAnswers();
              }
          },
          check(index){

            this.answers[index].correct=true;
              for(var i,i=0;i<this.answers.length;i++)
              {
                if(i!=index)
                {
                  this.answers[i].correct=false;
               }
              }
          },
},
computed:{
 roles(){
   return this.$store.state.role;
 }
},
//get data on create
created(){
  
 this.getdata();
}
 }
</script>

<style>
.tableBtn
{
  background: transparent;
  color: gray;
  border: 0;
}

</style>