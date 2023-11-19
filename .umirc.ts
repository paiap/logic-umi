import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'umi-test',
  },
  routes: [
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
      name: '架构地图',
      path: '/architecture',
      component: './Architecture',
    },
    {
      name: ' CRUD示例',
      path: '/table',
      component: './Table',
    },
    {
      name: ' proTable测试',
      path: '/protable',
      component: './ProTable',
    },
    {
      name: ' myProTable',
      path: '/myprotable',
      component: './Package',
    },
  ],
  npmClient: 'yarn',
  // 开启qiankun主应用
  qiankun: {
    master: {

    }
  },
  // 在开发模式下，主应用加载微应用的图片等静态资源的代理
  proxy: {
    '/app1': {
      target: 'http://localhost:8002',
      changeOrigin: true,
    },
  },
});
