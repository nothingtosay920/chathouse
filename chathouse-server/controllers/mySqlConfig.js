const mysql = require('mysql')
const config = require('./defaultContfig.js')

// 连接线程池
let pool = mysql.createPool({
  host: config.dataBase.HOST,
  user: config.dataBase.USERNAMA,
  password: config.dataBase.PASSWORD,
  database: config.dataBase.DATABASE,
  port: config.dataBase.PORT
})

let allServices = {
  query: function (sql, values) {
    return new Promise ((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  }
}

// 增加公开房间
let insertGlobalRoomList = function (confrId, name) {
  let _sql = `insert into globalroom set confrId="${confrId}",name="${name}";`
  return allServices.query(_sql, confrId, name)
}

// 获取数据
let getGlobalRoomList = function () {
  let _sql = `select * from globalroom`
  return allServices.query(_sql)
}

// 删除数据
let deleteRoomList = function (id) {
  console.log(id);
  let _sql = `delete from globalroom where confrId="${id}";`
  return allServices.query(_sql)
}

module.exports = {
  insertGlobalRoomList,
  getGlobalRoomList,
  deleteRoomList
}