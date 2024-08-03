import http from '../utils/request.js'

export const getData = () => {
  //返回promise對象
  return http.get('/home/getData')//後面可接參數
}