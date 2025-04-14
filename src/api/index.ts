import fetch from '../utils/axios'

export const isRegisterApi = (data: object) => fetch.post('/isRegister', data)

//用户注册 /register
export const registerApi = (data: object) => fetch.post('/register', data)

//用户登录 /signin
export const signinApi = (data: object) => fetch.post('/signin', data)

//总览数据/overview
export const overviewApi = (data: object) => fetch.post('/overview', data)

//获取评论 /comment
export const commentApi = (data: object) => fetch.post('/comment', data)

//将评论转化为已读 /commentIsread
export const commentIsreadApi = (data: object) => fetch.post('/commentIsread', data)

//删除评论/deleteComment
export const deleteCommentApi = (data: object) => fetch.post('/deleteComment', data)

//获取私信/message
export const messageApi = (data: object) => fetch.post('/message', data)

//获取私信未读数/noreadMesssage
export const noreadMessageApi = (data: object) => fetch.post('/noreadMessage', data)
//删除私信/deleteMessage
export const deleteMessageApi = (data: object) => fetch.post('/deleteMessage', data)
//新建分组/addSubset
export const addSubsetApi = (data: object) => fetch.post('/addSubset', data)

//获取分组/subset
export const subsetApi = (data: object) => fetch.post('/subset', data)

//修改分组/updateSubset
export const updateSubsetApi = (data: object) => fetch.post('/updateSubset', data)

//删除分组/deleteSubset
export const deleteSubsetApi = (data: object) => fetch.post('/deleteSubset', data)

//新建标签/addLabel
export const addLabeltApi = (data: object) => fetch.post('/addLabel', data)
//获取标签/label
export const labelApi = (data: object) => fetch.post('/label', data)
//删除标签/deleteLabel
export const deleteLabelApi = (data: object) => fetch.post('/deleteLabel', data)








