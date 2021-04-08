<template>
    <div class="firstpage">
        <div class="bgbox" @click="tojb"><img src="~assets/img/home/home.jpg" alt=""></div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        document.title='防伪查验'
    },
    methods:{
        tojb(){
            this.$router.push({name:'xsjb'})
        }
    }
}
</script>

<style lang="scss">
.firstpage{
    width: 100%;
    height: 100%;
    .bgbox{
        img{
            display: block;
            width: 100%;
        }
        // height: 13.34rem;
        // background-image: url("~assets/img/fyjb/home.png");
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        // background-position: center top;
    }
}
</style>

