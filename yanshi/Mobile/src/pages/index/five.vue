<template>
    <div class="fivepage">
        <div class="bgbox" @click="tojb"><img src="~assets/img/home/five.png" alt=""></div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        // document.title='防伪查验'
    },
    methods:{
        tojb(){
            this.$router.push({name:'xsjb'})
        }
    }
}
</script>

<style lang="scss">
.fivepage{
    height: 13.34rem;
    width: 100%;
    background: #4d4c4c;
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

