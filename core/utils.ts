import * as crypto from 'crypto'
import {Buffer} from "buffer";

export module Util {
    export class Coder {


        public static md5_encode(str: string): string {
            const obj = crypto.createHash('md5');
            obj.update(str);
            return obj.digest('hex');
        }

        public static md5(data: any): Buffer {
            const obj = crypto.createHash('md5');
            obj.update(data);
            return obj.digest();
        }

        public static async sleep(time: number) {
            return new Promise((resolve => {
                setTimeout(resolve, time * 1000);
            }))
        }
    }

    export class Base64 {
        public static decode(str: string) {
            return Buffer.from(str, 'base64').toString('ascii');
        }

        public static encode(str: string) {
            return Buffer.from(str).toString('base64');
        }
    }
}