<template>
  <div>
    <navigations color="dark"></navigations>
    <div class="breadcrumb"></div>
    <div class="container">
      <router-link class="btn" v-bind:to="'/syllabus/'+course">
        <font-awesome-icon icon="angle-double-left"/>back
      </router-link>

      <button @click="setReport(0,false)" v-if="qNum==-1" class="btn">Start
        <font-awesome-icon icon="play-circle"/>
      </button>
      
      <span
        class="badge float-right timer alert-info"
        v-if="qNum>-1"
      >{{hours}}:{{minutes}}:{{seconds}}</span>

      <div v-if="qNum>-1" class="questionControl">
        <span class="qnNumber">{{qNum+1}}</span>
        <div class="well-qn">&nbsp;
          <span>{{Questions[qNum].Question}}</span>
        </div>
        <ul class="list-group listOfAnswer">
          <li
            v-for="(qn,index) in Questions[qNum].answers"
            @click="selectAnswer(index)"
            class="answerList">
            <font-awesome-icon :icon="qn.Check"/>
            {{qn.answer}}
          </li>
        </ul>
        <div class="row">
          <div class="col-6">
            <button class="btn btn float-left btn-primary" @click="btnPrev">
              <font-awesome-icon icon="angle-double-left"/>Prev
            </button>
          </div>
          <div class="col-6">
            <button class="btn float-right btn-success" @click="btnNext">Next
              <font-awesome-icon icon="angle-double-right"/>
            </button>
          </div>
        </div>
        <div class="well">
          <span>skipped Questions History:</span>
          <button
            style="margin:2px;"
            v-for="skipped in skippedQuestions"
            @click="setQuestion(skipped,true)"
            class="btn btn-sm badge"
          >{{skipped+1}}</button>
        </div>
      </div>
    </div>
    <div class="jumbotron">
      
      <div v-if="qNum>-1" class="progress">
        <div
          class="progress-bar bg-info"
          role="progressbar"
          :style="progress"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ><span>{{progressPercent.toFixed(2)}} % completed</span></div>

      </div>
      <button @click="markBtn" v-if="qNum>-1" class="btn btn-success">Mark</button>
    </div>
    <!--
    modal report before sending 
    -->
    <b-modal id="showmark" ref="showmark" title="Your results">

      <div v-if="loader==true">
              <strong >loading..</strong>
             <font-awesome-icon class="loader" icon="spinner"/>
      </div>
     
             <div v-if="reportMessage!=''" class="alert alert-info">
               {{reportMessage}} 
               <font-awesome-icon icon="check"/>
             </div>
      <div class="">
        <div v-if="timeout==true" class="alert alert-danger">timed out 00:00:00</div>
        <div v-if="report.pass==true" class="showMark alert-success">{{report.Score.toFixed(2)}} % pass</div>
        <div v-if="report.pass==false" class="showMark alert-danger">{{report.Score.toFixed(2)}} % failed</div>
        <div class="badge alert-info">Number of failed questions {{report.NumberOfFailed}}</div>
      </div>
      <div slot="modal-footer" class="w-100">
        <button v-if="Test.attempts>0" class="btn btn-primary btn-sm">You still have a chance to retake
          <font-awesome-icon icon="redo"/>
        </button>
       
      </div>
    </b-modal>
    <!--
       modal warning
    -->
    <b-modal id="warning" ref="messageDialog" title="|Assesment|">
      <div class>
        <div class="alert alert-warning">{{message}}</div>
      </div>
      <div slot="modal-footer" class="w-100">
      </div>
    </b-modal>
    <!--
       time up modal
    -->
    <b-modal id="warning" ref="timeupDialog" title="|Time Up|">
      <div class>
        <div class="alert alert-danger">
          <span>00:00:00</span>
        </div>
      </div>
      <div slot="modal-footer" class="w-100">
        <router-link class="btn btn-primary" v-bind:to="'/syllabus/'+course">Ok</router-link>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    clearInterval(this.intervalId);
    next();
  },
  data() {
    return {
      course: this.$route.query.course,
      testId: this.$route.params.id,
      CourseId: this.$route.params.CourseId,
      message: "",
      progressPercent:0,
      answeredqnIndex:[],
      progress:'',
      qnAnswered:0,
      loader:false,
      reportMessage:'',

      //test objects to hold test data
      Questions: [],
      //question:{},
      Test: {},

      //question navigation variables
      qNum: -1,
      btnNxt: false,
      btnSkp: false,
      skippedQuestions: [],

      //time ticker variables
      hours: "",
      minutes: "",
      seconds: "",
      intervalId: "",
      timeout:false,
      //reporting object variable
      report: {
        ReportId: "",
        CourseId: "",
        TestId: "",
        Score: 0,
        NumberOfFailed: 0,
        answeringBehaviour: "",
        pass: ""
      }
    };
  },
  methods: {
    //get all questions
    getQuestionsForTest() {
      this.$http
        .get("http://localhost:1833/api/getQuestionsToanswer/" + this.testId)
        .then(function(data) {
          //get the test object
          this.Test = data.body;
          //assign questions from test object
          for (let i = 0; i < this.Test.questions.length; i++) {
            this.Questions.push(this.Test.questions[i]);
          }
        }),
        function(error) {
          alert("something happened");
        };
    },
    //set report for the writer
    setReport(index, fromHistoty) {
      this.$http
        .post("http://localhost:1833/api/setReport", {
          CourseId: this.CourseId,
          TestId: this.Test.testId,
          attempts: 1
        })
        .then(data => {
          this.report.ReportId = data.body.ReportId;
          this.report.TestId = data.body.TestId;
          this.report.CourseId = data.body.CourseId;

          console.log(this.report.ReportId);

          if (data.body.attempts == 0) {
            this.message = "Please not that you exhuasted all you chances";
            this.$refs.messageDialog.show();
          } else if(data.body.attempts==-1){
            this.message = "Please not that you have already passed this Test";
            this.$refs.messageDialog.show();
          }else {
            this.setQuestion(index, fromHistoty);
          }
        });
    },
    //post the results of the candidate
    postReport(){
              this.stopClock();
              this.Test.attempts--;
              this.loader=true;console.log(this.report)
              this.$http.put('http://localhost:1833/api/report/'+this.report.ReportId,{
                
                ReportId:this.report.ReportId,
                CourseId:this.report.CourseId,
                TestId:this.report.TestId,
                Score:this.report.Score,
                NumberOfFailed:this.report.NumberOfFailed,
                answeringBehaviour:this.report.answeringBehaviour,
                 pass:this.report.pass
              }).then((data)=>{
                this.loader=false;
                this.reportMessage='test report was successfully posted'
              })
            
    },
//___________________________________________________________________navigation___________________________________
    //set the required question
    setQuestion(index, fromHistoty) {
      this.qNum = index;
      console.log(this.qNum)
      //check if the trigger is not comming from the history buttons
      if (fromHistoty == false) {
        //check if the test is timed
        //if timed start the timer
        if (this.Test.time > 0) {
          this.changeTomillisecond(this.Test.time);
          this.startClock();
        }else{
          
        }
      }
    },
    //btn next
    btnNext() {

       
      if (this.qNum < this.Questions.length-1) {
          
          let hasAnswer=false;
          //progress bar functionality
           for (let i = 0; i < this.Questions[this.qNum].answers.length; i++) {
                
                       if (this.Questions[this.qNum].answers[i].Check == "check") {
                         hasAnswer=true;
                           if(!this.answeredqnIndex.includes(this.qNum))
                           {
                               this.answeredqnIndex.push(this.qNum);
                           }
                        
                    }
                    
        }
        if (hasAnswer==false&&!this.skippedQuestions.includes(this.qNum))
            {
                this.skippedQuestions.push(this.qNum);
            }

        this.qNum++;
      }else{
         let hasAnswer=false;
            for (let i = 0; i < this.Questions[this.qNum].answers.length; i++) {
                
                       if (this.Questions[this.qNum].answers[i].Check == "check") {  
                         hasAnswer=true;
                           if(!this.answeredqnIndex.includes(this.qNum))
                           {
                               this.answeredqnIndex.push(this.qNum);
                           }
                        
                    }

            }

               if (hasAnswer==false&& !this.skippedQuestions.includes(this.qNum))
                 {
                   this.skippedQuestions.push(this.qNum);
                 }
            if(this.skippedQuestions.length==0){
                alert("you have completed all questions press submit to post or do a revision and then post");
                this.progressPercent=100
                this.progress="width:"+this.progressPercent+"%"
            }else{
              
                alert("please recheck your skipped history for");
            }
        }
    },
    //btn prev
    btnPrev() {
      if (this.qNum > 0) {
        this.qNum--;
      }
    },
    //select answer
    selectAnswer(index) {
         console.log(this.qNum)
        let answeredBefore=false
        //check if it was answered before
        for (let i = 0; i < this.Questions[this.qNum].answers.length; i++) {
            if(this.Questions[this.qNum].answers[i].Check=="check")
            {
                answeredBefore=true
            }
        }
        
        //remove question from skipped question history if it was skipped before
        if(this.skippedQuestions.includes(this.qNum))
            {
                for (let s = 0; s < this.skippedQuestions.length; s++) {
                    if(this.skippedQuestions[s]==this.qNum){
                      this.skippedQuestions.splice(s,1)
                    }
                }
            }

        //if the question is being answered first time update progress bar 
        if(answeredBefore==false){
            this.qnAnswered+=1
            
            this.progressPercent=(this.qnAnswered/this.Questions.length)*100
                    
            this.progress="width:"+this.progressPercent+"%"
        }

      //set the answer seleted to selected equals true
      this.Questions[this.qNum].answers[index].selected = true;
      //change the answer maker to check when selected 
      this.Questions[this.qNum].answers[index].Check = "check";

      //set the rest to selected =false and checker to box shape
      for (let i = 0; i < this.Questions[this.qNum].answers.length; i++) {
        if (i != index) {
          this.Questions[this.qNum].answers[i].selected = false;
          this.Questions[this.qNum].answers[i].Check = "square";
        }
      }
      this.btnNxt = false;
    },
//________________________________________________navigation end_________________________________________________

//________________________________________________marking logic__________________________________________________
    // mark the test that has been provided by the user 
    markBtn() {
       //check if all the qustions has been answered 
          if(this.progressPercent<100&& this.timeout==false)
          {
              this.message="You have not completed all questions \n check your skipped question history and answer the remaining Qns"
              this.$refs.messageDialog.show();
          }
          else{
            this.markTest();
            this.$refs.showmark.show();
             this.qNum=-2;
          }
    },
    
    markTest() {
      let numberOfpassed = 0;
      //loop all questions thru to get the answers
      for (let qn = 0; qn < this.Questions.length; qn++) {
        let correct = false;
        //loop all answers per question to get compere the answer selcted and the true answer
        for (let ans = 0; ans < this.Questions[qn].answers.length; ans++) {
          //check if the answer is correct
          if (
            this.Questions[qn].answers[ans].selected ==
            this.Questions[qn].answers[ans].correct
          ) {
            //set the question to be as answered correclty
            correct = true;
          }
        }
        //check question answered correctly
        if (correct == false) {
          //if not raise number of failed
          this.report.NumberOfFailed++;
        } else {
          //raise nmumber of passed
          numberOfpassed++;
        }
        //detamine pass or fail
        let totalMark = (numberOfpassed / this.Questions.length) * 100;

        this.report.Score = totalMark;

        if (totalMark >= this.Test.minMark) {
          this.report.pass = true;
        }

        //-------------------for negetive marking----------------------------------
      }
      this.postReport();
    },
//________________________________________________marking logic end___________________________________________

//________________________________________________timer function_____________________________________________
    //change given mins to hours and minutes
    changeTomillisecond(min) {
      let millisec = min * 60000;

      this.hours = Math.floor(millisec / 3600000);

      this.minutes = Math.floor((millisec - this.hours * 3600000) / 60000);

      this.seconds =(millisec - (this.minutes * 60000 + this.hours * 3600000)) / 1000;
    },
    //count down the clock
    countDown() {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.seconds == 0 && this.minutes > 0) {
        this.minutes--;
        this.seconds += 60;
      } else if (this.minutes == 0 && this.hours > 0) {
        this.hours--;
        this.minutes += 60;
      } else {
          this.stopClock();
          this.timeout=true;
          //this.$refs.timeupDialog.show();
          this.markTest();
          this.$refs.showmark.show();
          this.qNum=-2;

      }
    },
    //start the clock
    startClock() {
      this.stopClock();
      this.intervalId = setInterval(this.countDown, 1000);
    },
    //stop the clock
    stopClock() {
      clearInterval(this.intervalId);
    }
    //________________________________________________timer function end_________________________________________
  },

  created() {
    this.getQuestionsForTest();
  }
};
</script>
<style>
.progress{
    margin: 20px
}
.showMark {
  margin: 20px;
  padding: 10px;
  border-radius: 100%;
  text-align: center;
  font-size: 40px;
}
.answerList {
  padding: 5px;
  margin: 2px;
  border-radius: 5px;
  list-style-type: none;
  color: #ffff;
}
.answerList:hover {
  background-image: linear-gradient(
    to right,
    rgb(183, 214, 183),
    rgb(124, 133, 128),
    rgb(183, 214, 183)
  );
}
.questionControl {
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
  background-image: linear-gradient(
    to right,
    rgb(124, 133, 128),
    rgb(183, 214, 183),
    rgb(124, 133, 128)
  );
}
.listOfAnswer {
  padding-left: 20px;
}
.well-qn {
  font-size: 20px;
  padding-bottom: 10px;
  color: #ffff;
}
.qnNumber {
  border-radius: 100px;
  background-color: #ffff;
  color: #000;
  width: auto;
  padding: 5px;
  float: left;
  font-weight: bold;
}
.timer {
  padding: 5px;
  border-radius: 20px;
  font-size: 25px;
}
</style>

