<!-- 支付redirect -->
<template>
  <div style="text-align:center;color:blue;padding-top:30px;">
    <span>剩余时间: {{down}} ,<a>跳转回购买页面</a></span>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        apiparam: null,
        minutes: 1,
        seconds: 0,
        down: null,
        count: 0,
        jspayup: false
      }
    },
    created () {
      this.apiparam = this.api
      for (var param in this.apiparam) {
        this.apiparam[param] = String(this.apiparam[param])
      }
      this.countdown()
    },
    mounted () {
    },
    watch: {
      count: function (value) {
        if (value >= 1) {
          if (typeof window.WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', this.jsApiCall)
              document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall)
            }
          } else if (this.jspayup === false) {
            this.callpay(this.apiparam)
            this.jspayup = true
          }
        }
      }
    },
    methods: {
      countdown () {
        this.seconds = 60
        var seconds = this.seconds
        var mins = this.minutes
        var self = this

        function tick () {
          var currentMinutes = mins - 1
          seconds--
          self.count++
          self.down = currentMinutes.toString() + ':' + (seconds < 10 ? '0' : '') + String(seconds)
          if (currentMinutes === 0 && seconds === 0) {
            setTimeout(() => {
              window.location.href = this.refer + '?hash=' + Math.random()
            }, 3000)
            // window.location.href = this.refer + '?hash=' + Math.random();
          }
          if (seconds > 0) {
            setTimeout(tick, 1000)
          } else {
            if (mins > 1) {
              self.countdown(mins - 1)
            }
          }
        }

        tick()
      },
      jsApiCall (data) {
        window.WeixinJSBridge.invoke(
          'getBrandWCPayRequest', 
          {
            "appId": data.appId.toString(),
            "timeStamp": data.timeStamp.toString(),
            "package": data.package.toString(),
            "paySign": data.paySign.toString(),
            "signType": data.signType.toString(),
            "nonceStr": data.nonceStr.toString()
          },
          function (res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              MessageBox({
                title: '支付成功',
                message: '支付成功',
                showConfirmButton: true
              })
            } else {

            }
          }
        )
      },
      callpay (data) {
        console.log(JSON.stringify(data))
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.jsApiCall)
            document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall)
          }
        } else {
          this.jsApiCall(data)
          setTimeout(() => {
            window.location.href = this.refer + '?hash=' + Math.random()
          }, 10000)
        }
      }
    }
  }
</script>

<style scoped>
  .marquee {
    opacity: 0.6;
    /*line-height: 30px;*/
    /*background-color: #ccc;*/
    /*background-color: rgba(224, 222, 222, 0.55);*/
    /*overflow: hidden;
    position: relative;*/
  }

  .marquee div {
    width: 98%;
    font-size: 18px;
    margin: 0 auto;
    overflow-x: hidden;
    padding-bottom: 5px;
    overflow-y: auto;
    /*display: block;
    width: 200%;
    height: 30px;*/

    /*position: absolute;
    overflow: hidden;
    -webkit-animation: marquee 4s linear infinite;
    -moz-animation: marquee 4s linear infinite;
    -ms-animation: marquee 4s linear infinite;
    -o-animation: marquee 4s linear infinite;
    animation: marquee 4s linear infinite;*/
  }

  .marquee div p {
    /*text-indent: 28px;*/
  }

  .marquee div span {
    font-size: 13px;
  }


</style>
