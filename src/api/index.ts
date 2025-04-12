import fetch from '../utils/axios'

export const isRegisterApi = (data:object)=>fetch.post('/isRegister',data)

//用户注册 /register
export const registerApi = (data:object)=>fetch.post('/register',data)

//用户登录 /signin
export const signinApi = (data:object)=>fetch.post('/signin',data)

//总览数据/overview
export const overviewApi = (data:object)=>fetch.post('/overview',data)

//获取评论 /comment
export const commentApi = (data:object)=>fetch.post('/comment',data)

//将评论转化为已读 /commentIsread
export const commentIsreadApi = (data:object)=>fetch.post('/commentIsread',data)

//删除评论deleteComment
export const deleteCommentApi = (data:object)=>fetch.post('/deleteComment',data)

//获取私信/message
export const messageApi = (data:object)=>fetch.post('/message',data)

//获取私信未读数noreadMesssage
export const noreadMesssageApi = (data:object)=>fetch.post('/noreadMesssage',data)





