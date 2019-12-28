import "@scss/demo.scss";
import App from "@app";
import Loading from "@modules/loading";
new App({
  data: {},
  watchs: {},

  bindEvents() {},

  init() {
    console.log("asdfasdf");
    const loading = new Loading(
      [
        "http://assets.shuxia123.com/uploads/2019/1555171314834_width_1289_height_476.png",
        "http://assets.shuxia123.com/uploads/2019/1555170559378_width_800_height_349.png",
        "http://assets.shuxia123.com/uploads/2019/1554905994308_width_500_height_350.jpeg"
      ],
      () => {
        console.log("图片加完成");
      }
    );
    loading.start();

    console.log("2222222222");
  }
});
