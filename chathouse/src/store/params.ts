// 'http://a31.easemob.com/chathouse/token'
/* eslint-disable */
import axios from 'axios'

// axios配置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
const baseUrl = 'http://localhost:3000/'
// 拦截
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // Do something with request error
  console.info('error: ')
  console.info(error)
  return Promise.reject(error)
})


export const getToken = (...params: string[]) => {
  axios.post('https://a31.easemob.com/1187210314231972/chathouse/token', {
    grant_type: 'client_credentials',  
    client_id: 'YXA6nWS5FNqwRiWkvctUqtYRXw', 
    client_secret: 'YXA61iMI8QlqUyIIYg6ZsLszLxAYj6M',
    ...params
  }).then((res) => {
    localStorage.setItem('access_token', JSON.stringify({ accessToken: res.data.access_token }))
  })
}

export const getRoomList = () => {
    axios({
      method: 'post',
      url: `${baseUrl}users/getGlobalRoomList`
    }).then(res => {
      console.log('list', res)
      return res.data.data
    })
    
}

export const addRoom = (...params: string[]) => {
  axios({
    method: 'post',
    url: `${baseUrl}users/insertGlobalRoomList`,
    data: {
      params
    }
  }).then(res => {
    return res
  })
  
}


export const deleteRoom = (id: string) => {
  axios({
    method: 'post',
    url: `${baseUrl}users/deleteRoomList`,
    data: {
      id
    }
  }).then(res => {
    return res
  })
  
}
 
/* eslint-disable no-new */
