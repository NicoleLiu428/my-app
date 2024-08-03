import axios from 'axios'
const http = axios.create({
  baseURL: '/api',//通用請求地址前綴
  timeout: 10000
})

// 添加請求攔截器
axios.interceptors.request.use(function (config) {
  // 在發送請求之前做些甚麼
  return config;
}, function (error) {
  // 对請求錯誤做些甚麼
  return Promise.reject(error);
});

// 添加響應攔截器
axios.interceptors.response.use(function (response) {
  // 2xx 範圍內的狀態碼都會觸發該函數。
  // 对響應數據做些甚麼
  return response;
}, function (error) {
  // 超出 2xx 範圍內的狀態碼都會觸發該函數。
  // 对響應錯誤做些甚麼
  return Promise.reject(error);
});

export default http