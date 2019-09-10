## 美图秀秀签名算法

本文算法源码是typescript的代码，通过逆向分析librelease_sig.so 解析出来的算法。


使用方法,导入模块
```
const account = new Mtxx.Account();

```


每个host都有appid，每个AppID的seckey不一样
``` javascript
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

```

![2019-09-10-20-12-43](https://blog-oeynet-com.oss-cn-chengdu.aliyuncs.com/ae4002b3234cd530c754cac838c3d101.png)



授权协议：只允许研究、学习目的的分享、使用、修改，不允许任何商业用途。转载请注明出处，感谢。
