<template>
    <div>
        <navigations color="dark"></navigations>
        <div class="container">
        <div class="breadcrumb">
        <div class="breadcrumb-item"><router-link v-bind:to="'/DashUser'"><font-awesome-icon icon="home"/> Home</router-link></div>
    </div>
     <compontent v-bind:is="component"></compontent>
    </div>
        <div class="row">
            <div class="col-md-2">

            </div>
            <div class="col-md-8">
                <br>
                <div>
                    <h2>{{article.title}}</h2>
                </div>
                <br>
                <span v-html="article.article"></span>
            </div>
            <div class="col-md-2">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data()
    {
        return{
            articleId:this.$route.params.id,
            article:{},
        }
    },
    methods:{
         getArticle(){
            this.loader=true;
            this.$http.get('http://localhost:1833/api/getArticleToRead/'+this.articleId)
            .then((data)=>{
                this.article=data.body
                this.loader=false
            })
        }
    },
    created(){
        this.getArticle()
    }
}
</script>
<style>
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

</style>


