<template>
  <div>
    <navigations color="info"/>
    <div class="mainDiv">
      <b-form enctype="multipart/form-data">
        <h3>
    <router-link v-bind:to="'/admin/navigation-article'"><font-awesome-icon icon="angle-double-left"/></router-link>
          Edit Article</h3>
        <h3 align="center">{{article.title}}</h3>
        <hr/>
    <b-form-group  label="Your Article Title"
        label-for="articleName">
        <b-form-input   required v-model="article.title"
       id="articleName"
        />
    </b-form-group>
    
     <b-form-group label="Your Article " label-for="articleRead">
        <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" 
        required id="articleRead" v-model="article.article"
        /> 
        
    </b-form-group>

    <b-button @click="postArticle" size="sm" type="submit" variant="primary">Edit</b-button>
     <span><button @click="viewFiles" v-b-modal.fileList class="btn btn-sm btn-info">files attached</button></span>
    </b-form>

<div>
      <b-modal  id="fileList" title="Files Attached">
        <b-container>
              <ul class="list-group">
                <li class="list-group-item" v-for="file in files">{{file.fileName}}
                  <span><a @click="Download(file.FileId,file.fileName)" class="btn btn-sm btn-success">download</a></span>
                  <span><button @click="Delete(file.FileId)"  class="btn btn-sm btn-danger">delete</button></span>
                </li>
              </ul>
        </b-container>
        <div slot="modal-footer" class="w-100">
        </div>
      </b-modal>
  </div>
</div>
  </div>
</template>

<script>
  import axios   from "axios";
export default {


data()
    {
      return{
        files:[],
        getArticle:'',
        htmlForEditor:'',
        article:{
          ArticleId:this.$route.params.id,
          title:"",
          article:"",
          filenames:[],
          dateAdded:''
       }
      }
    },
methods:{
              handleImageAdded:function(file,Editor,cursorLocation,resetUploader)
              {
                  var formData = new FormData();
                  console.log(this.htmlForEditor)
                  console.log(file)
                  formData.append("image",file)
                  axios({
                    url:'http://localhost:1833/api/Articles/imageUpload',
                    method:'POST',
                    headers:{'Authorization':'Bearer '+ this.$store.state.token},
                    ContentType:'application/json',
                    data:formData
                  }).then((result)=>{
                    let url = result.data
                    let file=result.data.slice(-36)

                    Editor.insertEmbed(cursorLocation,'image',url);
                    this.article.filenames.push(file)
                    resetUploader();
                  }).catch((err)=>{
                    alert("Encountered an error "+err);
                  })
              },
postArticle:function()
        {
        
          console.log(this.article.filenames)
          this.$http.put('http://localhost:1833/api/Articles/'+this.article.ArticleId,
          {
            article:this.article.article,
            title:this.article.title,
            ArticleId:this.article.ArticleId,
            filenames:this.article.filenames

          }).then(function(data)
          {
            alert(""+data)
          }).catch(function(error){
            alert(error.body.Message+"\n"+error.bodyText)
          }),function()
          {
           alert("failed something happend");
          }
        },
        viewFiles()
        {
           this.$http.get('http://localhost:1833/api/Filesd/'+this.article.ArticleId).then(function(data){
              this.files=data.body.files;
           }),function(err)
           {
             alert("something happened "+err)
           }
        },
        Download(id,fileName)
        {
          this.$http.get('http://localhost:1833/api/Files/downloads/'+id,{responseType:'arraybuffer'})
          .then(function(response){
              this.DownloadFile(response,fileName)
            }),function(e)
            {
              alert('error downloading '+e)
            }
        },
        DownloadFile(response,fileName)
        {

              let blob = new Blob([response.data],{type:"application/pdf"});
              if(Window.navigator && window.navigator.msSaveOrOpenBlob){
                window.navigator.msSaveOrOpenBlob(blob)
                return
              }
              const data=window.URL.createObjectURL(blob);
              var link=document.createElement('a');
              link.href=data
              link.download=fileName;
              link.click();
              setTimeout(function(){
                window.URL.revokeObjectURL(data)
              },100)


        },
        Delete()
        {

        }
},   
        created()
        {
               this.$http.get('http://localhost:1833/api/Articles/'+this.article.ArticleId).then(function(data){
              this.getArticle=data.body;
              console.log(this.getArticle)
              this.article.title=this.getArticle.title;
              this.article.article=this.getArticle.article;
              this.article.dateAdded=this.getArticle.dateAdded;

              console.log(this.getArticle.filenames)
              
              if(this.getArticle.article!=null&& this.getArticle.filenames!=null)
              {
                //load local arrey with list of files
                for(var i=0;i<this.getArticle.filenames.length;i++)
                {
                  this.article.filenames.push(this.getArticle.filenames[i])
                }
              }
              console.log(this.article.filenames)
          });
        }
}

</script>

<style>
  textarea{
    max-width: 100%;
    min-width: 100%;
    min-height: 200px;
  }
  
</style>