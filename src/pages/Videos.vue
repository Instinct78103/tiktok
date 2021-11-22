<template>
  <q-page>

    <!--  FILTER  -->
    <div class="filter" :style="isMobile ? {backgroundColor: '#eee'}: '' ">
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
    <div class="table_heading" v-if="!isMobile">
      <div class="container">
        <div class="th">
          <span class="video_content">Video Content</span>
          <span class="author">Author</span>
          <span class="music">Music</span>
          <span class="growth">Growth</span>
          <span class="views"><q-icon class="fas fa-eye"></q-icon></span>
          <span class="likes"><q-icon class="fas fa-heart"></q-icon></span>
          <span class="comments"><q-icon class="fas fa-comments"></q-icon></span>
          <span class="shares"><q-icon class="fas fa-share"></q-icon></span>
          <span class="er">ER</span>
          <span class="ts">TS</span>
        </div>
      </div>
    </div>
    <div class="posts-list">
      <div class="container">
        <video-post v-for="post in searching" :key="post.name" :post="post" :is-mobile="isMobile"></video-post>
      </div>
    </div>

  </q-page>
</template>

<script>
import FilterMobile from 'src/components/FilterMobile.vue';
import {ref} from 'vue';
import VideoPost from 'components/VideoPost';

export default {
  setup() {
    return {
      model: ref(''),
    };
  },

  components: {
    FilterMobile,
    VideoPost,
  },
  data() {
    return {
      innerWidth: 0,
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

    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth;
    });
  },
  computed: {
    isMobile() {
      return this.innerWidth < 1200;
    },
    getPosts() {
      return this.$store.getters['posts/get_posts'];
    },
    searching() {
      if (this.sort) {
        return this.getPosts
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
        return this.getPosts;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'src/css/components/filter';
@import 'src/css/components/table_header';

</style>
