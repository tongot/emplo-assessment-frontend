<template>
<!--home start-->
<div>
    <navigations color="success"></navigations>
<!--article section-->
<div class="breadcrumb container">
        <div class="breadcrumb-item"><router-link v-bind:to="'/DashUser'"><font-awesome-icon icon="home"/> Menu</router-link></div>
            <div class="breadcrumb-item">
                <button class="btn btn-sm" v-b-modal.test @click="getTestsForCourse">Assesments</button>
            </div>
             <div class="breadcrumb-item">
                <button class="btn btn-sm">Leave a comment<div class="badge">0</div></button>
            </div>
            <div class="breadcrumb-item">
            <button v-if="videoPlaying==true" class="btn btn-sm float-right btn-danger" @click="playOff"><font-awesome-icon icon="play-circle"/>close video</button>
            </div>
    </div>
    <div class="row">
        <div class="col-md-1">

        </div>
        <div class="col-md-8">

      <div v-if="videoPlaying==false">

      <div class="topic">
        <center v-if="articles.length>0"><h1>{{title}}</h1></center>
        <center v-if="articles.length==0"><h1>No Articles</h1></center>
      </div>

      <!--div content for the article-->
    <div v-if="articles.length>0">
        <loader v-if="loader2==true"/>
        <div class="divContent">
            <span v-html="articleToShow"></span>
        </div>
    </div>

    <br/>
    <!--pagination here-->
    <div v-if="articles.length>0" class="pagination">
        <a @click="goPrevFnc()">&laquo;</a>
        <a  v-for="(art,index) in articles" :class="art.active" @click="viewArticle(index)">{{index+1}}</a>
        <a @click="goNextFnc()">&raquo;</a>
    </div>
 <!--comments likes and votes-->
    <br>
    <div>
         <div>
            <button class="btn btn-sm" v-b-modal.modalAddComment>comments<div class="badge">
                <strong>{{comments.length}}</strong>
                </div></button>
            
            <button class="btn btn-sm"> 
                <font-awesome-icon class="float-left" icon="thumbs-up"/><div class="badge">0</div>
            </button>
            <button class="btn btn-sm">
                 <font-awesome-icon class="float-left" icon="thumbs-down"/><div class="badge">0</div>
            </button>

        </div>
    </div>
    
    <br>
<!--comment section -->
    <div>

    </div>
        <ul class="list-group">
            <li class="list-group-item" v-for="comment in comments">
                <div class="badge">{{comment.commentedBy}}</div>
                <div style="margin-left:20px;">{{comment.comment}}</div>
                <span class="float-right" style="font-size:10px"><i>{{comment.dateCommented}}</i></span><br>
                <button class="btn btn-sm float-right">Reply</button>
            </li>
        </ul>
    </div>

    <!--vedio playing div -->
    <div v-if="videoPlaying==true">
        <xgplayer :options="playerOptions"></xgplayer>
    </div>

    
    
        </div>
        <div class="col-md-3" v-if="videoPlaying==false" >
            <ul class="list-group" style="margin-right:8px">
                <li class="badge alert alert-success">Documents</li>
                <a  v-for="doc in docs" :href="doc.downloadLink" target="_blank" @click="download(doc.downloadLink)" class="list-group-item">{{doc.fileName}}</a>
            </ul>
                <br>
            <ul class="list-group" style="margin-right:8px">
                <li class="badge alert alert-primary">Videos</li>
                <li v-for="video in videos" class="list-group-item">
                    <button class="btn btn-sm" @click="PlayVideo(video.FileId)">
                        <font-awesome-icon icon="play-circle"/>
                    </button>

                {{video.fileName}}</li>
            </ul>

            </div>
        </div>

<!--
    modal for test viewing 
-->
   <b-modal id="test" title="Test available for this caurse">
       <loader v-if="loader==true"/>
       <div class="">
       <div>
           <ul class="list-group">
               <li class="list-group-item" v-for="test in Tests">
                   <div class="list-group-item">
                       <span>{{test.name}}</span>
                       <router-link  v-bind:to="'/testAssesment/'+test.TestId+'/'+CourseId+'?course='+title+'/'+CourseId" class="float-right btn-sm btn-success btn">start</router-link>
                       <span v-if="test.attempts>0" class="float-right badge alert-warning">Time: {{test.time}} Mins</span>
                       <span class="float-right badge alert-success">Attempts left: {{test.attempts}}</span>
                   </div>
               </li>
           </ul>
       </div>
       
       </div> 
       <div slot="modal-footer" class="w-100">
            
        </div>
   </b-modal>

