/**
 * 常用常量定义
 * Created by 王佳欣 on 2018/4/2.
 */

export const API_URL = process.env.API_DOMAIN;

export const ORIGIN_URL = process.env.ORIGIN_URL;

export const CALLBACK_URL = encodeURIComponent(`${ORIGIN_URL}/callback.html`);

export let ACCOUNT_URL = `${process.env.ACCOUNT_URL}/#!/logout/relogin?client_id=1089867664&client_callback=${CALLBACK_URL}`;

export const ACCOUNT_JS_SDK = process.env.ACCOUNT_JS_SDK;

export const MT_ACCOUNT = process.env.MT_ACCOUNT;

