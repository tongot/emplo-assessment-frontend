<template>
  <div class="mainDiv"> 
      <b-form enctype="multipart/form-data">
       
    <b-form-group  label="Your Article Title"
        label-for="articleName">
        <b-form-input   required v-model="article.title"
       id="articleName"
        />
    </b-form-group>
    
     <b-form-group label="Your Article Title" label-for="articleRead">
        <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" 
        required id="articleRead" v-model="article.article"
        /> 
    </b-form-group>

    <b-button @click="postArticle" type="submit" variant="primary">Post</b-button>
     
    </b-form>
  </div>
</template>

<script>
  import axios   from "axios"
export default {

data()
    {
      return{
        htmlForEditor:'',
        article:{
          title:"",
          article:"",
          filenames:[]
       }
      }
    },
methods:{

              handleImageAdded:function(file,Editor,cursorLocation,resetUploader)
              {
                
                  var formData = new FormData();
                  formData.append("image",file)
                  axios({
                    url:'http://localhost:1833/api/Articles/imageUpload',
                    method:'POST',
                    headers:{'Authorization':'Bearer '+ this.$store.state.token},
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
              //sent the article to save
        postArticle:function()
        {
          var config={
                    headers:{'Authorization':'Bearer '+ this.$store.state.token}
          }
          var bodyParameter={
            article:this.article.article,
            title:this.article.title,
            filenames:this.article.filenames
          }
          axios.post('http://localhost:1833/api/Articles',
          bodyParameter,
          config
         ).then(function(data)
          {
            alert("article was successfuly added");
          }),function()
          {
           alert("failed something happend");
          }
        }
      }
 }
</script>

<style>
  textarea{
    max-width: 100%;
    min-width: 100%;
    min-height: 200px;
  }
  h4{
    font-family: Arial, Helvetica, sans-serif;
    color: #b2d1c7;
  }
</style>