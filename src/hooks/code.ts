import { useRouter } from "vue-router";
import { YkMessage } from "@yike-design/ui";

export function useCode() {
  const router = useRouter();
  
  // code验证
  const tackleCode = (e: number) => {
    if (e === 300) {
      // 未通过验证
      router.push('/login');
      YkMessage({
        type: 'warning', 
        message: 'Token验证失败,请重新登录',
      });
      return false;
    } else if (e === 400) {
      YkMessage({
        type: 'error',
        message: '请求参数不正确',
      });
      return false;
    } else if (e === 401) {
      // 未注册
      router.push('/register');
      return false;
    } else {
      return true; // 添加返回 true 表示正常处理
    }
  }

  return {
    tackleCode
  }
}
