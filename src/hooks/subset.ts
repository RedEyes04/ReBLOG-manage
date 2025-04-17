import { ref, getCurrentInstance, defineEmits, Ref } from 'vue';
import { useSubsetStore } from '../store/subset';
import { useUserStore } from "../store/user";
import { useCode } from '../hooks/code';
import { subsetApi, addSubsetApi, deleteSubsetApi, updateSubsetApi, articleStateApi } from '../api';

const { tackleCode } = useCode();
const userStore = useUserStore();
const active = ref<boolean>(false);

const emits = defineEmits(['nowSubset']);

// store
const subsetStore = useSubsetStore();

// 为返回类型定义接口
interface UseSubsetReturn {
    inputValue: Ref<number | string | undefined>;
    selected: Ref<string>;
    changeOption: (id: number | string, type: string) => void;
    rawSubset: (e: number) => void;
    cancel: () => void;
    confirm: (e: number) => void;
    showModal: () => void;
    visible: Ref<boolean>;
    deleteSubset: (e: number | string) => void;
    updateSubset: (e: any) => void;
    getState: () => void;
    state: Ref<{ id: number, name: string, value: number }[]>;
}

export function useSubset(emits: any): UseSubsetReturn {
    // 新建分组内容
    const inputValue = ref<number | string>();

    // 当前选择
    const selected = ref<string>('-1all');

    // 当前状态（你新增的 state）
    const state = ref<{ id: number, name: string, value: number }[]>([]);

    // 选择切换
    const changeOption = (id: number | string, type: string) => {
        if (id + type != selected.value) {
            selected.value = id + type;
            emits('nowSubset', { id, type });
        }
    };

    // 获取分组
    const rawSubset = (e: number) => {
        let request = {
            token: userStore.token,
            classify: e,
        };
        subsetApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                subsetStore.data = res.data.list;
                subsetStore.count = res.data.count;
            }
        });
    };

    const proxy: any = getCurrentInstance()?.proxy;

    // 取消
    const cancel = () => {
        inputValue.value = '';
    };

    // 新建分组
    const confirm = (e: number) => {
        if (inputValue.value) {
            let request = {
                token: userStore.token,
                value: {
                    moment: new Date(),
                    classify: e,
                    subset_name: inputValue.value,
                },
            };
            addSubsetApi(request).then((res: any) => {
                if (tackleCode(res.code)) {
                    let sub = {
                        id: res.data,
                        value: 0,
                        name: inputValue.value!,
                    };
                    subsetStore.data.push(sub);
                    inputValue.value = '';
                    proxy.$message({ type: 'primary', message: '插入完成' });
                }
            });
        } else {
            proxy.$message({ type: 'warning', message: '请输入' });
        }
    };

    // 管理分组
    const visible = ref<boolean>(false);
    const showModal = () => {
        visible.value = !visible.value;
    };

    // 删除分组
    const deleteSubset = (e: number | string) => {
        let request = {
            subsetID: e,
            token: userStore.token,
        };
        deleteSubsetApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                subsetStore.data = subsetStore.data.filter((obj: { value: any; id: number | string }) => {
                    if (obj.id === e) {
                        subsetStore.exclude.value += obj.value;
                    }
                    return obj.id !== e;
                });
                proxy.$message({ type: 'primary', message: '删除成功' });
            }
        });
    };

    // 修改分组信息
    const updateSubset = (e: any) => {
        let request = {
            subsetName: e.name,
            subsetID: e.id,
            token: userStore.token,
        };
        updateSubsetApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                proxy.$message({ type: 'primary', message: '修改成功' });
            }
        });
    };

    // 获取文章不同状态下的数量
    const getState = () => {
        let request = {
            token: userStore.token,
        };
        articleStateApi(request).then((res: any) => {
            if (tackleCode(res.code)) {
                state.value = res.data; // 更新 state
                console.log(res);
            }
        });
    };

    // 返回接口类型对象
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
        updateSubset,
        getState,
        state, // 返回 state
    };
}
