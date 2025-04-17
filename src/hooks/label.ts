
import { ref, getCurrentInstance } from 'vue';
import { LabelData } from '../utils/interface';
import { useUserStore } from "../store/user";
import { useCode } from '../hooks/code';
import { addLabeltApi, labelApi, deleteLabelApi } from '../api';

const { tackleCode } = useCode()
const label = ref<LabelData[]>([])

const userStore = useUserStore()

export function useLabel() {
    //新建分组
    function confirm() {
        if (inputValue.value) {
            let request = {
                token: userStore.token,
                value: {
                    moment: new Date(),
                    label_name: inputValue.value
                }
            }
            let lab = {
                id: -2,
                name: inputValue.value,
                value: 0
            }


            addLabeltApi(request).then((res: any) => {
                if (tackleCode(res.code)) {
                    // console.log(res)
                    let lab = {
                        id: res.data,
                        value: 0,
                        label_name: inputValue.value!
                    }
                    label.value.unshift(lab)
                    inputValue.value = ""
                    proxy.$message({ type: 'primary', message: '插入完成' })
                }
            })


        } else {
            proxy.$message({ type: 'warning', message: '请输入' })
        }
    }

    //新建分组内容
    const inputValue = ref<string>()




    //获取标签
    const label = ref<LabelData[]>([])
    const rawLabel = () => {
        let request = {
            token: userStore.token,

        }
        labelApi(request).then((res: any) => {
            if (tackleCode(res.code)) {

                label.value = [...res.data]

            }
        })

    }

    const proxy: any = getCurrentInstance()?.proxy
    //取消
    function cancel() {
        inputValue.value = ""
    }
    //管理分组 
    const visible = ref<boolean>(false)
    const showModal = () => {
        visible.value = !visible.value
    }
    //删除标签

    const deletelabel = (e: number | string) => {
        let request = {
            labelId: e,
            token: userStore.token
        }

        deleteLabelApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                label.value = label.value.filter(
                    (obj: { id: number | string }) => {
                        return obj.id !== e
                    }
                )
                proxy.$message({ type: 'primary', message: '删除成功' })
            }
        })
    }

    return {
        inputValue,
        label,
        rawLabel,
        cancel,
        confirm,
        showModal,
        visible,
        deletelabel
    }

}
