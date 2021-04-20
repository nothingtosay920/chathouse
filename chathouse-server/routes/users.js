const router = require('koa-router')()
const userService = require('../controllers/mySqlConfig')
router.prefix('/users') // 默认添加前缀

// 增加公开房间
router.post('/insertGlobalRoomList', async (ctx, next) => {
  console.log(ctx.request.body);
  const id = ctx.request.body.params[0]
  const name = ctx.request.body.params[1]
  await userService.insertGlobalRoomList(id, name).then(res => {
    ctx.body = {
      code: '201',
      data: res,
      mess: '增加成功'
    }
  })
})
 
// 拿数据
router.post('/getGlobalRoomList', async (ctx, next) => {
  await userService.getGlobalRoomList().then(res => {
    ctx.body = {
      code: '200',
      data: res,
      mess: '获取成功'
    }
    return res
  }) 
})

// 删除数据
router.post('/deleteRoomList', async (ctx, next) => {
  await userService.deleteRoomList(ctx.request.body.id).then(res => {
    ctx.body = {
      code: '200',
      data: res,
      mess: '获取成功'
    }
    return res
  })
})

// router.post('/findDetailById', async (ctx, next) => {
//   let id = ctx.request.body.id
//   await userService.findDetailById(id).then(res => {
//     ctx.body = {
//       code: '80000',
//       data: res[0],
//       mess: '查找成功'
//     } 
//   })
// })

// router.post('/noteEdit', async (ctx, next) => {
//   const time = new Date()
//   let c_time = `${time.getFullYear()}年${time.getMonth()}月${time.getUTCDate()}`
//   let note_content = JSON.stringify(ctx.request.body.note_content)
//   let head_img = ctx.request.body.head_img
//   let note_type = ctx.request.body.note_type
//   let userId = JSON.stringify(ctx.request.body.userId)
//   let nickname = ctx.request.body.nickname
//   let title = ctx.request.body.title
//   await userService.insertNote([userId, title, note_type, note_content, head_img, nickname, c_time]).then(res => {
//     ctx.body = {
//       code: '80000',
//       mess: '插入成功'
//     }
//   })
// })
module.exports = router
