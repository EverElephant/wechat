<template>
  <div id="mainDiv">
    <div class="yueDiv">
      <h2>确定提现{{money}}元?</h2>
      <h5>注：单笔提现金额不得超过200元</h5>
    </div>
    <div class="btnDiv">
      <div>
        <mt-button type="primary" style="width: 241px;height: 47px;background-color: #70b911;font-size: 20px" @click="do_cash">确&nbsp;&nbsp;&nbsp;&nbsp;定</mt-button>
      </div>
      <div>
        <mt-button type="primary"  style="width: 241px;height: 47px;background-color: #ff9702;font-size: 20px" @click="go_back">取&nbsp;&nbsp;&nbsp;&nbsp;消</mt-button>
      </div>
    </div>

    <div class="noteDiv">
      <span>如有疑问，请咨询客服“{{kefuhao}}”</span>
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  export default {
    data () {
      return {
        areaId: 0,
        money: 0.00
      }
    },
    methods: {
      do_cash () {
        Indicator.open()
//      为了安全，增加五秒等待时间后再发送请求
        setTimeout(
          this.send_cash, 4000)
      },
      go_back () {
        this.$router.back(-1)
      },
      go_home () {
        this.$router.push('/home?areaId=' + this.areaId)
      },
      send_cash () {
        var url = 'balance/withdraw'
        this.$http.post(url + '?money=' + this.money + '&areaId=' + this.areaId).then(response => {
          setTimeout(this.go_home, 2000)
        }, response => {
          alert('请求发送异常')
          Indicator.close()
        })
      }
    },
    created () {
      this.money = this.$route.query.money
      this.areaId = this.$route.query.areaId
    },
    mounted () {
      this.$('#mainDiv').css('height', this.$(window).height() - 50)
      this.$('.btnDiv').css('height', this.$(window).height() - 361)
    }
  }
</script>
<style scoped="scoped">
  #mainDiv{
    padding-top: 50px;
  }
  .yueDiv{
    background-image: url("../assets/yue.png");
    padding-top: 10px;
    padding-bottom: 40px;
    color: black;
  }
  .yueDiv h2{
    font-size: 30px;
  }
  .yueDiv h5{
    text-align: center;
    font-size: 15px;
  }
  .btnDiv{
    height: 242px;
    color: #cc0000;
    margin: 40px 0px;
  }
  .btnDiv div{
    margin: 20px 0px;
  }
  .noteDiv{
    margin: 10px 0px;
    background-color: white;
    font-size: 15px;
    padding: 26px 0px;
  }
</style>
