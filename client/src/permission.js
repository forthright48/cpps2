import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress bar
import 'nprogress/nprogress.css'// Progress bar
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // Logged In?

const whiteList = ['/login', '/register'] // Do not redirect
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        if (whiteList.indexOf(to.path) !== -1) {
            next({ path: '/' })
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            const promises = [
                store.dispatch('GetStatus'),
            ]
            if (store.getters.roles.length === 0) {
                promises.push(store.dispatch('GetInfo'))
            }
            Promise.all(promises).then(res => {
                next()
                NProgress.done()
            }).catch(err => {
                store.dispatch('LogOut').then(() => {
                    Message.error(err || 'Verification failed, please login again')
                    next({ path: '/' })
                    NProgress.done()
                })
            })
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
            NProgress.done()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
