<template>
    <div>
        <navigations color="info"></navigations>
        <div class="mainDiv">
            <div class="well alert-danger">
                <ul v-if="state==401">
                    <h4>Error {{state}}</h4>
                <li>
                    please not that you have no rights to open this page
                </li>
                 <li>
                    please log in <span><router-link v-bind:to="'/login'">here</router-link></span> with another user or relog if you have rights for this page
                </li>
                </ul>

                <ul v-if="state==0">
                    <h4>Error {{state}}</h4>
                <li>
                    Request could not be processed
                </li>
                 <li>
                    Page not available, the server is not responding
                </li>
                </ul>

                <ul v-if="state==500">
                    <h4>Error {{state}}</h4>
                    <li>Internal server error</li>
                </ul>
            </div>
        </div>
           
    </div>
</template>
<script>
export default {
    data()
    {
        return{
            state:this.$route.params.state,
        }
    }
}
</script>
