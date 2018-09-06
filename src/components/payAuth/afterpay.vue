<!-- 网络断开页面 -->
<template>
  <div class="box">
    <div class="hint-text">订单已提交,<br>请返回游戏确认支付结果</div>
    <!--<div class="img-box">-->
      <!--<img src="../../assets/paysuccess.jpg">-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
  .box{
    background: linear-gradient(rgb(151,151,151) ,rgb(53,53,53));
    font-family: SimHei sans-serif;
    height: 100vh;
  }
.hint-text{
  color: white;
  position: absolute;
  top: 25%;
  width: 100%;
  font-size: 1.3rem;
  line-height: 2.2rem;
}
.img-box{
    padding-bottom:100%;
}
.img-box img{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    width:100%;
    height:100%;
    margin:auto;
}
</style>


