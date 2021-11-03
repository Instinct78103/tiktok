const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'PageUsers',
        alias: '/videos',
        props: true,
        component: () => import( /* webpackChunkName: "AuthorsList" */ 'pages/PageUsers.vue'),
      },
      {
        path: '/author/:id',
        name: 'AuthorDetails',
        props: true,
        component: () => import(/* webpackChunkName: "AuthorDetails" */ 'pages/Details.vue'),
      },
      {
        path: '/auth',
        name: 'Auth',
        props: true,
        component: () => import(/* webpackChunkName: "auth" */ 'pages/PageAuth.vue'),
      },
      {
        path: '/monitored-accounts',
        name: 'monitoredAccounts',
        props: true,
        component: () => import(/* webpackChunkName: "monitoredAccounts" */ 'pages/MonitoredAccounts.vue'),
      },
      {
        path: '/music',
        name: 'music',
        props: true,
        component: () => import(/* webpackChunkName: "music" */ 'pages/Music.vue'),
      },
      {
        path: '/private',
        name: 'private',
        props: true,
        component: () => import(/* webpackChunkName: "private" */ 'pages/Private.vue'),
      },
      {
        path: '/time',
        name: 'time',
        props: true,
        component: () => import(/* webpackChunkName: "time" */ 'pages/Time.vue'),
      },
      {
        path: '/trending',
        name: 'trending',
        props: true,
        component: () => import(/* webpackChunkName: "trending" */ 'pages/Trending.vue'),
      },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
