import type { AxiosRequestConfig } from "axios";
import { URLEnum, RequstMethod } from "./APIEnum";
import { APIServcers, type APIServer } from "./APIServer";
import { type Response } from "./Response";
import axios from "axios";

import { getLocal, setLocal } from "@/common/ts/utils";
import router from "@/router";
import { showFailToast } from "vant";

class APIClient {
    private service: APIServer;
    private static instance: APIClient;
    private static services: APIServer[]

    static readonly currentService = () => this.instance.service;

    private constructor(service: APIServer) {
        this.service = service;
        this.configAxios()
    }

    private configAxios() {
        axios.defaults.baseURL = this.service.baseApiUrl();
        axios.defaults.timeout = 10000;
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    public static initialize(servers: APIServer[] = APIServcers) {
        this.services = servers;
        // 默认使用生产服务器
        servers.forEach(server => {
            if (server.isProduct) {
                this.instance = new APIClient(server);
            }
        });

        // 如果没有生产服务器，则使用第一个服务器
        if (!this.instance) {
            this.instance = new APIClient(servers[0]);
        }
    }

    // 切换服务器
    public static switch(server: APIServer) {
        this.instance.service = server;
        this.instance.configAxios();
    }

    /**
     * 发送请求
     * @param url       请求地址
     * @param method    请求方法
     * @param param     请求参数
     * @returns         返回请求结果
     */
    static async request<T = any>(url: URLEnum,
        method: RequstMethod,
        param: object | string | number | undefined) {

        let config: AxiosRequestConfig = {
            url: url,
            method: method,
        }

        if (method === RequstMethod.GET) {
            config.params = param;
        } else {
            config.data = param;
        }

        if (this.instance.service.start) {
            config = this.instance.service.start(config);
        }

        // 添加token
        axios.interceptors.request.use(config => {
            if (getLocal('token')) {
                config.headers.Authorization = localStorage.getItem('token') || '';
            }
            return config
        }, error => {
            return Promise.reject(error)
        })

        // 响应拦截
        axios.interceptors.response.use(res => {
            if (typeof res.data !== 'object') {
                showFailToast('服务端异常，返回数据格式错误');
                return Promise.reject(res);
            }
            if (res.data.resultCode !== 200) {
                if (res.data.message) showFailToast(res.data.message);
                if (res.data.code === 416) {
                    router.push('/login');
                }
                if (res.data.code && window.location.hash == '#/login') {
                    setLocal('token', res.data.token);
                }
                return Promise.reject(res.data);
            }
            return res.data
        }, error => {
            let message = '';
            switch (error.response.resultCode) {
                case 400:
                    message = "请求错误(400)";
                    break;
                case 401:
                    message = "未授权，请重新登录(401)";
                    break;
                case 403:
                    message = "拒绝访问(403)";
                    break;
                case 404:
                    message = "请求出错(404)";
                    break;
                case 408:
                    message = "请求超时(408)";
                    break;
                case 500:
                    message = "服务器错误(500)";
                    break;
                case 501:
                    message = "服务未实现(501)";
                    break;
                case 502:
                    message = "网络错误(502)";
                    break;
                case 503:
                    message = "服务不可用(503)";
                    break;
                case 504:
                    message = "网络超时(504)";
                    break;
                case 505:
                    message = "HTTP版本不受支持(505)";
                    break;
                default:
                    message = `连接出错(${error.response.status})!`;
            }
            return Promise.reject(message);
        })
        return (await axios.request<Response<T>>(config)).data
    }

    public static get<T = any>(url: URLEnum, param?: object) {
        return this.request<T>(url, RequstMethod.GET, param);
    }

    public static post<T = any>(url: URLEnum, param?: object) {
        return this.request<T>(url, RequstMethod.POST, param);
    }

    public static put<T = any>(url: URLEnum, param?: object) {
        return this.request<T>(url, RequstMethod.PUT, param);
    }
}

export default APIClient;
