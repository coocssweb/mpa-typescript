const UA = navigator.userAgent.toLowerCase();

// 设置分享
export const SetShareInfo = ({url, title, description, page, id}) => {

};


// 动态加载js
export const loadJs = (url) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    resolve();
                }
            };
        } else {
            script.onload = function () {
            };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    });
};

// 加载图片
export const loadImage = (images) => {
    let hasLoadCount = 0;
    return new Promise((resolve, reject) => {
        const load = (src) => {
            let image = new Image();
            image.onload = function (status) {
                hasLoadCount++;
                if (hasLoadCount === images.length) {
                    resolve();
                }
            };
            image.onerror = function (e) {
                hasLoadCount++;
                if (hasLoadCount === images.length) {
                    resolve();
                }
            };
            image.src = src;
        };

        images.map((item, index) => {
            load(item);
        });
    });
};

/* eslint-disable */
// 添加CNZZ时间统计
export const pushCnzzEvent = (btnName, event) => {
    _czc.push(['_trackEvent', btnName, event]);
};

// PV统计
export const pushPage = (pageName) => {
    _czc.push(['_trackPageview', pageName]);
};

// 获取Url查询参数
export const getUrlQuery =(name) => {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    let r = window.location.search.substr(1).match(reg);
    if (r) {
        return (unescape(r[2]) || '');
    }
    return null;
};