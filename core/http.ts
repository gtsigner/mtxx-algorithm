import axios from "axios-https-proxy-fix";

const axiosCookieJarSupport = require('axios-cookiejar-support').default;
axiosCookieJarSupport(axios);
export module Http {

    export interface HttpReturn {
        status: number,
        data: any,
        headers: any,
        success: boolean,
        ok: boolean,
        message: string,
        err_status?: boolean,
        request?: any,
        config?: any
    }

    export class Api {
        public static async request(config): Promise<HttpReturn> {
            return new Promise(resolve => {
                const ret: HttpReturn = {
                    status: 540,
                    ok: false,
                    headers: {},
                    data: null,
                    message: '成功',
                    success: false
                };
                axios.request({
                    timeout: 5000,
                    ...config,
                }).then((res: any) => {
                    ret.headers = res.headers;
                    ret.status = parseInt(res.status);
                    ret.data = res.data;
                    ret.message = "请求成功";
                    ret.config = res.config;
                    ret.ok = true;
                }).catch(err => {
                    if (err.response) {
                        const response = err.response;
                        ret.status = parseInt(response.status);
                        ret.headers = response.headers;
                        ret.data = response.data;
                        ret.message = (response.data && response.data.message) || response.statusText;
                    }
                    if (err.code === 'ECONNABORTED') {
                        ret.message = '服务器访问超时:' + err.message || '';
                    }
                    ret.config = err.config;
                    ret.ok = false;
                }).finally(() => {
                    resolve(ret);
                })
            });
        }
    }
}