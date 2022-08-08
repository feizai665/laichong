<template>
  <view>
    <uni-swiper-dot>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item>
        <view class="swiper-item"></view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item"></view>
      </swiper-item>
    </swiper>
    </uni-swiper-dot>
  </view>
</template>

<script>
  export default {
    name:"my-swiper",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">

</style>