import { createStore } from 'vuex'
import WebIM from '../utils/WebIM'
import { ElMessage } from 'element-plus'
interface GlobalDataProps {
  user: {
    name: string;
    id: string;
    nickname: string;
  };
  isRegister: boolean;
  params: {
    roomName: string;
    password: string;
    role: number;
    config: {
      rec: boolean;
      recMerge: boolean;
    };
    restApi: string;
  };
  login: boolean;
  admins: Array<string>;
  talkers: Array<string>;
  audience: Array<string>;
  stream: object;
  roomRole: number;
  nums: number;
}

interface LoginOptions {
  user: string;
  pwd: string;
  appKey: string;
  success: (res: any) => void;
  error: (err: any) => void;
}

interface RegesiterOptions {
  username: string;
  password: string;
  nickname: string;
  appKey: string;
  success: (res: any) => void;
  error: (err: any) => void;
}

interface LoginProducts {
  username: string;
  password: string;
}

interface RegesiterProducts extends LoginProducts {
  nickname: string;
}

export default createStore<GlobalDataProps>({
  state: {
    user: {
      name: '',
      id: '',
      nickname: ''
    },
    isRegister: false,
    params: {
      roomName: '123', // string 房间名称 必需
      password: 'nothingtosay', // string 房间密码 必需
      role: 7, // number 进入会议的角色 1: 观众  3: 主播 7: 管理员
      config: {
        rec: false, // 是否开启录制会议
        recMerge: false // 是否开启合并录制
      },
      restApi: 'https://a31.easemob.com'
    },
    login: false,
    admins: [],
    talkers: [],
    audience: [],
    stream: {},
    roomRole: 1,
    nums: 0
  },
  mutations: {
    setUserName (state, username) {
      state.user.name = username.username
    }
  },
  actions: {
    onLogin: ({ commit, state }, products: LoginProducts) => {
      const options: LoginOptions = {
        user: products.username,
        pwd: products.password,
        appKey: WebIM.config.appkey,
        success: (res: any) => {
          console.log('登录成功', res)
          state.user.nickname = res.user.username
        },
        error: (err) => {
          console.log('登录失败', err)
        }
      }
      WebIM.conn.open(options)
    },
    onLogout: ({ commit, state }) => {
      WebIM.conn.close()
      commit('setUserName', {
        username: ''
      })
    },
    onRegister: ({ commit, state }, products: RegesiterProducts) => {
      console.log(products.username, products.password, products.nickname)
      const options: RegesiterOptions = {
        username: products.username,
        password: products.password,
        nickname: products.nickname,
        appKey: WebIM.config.appkey,
        success: () => {
          console.log('注册成功')
        },
        error: (err) => {
          if (JSON.parse(err.data).error === 'duplicate_unique_property_exists') {
            ElMessage({
              message: '用户已存在！',
              type: 'error',
              offset: 220
            })
          } else if (JSON.parse(err.data).error === 'illegal_argument') {
            if (JSON.parse(err.data).error_description === 'USERNAME_TOO_LONG') {
              return ElMessage({
                message: '用户名超过64个字节！',
                type: 'error',
                offset: 220
              })
            }
            ElMessage({
              message: '用户名不合法！',
              type: 'error',
              offset: 220
            })
          } else if (JSON.parse(err.data).error === 'unauthorized') {
            ElMessage({
              message: '注册失败，无权限！',
              type: 'error',
              offset: 220
            })
          } else if (JSON.parse(err.data).error === 'resource_limited') {
            ElMessage({
              message: '您的App用户注册数量已达上限,请升级至企业版！',
              type: 'error',
              offset: 220
            })
          }
        }
      }
      WebIM.conn.registerUser(options)
    }
  },
  modules: {
  }
})
