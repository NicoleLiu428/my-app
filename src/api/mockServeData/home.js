//mock數據模擬
import Mock from 'mockjs'
//圖表數據
let List = []
export default {
  getStatisticalData: () => {
    //Mock.Random.float產生隨機數100~8000之間,保留小數最小0位最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          iphone: Mock.Random.float(100, 80000, 0, 0),
          vivo: Mock.Random.float(100, 80000, 0, 0),
          oppo: Mock.Random.float(100, 80000, 0, 0),
          魅族: Mock.Random.float(100, 80000, 0, 0),
          SAMSUNG: Mock.Random.float(100, 80000, 0, 0),
          小米: Mock.Random.float(100, 80000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        //餅圖
        videoData: [
          {
            name: '小米',
            value: 2999
          },
          {
            name: 'iphone',
            value: 5999
          },
          {
            name: 'vivo',
            value: 1500
          },
          {
            name: 'oppo',
            value: 1999
          },
          {
            name: '魅族',
            value: 2200
          },
          {
            name: 'SAMSUNG',
            value: 4500
          }
        ],
        //柱狀圖
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
        ],
        //折線圖
        orderData: {
          date: ['20240701', '202407002', '20240703', '20240704', '20240705', '20240706', '20240707'],
          data: List
        },
        tableData: [
          {
            name: 'oppo',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: 'vivo',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000
          },
          {
            name: 'iphone',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000
          },
          {
            name: '小米',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000
          },
          {
            name: 'SAMSUNG',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000
          },
          {
            name: '魅族',
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000
          }
        ]
      }
    }
  }
}