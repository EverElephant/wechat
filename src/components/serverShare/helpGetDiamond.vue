<template>
  <div id="mainDiv">
    <div id="playerInfoDiv" @click="helpGetDiamond">
      <el-col :span="6" :offset="2">
        <el-row type="flex" justify="center">
          <img :src="headUrl" style="border-radius:100%;height:70%;width:70%;border: #ffd174 2px solid"></img>
        </el-row>
        <el-row type="flex" justify="center" style="color: #fbe7d3">
          <span>{{nickName | lengthLimit}}</span>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row type="flex" justify="left">
          <img src="../../assets/helpGet-head.png" style="height:90%;width:90%" @click="helpGetDiamond"></img>
        </el-row>
      </el-col>
    </div>
    <div id="buttonDiv" @click="helpGetDiamond">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <img src="../../assets/helpGet-helpButton.png" class="buttonImg" style="height:90%;width:90%;"
          ></img>
        </el-col>
      </el-row>
    </div>
    <div id="bannerDiv">
      <el-row type="flex" justify="center">
        <el-col :span="23">
          <img src="../../assets/helpGet-banner.png" class="buttonImg" style="height:100%;width:100%"></img>
        </el-col>
      </el-row>
    </div>
    <div id="detailDiv">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-row id="detailHead" type="flex" justify="center" style="color: #126262">
            <el-col :span="12">
              <span>助力记录</span>
            </el-col>
            <el-col :span="12">
              <span>共{{totalCount}}钻石</span>
            </el-col>
          </el-row>
          <div id="detailTable" style="margin-top: 10px;overflow: scroll">
            <el-row align="middle" type="flex" justify="center" v-for='(item, index) in detail_data'
                    :key='item.createTime' class="detailTr"
                    style="margin-bottom: 2px">
              <el-col :span="4" :offset="1">
                <img :src="item.headUrl" style="margin-top:5px;border-radius:100%;height:80%;width:100%;"/>
              </el-col>
              <el-col :span="9" class="detailText1">
                <span>{{item.nickName | lengthLimit}}</span>
              </el-col>
              <el-col :span="10" class="detailText2">
                <span>助力</span><span class="bigText" style="color: #ffc561">{{item.helpCount}}</span><span>钻石</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        headUrl: 'https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/dfad79656172e5a4a7e5a4a7e5ae9d4c36',
        nickName: '未知玩家',
        isPlayer: 0,
        area: 0,
        roleId: 0,
        orderId: '',
        totalCount: 0,
        createTime: 0,
        detail_data: []
      }
    },
    methods: {
      sortByKey (array, key) {
        return array.sort(function (a, b) {
          var x = a[key]
          var y = b[key]
          return ((x > y) ? -1 : ((x < y) ? 1 : 0))
        })
      },
      queryHelpData () {
        this.$http.get('../wechattools/helpGetDiamond/list?areaId=' + this.area + '&roleId=' + this.roleId + '&orderId=' + this.orderId).then(response => {
//          alert(JSON.stringify(response.data))
          var data = JSON.parse(response.data.data)
          if (data === -6) {
            alert('玩家不存在')
            return
          }
          if (data === -8) {
            alert('助力信息不存在')
            return
          }
          this.nickName = data.nickName
          this.headUrl = data.headUrl
          this.isPlayer = data.isPlayer
          this.totalCount = data.totalCount
          this.createTime = data.createTime
          this.detail_data = this.sortByKey(data.details, 'createTime')
        }, response => {
          alert('请求发送异常')
        })
      },
      helpGetDiamond () {
        // 48小时
        if (new Date().getTime() - this.createTime > 172800000) {
          MessageBox({
            title: '活动失效',
            message: '活动已失效',
            showCancelButton: false
          })
          return
        }
        this.$http.get('../wechattools/helpGetDiamond/dig?areaId=' + this.area + '&roleId=' + this.roleId + '&orderId=' + this.orderId).then(response => {
//          alert(JSON.stringify(response.data))
          var data = JSON.parse(response.data.data)
          if (data === -6 || data === -8) {
            alert('助力信息不存在')
            return
          }
          if (data === -1) {
            MessageBox({
              title: '已助力过',
              message: '您已助力过了，不能再次助力',
              showCancelButton: false
            })
            return
          }
          if (data === -2) {
            MessageBox({
              title: '已获全部',
              message: '已经获取全部奖励',
              showCancelButton: false
            })
            return
          }
          if (data === -3) {
            MessageBox({
              title: '无法助力',
              message: '自己不能给自己助力获钻哦',
              showCancelButton: false
            })
            return
          }
          if (data >= 1) {
            if (this.isPlayer === 0) {
              MessageBox({
                title: '助力成功',
                message: '帮助好友获取' + data + '钻石,下载游戏再帮好友拿更多钻石',
                showCancelButton: false
              }).then(action => {
                var url = this.getDownloadURL(this.area)
                window.location.href = url
              })
            } else {
              MessageBox({
                title: '助力成功',
                message: '帮助好友获取' + data + '钻石',
                showCancelButton: false
              }).then(action => {
                this.queryHelpData()
              })
            }
          }
        }, response => {
          alert('请求发送异常')
        })
      }
    },
    created () {
      this.area = parseInt(this.$route.query.area)
      this.roleId = parseInt(this.$route.query.roleId)
      this.orderId = this.$route.query.orderId
      this.queryHelpData()
    },
    mounted () {
      this.$('#mainDiv').css('height', this.$(window).height())
      this.$('#mainDiv').css('font-size', this.$(window).height() * 0.027)
      this.$('#playerInfoDiv').css('padding-top', this.$(window).height() * 0.05)
      this.$('#playerInfoDiv').css('height', this.$(window).height() * 0.17)
      this.$('#buttonDiv').css('height', this.$(window).height() * 0.10)
      this.$('#bannerDiv').css('height', this.$(window).height() * 0.13)
      this.$('#detailDiv').css('height', this.$(window).height() * 0.48)
      this.$('#detailDiv').css('padding-top', this.$(window).height() * 0.07)
      this.$('#detailHead').css('font-size', this.$(window).height() * 0.035)
      this.$('#detailTable').css('height', this.$(window).height() * 0.37)
      this.$('#detailTable').css('margin-top', this.$(window).height() * 0.03)
      this.$('.detailTr').css('height', this.$(window).height() * 0.1)
      if (this.$(window).height() / this.$(window).width() < 1.4) {
        this.$('.buttonImg').css('height', '70%')
        this.$('.buttonImg').css('width', '70%')
      }
    }
  }
</script>
<style scoped="shareScoped">
  #mainDiv {
    font-size: 18px;
    color: #ffffff;
    font-family: "幼圆";
    background-image: url("../../assets/helpGet-backgroud.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  #detailDiv {
    background-image: url("../../assets/helpGet-table.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 90% 90%;
  }

  .detailTr {
    background-image: url("../../assets/helpGet-tr.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
</style>

