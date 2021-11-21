<template>
  <q-page>

    <!--  FILTER  -->
    <div class="filter">
      <div class="container">
        <q-select standart v-model="model" :options="options" label="Sort By"
                  transition-show="flip-up"
                  transition-hide="flip-down"
        ></q-select>
        <i class="q-icon fas fa-sort-amount-down q-ml-sm" v-if="sortBy && sortDirection === 'desc'"></i>
        <i class="q-icon fas fa-sort-amount-down-alt q-ml-sm" v-if="sortBy && sortDirection === 'asc'"></i>
        {{ model }}
        <form @submit.prevent class="form_search">
          <input type="text" placeholder="Search"/>
          <q-btn color="primary" class="no-border-radius icon-search">
            <q-icon class="fas fa-search"></q-icon>
          </q-btn>
          <q-btn class="no-border-radius icon-bookmark">
            <q-icon class="fas fa-bookmark"></q-icon>
          </q-btn>
        </form>

        <!--        <div class="select_div">-->
        <!--          <div class="icon-arrows q-mr-xs"></div>-->
        <!--          <select id="sortBy">-->
        <!--            <option value="views">By Views</option>-->
        <!--            <option value="likes">By Likes</option>-->
        <!--            <option value="shares">By Shares</option>-->
        <!--          </select>-->
        <!--        </div>-->

        <div class="button-filter">
          <div class="icon-filter q-mr-xs"></div>
          <span>Filters</span>
        </div>

      </div>
    </div>

    <!--  POSTS LIST  -->
    <div class="posts-list">
      <div class="container">
        <div class="video_post" v-for="post in searching" :key="post.name">
          <div class="post_title">
            <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }">{{ post.status }}</router-link>
          </div>

          <div class="video_block">
            <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }" class="video_frame">
              <img :src="post.video" alt="">
            </router-link>
            <div class="video_added flex column">
              <span class="time flex flex-center"><q-icon class="fas fa-clock"></q-icon>00:46</span>
              <span class="ago">5h ago</span>
            </div>
          </div>

          <div class="tiktok_buttons">
            <q-icon class="fab fa-tiktok grey-button"></q-icon>
            <q-icon class="fas fa-user grey-button"></q-icon>
            <q-icon class="fas fa-music grey-button"></q-icon>
          </div>

          <div class="social_block flex">
            <div class="social_item flex column items-center">
              <q-icon class="fas fa-heart"></q-icon>
              <span>12.7M</span>
            </div>
            <div class="social_item middle flex column items-center">
              <q-icon class="fas fa-share"></q-icon>
              <span>130K</span>
            </div>
            <div class="social_item flex column items-center">
              <q-icon class="fas fa-eye"></q-icon>
              <span>28.2M</span>
            </div>
          </div>

          <div class="user_block flex items-center">
            <img class="user_avatar" :src="post.avatar" :alt="post.name"/>
            <span class="user_name">{{ post.name }}</span>
          </div>

          <div class="music_block flex items-center">
            <img src="/images/music_frame.png" alt="" class="music_frame">
            <span class="music_title">Music Stuff</span>
            <q-icon class="fas fa-play grey-button"></q-icon>
          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import FilterMobile from 'src/components/FilterMobile.vue';
import {ref} from 'vue';

export default {
  setup() {
    return {
      model: ref(''),
    };
  },

  components: {
    FilterMobile,
  },
  data() {
    return {
      search: '',
      sortBy: true,
      sortDirection: 'desc',
      options: [
        'Likes',
        'Views',
        'Shares',
      ],
    };
  },
  methods: {
    sort(e) {
      if (e.target.dataset.filter === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.sortBy = e.target.dataset.filter;
    },
  },
  created() {
    this.$store.dispatch('posts/fetchPosts');
  },
  computed: {
    getposts() {
      return this.$store.getters['posts/get_posts'];
    },
    searching() {
      if (this.sort) {
        return this.getposts
          .filter((item) =>
            item.name.toLowerCase().includes(this.search.toLowerCase()),
          )
          .sort((a, b) => {
            if (a[this.sortBy] === b[this.sortBy]) return 0;
            if (a[this.sortBy] > b[this.sortBy])
              return this.sortDirection === 'asc' ? 1 : -1;
            if (a[this.sortBy] < b[this.sortBy])
              return this.sortDirection === 'asc' ? -1 : 1;
          });
      } else {
        return this.getposts;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'src/css/components/filter';
@import 'src/css/components/video_post';
</style>
