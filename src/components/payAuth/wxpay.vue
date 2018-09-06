<!-- 支付redirect -->
<template>
  <div style="text-align:center;color:blue;padding-top:30px;">
    <span>微信支付剩余时间: {{down}} ,<a>跳转回购买页面</a></span>
  </div>
</template>

<script>
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
      // alert(document.referrer)
      // alert(JSON.stringify(this.apiparam));
      this.countdown()
      let payto = this.$route.query.payto
      let isapp = this.$route.query.isapp
      let domain = payto
      let newparam = ''
      if(payto){
        domain = payto.split('?')[0]
        let paramstr = payto.split('?').length > 1 ? payto.split('?')[1] : ''
        let params = ''
        if(paramstr.length > 0){
          params = paramstr.split('&')
        }
        newparam = ''
        if(params && params.length > 1) {
          for (var i = 0; i < params.length; i++) {
            let item = params[i].split('=')
            if(item.length > 1){
              if (i > 0) {
                newparam = newparam + '&'
              }
              newparam = newparam + item[0] + '=' + encodeURIComponent(item[1])
            }
          }
        }
      }
      if ((document.referrer === window.location.href || document.referrer.length < 10) && (!isapp || isapp === false)) {
        if(window.top) {
          window.top.close()
        }
        else {
          window.close()
        }
      } else {
         let redirect_domain = window.location.host;
         let redirect_url = 'http://' + redirect_domain + '/plug_in/afterpay';
         window.location.href = domain + (newparam.length > 0 ? '?' : '') + newparam + (newparam.length > 0 ? '&' : '?')
         + (isapp === 'true' ? 'redirect_url=' + encodeURIComponent(redirect_url) : '');
      }
    },

    mounted () {
    },
    methods: {
      countdown () {
        this.seconds = 50
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
