const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'PageUsers',
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
