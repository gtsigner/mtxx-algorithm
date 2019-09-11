import {Util} from "./core/utils";
import {Http} from "./core/http";
import qs from 'querystring';

export module Mtxx {
    export interface SignEntry {
        sig: string,
        sigVersion: string,
        sigTime: string,
    }

    export class Sign {
        public static version = "1.3";
        public static signKey = "Tw5AY783H@EU3#XC";
        //sqA#QH=M+Ns&q+Z& account
        //qsF=+BcElEWFulmW
        //sqA#QH=M+Ns&q+Z&  6184556739355017217
        //101010111010011111101011001011001010110100000010000000000000000
        //qsF=+BcElEWFulmW  6184556633574670337

        public static getSecKey(appId: string) {
            const map = {
                "6184556633574670337": "qsF=+BcElEWFulmW",
                "6184556654793654273": "iyC8GObqVIT3U!X_",
                "6184556739355017217": "sqA#QH=M+Ns&q+Z&J",
                "6184557056498925569": "xX2mBC_L+N#EJyK2",
            };
            return map[appId];
        }

        /**
         * 进行签名
         * @param path 请求path
         * @param data 数据
         * @param appId app的ID
         * @param time 时间戳
         */
        public static sign(path: string, data: string[], appId: string, time: string = '',): SignEntry {
            if (time === '') {
                time = new Date().getTime().toString();
            }
            const s: SignEntry = {sig: "", sigTime: time, sigVersion: this.version};
            const arr = data.sort((a, b) => {
                return a < b ? -1 : a > b ? 1 : 0
            });
            const secKey = this.getSecKey(appId);
            const signStr = `${path}${arr.join('')}${secKey}${time}${this.signKey}`;
            const res = Util.Coder.md5_encode(signStr);
            //排序
            const carr = res.split('');
            const rarr = [];
            for (let i = 0; i < carr.length / 2; i++) {
                //掉换2个字符的顺序
                rarr.push(carr[1 + 2 * i]);
                rarr.push(carr[(2 * i)]);
            }
            s.sig = rarr.join('');
            return s;
        }

        /**
         * 签名数据
         * @param url
         * @param data
         * @param header
         * @param appId
         * @param time
         */
        public static signUrl(url: UrlType, data: any, header: any, appId: string, time: string = ''): SignEntry {
            const arr = {...data, ...header};
            const dt: string[] = [];
            Object.keys(arr).forEach((k) => {
                dt.push(arr[k].toString());
            });
            return this.sign(url.path, dt, appId, time);
        }

        /**
         * 获取一个默认的表单数据
         */
        public static forms() {
            return {
                "client_timestamp": "",
                "client_operator": "",
                "client_timezone": "GMT+8",
                "is_gdpr": "0",
                "gid": "676824413",
                "nation": "中国",
                "city": "成都市",
                "client_channel_id": "setup_beta",
                "client_model": "MI 5",
                "client_brand": "Xiaomi",
                "resolution": "1080*1920",
                "client_id": "",
                "mac": "02:00:00:00:00:00",
                "client_language": "zh_CN",
                // "sig": "5baebe65654c75153edf483069875692",
                // "sigVersion": "1.3",
                // "sigTime": "1568089944023",
                "province": "四川省",
                "ad_sdk_version": "4.14.1",
                "autoload": "1",
                "client_os": "7.0",
                "is_privacy": "0",
                "lat": "30.630055",
                "client_network": "wifi",
                "lng": "104.2",
                "count": "20",
                "version": "8.6.4.3",
                "community_version": "2.0.0",
                "tab_id": "2147483647",
                "attachFlag": "159",
                "district": "锦江区",
                "imei": "",
                "page": "1",
                "android_id": "",
                "client_is_root": "1"
            };
        }
    }

    export interface UrlType {
        version: string,
        path: string,
        method: string,
        url: string,
        appId: string
    }

    export type UrlName = "tab_feed_list" | "login_verify_code";

    export class UrlContainer {
        public static xiuxiu_host: any = "api.xiuxiu.meitu.com";
        public static account_host: any = "api.account.meitu.com";
        private static urls: any = {
            'login_verify_code': {
                version: '',
                path: 'common/login_verify_code.json',
                method: 'POST',
                url: 'https://api.account.meitu.com/common/login_verify_code.json',
                appId: '6184556739355017217',
            },
            'is_send_red_envelope': {
                version: 'v1',
                path: 'red/envelope/is_send_red_envelope.json',
                method: 'GET',
                url: 'https://api.xiuxiu.meitu.com/v1/red/envelope/is_send_red_envelope.json',
                appId: '6184556739355017217',
            },
            'user_unread_count': {
                version: 'v1',
                path: 'user/unread_count.json',
                method: 'GET',
                url: 'https://api.xiuxiu.meitu.com/v1/user/unread_count.json',
                appId: '6184556739355017217',
            },
            'message_create': {
                version: 'v1',
                path: 'message/create.json',
                method: 'POST',
                url: 'https://api.xiuxiu.meitu.com/v1/message/create.json',
                appId: '6184556633574670337',
            },
            'tab_feed_list': {
                version: 'v1',
                path: 'tab/tab_feed_list.json',
                method: 'GET',
                url: 'https://api.xiuxiu.meitu.com/v1/tab/tab_feed_list.json',
                appId: '6184556633574670337',
            },
        };

