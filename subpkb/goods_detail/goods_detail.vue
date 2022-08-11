<template>
  <view v-if="goodsList.length">
    <scroll-view scroll-y="true" class="scrollView" @scroll="handleChange" :scroll-top="commTop">
      <u-transition :show="isShowTop" mode="fade-down" duration="200">
        <view class="listTop">
          <u-tabs :list="list2" @click="handleScroll" :current="current"></u-tabs>
          <!-- #ifdef H5 -->
          <u-line direction="row"></u-line>
          <!-- #endif -->
        </view>
      </u-transition>
      <view class="navBack" v-show="!isShowTop">
        <navigator open-type="navigateBack">
          <u-icon name="arrow-left" size="24" color="#ccc"></u-icon>
        </navigator>
      </view>
      <my-swiper :swiper="goodsList[0].banner" height="800upx"></my-swiper>
      <my-goods :goods="goodsList[0]"></my-goods>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsList: [],
        isShowTop: false,
        list2: [{
            name: '商品',
          },
          {
            name: '评论'
          },
          {
            name: '详情'
          }
        ],
        commTop: 0,
        commScroll: 0,
        detailScroll: 0,
        current: 0

      }
    },
    onLoad(options) {
      // console.log(options.goods_id);
      // this.goods_id = options.good_id
      this.getDetails(options.good_id)
      uni.$on('handleTop', (e) => {
        console.log(e);
        this.commScroll = e.commTop - 40
        this.detailScroll = e.detailTop - 80
        // #ifndef H5
        this.commScroll = e.commTop
        this.detailScroll = e.detailTop
        // #endif
      })
    },
    methods: {
      async getDetails(id) {
        const {
          data: res
        } = await uni.$http.post('/api/get_goods_detail', {
          goods_id: id
        })
        this.goodsList = res.data
        console.log(this.goodsList);
      },
      // 滚动条改变时， 导航栏选中者变
      handleChange(e) {
        switch (true) {
          case e.detail.scrollTop >= this.detailScroll: {
            console.log(333333);
            this.current = 2
            break;
          }

          case e.detail.scrollTop >= this.commScroll: {
            console.log(2222222);
            this.current = 1
            break;
          }
          case e.detail.scrollTop > 50: {
            console.log(11111111111);
            this.isShowTop = true
            this.current = 0
            break;
          }
          default: {
            this.isShowTop = false
            this.current = 0
          }
        }

      },
      // 点击导航栏时，跳到指定位置
      handleScroll(e) {
        switch (e.name) {
          case "详情": {
            this.commTop = 0
            this.current = 2
            this.$nextTick(() => {
              this.isShowTop = true
              this.commTop = this.detailScroll
            })
            break;
          }
          case "商品": {
            this.commTop = 100
            this.current = 0
            this.$nextTick(() => {
              this.isShowTop = true
              this.commTop = 0
            })
            break;
          }
          case "评论": {
            this.commTop = 0
            this.current = 1
            this.$nextTick(() => {
              this.isShowTop = true
              this.commTop = this.commScroll
            })
            break
          }
        }

      },
      // #ifdef MP-WEIXIN
      // handleTabs(e) {
      //   console.log(e);
      //   this.current = e.index
      // }
      // #endif
      // 从组件接受 top值
      // handleTop(e) {
      //   console.log(11111111111111111);
      //   this.commScroll = e.commTop - 40
      //   this.detailScroll = e.detailTop - 100
      //   console.log(this.commScroll, this.detailScroll);
      // }
    }
  }
</script>

<style lang="scss">
  .navBack {
    position: fixed;
    z-index: 1;
    top: var(--status-bar-height);
    background: rgba(98, 98, 88, 0.7);
    border-radius: 50%;
    left: var(--status-bar-height);
    /* #ifndef MP-WEIXIN|| APP-PLUS*/
    top: 10px;
    left: 20px;
    /* #endif */
  }

  .scrollView {
    height: 100vh;
  }


  .appList {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    position: fixed;
    background: #fff;
    margin-top: var(--status-bar-height);
    z-index: 1000;
    top: -10px;
  }

  /* #ifdef MP-WEIXIN || APP-PLUS*/
  .listTop {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 60px;
    // line-height: 60px;

    position: fixed;
    background: #fff;
    z-index: 1001;
    top: 0;
  }

  /deep/ .u-tabs__wrapper__nav__item__text.data-v-48634e29 {
    display: block;
  }

  /deep/ .u-tabs__wrapper__nav__item.data-v-48634e29 {
    width: 33.33%;
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
  }

  // /deep/ .u-tabs__wrapper__nav__item.data-v-48634e29 {
  //   box-sizing: border-box;
  //   background: #fff;
  // }



  // /deep/ .u-tabs__wrapper__nav__item.data-v-48634e29 {
  //   width: 33.33%;
  //   box-sizing: border-box;
  //   z-index: 10;
  // }


  /* #endif */


  /* #ifdef H5*/
  .listTop {
    width: 100%;
    // display: flex;
    // align-items: center;
    height: 50px;
    position: fixed;
    background: #fff;
    z-index: 1001;
    top: var(--status-bar-height);
  }

  /deep/ .u-tabs__wrapper__nav__item.data-v-48634e29 {

    box-sizing: border-box;
    background: #fff;
  }


  /deep/ .u-tabs__wrapper__nav__item[data-v-48634e29] {
    width: 33.33%;
    box-sizing: border-box;
    z-index: 1000;
  }

  /* #endif */
</style>
