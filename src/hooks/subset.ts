import { ref, getCurrentInstance, defineEmits } from 'vue';
import { useSubsetStore } from '../store/subset';
import { useUserStore } from "../store/user";
import { useCode } from '../hooks/code';
import { subsetApi, addSubsetApi, deleteSubsetApi, updateSubsetApi } from '../api';

const { tackleCode } = useCode()
const userStore = useUserStore()
const active = ref<boolean>(false)
const emits = defineEmits(['nowSubset'])


//store
const subsetStore = useSubsetStore();
export function useSubset() {

    //新建分组内容
    const inputValue = ref<number | string>()


    //当前选择
    const selected = ref<string>('-1all')

    //选择切换 
    const changeOption = (id: number | string, type: string) => {
        if (id + type != selected.value) {
            selected.value = id + type
            emits('nowSubset', { id, type })
        }
    }

    //获取分组 
    const rawSubset = (e: number) => {
        let request = {
            token: userStore.token,
            classify: e
        }
        subsetApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                // console.log(res.data)
                // console.log('subsetApi 返回结果:', res)
                subsetStore.data = res.data.list
                subsetStore.count = res.data.count
            }
        })

    }

    const proxy: any = getCurrentInstance()?.proxy
    //取消
    function cancel() {
        inputValue.value = ""
    }
    //新建分组
    function confirm(e: number) {
        if (inputValue.value) {
            let request = {
                token: userStore.token,
                value: {
                    moment: new Date(),
                    classify: e,
                    subset_name: inputValue.value
                }
            }
            let obj = {
                id: -2,
                name: inputValue.value,
                value: 0
            }

            // console.log(request)
            // subsetStore.data.push(obj)
            addSubsetApi(request).then((res: any) => {
                if (tackleCode(res.code)) {
                    // console.log(res)
                    let sub = {
                        id: res.data,
                        value: 0,
                        name: inputValue.value!
                    }
                    subsetStore.data.push(sub)
                    inputValue.value = ""
                    proxy.$message({ type: 'primary', message: '插入完成' })
                }
            })


        } else {
            proxy.$message({ type: 'warning', message: '请输入' })
        }
    }


    //管理分组 
    const visible = ref<boolean>(false)
    const showModal = () => {
        visible.value = !visible.value
    }


    //删除分组
    const deleteSubset = (e: number | string) => {
        let request = {
            subsetID: e,
            token: userStore.token
        }

        deleteSubsetApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                subsetStore.data = subsetStore.data.filter(
                    (obj: { value: any; id: number | string }) => {
                        if (obj.id === e) {
                            subsetStore.exclude.value += obj.value
                        }
                        return obj.id !== e
                    }
                )
                proxy.$message({ type: 'primary', message: '删除成功' })
            }
        })
    }
    //修改分组信息
    const updateSubset = (e: any) => {
        let request = {
            subsetName: e.name,
            subsetID: e.id,
            token: userStore.token
        }

        updateSubsetApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                proxy.$message({ type: 'primary', message: '修改成功' })
            }
        })
    }


    return {
        inputValue,
        selected,
        changeOption,
        rawSubset,
        cancel,
        confirm,
        showModal,
        visible,
        deleteSubset,
        updateSubset
    }
}