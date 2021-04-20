/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */

// for react native
// var location = {
//     protocol: "https"
// }

/* eslint-disable */

var config = {
  socketServer: 'https://im-api-v2-31.easemob.com',    // socket Server地址

  restServer: 'https://a31.easemob.com',               // rest Server地址
  
  appkey: '1187210314231972#chathouse',        // App key
  https : false,                            // 是否使用https
  
  isHttpDNS: true,                          // 3.0 SDK支持，防止DNS劫持从服务端获取XMPPUrl、restUrl
  
  isMultiLoginSessions: false,              // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能
  
  isDebug: false,                           // 打开调试，会自动打印log，在控制台的console中查看log
  
  autoReconnectNumMax: 2,                   // 断线重连最大次数
  
  heartBeatWait: 30000,                     // 心跳间隔（只在小程序中使用）
  
  delivery: false,                           // 是否发送已读回执
  
  useOwnUploadFun: false 
}
export default config
/* eslint-disable no-new */