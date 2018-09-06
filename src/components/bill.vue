<template>
    <div id="mainDiv">
      <mt-header id = "mtheader"  title='我的账单'>
        <mt-button slot='left' icon='back' @click='go_back'></mt-button>
      </mt-header>
      <div class="header">
        <el-row type="flex" class="total_income" justify="space-between" align="center">
          <el-col :span="12" style="padding-top: 10px">
            <span style="font-size: 20px">共计收入(元)：{{income_total}}</span>
          </el-col>
          <el-col :span="12" align="right" style="padding-top: 8px">
            <el-input style="width: 120px"
              placeholder="请选择日期"
              icon="date"
              v-model="query_date"
              readonly
              :on-icon-click="pick_date">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <mt-loadmore :bottom-method='load_bottom' @bottom-status-change='handleBottomChange' :bottom-all-loaded='allLoaded'
                     ref='loadmore' :autoFill='auto_fill'>
        <div v-for='item of detail_table' :key='detail_table.id'>
          <mt-cell style="height: 50px" :title='item.operateTime | timeformat' :label='"流水号："+item.serialNo'>
            <div style="text-align: right">
              <div style="font-size: 20px">{{(item.endMoney - item.beginMoney)|moneyformat}} </div>
              <div style="font-size: 13px">
                <span style="position: absolute;right: 40px">余额：</span>
                <span>{{item.endMoney|moneyformat}}</span>
              </div>
            </div>
          </mt-cell>
        </div>
        </mt-loadmore>
      </div>
      <div style=" position: absolute; bottom:0px; width:100%; height:65px;"></div>
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="picker_date"
        @confirm="date_confirm">
      </mt-datetime-picker>
    </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  export default {
    data () {
      return {
        detail_table: [],
        picker_date: new Date(),
        query_date: '',
        income_total: 0,
        allLoaded: false,
        auto_fill: false,
        current_page: 1,
        page_size: 10
      }
    },
    methods: {
      query_bill (isFirst) {
        if (isFirst) {
          this.detail_table = []
        }
        var url = 'balance/log/list'
        var queryString = 'pagenum=' + this.current_page + '&pagesize=' + this.page_size
        if (this.query_date !== '') {
          queryString = queryString + '&date=' + this.query_date
        }
        this.$http.get(url + '?' + queryString).then(response => {
          if (response.data.code === 0) {
            this.income_total = response.data.data.income
//            alert(JSON.stringify(response.data.data.table))
            for (var j = 0; j < response.data.data.table.list.length; j++) {
              this.detail_table.push(response.data.data.table.list[j])
            }
            if (response.data.data.table.hasNextPage === false) {
              this.allLoaded = true
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
      go_back () {
        this.$router.go(-1)
      },
      pick_date () {
        this.$refs.picker.open()
      },
      date_confirm () {
        this.query_date = this.formatDate(this.picker_date)
        Indicator.open()
        this.query_bill(true)
      },
      load_bottom () {
        this.current_page = this.current_page + 1
        this.query_bill(false)
      },
      handleBottomChange (status) {
        this.bottomStatus = status
      }
    },
    created () {

    },
    mounted () {
      this.$('#mainDiv').css('min-height', this.$(window).height())
      Indicator.open()
      this.query_bill(true)
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
  .total_income{
    background-color: #eee;
  }
  .header{
    height: 50px;
  }
  .table{
    text-align: left;
  }
</style>
