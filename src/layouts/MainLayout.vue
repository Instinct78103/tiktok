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
          <li v-for="menuItem in menuList" :key="menuItem.label"><a class="text-body1" @click="$router.push(menuItem.to)" :href="menuItem.to">{{ menuItem.label }}</a></li>
        </ul>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const menuList = [
  {
    label: "Videos",
    to: '/videos'
  },
  {
    label: "Trending",
    to: '/trending'
  },
  {
    label: "Private",
    to: '/private'
  },
  {
    label: "Time",
    to: '/time'
  },
  {
    label: "Music",
    to: '/music'
  },
  {
    label: "Monitored Accounts",
    to: '/monitored-accounts'
  },
];

import EssentialLink from "components/EssentialLink.vue";
import { defineComponent, ref } from "vue";
import { matAllInbox } from '@quasar/extras/material-icons'

export default defineComponent({
  name: "MainLayout",
  data(){
    return {
      menuList
    }
  },
  setup() {
    return {
      drawerRight: ref(false),
    };
  },

  computed: {
    title() {
      const currentPath = this.$route.fullPath;
      if (currentPath === "/") {
        return "Tiktomania";
      } else if (currentPath.includes("/author/")) {
        return "Author Details";
      } else if (currentPath === "/auth") {
        return "Login";
      }
    },
  },

  components: {
    EssentialLink,
  },
});
</script>
