<template>
  <div id="mainDiv">
    <mt-header id = "mtheader"  :title="areaName">
      <mt-button v-show='show_back' slot='left' icon='back' @click='go_choose'></mt-button>
    </mt-header>
    <div class="yueDiv">
      <h2>余额（元）</h2>
      <el-col :span="12">
        <h1 v-if="money < 1" style="color: red">{{money}}</h1>
        <span v-if="money < 1" style="font-size: 15px;">满1元即可提现</span>
        <h1 v-if="money >= 1">{{money}}</h1>
      </el-col>
      <el-col :span="12">
        <h5>
          <!--底下这一行要放在一行，因为是一句话，放多行的话会造成每个span之间有3px的间距-->
          <span>本日剩余提现次数</span><span v-if="remainCount == 0" style="color: red">{{remainCount}}</span><span v-if="remainCount > 0">{{remainCount}}</span><span>/{{totalCount}}</span>
        </h5>
      </el-col>
    </div>
    <div class="btnDiv">
      <el-row type="flex" class="total_income" justify="space-between" align="center">
        <el-col :span="24">
          <mt-button type="primary" style="width: 300px;height: 47px;background-color: #70b911;font-size: 20px" @click="to_cash" v-show="cash_disabled==true?false:true">提&nbsp;&nbsp;现</mt-button>
          <mt-button type="primary" style="width: 300px;height: 47px;background-color: #8c939d;font-size: 20px" disabled="disabled" v-show="cash_disabled==true?true:false">提&nbsp;&nbsp;现</mt-button>
        </el-col>
        <!--<el-col :span="12">-->
          <!--<mt-button type="primary" style="width: 155px;height: 47px;background-color: #ff9702;font-size: 20px" @click="to_bill">账&nbsp;&nbsp;单</mt-button>-->
        <!--</el-col>-->
      </el-row>
    </div>
    <div class="mesDiv">
      <el-card class="box-card" style="height: 317px;overflow: scroll">
        <el-row>
          <div>
            <span>{{errorTime}}</span>
          </div>
          <div>
            <span style="color: #ca5100">{{errorMas}}</span>
          </div>
        </el-row>
        <el-row v-for='(item, index) in last_bill_table' v-if="index < 1" :key='last_bill_table.id'>
          <div>
            <span>{{item.updateTime | timeformat}}</span>
          </div>
          <!--<div>-->
            <!--<span>红包ID：</span>-->
            <!--<span>{{item.redPacketId}}</span>-->
          <!--</div>-->
          <div>
            <span>流水号：</span>
            <span>{{billingOrderId}}</span>
          </div>
          <div style="margin-bottom: 10px">
            <span>红包</span>
            <span style="color: #ca5100">{{item.updateStatus | redPoStatus}}</span>
          </div>
        </el-row>
      </el-card>
      <div style="margin-top: 6px;text-align:center;">
          <span>如红包</span><span style="color:red;">发放失败</span><span>, 请保存截图不要外泄,</span><br/>
          <span>咨询客服{{kefuhao}}, 补发红包</span>
      </div>
    </div>
    <div class="btnDiv">
      <el-row type="flex" class="total_income" justify="space-between" align="center">
        <el-col :span="24">
          <mt-button type="primary" style="width: 300px;height: 47px;background-color: #70b911;font-size: 20px" @click="to_bill">账&nbsp;&nbsp;单</mt-button>
        </el-col>
      </el-row>
    </div>
    <div class="noteDiv">
