import { ref, getCurrentInstance, onMounted } from 'vue'
import { time } from '../utils/memont'
import { useCode } from '../hooks/code';
import { createArticleApi, updateArticleApi, aritcleApi, changeAritcleStateApi, deleteAritcleApi, gainArticleApi } from '../api';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import { ArticleDate } from "../utils/interface";
import { on } from 'events';

const userStore = useUserStore()
const { tackleCode } = useCode()

export function useArticle() {
    const router = useRouter()

    const proxy: any = getCurrentInstance()?.proxy
    //文章id  id存在就保存
    const id = ref<number>()

    //收取form内容
    const form = ref()
    const formData = (e: any) => {
        form.value = e
    }
    //收取editor内容
    const editors = ref()
    const editorData = (e: any) => {
        editors.value = e
    }
    const nowMoment = ref()

    const submit = (e: number) => {
        if (e === 0) {
            let nowTime = new Date();
            nowMoment.value = time(nowTime)
        }
        if (form.value && form.value.title && !id.value) {
            let value = {
                ...form.value,
                ...{
                    content: editors.value,
                    state: e,
                    classify: 0,
                    moment: new Date(),
                }
            }
            let request = {
                token: userStore.token,
                value
            }

            createArticleApi(request).then((res: any) => {
                if (tackleCode(res.code)) {
                    if (e === 0) {
                        id.value = res.data
                        proxy.$message({ type: 'primary', message: '保存成功' })
                    } else if (e === 1) {
                        proxy.$message({ type: 'primary', message: '发布成功' })
                        router.push("/")
                    } else {
                        proxy.$message({ type: 'primary', message: '发布成功' })
                    }
                }
            })
        } else if (id.value) {
            //如果有id 就去更新
            let value = {
                ...form.value,
                ...{
                    content: editors.value,
                    state: e,
                }
            }
            let request = {
                token: userStore.token,
                value,
                id: id.value
            }
            updateArticleApi(request).then((res: any) => {
                if (tackleCode(res.code)) {
                    if (e === 0) {
                        proxy.$message({ type: 'primary', message: '保存成功' })
                    } else if (e === 1) {
                        proxy.$message({ type: 'primary', message: '发布成功' })
                        router.push("/")
                    } else {
                        proxy.$message({ type: 'primary', message: '发布成功' })
                    }
                }
            })
        } else {
            proxy.$message({ type: 'warning', message: '请输入标题' })
        }
    }

    //文章
    const articleList = ref<ArticleDate[]>([])
    //文章总数
    const count = ref<number>(0)
    //获取文章
    const getData = (req: any) => {
        aritcleApi(req).then((res: any) => {
            if (tackleCode(res.code)) {
                if (req.count) {
                    count.value = res.data.count
                }
                articleList.value = [...res.data.result]
            }
        })
    }
    //修改文章发布状态
    const updateState = (e: { id: number, state: number }) => {
        const request = {
            token: userStore.token,
            articleId: e.id,
            state: e.state,
        }
        changeAritcleStateApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                articleList.value.filter((i: { id: number; state: number }) => {
                    if (i.id == e.id) {
                        i.state = e.state
                        if (e.state === 1) {
                            proxy.$message({ type: 'primary', message: '发布成功' })
                        } else {
                            proxy.$message({ type: 'primary', message: '已撤回' })
                        }
                    }
                })
            }
        })
    }
    //删除文章
    const deleteArticle = (id: number) => {
        const request = {
            token: userStore.token,
            articleId: id

        }
        deleteAritcleApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                articleList.value = articleList.value.filter((obj: any) => {
                    return obj.id !== id
                })
                proxy.$message({ type: 'primary', message: '删除完成' })
            }
        })

    }
    //获取文章详情
    const defaultArticle = ref()
    const getArticleData = () => {
        let request = {
            token: userStore.token,
            articleId: id.value

        }
        gainArticleApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                // console.log(res);
                defaultArticle.value = res.data

                console.log(res.data);

            }
        })

    }
    onMounted(() => {
        if (id.value) {
            getArticleData()
        }
    })

    return { formData, editorData, submit, nowMoment, getData, articleList, count, updateState, deleteArticle, id, getArticleData, defaultArticle }
}
