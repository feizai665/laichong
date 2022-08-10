<template>
  <scroll-view :scroll-y="true" class="homeScroll" @scroll="scrollChange" lower-threshold="30"
    @scrolltolower="scrollLower">
    <view class="page-top" :style="{background: backColor}">
    </view>
    <!-- #ifdef H5 -->
    <!-- #endif -->
    <view class="MySwiper">
      <my-swiper :swiper="swiperList"></my-swiper>
    </view>
    <view class="home-search" :style="{background: backColor}">
      <!-- #ifdef MP-WEIXIN -->
      <!--    <u-icon size="24" custom-prefix="iconfont" type="icon-notification-filling" ></u-icon> -->
      <u-icon name="bell-fill" size="24" style="padding-left: 30px;" :color="bellColor"></u-icon>
      <!-- #endif -->
      <view class="home-search-box">
        <u-icon name="search" size="20"></u-icon>
        <text>搜索</text>
      </view>
      <!-- #ifdef H5||APP-PLUS -->
      <u-icon name="bell-fill" size="24" style="margin-right: 30px;" :color="bellColor"></u-icon>
      <!-- #endif -->
    </view>
    <view class="home-nav">
      <view class="home-nav-item" v-for="item in cateList" :key="item._id">
        <image :src="item.img" mode="widthFix"></image>
        <text>{{item.name}}</text>
      </view>
    </view>
    <view class="home-box">
      <view class="home-box-title">
        推荐榜单
      </view>
      <scroll-view class="home-box-item" :scroll-x="true" :enable-flex="true" :show-scrollbar="true">
        <view class="home-box-image" v-for="item in recommList" :key="item._id">
          <image :src="item.img" mode="widthFix"></image>
          <view class="home-box-text">
            <image src="/static/images/home/rank.png" mode="widthFix"></image>
            <text class="home_tetx">{{item.name}}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="home-box">
      <view class="home-box-title">
        猜你喜欢
      </view>
      <view class="home-like">
        <view class="home-like-item" v-for="item in competList" :key="item._id">
          <navigator :url="'/subpkb/goods_list/goods_list?good_id='+item._id" open-type="navigate">
            <image :src="item.img||'../../static/images/home/goods1.jpg'" mode="widthFix"></image>
            <text class="home-like-text">
              {{item.name}}111111111111111111111111111111
            </text>
            <view class="home-like-box" style="display: flex;
    justify-content: space-between;">
              <text style="color: red;">￥{{item.price?item.price:0}}.00</text>
              <text style="color: #aaa;">已售{{item.sales?item.sales:'0'}}件</text>
            </view>
          </navigator>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图
        swiperList: [],
        // 首页导航
        cateList: [],
        // 猜你喜欢
        competList: [],
        comper: {
          skip: 0,
          limit: 10
        },
        londing: false,
        // 推荐榜单
        recommList: [],
        backColor: '',
        show: true,
        bellColor: 'rgb(247, 94, 75)',
      };
    },
    onLoad() {
      this.getSwiper()
      this.getCate()
      this.getCompet()
      this.getRecomm()
    },
    methods: {
      // 轮播图
      async getSwiper() {
        const {
          data: res
        } = await uni.$http.post('/api/get_banner').catch(err => {
          uni.$showMsg("数据加载失败")
        })
        this.swiperList = res.data.map(item => item.img)
        console.log(this.swiperList);
      },
      // 分类
      async getCate() {
        const {
          data: res
        } = await uni.$http.post('/api/get_cate').catch(err => {
          uni.$showMsg("数据加载失败")
        })
        this.cateList = res.data
      },
      // 精选
      async getCompet() {
        this.londing = true
        const {
          data: res
        } = await uni.$http.post('/api/get_like', this.comper).catch(err => {
          uni.$showMsg("数据加载失败")
        })
        this.competList = [...this.competList, ...res.data]
        console.log(this.competList);
        this.londing = false
        if (res.data.length < this.comper.limit) {
          this.londing = true
          return
        }
      },
      // 猜你喜欢
      async getRecomm() {
        const {
          data: res
        } = await uni.$http.post('/api/get_competitive', {
          skip: 0,
          limit: 10
        }).catch(err => {
          uni.$showMsg("数据加载失败")
        })
        this.recommList = res.data
        console.log(this.recommList);
      },
      scrollChange(e) {
        switch (true) {
          case e.detail.scrollTop < 50:
            this.backColor = 'rgba(255,255,255,0)'
            this.bellColor = 'rgb(247, 94, 75)'
            // #ifdef APP-PLUS || MP-WEIXIN
            // #endif
            break
          case 100 < e.detail.scrollTop:
            this.backColor = 'rgba(253,209,0,1)'
            this.bellColor = 'rgba(255,255,255,1)'
            // #ifdef APP-PLUS || MP-WEIXIN
            // #endif
            break
          default:
            this.backColor = 'rgba(253,209,0,.5)'
            this.bellColor = 'rgba(255,255,255,1)'
            // #ifdef APP-PLUS || MP-WEIXIN
            // #endif
            break
        }
      },
      scrollLower() {
        if (this.londing == true) {
          return
        }
        // this.competList = []
        this.comper.skip += 10
        this.getCompet()
      },
    },
    onPullDownRefresh() {
      setTimeout(() => {
        uni.startPullDownRefresh({
          success: (res) => {
            this.competList = []
            this.comper.skip = 0
            this.getCompet()
          }
        })
      }, 500)
    }

  }
