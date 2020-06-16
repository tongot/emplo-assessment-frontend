<template>
    <div>
        <navigations color="dark"></navigations>
        <side-bar :menuValues="menuValues"></side-bar>
</div>

</template>
<script>

export default {
    data()
    {
        return{
            
            menuValues:[
                {"name":"News","lclass":"linkVisited","component":"n-news","icon":"newspaper","function":""},
                {"name":"Course","lclass":"sideLink","component":"c-courses","icon":"book","function":""},
                {"name":"Articles","lclass":"sideLink","component":"a-articles","icon":"book-reader","function":""},
                {"name":"Assesments","lclass":"sideLink","component":"a-assessment","icon":"edit","function":"getReport"},
                {"name":"FeedBack","lclass":"sideLink","component":"n-news","icon":"newspaper","function":""}
            ],
        }
    },
}
</script>



