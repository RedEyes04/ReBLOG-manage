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

//新建文章/createArticle
export const createArticleApi = (data: object) => fetch.post('/createArticle', data)

//上传文件upload
export const uploadApi = (data: object) => fetch.post('/upload', data)

//更新文章/updateArticle
export const updateArticleApi = (data: object) => fetch.post('/updateArticle', data)

//获取文章aritcle
export const aritcleApi = (data: object) => fetch.post('/aritcle', data)

//获取状态数 articleStateApi
export const articleStateApi = (data: object) => fetch.post('/articleState', data)

//文章发布/撤回 changeAritcleState
export const changeAritcleStateApi = (data: object) => fetch.post('/changeAritcleState', data)

//删除文章/deleteAritcle
export const deleteAritcleApi = (data: object) => fetch.post('/deleteAritcle', data)

//获取文章详情 /gainArticle
export const gainArticleApi = (data: object) => fetch.post('/gainArticle', data)


//删除文件 /deleteFile
export const deleteFileApi = (data: object) => fetch.post('/deleteFile', data)

//创建日记 /createDiary
export const createDiaryApi = (data: object) => fetch.post('/createDiary', data)


//获取日记 /diary
export const diaryApi = (data: object) => fetch.post('/diary', data)

//删除日记 /deleteDiary
export const deleteDiaryApi = (data: object) => fetch.post('/deleteDiary', data)

//获取文件 /file
export const fileApi = (data: object) => fetch.post('/file', data)


//获取文件 /removeFile
export const removeFileApi = (data: object) => fetch.post('/removeFile', data)