<!--
    modal for comment posting  
-->
<b-modal id="modalAddComment" title="Post Your Comment">
       <div>
           <div class="alert alert-info" v-if="postRespond!=''">{{postRespond}}</div>
           <b-form>
                   <b-form-group label="Comment" label-for="comment">
                       <textarea class="form-control" v-model="comment.comment" required id="comment"/>
                   </b-form-group>
               </b-form>
               </div>
            <b-btn variant="success" @click="postComm()">Post</b-btn>
   </b-modal>
</div>
</template>

<script>


export default {

    data()
    {
        return{

            playerOptions: {
                url: '',
                width: '100%' // Depends on its wrapper element.
      },
            title:this.$route.params.course,
            CourseId:this.$route.params.id,
            articleToShow:'',
            currentPage:0,
            Tests:[],
            comments:[],
            videoPlaying:false,
            panelActive:0,
            postRespond:'',
            comment:{
                ArticleId:'',
                comment:''
            },

            article:{
                title:'',
                article:'',
                ArticleId:'',
                active:''
            },
            //navigations
             menuValues:[
                {"name":"Modules","lclass":"linkVisited"},
                {"name":"Assesments","lclass":"sideLink"},
            ],
            articles:[],
            //attachments
            docs:[],
            videos:[],
            files:[],

            //loaders 
            loader:false,
            loader2:false, 
        }
    },

    methods:
    {
        //set the url and play video
            PlayVideo(id){
                this.playerOptions.url="http://localhost:1833/api/videoPlayer/"+id;
                this.videoPlaying=true;
            },
            //revert back to the article view
            playOff(){
                this.videoPlaying=false;
            },
            //function to download
            download(link){
                var popout = window.open(link);
                window.setTimeout(function(){
                    popout.close();
                }, 2000);
                },
            getTestsForCourse(){

                this.loader=true;
            this.$http.get('http://localhost:1833/api/getTestForCourse/'+this.CourseId)
            .then(function(data){
                this.loader=false;
                this.Tests=data.body;
            }),function(error){
                alert("connection failed"+error)
            }
            },
            //get articles to diplay 
            getArticles()
            {
                this.loader2=true;
                this.articles=[]
                this.$http.get('http://localhost:1833/api/ArticlesForCourse/'+this.$route.params.id).then(function(data){
                    this.loader2=false;
                    for(var i,i=0;i<data.body.length;i++)
                    {
                        this.article.article=data.body[i].article,
                        this.article.title=data.body[i].title,
                        this.article.ArticleId=data.body[i].ArticleId
                        this.article.active=''
                        if(i==0)
                        {
                            this.articleToShow=data.body[i].article
                            this.article.active='active'
                            this.comment.ArticleId=data.body[i].ArticleId
                            this.getComments()
                            this.getFiles(data.body[i].ArticleId)
                        }
                        
                        this.articles.push(this.article)
                        this.article={}
                    }
            })
            },
            //view the article selected 
            viewArticle(index){
                this.currentPage=index;
                
                this.articleToShow=this.articles[index].article;
                
                //laod article based material 
                this.videos=[];
                this.docs=[];
                this.getFiles(this.articles[this.currentPage].ArticleId)
                this.comment.ArticleId=this.articles[this.currentPage].ArticleId
                this.getComments();


                for(var i,i=0;i<this.articles.length;i++)
                {
                    if(i==index){
                        this.articles[i].active='active';
                    }else
                    {
                        this.articles[i].active='';
                    }   
                }

            },
            //trigges the next button function
            goNextFnc(){
                console.log(this.currentPage)

                if(this.currentPage<(this.articles.length-1)){
                    this.currentPage ++;

                    this.articleToShow=this.articles[this.currentPage].article;
                    
                    //load article based material 
                    this.videos=[];
                    this.docs=[];
                    this.comment.ArticleId=this.articles[this.currentPage].ArticleId
                    this.getComments();


                    this.getFiles(this.articles[this.currentPage].ArticleId)

                    for(var i,i=0;i<this.articles.length;i++)
                        {
                            if(i==this.currentPage){
                                this.articles[i].active='active';
                            }else
                            {
                                this.articles[i].active='';
                            }   
                    }

                }
                
            },
            //triggers the previous button
            goPrevFnc(){
                console.log(this.currentPage)

                if(this.currentPage>0){
                    this.currentPage --;
                    console.log(this.currentPage)
                    this.articleToShow=this.articles[this.currentPage].article;

                    //load article base materials
                    this.videos=[];
                    this.docs=[];
                    this.getFiles(this.articles[this.currentPage].ArticleId)
                    this.comment.ArticleId=this.articles[this.currentPage].ArticleId
                    this.getComments();

                    for(var i,i=0;i<this.articles.length;i++)
                        {
                            if(i==this.currentPage){
                                this.articles[i].active='active';
                            }else
                            {
                                this.articles[i].active='';
                            }   
                    }

                }
                
            },
            //highlights the active button on article reading 
            changeClass(index,component){
                    this.component=this.menuValues[index].component;
                    for (let i = 0; i < this.menuValues.length; i++) {
                        if(index==i)
                        {
                            this.menuValues[i].lclass="linkVisited"
                        }else{
                            this.menuValues[i].lclass="sideLink"
                        }
                    }
                },
            getFiles(id)
            {
            this.$http.get('http://localhost:1833/api/Filesd/'+id).then(function(data){
                this.files=data.body.files;
                    for (let i = 0;i < this.files.length;i++) {
                        if(this.files[i].fileExt=='video'){
                            
                            this.videos.push(this.files[i])
                        }else if(this.files[i].fileExt=='document'){
                            this.files[i].downloadLink="http://localhost:1833/api/Files/downloads/"+this.files[i].FileId
                            this.docs.push(this.files[i])
                        }
                    }
                
            }),function(err)
            {
                alert("something happened "+err)
            }
            },
            getComments(){
                 this.$http.get('http://localhost:1833/api/comments/'+this.comment.ArticleId)
                 .then((data)=>{
                 this.comments=data.body
            }),function(err)
            {
                alert("failed to load comments "+err)
            }
            },
            //post the comment 
            postComm(){
                this.postRespond="prossesing your post...";
                this.$http.post('http://localhost:1833/api/comments',{
                    comment:this.comment.comment,
                    ArticleId:this.comment.ArticleId
                }).then((data)=>{
                    console.log(data.body)
                    this.loader=false;
                    this.employees=[];
                    this.postRespond="posted"
                    this.postRespond=''
                    this.comment.comment=''
                    this.comments.push(data.body)
                    console.log(this.comments)
                })/*.catch((error)=>{
                    alert('error '+error)
                }),(error)=>{
                    alert("connection error "+error)
                }*/
            },
    },
        
    created()
    {
        this.getArticles();
    }
}
</script>
<style>
/*for rendering article html from database*/
.ql-align-justify{
    text-align: justify;
}
.ql-align-center{
    text-align: center;
}
.ql-align-end{
    text-align: end
}
.ql-align-right{
    text-align: right;
}
.ql-align-left{
    text-align: left;
}
.ql-video{
    width: 100%;
    height: 50%;
}

