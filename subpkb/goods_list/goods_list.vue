<template>
  <view>
    <my-swiper :swiper="goodsList[0].banner" height="800upx"></my-swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_id: '',
        goodsList: []
      };
    },
    onLoad(options) {
      // console.log(options.goods_id);
      // this.goods_id = options.good_id
      this.getDetails(options.good_id)
    },
    methods: {
      async getDetails(id) {
        const {
          data: res
        } = await uni.$http.post('/api/get_goods_detail', {
          goods_id: id
        })
        this.goodsList = res.data
        console.log(this.goodsList[0].banner);
      }
    }
  }
</script>

<style lang="scss">

</style>
