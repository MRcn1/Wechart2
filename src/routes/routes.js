import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: '会员注册绑定',
        //     meta: {
        //         title: '会员注册绑定'
        //     },
        //     component: resolve => {
        //         require(['@/pages/register/index.vue'], resolve)
        //     },
        // },
        {
            path: '/',
            name: '领取优惠',
            meta: {
                title: '领取优惠'
            },
            component: resolve => {
                require(['@/pages/receive/receive.vue'], resolve)
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    // window.scrollTo(0, 0);
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    console.log(localStorage.getItem('membershipSystemId') == 'undefined')
    if (localStorage.getItem('membershipSystemId') == 'undefined' && to.path!='/empty' && to.path!='/' && to.path!='/resetPassword') {
        next({ path: '/empty' })
    }else{
        next()
    }

})
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
export default router