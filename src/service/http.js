import axios from 'axios';
import {MessageBox} from 'element-ui';
import { Loading } from 'element-ui';
import commonApi from './commonApi';

// commonApi循环遍历输出不同的请求方法
let instance = axios.create({
    baseURl:'http://localhost:8082',
    timeout:1000
});
// 包裹请求方法的容器
const Http = {};
// 请求格式/参数的统一
for(let key in commonApi){
    // method url
    let api = commonApi[key];
    // async作用：避免进入回调地狱
    // params：请求参数get(url),put,post,patch(data)，delete（url）
    // isFormData：标识是否是form-data请求
    // config : 配置参数
    Http[key] = async function(params,isFormData=false,config={}){
        let newParams = {};
        // content-type是否是form-data判断
        if(params && isFormData){
            newParams = new FormData();
            for(let i in params){
                newParams.append(i,params[i]);
            }
        }else{
            newParams = params;
        }
        // 不同请求的判断
        let response = {};// 请求的返回值
        if(api.method === 'put' || api.method === 'post' || api.method === 'patch'){
            try{
                response = await instance[api.method](api.url,newParams,config)
            }catch(err){
                response = err;
            }
            
        }else if(api.method === 'delete' || api.method === 'get'){
            // 如果放在URL上就挂在params参数上，如果在request payload上，则挂在data上config.data = newParams
            config.params = newParams;
            try{
                response = await instance[api.method](api.url,config)
            }catch(err){
                response = err;
            }
        }
        return response;
    }
}
let loadingInstance;
const loadingOptions = {
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
};
// 拦截器的添加
instance.interceptors.request.use(config=>{
    //发起请求前做些什么
    loadingInstance =  Loading.service(loadingOptions);
    console.log('发起请求前做些什么');
    return config;
},()=>{
    // 请求错误
    console.log('请求错误');
    loadingInstance.close();
    MessageBox.alert('请求错误，请稍后重试', '温馨提示', {
        confirmButtonText: '确定'
    });
})
// 响应拦截器
instance.interceptors.response.use(res=>{
    console.log('响应返回前做些什么');
    loadingInstance.close();
    return res.data;
},()=>{
    console.log('响应错误');
    loadingInstance.close();
    MessageBox.alert('响应错误，请稍后重试', '温馨提示', {
        confirmButtonText: '确定'
    });
})
export default Http;