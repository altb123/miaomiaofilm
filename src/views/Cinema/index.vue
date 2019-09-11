<template>
    <div id="main">
        <Header title="喵喵影院"></Header>
        <div id="content">
            <div class="cinema_menu">
                <div class="city_switch">
                    全城<i class="iconfont icon-lower-triangle"></i>
                </div>
                <div class="brand_switch">
                    品牌<i class="iconfont icon-lower-triangle"></i>
                </div>
                <div class="feature_switch">
                    特色<i class="iconfont icon-lower-triangle"></i>
                </div>
            </div>
                <CinemaList></CinemaList>
        </div>
        <Footer></Footer>
    </div>    
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CinemaList from '@/components/CinemaList'

export default {
    name : 'cinema',
    components : {
        Header,
        Footer,
        CinemaList
    }
}
</script>

<style scoped>
#content .cinema_menu{width:100%;height:45px;border-bottom:1px solid #e6e6e6;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#fff}
</style>
