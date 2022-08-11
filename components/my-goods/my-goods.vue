<template>
  <view class="" v-if="goods">

    <view class="detailTop">
      <view class="detailPrice">
        <text class="Price1">￥{{goods.price}}</text>
        <text class="Price2">￥{{goods.old_price}}</text>
      </view>
      <view class="detailName">
        <text>{{goods.name}}</text>
      </view>
      <view class="detailSales">
        <text class="Sales1">快递:包邮</text>
        <text>月销:{{goods.sales}}</text>
      </view>
    </view>
    <view class="detailBottom" id="Comm">
      <view class="BottomTitle">
        <text class="Bottom1">
          评价{{1111}}
        </text>
        <text class="Bottom2">
          查看更多
        </text>
      </view>
      <view class="BottomComm">
        <view class="CommTop">
          <image src="../../static/images/cart/wxpay.png" mode="widthFix"></image><text>受打击啊</text>
        </view>
        <view class="CommBottom" id="detaTop">
          <text>不错</text>
          <image src="../../static/images/home/goods1.jpg" mode="widthFix"></image>

        </view>
      </view>
    </view>
    <!-- #ifdef MP-WEIXIN||H5 -->
    <rich-text :nodes="goods.desc | filterImg">
    </rich-text>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
    <view class="u-content">
      <!--   <rich-text :nodes="goods.desc|filterImg" class="detailImg">
      </rich-text> -->
      <u-parse :content="goods.desc|filterImg" :showImgMenu="false"></u-parse>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
  export default {
    name: "goods_list",
    props: {
      goods: {
        type: Object,
        default: null
      }
    },
    onLoad() {},
    filters: {
      filterImg(text) {
        console.log(text.replace(/<img/g, '<img style="width:100%;"'));
        return text.replace(/<img/g, '<img style="width:100%;"')
      }
    },
    data() {
      return {
        commTop: 0,
        detailTop: 0
      };
    },
    mounted() {
      this.setComm()
    },
    methods: {
      setComm() {
        let that = this
        const query = uni.createSelectorQuery().in(that);
        query.select('#Comm').boundingClientRect(data => {
          that.commTop = data.top
          uni.setStorageSync('comm', that.commTop)
        }).exec();
        query.select('#detaTop').boundingClientRect(data => {
          that.detailTop = data.top
          uni.setStorageSync('deta', that.detailTop)
        }).exec();
        // 传值
        setTimeout(() => {
          uni.$emit('handleTop', {
            commTop: this.commTop,
            detailTop: this.detailTop
          })
        }, 300)
      }
    }
  }
</script>

<style lang="scss">
  .detailTop {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;

    .detailPrice {
      width: 100%;
      padding-bottom: 10px;

      .Price1 {
        font-size: 18px;
        color: #c00000;
        padding-right: 15px;
      }

      .Price2 {
        font-size: 12px;
        color: #666;
        text-decoration: line-through;
      }
    }

    .detailSales {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #666;
      padding-top: 10px;
    }
  }

  .detailBottom {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background: #fff;
    box-sizing: border-box;

    .BottomTitle {
      display: flex;
      justify-content: space-between;

      .Bottom1 {
        font-size: 16px;
        font-weight: bold;
      }

      .Bottom2 {
        font-size: 13px;
        color: #666;
      }
    }

    .BottomComm {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .CommTop {
        width: 100%;
        display: flex;
        align-items: center;
        padding-top: 10px;

        image {
          width: 60upx;
        }

        text {
          text-align: center;
          padding-left: 5px;
          font-size: 15px;
        }
      }

      .CommBottom {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        text {
          font-size: 15px;
          padding: 5px 0;
        }

        image {
          width: 180upx;
        }
      }
    }
  }
</style>
