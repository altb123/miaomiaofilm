<template>
    <div id="main">
        <Header title="喵喵电影"></Header>
        <div id="content">
                <div class="movie_menu">
                    <router-link tag="div" to="/movie/city" class="city_name">
                        <span>{{ $store.state.city.nm }}</span><i class="iconfont icon-lower-triangle"></i>
                    </router-link>
                    <div class="hot_switch">
                        <router-link tag="div" to="/movie/playingnow" class="hot_item">正在热映</router-link>
                        <router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
                    </div>
                    <router-link tag="div" to="/movie/search" class="search_entry">
                        <i class="iconfont icon-sousuo"></i>
                    </router-link>
                </div>
                <!-- 二级路由 -->
                    <keep-alive> 
                        <router-view></router-view>
                </keep-alive>
            </div>
            
        <Footer></Footer>

        <router-view name="detail"></router-view>


        <!-- 当前城市定位切换框 -->
        <!-- <messageBox></messageBox> -->
    </div> 
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { messageBox } from '@/components/JS'
// import messageBox from '@/components/JS/messageBox'

export default {
    name : 'movie',
    components : {
        Header,
        Footer,
        // messageBox
    },
    mounted() {


        setTimeout(() => {
            this.axios.get('/api/getLocation').then((res) => {
                var msg = res.data.msg; 
                if( msg === 'ok' ) {
                    var nm = res.data.data.nm;
                    var id = res.data.data.id;
                    var prevCityId = this.$store.state.city.id;

                    if(prevCityId == id){return;}
                    
                    messageBox({
                        title : '定位',
                        content : nm,
                        cancel : '取消',
                        ok : '切换城市',
                        handleOk() {
                            //如果点击城市切换，则更换本地存储值，重新刷新页面
                            window.localStorage.setItem('nowNm',nm);
                            window.localStorage.setItem('nowId',id);
                            window.location.reload();
                        }
                    })
                }
            });
        },3000);
        
        
    }
}
</script>

<style scoped>
.messageBox{width:200px;height:120px;border:1px solid #ccc;border-radius:4px;background:#fff;-webkit-box-shadow:3px 3px 3px 3px #ccc;box-shadow:3px 3px 3px 3px #ccc;position:absolute;left:50%;top:50%;margin:-60px 0 0 -100px}
.messageBox h2{font-size:18px}
.messageBox h2,.messageBox {text-align:center;line-height:40px}
.messageBox>div{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;bottom:0;width:100%;border-top:1px solid #ccc}
.messageBox>div div{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:center;line-height:30px;border-right:1px solid #ccc}
.messageBox>div div:last-child{border:none}
#content .movie_menu{width:100%;height:45px;border-bottom:1px solid #e6e6e6;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#fff;z-index:10}
.movie_menu .city_name{margin-left:20px;height:100%;line-height:45px}
.movie_menu .city_name.active,.movie_menu .city_name.router-link-active{color:#ef4238;border-bottom:2px solid #ef4238}
.movie_menu .hot_switch{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;line-height:45px}
.movie_menu .hot_item{font-size:15px;color:#666;width:80px;text-align:center;margin:0 12px;font-weight:700}
.movie_menu .hot_item.active,.movie_menu .hot_item.router-link-active{color:#ef4238;border-bottom:2px solid #ef4238}
.movie_menu .search_entry{margin-right:20px;height:100%;line-height:45px}
.movie_menu .search_entry.active,.movie_menu .search_entry.router-link-active{color:#ef4238;border-bottom:2px solid #ef4238}
.movie_menu .search_entry i{font-size:24px;color:red}
.slide-enter-active{-webkit-animation:detailMove-data-v-717db445 13s;animation:detailMove-data-v-717db445 13s}@-webkit-keyframes detailMove-data-v-717db445{0%{-webkit-transform:translateX(100%);transform:translateX(100%)}to{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes detailMove-data-v-717db445{0%{-webkit-transform:translateX(100%);transform:translateX(100%)}to{-webkit-transform:translateX(0);transform:translateX(0)}}
</style>
