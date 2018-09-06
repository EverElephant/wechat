<template>
  <div id="mainDiv">
    <div id="clubInfoDiv">
      <el-col :span="20" :offset="4">
        <el-row  type="flex" justify="left">
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
      <img src="../../assets/button.png" id="joinButton"></img>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        imgUrl: '',
        clubName: '',
        clubId: 0,
        clubManager: '',
        createTime: 0,
        area: 60001,
        playerId: 0,
        shareTime: 0,
        shareType: 2
      }
    },
    methods: {
    },
    created () {
      this.clubName = this.$route.query.clubName
      this.clubId = parseInt(this.$route.query.clubId)
      this.clubManager = this.$route.query.clubManager
      this.createTime = parseInt(this.$route.query.createTime)
      this.area = parseInt(this.$route.query.area)
      MessageBox({
        title: '申请成功',
        message: '申请成功，即将跳转至下载页，如您已下载街坊麻将请返回应用',
        showCancelButton: false
      }).then(action => {
        var url = this.getDownloadURL(this.area)
        window.location.href = url
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
  #mainDiv{
    font-size: 18px;
    color: white;
    font-family:"幼圆";
    background-image: url("../../assets/sharebg.jpg");
    background-repeat:no-repeat;
    background-size:100% 100%;
  }
</style>

