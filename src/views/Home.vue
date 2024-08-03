<template>
  <el-row>
    <el-col :span="8" style="padding-right:10px">
      <div class="grid-content bg-purple">
        <el-card class="box-card" style="width: 540px;margin:0 auto">
          <div class="user">
            <img src="../assets/images/user.jpg" alt="">
            <div class="userinfo">
              <p class="name">Nicole</p>
              <p class="access">超級管理員</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登陸時間: <span>2024-07-20</span></p>
            <p>上次登陸地點: <span>桃園</span></p>
          </div>
        </el-card>
        <el-card style="margin-top:20px;height: 440px;">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              v-for="(val,key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="16"  style="padding-left:10px">
      <div class="grid-content bg-purple-light">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
            <i :class="`el-icon-${item.icon}`" class="icon" :style="`background-color:${item.color}`"></i>
            <div class="detail">
              <p class="price">${{item.value}}</p>
              <p class="desc">{{item.name}}</p>
            </div>
          </el-card>
        </div>
      </div>
      <el-card style="height:280px">
        <div ref="echarts1" style="height:280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px;width:48%">
          <div ref="echarts2" style="height:260px"></div>
        </el-card>
        <el-card style="height:260px;width:48%">
          <div ref="echarts3" style="height:240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import { getData } from "@/api";
import * as echarts from 'echarts'
export default {
  name: 'Home',
  data() {
    return {
      tableData:[],
      tableLabel: {
        name:'課程',todayBuy:'今日購買',monthBuy:'本月購買',totalBuy:'總購買'
      },
      countData: [
        {
          name: '今日支付訂單',
          value: 1234,
          icon: 'success',
          color:'#2ec7c9'
        },
        {
          name: '今日收藏訂單',
          value: 210,
          icon: 'star-on',
          color:'#ffb980'
        },
        {
          name: '今日未支付訂單',
          value: 1234,
          icon: 's-goods',
          color:'#5ab1ef'
        },
        {
          name: '本月支付訂單',
          value: 1234,
          icon: 'success',
          color:'#2ec7c9'
        },
        {
          name: '本月收藏訂單',
          value: 210,
          icon: 'star-on',
          color:'#ffb980'
        },
        {
          name: '本月未支付訂單',
          value: 1234,
          icon: 's-goods',
          color:'#5ab1ef'
        }
      ]
    }
  },
  mounted(){
    getData().then(({data:{data}})=>{
      const {orderData,tableData,userData,videoData} = data
      this.tableData = tableData
      //折線圖
      // 基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图表的配置项和数据
      let echarts1Option = {}
      echarts1Option.title = {
          text: '近期各大品牌手機銷量'
        }
      const echarts1xAxis = Object.keys(orderData.data[0])
      echarts1Option.xAxis = {data:orderData.date}
      echarts1Option.yAxis = {}
      echarts1Option.legend = { data: echarts1xAxis }
      echarts1Option.tooltip = {}
      echarts1Option.series = []
      echarts1xAxis.forEach(key =>{
        echarts1Option.series.push(
          {
            name: key ,
            type: 'line',
            data: orderData.data.map(ele => ele[key])
          }
        )
      })
      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echarts1Option);
      //柱狀圖
      const echarts2 = echarts.init(this.$refs.echarts2)
      let echarts2Option = {}
      echarts2Option.legend = {
        textStyle: {
          color:"#333"
        }
      }
      echarts2Option.title = {
          text: '本周新增用戶與活躍用戶'
        }
      echarts2Option.xAxis = {
        type:"category",
        data: userData.map(item => item.date)
      }
      echarts2Option.yAxis = {
        type:"value"
      }
      echarts2Option.series = [
        {
        type: 'bar',
        data: userData.map(item => item.new)
        },
        {
        type: 'bar',
        data: userData.map(item => item.active)
        }
      ]
      echarts2Option.tooltip = {trigger:'axis'}
      
      echarts2.setOption(echarts2Option);
      //餅圖
      const echarts3 = echarts.init(this.$refs.echarts3)
      let echarts3Option = {
        tooltip : {
          trigger:"item"
        },
        color: [
          "#of78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        series: [
          {
            type: 'pie',
            data: videoData
          }
        ]
      }
      echarts3.setOption(echarts3Option);
    })


  }
  }
</script>

<style lang="less">
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  } 
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color:#999999;
    }
  }
}
.login-info {
  padding:20px 0;
  p {
    line-height: 28px;
    font-size: 14px;
    color:#999999;
    span {
      color:#666;
      padding-left:60px ;
    }
  }

}
.num {
  display: flex;
  flex-wrap:wrap;
  justify-content:space-between;
  .el-card {
    width: 32%;
    margin-bottom:20px;
  }
  .icon {
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    color:#fff;
    margin-right:15px;
  }
  .detail {
    display:flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
.graph {
  display:flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>