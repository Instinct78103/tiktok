<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath !== '/'"
          to="/"
          icon="arrow_back"
          flat
          dense
        />

        <svg v-else xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <path
            d="M38.4,21.68V16c-2.66,0-4.69-.71-6-2.09a8.9,8.9,0,0,1-2.13-5.64V7.86L24.9,7.73s0,.23,0,.54V30.8a5,5,0,1,1-3.24-5.61v-5.5a10.64,10.64,0,0,0-1.7-.14A10.36,10.36,0,1,0,30.32,29.91a10.56,10.56,0,0,0-.08-1.27V19.49A14.48,14.48,0,0,0,38.4,21.68Z" style="fill: #fff"/>
        </svg>



        <q-toolbar-title class="text-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn
          flat
          @click="drawerRight = !drawerRight"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      side="right"
      v-model="drawerRight"
      show-if-above
      bordered
      :width="200"
      :breakpoint="500"
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <ul class="q-pa-sm">
          <router-link
            v-for="menuItem in menuList"
            :key="menuItem.label"
            :to="menuItem.to">
            <li><a class="text-body1">{{ menuItem.label }}</a>
            </li>
          </router-link>
        </ul>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
const menuList = [
  {
    label: 'Videos',
    to: '/',
  },
  {
    label: 'Trending',
    to: '/trending',
  },
  {
    label: 'Private',
    to: '/private',
  },
  {
    label: 'Time',
    to: '/time',
  },
  {
    label: 'Music',
    to: '/music',
  },
  {
    label: 'Monitored Accounts',
    to: '/monitored-accounts',
  },
];

import EssentialLink from 'components/EssentialLink.vue';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      menuList,
    };
  },
  setup() {
    return {
      drawerRight: ref(false),
    };
  },

  computed: {
    title() {
      const currentPath = this.$route.fullPath;
      if (currentPath === '/') {
        return 'Tiktomania';
      } else if (currentPath.includes('/author/')) {
        return 'Author Details';
      } else if (currentPath === '/auth') {
        return 'Login';
      }
    },
  },

  components: {
    EssentialLink,
  },
});
</script>
