import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import home from '@/components/home'
import choose from '@/components/choose'
import cash from '@/components/cash'
import bill from '@/components/bill'
import forbid from '@/components/forbid'
import plugin from '@/components/payAuth/plugin'
import all from '@/components/payAuth/all'
import wxpay from '@/components/payAuth/wxpay'
import afterpay from '@/components/payAuth/afterpay'
import clubInvitation from '@/components/serverShare/clubInvitation'
import joinClubSuccess from '@/components/serverShare/joinClubSuccess'
import helpGetDiamond from '@/components/serverShare/helpGetDiamond'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/choose',
      name: 'choose',
      component: choose
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/cash',
      name: 'cash',
      component: cash
    },
    {
      path: '/bill',
      name: 'bill',
      component: bill
    },
    {
      path: '/forbid',
      name: 'forbid',
      component: forbid
    },
    {
      path: '/plug_in',
      name: 'plug_in',
      component: plugin,
      redirect: '/plug_in/all',
      children: [
        {
          path: 'all',
          name: 'all',
          component: all
        },
        {
          path: 'wxpay',
          name: 'wxpay',
          component: wxpay
        },
        {
          path: 'afterpay',
          name: 'afterpay',
          component: afterpay
        }
      ]
    },
    {
      path: '/clubInvitation',
      name: 'clubInvitation',
      component: clubInvitation
    },
    {
      path: '/joinClubSuccess',
      name: 'joinClubSuccess',
      component: joinClubSuccess
    },
    {
      path: '/helpGetDiamond',
      name: 'helpGetDiamond',
      component: helpGetDiamond
    }
  ]
})
