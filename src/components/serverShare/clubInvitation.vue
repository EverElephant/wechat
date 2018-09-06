<template>
  <div id="mainDiv">
    <div id="clubInfoDiv">
      <el-col :span="20" :offset="4">
        <el-row type="flex" justify="left">
          <span>{{clubName}}</span>
        </el-row>
        <el-row type="flex" justify="left">
          <span>街坊圈ID：{{clubId}}</span>
        </el-row>
        <el-row type="flex" justify="left">
          <span>创建人：</span><span>{{clubManager}}</span>
        </el-row>
        <el-row type="flex" justify="left">
          <span>创建时间：</span><span>{{createTime | dateformat}}</span>
        </el-row>
      </el-col>
    </div>
    <div id="buttonDiv">
      <img src="../../assets/button.png" id="joinButton" :show='disableButton' @click="joinClub"></img>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        disableButton: false,
        imgUrl: 'xxx',
        clubName: 'xxx的俱乐部',
        clubId: 123456,
        clubManager: 'xxx',
        createTime: 1529660591000,
        area: 60001,
        playerId: 123456,
        shareTime: 1529660591000,
        shareType: 2
      }
    },
    methods: {
      joinClub () {
        if (this.disableButton === true) {
          return
        }
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.wxAppId + '&redirect_uri=' + this.wxRedirectURI + '/wechattools/club_share&response_type=code&scope=snsapi_userinfo&state=' + this.area + '*' + this.clubId + '*' + this.playerId + '*' + this.shareTime + '*' + this.shareType + '*' + this.wxRedirectURI + ':8110/joinClubSuccess?area=' + this.area + '&clubId=' + this.clubId + '&clubName=' + this.clubName + '&clubManager=' + this.clubManager + '&createTime=' + this.createTime + '#wechat_redirect'
        window.location.href = url
      }
    },
    created () {
      this.imgUrl = this.$route.query.imgUrl
      this.clubName = this.$route.query.clubName
      this.clubId = parseInt(this.$route.query.clubId)
      this.clubManager = this.$route.query.clubManager
      this.createTime = parseInt(this.$route.query.createTime)
      this.area = parseInt(this.$route.query.area)
      this.playerId = parseInt(this.$route.query.playerId)
      this.shareTime = parseInt(this.$route.query.shareTime)
      this.shareType = parseInt(this.$route.query.shareType)
      if (isNaN(this.shareTime)) {
        this.shareTime = 0
      }
      if (new Date().getTime() - this.shareTime > 18000000) {
        MessageBox({
          title: '邀请过期',
          message: '邀请已过期，请联系街坊圈玩家重新分享邀请',
          showCancelButton: false
        }).then(action => {
          this.disableButton = true
        })
      }
      var queryString = 'area=' + this.area + '&clubId=' + this.clubId + '&clubName=' + this.clubName + '&clubManager=' + this.clubManager + '&playerId=' + this.playerId + '&shareTime=' + this.shareTime + '&shareType=' + this.shareType + '&redirectUrl='
      this.$http.get('../gate/club?' + queryString).then(response => {
        console.log(JSON.stringify(response))
      })
    },
    mounted () {
      this.$('#mainDiv').css('height', this.$(window).height() * 0.84)
      this.$('#mainDiv').css('padding-top', this.$(window).height() * 0.16)
      this.$('#mainDiv').css('font-size', this.$(window).height() * 0.027)
      this.$('#joinButton').css('height', this.$(window).height() * 0.08)
      this.$('#clubInfoDiv').css('height', this.$(window).height() * 0.7)
      this.$('#joinButton').css('height', this.$(window).height() * 0.08)
    }
  }
</script>
<style scoped="shareScoped">
  #mainDiv {
    font-size: 18px;
    color: white;
    font-family: "幼圆";
    background-image: url("../../assets/sharebg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>

