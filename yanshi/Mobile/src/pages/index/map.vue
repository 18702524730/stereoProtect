<template>
    <div>
        <div id="myMap"></div>
        <ul class="addresslist" v-show="address">
            <li><div class="searchbox"><span class="searchbtn"></span><input type="text" placeholder="输入地点搜索"  id="searchText"></div></li>
            <li><strong>您当前位置：</strong></li>
            <li ><p>{{address}}</p><span class="sbtn" @click="selectaddr">确定</span></li>
        </ul>
        <ul class="addresslist" v-if="selectaddress">
            <li><strong>您选择的位置：</strong></li>
            <li ><p>{{selectaddress}}</p><span class="sbtn" @click="selectaddrs">确定</span></li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            address:'',
            selectaddress:'',
            cont:'',
            map:''
        }
    },
    mounted(){
        let self = this;
        this.map = new BMap.Map("myMap");
        var map  = this.map;
        this.getLocation();
        var local = new BMap.LocalSearch(self.map,
            {
                renderOptions: { 
                    map: self.map,
                    //  panel: "searchlist",
                    autoViewport: true,  
                    selectFirstResult: true   
                },
            });
        local.setSearchCompleteCallback(function (searchResult) {
        　　　　var poi = searchResult.getPoi(0);
        // 　　　　document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat; //获取经度和纬度，将结果显示在文本框中
        // 　　　　map.centerAndZoom(poi.point, 9);
                self.selectaddress = poi.address;
                map.panTo(poi.point);//地图中心移动
                map.centerAndZoom(new BMap.Point(poi.point.lng,poi.point.lat), 13);
                map.enableScrollWheelZoom();
        　　});
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                {"input" : "searchText"
                ,"location" : this.map
            });
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            var myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business
            // self.cont = myValue;
            local.search(myValue);
        });
    },
    methods:{
        
        selectaddrs(){
            this.$store.dispatch('set_location',this.selectaddress);
            this.cont = '';
            this.$router.back();
        },
        selectaddr(){
            this.$store.dispatch('set_location',this.address);
            this.cont = '';
            this.$router.back();
        },
        getLocation(){
            let self = this;
            var map = this.map;
            var geolocation = new BMap.Geolocation();
            var gc = new BMap.Geocoder();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);//标出所在地
                        map.panTo(r.point);//地图中心移动
                        map.centerAndZoom(new BMap.Point(r.point.lng,r.point.lat), 10);
                        map.enableScrollWheelZoom();
                        var point = new BMap.Point(r.point.lng,r.point.lat);//用所定位的经纬度查找所在地省市街道等信息
                        gc.getLocation(point, function(rs){
                            self.address = rs.address
                        })
                        // map.addEventListener('click',function(e){
                        //     map.clearOverlays();
                        //     var mks = new BMap.Marker(e.point);
                        //     map.addOverlay(mks);//标出所在地
                        //     map.panTo(e.point);//地图中心移动
                        //     //alert('您的位置：'+r.point.lng+','+r.point.lat);
                        //     map.centerAndZoom(new BMap.Point(e.point.lng,e.point.lat), 10);
                        //     map.enableScrollWheelZoom();
                        //     var points = new BMap.Point(e.point.lng,e.point.lat);//用所定位的经纬度查找所在地省市街道等信息
                        //     gc.getLocation(e.point, function(rs){
                        //         var addComp = rs.addressComponents; 
                        //         var ad = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                        //         self.address = ad
                        //     })
                        // });
                    }else {
                        alert('failed'+this.getStatus());
                    }        
                },{enableHighAccuracy: true})
            
        },
    }
}
</script>
<style lang="scss">
.anchorBL{
    display:none;
}
#myMap{
    height: 5rem;
}
.addresslist{
    padding: 0.4rem 0.3rem 0;
    line-height: 0.6rem;
    border-bottom: 1px solid #eee;
    &:last-child{
        border-bottom: none;
    }
    li{
        overflow: hidden;
        margin-bottom: 0.2rem;
    }
    .sbtn{
        float: right;
        width: 1.2rem;
        height: 0.6rem;
        background-color: #efefef;
        // border: 1px solid #eaeaea;
        border-radius: 2px;
        text-align: center;
        line-height: 0.6rem;
        font-size: 0.24rem;
    }
    p{
        width: 5.5rem;
        line-height: 0.4rem;
        float: left;
        font-size: 0.28rem;
        input{
            width:100%;
        }
    }
}
.searchbox{
    box-sizing: content-box;
    height: 0.8rem;
    border: 1px solid #efefef;
    border-radius: 4px;
    input{
        float: left;
        width: 5.9rem;
        height: 0.8rem;
        padding: 0.2rem;
        font-size: 0.28rem;
        
    }
}
.searchbtn{
    float: left;
    height: 0.8rem;
    width: 0.8rem;
    background-image: url(~assets/img/home/SearchBar.png);
    background-position: center center;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    background-color: #eee;
}
</style>