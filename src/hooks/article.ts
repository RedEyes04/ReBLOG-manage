import { ref, getCurrentInstance } from 'vue'
import { time } from '../utils/memont'
import { useCode } from '../hooks/code';
import { createArticleApi } from '../api';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
const userStore = useUserStore()
const { tackleCode } = useCode()


export function useArticle() {
    const router = useRouter()

    const proxy: any = getCurrentInstance()?.proxy

    //收取form内容
    const form = ref()
    const formData = (e: any) => {
        form.value = e
    }
    //收取editor内容
    const editors = ref()
    const editorData = (e: any) => {
        // console.log(e)
        editors.value = e
    }

    //发布
    const nowMoment = ref()
    const submit = (e: number) => {
        if (form.value && form.value.title) {
            if (e == 0) {
                let nowTime = new Date();
                nowMoment.value = time(nowTime)
            }

            let value =
            {
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
                    if (e == 0) {
                        proxy.$message({ type: 'primary', message: '保存成功' })

                    } else if (e == 1) {
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
    return { formData, editorData, submit, nowMoment }

}