        public static getUrl(name: string): UrlType {
            return this.urls[name];
        }

        public static setUrl(name: string, url: UrlType) {
            this.urls[name] = url;
        }
    }

    export class Account {
        public phone: string = "";
        public phone_cc: string = "86";
        public password: string = "";
        public ltg: string = "";
        private api: Api = new Api();
        public device: any = {
            gid: '',
            client_channel_id: 'setup_beta',
            client_model: 'MI 5',
            zip_version: '3.1.1.6',
            version: '8.6.4.3',
            mac: '02:00:00:00:00:00',
            client_id: '',
            client_language: 'zh-Han',

            os_type: 'android',
            is_eu: '0',
            sdk_version: '3.1.3',
            client_os: '7.0',

            iccid: '',
            imei: '',
            android_id: '',
            client_network: 'WIFI'
        };
        public static account_app_id = "6184556739355017217";
        public static xiuxiu_app_id = "6184556633574670337";
        private accessToken = "";

        constructor() {

        }

        //获取短信验证码
        public async getVCode() {
            const form = {
                phone_cc: this.phone_cc,
                phone: this.phone,
                ...this.device
            };
            const url = UrlContainer.getUrl("login_verify_code");
            const pack = Sign.signUrl(url, form, Account.account_app_id, '1568094030367');
            const res = await this.api.request({
                url: url.url,
                method: url.method,
                data: pack,
                headers: {
                    'Host': UrlContainer.account_host,
                }
            });
            console.log(res.data, res.config);
        }

        //获取AccessToken
        public async getAccessToken() {

        }

        //发送消息
        public async createMessage(toUid: string, text: string) {
            const form = {
                ...this.device,
                text: text,
                uid: toUid
            };
            const url = UrlContainer.getUrl("message_create");
            const pack = Sign.signUrl(url, form, {token: this.accessToken}, url.appId);
            return await this.api.request({
                url: url.url,
                method: url.method,
                data: {...pack, ...form},
                headers: {
                    'Host': UrlContainer.xiuxiu_host,
                    "Access-Token": this.accessToken
                }
            });
        }

        //不清楚
        public async getRedEnvelope() {
            const form = this.device;
            const url = UrlContainer.getUrl("is_send_red_envelope");
            const pack = Sign.signUrl(url, form, {token: this.accessToken}, Account.xiuxiu_app_id);
            return await this.api.request({
                url: url.url + "?" + qs.stringify({...pack, ...form}),
                method: url.method,
                headers: {
                    'Host': UrlContainer.xiuxiu_host,
                    "Access-Token": this.accessToken
                }
            });
        }

        //获取未读消息数量
        public async getUserUnreadCount() {
            const form = this.device;
            const url = UrlContainer.getUrl("user_unread_count");
            const token = this.accessToken;
            const pack = Sign.signUrl(url, form, {token: token}, Account.xiuxiu_app_id, '1568101691794');
            return await this.api.request({
                url: url.url + "?" + qs.stringify({...form, ...pack}),
                method: url.method,
                headers: {
                    'Host': UrlContainer.xiuxiu_host,
                    "Access-Token": token
                }
            });
        }

        //获取附加的人
        public async getTabFeedList(lat: string, lng: string, tab_id: string, cursor: string = "") {
            const form = {
                ...this.device,
                lat: lat,
                lng: lng,
                tab_id: tab_id,
                cursor: cursor,
                // limit: 20,
            };
            const url = UrlContainer.getUrl("tab_feed_list");
            const pack = Sign.signUrl(url, form, {token: this.accessToken}, url.appId);
            return await this.api.request({
                url: url.url + "?" + qs.stringify({...pack, ...form}),
                method: url.method,
                headers: {
                    'Host': UrlContainer.xiuxiu_host,
                    "Access-Token": this.accessToken
                }
            });
        }
    }

    export class Api {
        public async request(config) {
            config.headers = {
                ...(config.headers || {}),
                "User-Agent": "okhttp/3.12.1",
            };
            if (config.method === "POST" && config.data) {
                config.data = qs.stringify(config.data);
                //application/x-www-form-urlencoded
                // let str = "";
                // Object.keys(config.data).forEach((key) => {
                //     str += `${key}=${config.data[key]}&`;
                // });
                // config.data = str;
                config.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            const res = await Http.Api.request(config);
            res.ok = res.data.error_code === 0;
            return res;
        }

        public static getVCode() {
            const form = {
                phone_cc: '86',
                phone: '',
            };
        }
    }
}
