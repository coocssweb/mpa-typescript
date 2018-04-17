/**
 * 首页模块
 * Created by 王佳欣 on 2018/3/19.
 */

export default {
    el: {
        $page: $('.home'),
    },
    data: {

    },
    bindEvent () {
        $('.js_transition').click(() => {
            this.$router.push('test', {params: 1});
        });

        $('.js_replace').click(() => {
            this.$router.replace('test', {params: 2});
        });
        $('.js_router').click(() => {
            console.log(this.$router.route);
        });

        $('.js_tip').click(() => {
            this.$tip({message: '测试提示信息'});
        });

        $('.js_share').click(() => {
            this.$thirdPlat.setShare({
                title: '头号玩家 Ready Player One',
                desc: '在2045年，现实世界衰退破败，人们沉迷于VR(虚拟现实)游戏“绿洲(OASIS)”的虚幻世界里寻求慰藉。',
                imageUrl: 'https://img3.doubanio.com/view/photo/m/public/p2517122395.jpg',
                link: 'https://movie.douban.com/subject/4920389/',
                success: () => {
                    console.log('success share');
                },
                cancel: () => {
                    console.log('cancel share');
                },
                fail: () => {
                    console.log('cancel share');
                }
            });

            this.$thirdPlat.callShare();
        });
    }
};
