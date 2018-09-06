<template>
  <div id="mainDiv">
    <mt-header id = "mtheader"  title='领取红包'>
    </mt-header>
    <div id="areaCardDiv" style="height: 340px;overflow: scroll">
      <el-row>
        <el-col :span="12" v-for="areaBalance in areaBalances" :key='areaBalance.areaId'>
          <div @click="to_area(areaBalance.areaId)">
            <el-card class="yueDiv">
              <h5>{{areaBalance.areaName}}</h5>
              <h2>{{areaBalance.money}}元</h2>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="btnDiv">

    </div>
    <div class="noteDiv" v-show="hasCount==true?true:false">
      <span>每次提现金额最大值：200</span>
      <br/>
      <span>每日提现次数最大值：5</span>
    </div>
    <div class="noteDiv" v-show="hasCount==true?false:true">
      <span>您目前还没有获得现金红包奖励</span>
      <br/>
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  export default {
    data () {
      return {
        areaBalances: [],
        moneyLimit: 0,
        totalCount: 0,
        hasCount: false
      }
    },
    methods: {
      to_area (area) {
        this.$router.push('/home?areaId=' + area)
      }
    },
    created () {
      Indicator.open()
      var url = 'balance/info'
      this.$http.get(url).then(response => {
        if (response.data.code === 0) {
          this.totalCount = response.data.data.totalCount
          var areaBalances = response.data.data.areaBalances
          if (areaBalances.length > 0) {
            this.hasCount = true
          }
          for (var i = 0; i < areaBalances.length; i++) {
            areaBalances[i].areaName = this.getAreaName(areaBalances[i].areaId) + this.getAreaGameName(areaBalances[i].areaId)
          }
          this.areaBalances = response.data.data.areaBalances
          this.moneyLimit = response.data.data.moneyLimit
        } else {
          this.alertCode(response.data.code)
        }
        Indicator.close()
      }, response => {
        alert('请求发送异常')
        Indicator.close()
      })
    },
    mounted () {
      this.$('#mainDiv').css('height', this.$(window).height())
      this.$('.btnDiv').css('height', this.$(window).height() - 523)
    }
  }
</script>
<style scoped="scoped">
  #mtheader{
    font-size:24px;
    height:60px;
    margin-bottom: 0px;
    color: black;
    background-image: url("../assets/yue.png");

  }
  h1{
    text-align: left;
    font-size: 40px;
    margin:20px 10px 0px 60px;
  }
  h2{
    text-align: right;
    font-size: 32px;
    margin:0px 0px 0px 0px;
  }
  h5{
    text-align: left;
    font-size: 15px;
    margin: 0px 0px 0px 0px;
  }
  .yueDiv{
    background-image: url("../assets/yue.png");
    margin: 10px 10px 0px 10px;
    padding-top: 0px;
    padding-bottom: 0px;
    color: white;
  }
  .mesDiv{
    background-color: white;
    padding: 10px 10px;
    font-size: 15px;
    text-align: left;
  }
  .btnDiv{
    color: #cc0000;
    margin: 20px 0px;
  }
  .noteDiv{
    margin: 10px 0px;
    background-color: white;
    font-size: 15px;
    padding: 16px 0px;
  }
</style>
