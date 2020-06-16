<template>
    <div>
        <loader v-if="loader==true"></loader>
        <div class="list-group">
            <div v-for="art in articles" class="list-group-item">
                {{art.title}}
              <router-link v-bind:to="'Dashuser/viewArt/'+art.ArticleId" class="btn btn-sm float-right btn-primary">
                open</router-link>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data()
    {
        return{
            articles:[],

            loader:false,
        }

    },
    methods:{
        getArticles(){
            this.loader=true;
            this.$http.get('http://localhost:1833/api/userArticle')
            .then((data)=>{
                this.articles=data.body
                this.loader=false
            })
        }
    },

    created(){
        this.getArticles();
    }
}
</script>
<style>

</style>
