import { baseUrl } from "./env";
import axios from "axios";
import { YkMessage } from "@yike-design/ui";
import message from "@yike-design/ui/es/components/message/src/utils";

const service = axios.create({
    baseURL:baseUrl,
    timeout:8000
});

//添加请求拦截器
service.interceptors.request.use(
    //在发送请求前做的事情
    config=>{
        return config;

    },
    error=>{
        YkMessage({
            type:'warring',
            message:error.message
        })
        return Promise.reject();
    }
    
)

//添加响应拦截器
service.interceptors.response.use(
    response=>{
        if(response.status === 200){
            return response.data
        }else{
            YkMessage({
                type:'warring',
                message:'请求发生错误'
                
            })
            Promise.reject()
        }
    },
    error=>{
        YkMessage({
            type:'warring',
            message:'error.message'
        })
        return Promise.reject();
    }
)

export default service;
