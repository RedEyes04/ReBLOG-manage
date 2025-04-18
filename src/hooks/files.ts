import { ref, getCurrentInstance, onMounted } from 'vue'
import { useCode } from '../hooks/code';
import { deleteFileApi } from '../api';
import { useUserStore } from '../store/user';
import { ArticleDate } from "../utils/interface";

const userStore = useUserStore()
const { tackleCode } = useCode()


//删除
export function useFile() {
    const proxy: any = getCurrentInstance()?.proxy

    const deleteFile = (data: { id: number | string; url: string | string[] }) => {
        let request = {
            token: userStore.token,
            filesId: data.id,
            filesUrl: data.url

        }
        deleteFileApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                console.log(res)
                proxy.$message({ type: 'primary', message: '删除完成' })

            }
        })
    }
    return { deleteFile }
}