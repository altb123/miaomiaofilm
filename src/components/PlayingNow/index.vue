<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading"></Loading>
        <Scroller v-else :handleToScroll="handeToScroll" :handleToTouchEnd="handeToTouchEnd">
            <ul>
                <li class="pullDown">{{ headleToScroll }}</li>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDail(item.id)"><img :src="item.img | setWH('128.180')" /></div>
                    <div class="info_list" @tap="handleToDail(item.id)">
                        <h2>{{ item.nm }} <img src="@/assets/3D.png" v-if="item.version === 'v3d imax'" /></h2>
                        <p>观众评：<span class="grade">{{ item.sc }}</span></p>
                        <p>{{ item.star }}</p>
                        <p>{{ item.showInfo }}</p>                    
                    </div>
                    <div class="btn_mall">购票</div>
                </li>
            </ul>
        </Scroller>   
    </div>
</template>

<script>

export default {
    name : 'PlayingNow',
    data () {
        return {
            movieList : [],
            headleToScroll : '',
            isLoading : true,
            prevCityId : -1
        }
    },
    activated () {
        var cityId = this.$store.state.city.id;
        console.log(cityId);
        if(this.prevCityId === cityId) { return; }
        this.isLoading = true;
        this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res) => {
            var msg = res.data.msg
            if( msg === 'ok' ) {
                this.movieList = res.data.data.movieList;    
                this.isLoading = false;
                this.prevCityId = cityId;       
            }
        });
    },
    methods : {
        handleToDail (movieId) {
            this.$router.push('/movie/detail/1/' + movieId);
        },
        handeToScroll (pos) {
            if(pos.y > 30) {this.headleToScroll = '松开刷新';}
        },
        handeToTouchEnd (pos) {
             if(pos.y > 30) {
                this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
                        var msg = res.data.msg
                    if( msg === 'ok' ) {
                        this.movieList = res.data.data.movieList;
                        this.headleToScroll = '刷新成功';
                        setTimeout(() => {
                            this.headleToScroll = '';
                        },1000);
                    }
                });    
            }
        }
    },
}
</script>

<style scoped>
#content .movie_body{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}
.movie_body ul{margin:0 12px;overflow:hidden}
.movie_body ul li{margin-top:12px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-bottom:1px solid #e6e6e6;padding-bottom:10px}
.movie_body .pic_show{width:64px;height:90px}
.movie_body .pic_show img{width:100%;}
.movie_body .info_list{margin:0 10px;-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative}
.movie_body .info_list h2{font-size:17px;line-height:24px;width:150px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.movie_body .info_list p{width:90%;font-size:13px;color:#666;line-height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.movie_body .info_list .grade{font-weight:700;color:#faaf00;font-size:15px}
.movie_body .info_list img{width:50px;position:absolute;right:10px;top:5px}
.movie_body .btn_mall,.movie_body .btn_pre{width:47px;height:27px;line-height:28px;text-align:center;background-color:#f03d37;color:#fff;border-radius:4px;font-size:12px;cursor:pointer}
.movie_body .btn_pre{background-color:#3c9fe6}
.movie_body .pullDown{margin:0;padding:0;border:none;text-align:center;display:block;transition:ease all .3s;-webkit-transition:ease all .3s;}
</style>
