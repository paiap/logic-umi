import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/index.js'),
        })
      : require('../../layouts/index.js').default,
    routes: [
      {
        path: '/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../index.js'),
            })
          : require('../index.js').default,
        _title: 'app3',
        _title_default: 'app3',
      },
      {
        path: '/user',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('F:/desk/自学/react/umi-plugin-qiankun/examples/app3/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/index.js'),
            })
          : require('../user/index.js').default,
        _title: 'app3',
        _title_default: 'app3',
      },
      {
        path: '/user/model',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('F:/desk/自学/react/umi-plugin-qiankun/examples/app3/pages/user/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () => import('../user/model.js'),
            })
          : require('../user/model.js').default,
        _title: 'app3',
        _title_default: 'app3',
      },
      {
        path: '/:abc',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../$abc.js'),
            })
          : require('../$abc.js').default,
        _title: 'app3',
        _title_default: 'app3',
      },
      {
        component: () =>
          React.createElement(
            require('F:/desk/自学/react/umi-plugin-qiankun/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'pages', hasRoutesInConfig: false },
          ),
        _title: 'app3',
        _title_default: 'app3',
      },
    ],
    _title: 'app3',
    _title_default: 'app3',
  },
  {
    component: () =>
      React.createElement(
        require('F:/desk/自学/react/umi-plugin-qiankun/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'pages', hasRoutesInConfig: false },
      ),
    _title: 'app3',
    _title_default: 'app3',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
