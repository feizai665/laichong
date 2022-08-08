<template>
  <view>
    <my-swiper></my-swiper>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    onShow() {
    this.getSwiper()
    },
    methods:{
      getSwiper(){
        const aa = uni.$http.post('/api/get_banner')
        console.log(aa);
      }
    }
  }
</script>

<style lang="scss">

</style>