.topic{
    padding: 3px;
    background-color: #dae5dd;
    border-radius: 5px
}
.btnLink{
    margin: 2px;
    background-color: #2db854;
    font-size: 18px;
    color: #ffff
}
img{
    max-height: 500px;
    max-width: 500px;
}
/*style for the content loaded */
.divContent
{
    width: auto;

    border: 1px 0px 1px 1px solid #2db854;
    padding: 20px;
    height: 800px;
    max-height: 800px;
    overflow-y:scroll; 
    box-shadow: 0 10px rgba(0, 0,0, 0.3);
}
/*content loader scroll bar */
.divContent::-webkit-scrollbar{
    width: 12px;
    height: 12px;
}
.divContent::-webkit-scrollbar-track{
    border: 1px solid #2db854;
    border-radius: 10px;
}
.divContent::-webkit-scrollbar-thumb{
    background: #2db854;
    border-radius: 10px;
}
/*pagination for the article*/

.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
}

.pagination a:hover:not(.active) {
    background-color: #ddd;
    }

    .sideBar{
    background-color:  #28BF69;
    padding-top: 50px;
    padding-left: 20px;
    padding-right: 2px;
    padding-bottom: 2px;
}
.sideLink:link, .sideLink:visited {
  background-image:linear-gradient(to right, #28BF69 , #88DC73);
  color: white;
  padding: 14px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  margin-bottom: 1px;

}
.sideLink:hover, .sideLink:active{
  background-image:linear-gradient(to left, #28BF69 , #88DC73);
}


.linkVisited:link, .linkVisited:visited {
  background-image:linear-gradient(to left, #28BF69 , #88DC73);
  color: white;
  padding: 14px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  margin-bottom: 1px;
}
</style>

