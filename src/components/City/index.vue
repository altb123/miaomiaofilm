<template>
    <div class="city_body">
            <div class="city_list">
                <Loading v-if="isLoading"></Loading>
                <Scroller v-else ref="city_list">
                    <div>                    
                        <div class="city_hot">
                            <h2>热门城市</h2>
                            <ul class="clearfix">
                                <li v-for="item in hotList" :key="item.index" @tap="handleToCity(item.nm , item.id)"> {{ item.nm }}</li>
                            </ul>
                        </div>
                        <div class="city_sort" ref="city_sort">
                            <div v-for="item in cityList" :key="item.index">
                                <h2>{{ item.index }}</h2>
                                <ul>
                                    <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.name , itemList.id)">{{ itemList.name }}</li>
                                </ul>
                            </div>
                        </div>  
                    </div>
                </Scroller>     
                </div>                

            <div class="city_index">
                <ul>
                    <li v-for="(item,index) in cityList" :key="item.index" @touchstart="headleToIndex(index)">{{ item.index }}</li>
                </ul>
            </div>   
    </div>
</template>

<script>
export default {
    name : 'City',

    data () {
        return {
           cityList : [],                //城市列表
           hotList : [],                //热门城市列表 
           isLoading : true
        }
    },

    mounted() {

        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');

        if(cityList && hotList){
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        }else {     
            this.axios.get('/api/cityList').then((res) => {
                //axios 请求接口数据
                if(res.data.msg === 'ok') {
                // 如果请求成功，则新建cities用于存放数据
                var cities = res.data.data.cities;
                var { cityList , hotList } = this.formatCityList(cities);
                this.cityList = cityList;
                this.hotList = hotList;
                this.isLoading = false;

                //将数据加入本地缓存
                window.localStorage.setItem('cityList' , JSON.stringify(cityList));
                window.localStorage.setItem('hotList' , JSON.stringify(hotList));

                }else {console.log('数据获取失败');} 
            });
        }
    },
    methods : {      
        //获取城市名称的拼音，根据拼音的首字母进行排序
        formatCityList (cities) {
            var cityList = [];
            var hotList = [];

            // 分开热门城市，根据数据里面的isHot参数区分
            for(var i=0;i<cities.length;i++) {
                if( cities[i].isHot === 1 ) {
                    hotList.push( cities[i] );
                }
            }

            for(var i=0;i<cities.length;i++) {
                // 取出城市名称的首字母，并且把首字母变成大写字母
                var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                if(toCom(firstLetter)) { //新添加index
                    cityList.push({ index : firstLetter , list : [ {nm  : cities[i].nm , id : cities[i].id } ] });
                }else {  //累加到已有index中
                    for (var j=0;j<cityList.length;j++) {
                        if(cityList[j].index === firstLetter) {
                            cityList[j].list.push({ name : cities[i].nm  , id : cities[i].id });
                        }
                    }
                }
                // 城市拼音首字母排序
                cityList.sort((n1,n2) => {
                    if( n1.index > n2.index ) {
                        return 1;
                    }else if( n1.index < n2.index ) {
                        return -1;
                    }else { return 0; }
                });
            }
            function toCom(firstLetter) {
                for(var i=0;i<cityList.length;i++) {
                    if(cityList[i].index === firstLetter) { //表示已经添加过了
                        return false;
                    }
                }
                return true;
            };

            return {
                cityList,
                hotList
            };         
        },

        // 点击城市首字母跳转到相应页面
        headleToIndex(index) {
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
        },


        //城市切换
        handleToCity(nm , id) {
            this.$store.commit('city/CITY_INFO' , { nm , id });
            window.localStorage.setItem('nowNm' , nm);
            window.localStorage.setItem('nowId' , id);
            this.$router.push('/movie/playingnow');
            
        }
    }
}
</script>

<style scoped>
#content .city_body{margin-top:45px;display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;position:absolute;top:0;bottom:0}
.city_body .city_list{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto;background:#fff5f0}
.city_body .city_list::-webkit-scrollbar{background-color:transparent;width:0}
.city_body .city_hot{margin-top:20px}
.city_body .city_hot h2{padding-left:15px;line-height:30px;font-size:14px;background:#f0f0f0;font-weight:400}
.city_body .city_hot ul li{float:left;background:#fff;width:29%;height:33px;margin-top:15px;margin-left:3%;padding:0 4px;border:1px solid #e6e6e6;border-radius:3px;line-height:33px;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box}
.city_body .city_sort div{margin-top:20px;}
.city_body .city_sort h2{padding-left:15px;line-height:30px;font-size:14px;background:#f0f0f0;font-weight:400}
.city_body .city_sort ul{padding-left:10px;margin-top:10px;}
.city_body .city_sort ul li{width:100%; line-height:30px;background-color:transparent;border-width:0;text-align:left;float:none}
.city_body .city_index{width:20px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;text-align:center;border-left:1px solid #e6e6e6}
</style>
