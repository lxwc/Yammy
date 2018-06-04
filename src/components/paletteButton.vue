<template>
  <div style="text-align:center;padding-top:200px;">
    <mt-palette-button content="返回首页" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
      direction="lt" class="pb" :radius="100" ref="target_3"
      style="right:30px;">
      <div class="my-icon-button indexicon icon-popup" ></div>
      <div class="my-icon-button indexicon icon-popup" ></div>
      <div class="my-icon-button indexicon icon-popup" ></div>
    </mt-palette-button>
  </div>
</template>

<script>
  export default {
    methods: {
      main_log(val) {
        console.log('main_log', val);
          this.$router.push("/home");        
      },
      sub_log(val) {
        // this.$refs.target_3.collapse();
        // console.log('sub_log', val);
        if(val == 1){
          this.$router.push("/home");
        }
        if(val == 2){
          this.$router.push("/setting");
        }
        if(val == 3){
          window.history.go(-1);
        }
      }
    }
  };
</script>

<style>
  .pb{
    width: 60px;
    height: 60px;
    line-height: 60px;
    color: #FFF;
    position:absolute;
    bottom: 30px;
  }
  .my-icon-button{
    width:0px;
    height:0px;
    border-radius:50%;
    background-color:#5d7c33;
    color: #fff;
    line-height:0px;
    text-align:center;
  }
  .mint-main-button{
    color: #fff;
    background-color:#5d7c33;
    font-size: .26rem;
    opacity: 0.8;
    
  }
</style>