<template>
    <div id="main">
        <Header title="我的喵喵"></Header>       
        <div id="content">
            <Login></Login>
        </div>     
        <Footer></Footer>
    </div> 
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Login from '@/components/Login'

export default {
    name : 'mine',
    components : {
        Header,
        Footer,
        Login
    }
}
</script>

<style scoped>

</style>
