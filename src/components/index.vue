<template>
  <div id="mainDiv">
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  export default {
    data () {
      return {
      }
    },
    methods: {
    },
    created () {
      Indicator.open()
      var url = 'balance/info'
      this.$http.get(url).then(response => {
        if (response.data.code === 0) {
          this.totalCount = response.data.data.totalCount
          var areaBalances = response.data.data.areaBalances
          if (areaBalances.length === 1) {
            this.$router.push('/home?areaId=' + areaBalances[0].areaId + '&showBack=hidden')
          } else {
            this.$router.push('/choose')
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
    mounted () {
      this.$('#mainDiv').css('height', this.$(window).height())
    }
  }
</script>

