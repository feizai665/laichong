<template>
  <view v-if="swiper.length" class="swiper">
    <!--    <uni-swiper-dot mode="default" :info="swiper" :current="current" :dotsStyles="dotsStyles"> -->
    <swiper @change="change" :autoplay="true" :circular="true" :indicator-dots="true" indicator-color="#ccc"
      indicator-active-color="#333" :interval="2000">
      <swiper-item v-for="item in swiper" :key="item._id">
        <view class="swiper-item">
          <image :src="item"></image>
        </view>
      </swiper-item>

    </swiper>
    <!-- </uni-swiper-dot> -->
  </view>
</template>

<script>
  export default {
    name: "my-swiper",
    props: {
      swiper: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        current: 0,
        dotsStyles: {
          backgroundColor: "#666",
          selectedBackgroundColor: "#fff"
        }
      };
    },
    methods: {
      change(e) {
        this.current = e.detail.current;
      }
    }
  }
</script>

<style lang="scss">
  .swiper {

    width: 750upx;
    height: 509upx;

    swiper {
      width: 100%;
      height: 509upx;

      .swiper-item {
        width: 100%;
        height: 100%;

        image {
          width: 100%;
          height: 100%;
          will-change: transform;
        }
      }
    }
  }

  /deep/ uni-swiper .uni-swiper-dot {
    display: inline-block;
    width: 16px;
    height: 3px;
    border-radius: 8px;
  }
</style>
