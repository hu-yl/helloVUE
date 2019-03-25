<template>
  <div id="app">
    <div class="search-bar">
      <van-row class="test-row">
        <van-col span="3">
          <img :src="locationIcon" width="70%" class="location-icon">
        </van-col>
        <van-col :span="16">
          <input type="text" class="search-input" placeholder="请输入商品名称">
        </van-col>
        <van-col :span="5">
          <van-button size="mini" class="search-btn">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--type bar-->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--adbanner area-->
    <div class="ad">
      <img v-lazy="adBanner" width="100%">
    </div>

    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
               <div class="price"><span>￥{{item.price | moneyFilter}}</span>(￥{{item.mallPrice  | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
         <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item , index) in hotGoods" :key="index">
                                <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price">

                                </goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import { toMoney } from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
import url from '@/serviceAPI.config.js';
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("@/assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品
    };
  },filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
 components:{swiper,swiperSlide,floorComponent,goodsInfo},
        
  created() {
    axios({
      url:
        url.getShopingMallInfo,
      method: "get"
    }).then(response => {
      console.log(response);
      if (response.status == 200) {
        this.category = response.data.data.category;
        this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
        this.bannerPicArray = response.data.data.slides;
        this.recommendGoods = response.data.data.recommend;
        this.floor1 = response.data.data.floor1;
        this.floor2 = response.data.data.floor2;
        this.floor3 = response.data.data.floor3;
        this.floorName = response.data.data.floorName;
         this.hotGoods = response.data.data.hotGoods;
      }
    });
  }
};
</script>
<style lang="scss">
#app {
  background-color: #f0f0f0f0;
  // 顶部搜索条
  .search-bar {
    height: 2.2rem;
    background-color: #e5017d;
    overflow: hidden;
    line-height: 2.2rem;

    .location-icon {
      padding-top: 0.2rem;
      padding-left: 0.3rem;
    }
    .search-input {
      width: 100%;
      height: 1.3rem;
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 1px solid #fff !important;
      background-color: #e5017d;
      color: #fff;
    }
    .search-input::-webkit-input-placeholder {
      color: #add8e6;
      font-size: 0.8rem;
    }
    .search-input::-moz-placeholder {
      color: #add8e6;
      font-size: 0.8rem;
    }
    .search-input::-ms-input-placeholder {
      color: #add8e6;
      font-size: 0.8rem;
    }
  }
  //轮播图
  .swiper-area {
    clear: both;
    height: 9.21rem;
    overflow: hidden;
  }
  #ad .ad {
    height: 2.1rem;
  }
  //type-bar
  .type-bar {
    background-color: #fff;
    margin: 0 0.3rem 0.3rem 0.3rem;
    border-radius: 0.3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row; //默认值。灵活的项目将水平显示，
    flex-wrap: nowrap; //默认值。规定灵活的项目不拆行或不拆列

    div {
      padding: 0.3rem;
      font-size: 12px;
      text-align: center;
      flex: 1;
    }
  }
  //Recommend goods
  .recommend-area {
    background-color: #fff;
    margin-top: 0.3rem;
    height: 11.4rem;

    .recommend-title {
      border-bottom: 1px solid #eee;
      font-size: 14px;
      padding: 0.2rem;
      color: #e5017d;
      height: 1.25rem;
    }
    .recommend-body {
      border-bottom: 1px solid #eee;
      height: 9.77rem;

      .recommend-item {
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
        height: 9.77rem;
      }
    }
  }
  .price span{
    color: #e5017d
  }
     .hot-area{
        text-align: center;
        font-size:14px;
        height: 1.8rem;
        line-height:1.8rem;
    }
    .hot-goods{
        height: 130rem;
        overflow: hidden;
        background-color: #fff;
    }
}
</style>