</script>

<style lang="scss">
  .homeScroll {
    height: 100vh !important;
  }

  .MySwiper {
    position: relative;
    margin-top: calc(var(--status-bar-height) - 88upx);
    // #ifdef MP-WEIXIN || APP-PLUS
    margin-top: -40upx;
    // #endif
  }

  .page-top {
    width: 100%;
    height: var(--status-bar-height);
    position: fixed;
    top: 0;
    z-index: 100;
  }

  .home-nav {
    width: 95%;
    margin: 30rpx auto;
    display: flex;
    justify-content: space-around;
    padding: 10rpx 0;
    background: #fff;
    border-radius: 10px;

    .home-nav-item {
      width: 25%;
      box-sizing: border-box;
      padding: 0 10rpx;
      text-align: center;

      image {
        width: 60%;
        // #ifdef APP-PLUS || MP-WEIXIN
        margin-bottom: 10upx;
        // #endif
      }

      text {
        display: block;
        font-size: 12px;
      }
    }
  }

  .home-search {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    // background: red;
    height: 80upx;
    position: fixed;
    align-items: center;
    top: var(--status-bar-height);
    z-index: 10;
    padding-left: 50upx;
    box-sizing: border-box;

    .home-search-box {
      box-sizing: border-box;
      width: 50%;
      margin-left: 15%;
      // margin: 0 auto;
      height: 60upx;
      background: #fff;
      border-radius: 30upx;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      text {
        display: inline;
        color: #666;
        font-size: 12px;
      }
    }
  }

  .home-box {
    width: 100%;

    .home-box-title {
      padding-left: 20rpx;
      margin: 30rpx 0;
      font-size: 14px;
      font-weight: bold;
    }

    .home-box-item {
      display: flex;
      justify-content: space-between;
      flex-flow: column wrap;
      align-items: center;
      width: 100%;
      height: 300rpx;
      white-space: nowrap;
      overflow: hidden;

      .home-box-image {
        display: inline-block;
        border-radius: 10px;
        flex-shrink: 0;
        width: 33.33%;
        margin: 0 5px;
        background: #fff;

        image {
          width: 90%;
          border-radius: 10px;
        }

        .home-box-text {
          width: 100%;
          display: flex;
          // justify-content: flex-start;
          align-items: center;

          image {
            width: 10px;
            flex-shrink: 0;
          }

          text {
            padding-left: 15upx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .home-like {
    width: 100%;
    display: flex;
    flex-flow: row wrap;

    .home-like-item {
      width: 46%;
      // margin: 0 15rpx 15rpx;
      background: #fff;
      margin: 0 2% 25upx;
      padding: 0 10upx;
      box-sizing: border-box;
      padding-bottom: 20upx;
      border-radius: 5px;

      &:nth-child(2n) {
        margin-left: 1%;
      }

      image {
        width: 100%;
      }

      .home-like-text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        word-break: break-all;
        height: 80rpx;
        line-height: 40rpx;
        // padding-bottom: 5upx;
        font-size: 30rpx;

        .home-like-box {
          width: 100%;
          display: flex !important;
          justify-content: space-around;

          .like-text1 {
            color: red;
          }
        }
      }
    }
  }
</style>
