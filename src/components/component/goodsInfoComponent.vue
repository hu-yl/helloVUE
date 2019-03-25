<template>
    <div class="goods-info" @click="goGoodsPage()">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
    import {toMoney}  from '@/filter/moneyFilter.js'
    export default {
        props:['goodsImage','goodsName','goodsPrice','goodsId'],
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods: {
            goGoodsPage() {
                console.log(this.goodsId)
                this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})//name:跳转的页面，query携带的参数
            }
        },
    }
</script>

<style scoped>
 .goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>