<!--      <span>话费奖励请打开游戏在“礼券商城”中领取</span>
      <br/>-->
      <span>如有疑问，请咨询客服“{{kefuhao}}”</span>
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  export default {
    data () {
      return {
        cash_disabled: false,
        show_back: true,
        areaId: 0,
        areaName: '',
        totalCount: 0,
        remainCount: 0,
        moneyLimit: 200,
        money: 0.00,
        billingOrderId: 0,
        last_bill_table: [],
        errorTime: '',
        errorMas: ''
      }
    },
    methods: {
      to_cash () {
        if (this.money < 1) {
          this.last_bill_table = []
          this.errorTime = this.formatTime()
          this.errorMas = '提现失败  原因：余额不足1元'
          return
        }
        if (this.remainCount === 0) {
          this.last_bill_table = []
          this.errorTime = this.formatTime()
          this.errorMas = '提现失败  原因：本日提现次数不足'
          return
        }
        var cashMoney = this.money
        if (this.money > this.moneyLimit) {
          cashMoney = this.moneyLimit
        }
        Indicator.open()
        var url = 'balance/redpacket/last/status'
        this.$http.get(url).then(response => {
          if (response.data.code === 0) {
            if (response.data.data != null && response.data.data.list != null) {
              if (response.data.data.list[0].updateStatus === 6 || response.data.data.list[0].updateStatus === 4 || response.data.data.list[0].updateStatus === 3) {
                this.$router.push('/cash?money=' + cashMoney + '&areaId=' + this.areaId)
              } else {
                this.last_bill_table = response.data.data.list
              }
            } else {
              this.$router.push('/cash?money=' + cashMoney + '&areaId=' + this.areaId)
            }
          } else {
            this.alertCode(response.data.code)
          }
          Indicator.close()
        }, response => {
          alert('请求发送异常')
          Indicator.close()
        })
      },
      to_bill () {
        this.$router.push('/bill')
      },
      go_choose () {
        this.$router.push('/choose')
      }
    },
    created () {
      Indicator.open()
      if (this.$route.query.showBack === 'hidden') {
        this.show_back = false
      }
      this.areaId = parseInt(this.$route.query.areaId)
      this.areaName = this.getAreaName(this.areaId) + this.getAreaGameName(this.areaId)
      var url = 'balance/info'
      this.$http.get(url).then(response => {
        if (response.data.code === 0) {
          this.totalCount = response.data.data.totalCount
          this.remainCount = this.totalCount - response.data.data.todayCount
          var money = 0
          for (var i = 0; i < response.data.data.areaBalances.length; i++) {
            if (parseInt(response.data.data.areaBalances[i].areaId) === parseInt(this.areaId)) {
              money = response.data.data.areaBalances[i].money
              break
            }
          }
          this.money = money.toFixed(2)
        } else {
          this.alertCode(response.data.code)
        }
        if (this.money < 1 || this.remainCount < 1) {
          this.cash_disabled = true
        }
        Indicator.close()
      }, response => {
        alert('请求发送异常')
        this.cash_disabled = true
        Indicator.close()
      })
      url = 'balance/redpacket/last/status'
      this.$http.get(url).then(response => {
        if (response.data.code === 0) {
          this.billingOrderId = response.data.data.billingOrderId
          this.last_bill_table = response.data.data.list
        } else {
          this.alertCode(response.data.code)
        }
//        alert(JSON.stringify(response.data.data))
        if (response.data.data != null && response.data.data.list != null) {
          if (response.data.data.list[0].updateStatus !== 6 && response.data.data.list[0].updateStatus !== 4 && response.data.data.list[0].updateStatus !== 3) {
            this.cash_disabled = true
          }
        }
        Indicator.close()
      }, response => {
        alert('请求发送异常')
        this.cash_disabled = true
        Indicator.close()
      })
    },
    mounted () {
      this.$('#mainDiv').css('height', this.$(window).height())
      this.$('.box-card').css('height', this.$(window).height() - 488)
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
    margin:20px 10px -8px 60px;
  }
  h2{
    text-align: left;
    font-size: 20px;
    margin:0px 0px 0px 30px;
  }
  h5{
    text-align: right;
    font-size: 15px;
    margin: 40px 20px 0px 0px;
  }
  .yueDiv{
    background-image: url("../assets/yue.png");
    padding-top: 15px;
    padding-bottom: 15px;
    color: black;
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
