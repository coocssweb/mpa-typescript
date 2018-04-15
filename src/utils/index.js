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
