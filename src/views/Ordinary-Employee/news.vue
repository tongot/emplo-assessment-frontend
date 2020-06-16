<template>
    <div>
     
    </div>
</template>

<script>


export default {
    
   /* data()
    {
         return{
            //testId:this.$router.params.id,
            Questions:[],
            question:{},
            qNum:-1,
            btnNxt: true,
            btnSkp:false,
            skippedQuestions:[]
        }
    },
    methods:{
        //get all questions
        getQuestionsForTest(){
            this.$http.get('http://localhost:1833/api/getQuestionsToanswer/5009')
            .then(function(data){
                for (let i = 0; i < data.body.questions.length; i++) {
                    this.Questions.push(data.body.questions[i])
                }
            
            }),function(error){
                alert("something happened");
            }
        },

   //set the required question
    setQuestion(index)
    {
        this.qNum=index;
    },
    //btn next
    btnNext(){

        if(this.qNum<this.Questions.length-1){
            this.qNum++; 
            this.btnNxt=true;
            this.btnSkp=false;
        }
    },
    btnSkip(){

        if(this.qNum<this.Questions.length-1){

            if(!this.skippedQuestions.includes(this.qNum)){
                 this.skippedQuestions.push(this.qNum)
            }
            this.qNum++; 
            this.btnNxt=true;
            this.btnSkp=false;  
        }
    },
    //btn prev
    btnPrev(){
        if(this.qNum>0){         
            this.qNum--;
           
        }
    },
    //select answer
    selectAnswer(index)
    {
      this.btnSkp=true;

        this.Questions[this.qNum].answers[index].selected=true;
        this.Questions[this.qNum].answers[index].Check="check";
      for (let i = 0; i < this.Questions[this.qNum].answers.length; i++) {
           if(i!=index)
           {
               this.Questions[this.qNum].answers[i].selected=false;
               this.Questions[this.qNum].answers[i].Check="square";
           }
      }
      this.btnNxt=false;
      
    }
    },
   
    created()
    {
       this.getQuestionsForTest();
    }*/
}

</script>
<style>
    .answerList{
        padding: 5px;
        margin: 2px;
        border-radius: 5px;
        list-style-type:none;
        color: #ffff
    }
    .answerList:hover{
        background-image:linear-gradient(to right,rgb(183, 214, 183),
         rgb(124, 133, 128)
         ,rgb(183, 214, 183));
    }
    .questionControl{
        margin: 10px;
        border-radius: 5px;
        padding: 10px;
        background-image:
        linear-gradient(to right, rgb(124, 133, 128) ,
         rgb(183, 214, 183) 
         ,rgb(124, 133, 128));
    }
    .listOfAnswer{
        padding-left: 20px;
    }.well-qn
    {
        font-size: 20px;
        padding-bottom: 10px;
        color:#ffff;
    }
    .qnNumber
    {
        border-radius: 100px;
        background-color: #ffff;
        color:#000;
        width: auto;
        padding:5px;
        float: left;
        font-weight: bold
    }

</style>

