/*
 * @creater: panan
 * @message:umirc配置文件
 * @since: 2023-11-18 19:21:55
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-02-05 19:41:08
 * @文件相对于项目的路径: /logic-umi/.umirc.ts
 */
import { defineConfig } from '@umijs/max';

const route = [
  {
    path: '/',
    redirect: '/application',
  },
  {
    name: '应用',
    path: '/application',
    component: './Application',
  },
  {
    name: 'tcloud',
    path: '/tcloud',
    component: './tcloud',
  },
  {
    name: 'echarts',
    path: '/echarts',
    component: './Echart',
  },
  {
    name: 'Collapse折叠面板',
    path: '/collapse',
    component: './Collapse/index2',
  },
  // {
  //   name:'beard',
  //   path: '/beard',
  //   component: './beard',
  // },
  // {
  //   name: '架构地图',
  //   path: '/architecture',
  //   component: './Architecture',
  // },
  // {
  //   name: 'CRUD示例',
  //   path: '/table',
  //   component: './Table',
  // },
  // {
  //   name: 'proTable测试',
  //   path: '/protable',
  //   component: './ProTable',
  // },
  // {
  //   name: 'myProTable',
  //   path: '/myprotable',
  //   component: './Package',
  // },
  // {
  //   name: 'antv/l7-map空间地图调研',
  //   path: '/antvl7',
  //   component: './antv-l7-react',
  // },

  // {
  //   name: 'antv/l6拓扑图调研',
  //   path: '/antvg6',
  //   component: './antv-g6',
  // },
  // {
  //   name: 'antv/l6-Fruchterman调研',
  //   path: '/antvg6Fruchterman',
  //   component: './antv-g6/Fruchterman',
  // },
  // {
  //   name: 'paas首页',
  //   path: '/paas-l7',
  //   component: './paas',
  // },
  // {
  //   name: '拓扑图',
  //   path:'/paas-l7/antv-g6',
  //   component: './paas/antv-g6',
  //   hideInMenu: true,
  //   // layout: false
  // },
  // {
  //   name: 'LeafLet地图调研(react-leaflet舍弃)',
  //   path: '/leaflet',
  //   component: './LeafLet',
  // },

  // {
  //   name: 'l7-瓦片',
  //   path: '/gaode',
  //   component: './Gaode',
  // },

  // {
  //   name: '高德地图调研',
  //   path: '/gaode',
  //   component: './Gaode',
  // },
];

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'umi-test',
  },
  routes: route,
  npmClient: 'yarn',
  // 开启qiankun主应用
  // qiankun: {
  //   master: {

  //   }
  // },
  // 在开发模式下，主应用加载微应用的图片等静态资源的代理
  // proxy: {
  //   '/app1': {
  //     target: 'http://localhost:8002',
  //     changeOrigin: true,
  //   },
  // },
});
