<template>
  <q-page>

    <posts-filter-mobile
      v-if="isMobile"
      :countries_item="countries_item"
      :date_item="date_item"
      :search_text="search_text"
      :show_private="show_private"
      :sort_by="sort_by"
      :sort_by_item="sort_by_item"
      :sort_direction="sort_direction"
    />

    <posts-filter-desktop
      v-else
      :countries_item="countries_item"
      :date_item="date_item"
      :search_text="search_text"
      :show_private="show_private"
      :sort_by="sort_by"
      :sort_by_item="sort_by_item"
      :sort_direction="sort_direction"
      :today_date="today_date"
    />

    <audio ref="audioPlayer">
      <source :src="currentTrack">
    </audio>

    <!--  TABLE HEADING  -->
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

    <!--    POSTS-->
    <div class="posts-list">
      <div class="container">
        <video-post
          v-for="item in videoList"
          :now-playing="currentTrack"
          :key="item.id"
          :post="item"
          :is-mobile="isMobile"
          :data-test="item"
          @triggerParent="playMusic($event)"
        />
      </div>
    </div>

  </q-page>
</template>

<script>
import {ref} from 'vue';
import {useQuery, useResult} from '@vue/apollo-composable';

import PostsFilterMobile from 'components/PostsFilterMobile';
import PostsFilterDesktop from 'components/PostsFilterDesktop';
import ButtonFilters from 'components/ButtonFilters';
import VideoPost from 'components/VideoPost';

import {getTimeOnly} from 'src/helper';
import videoListQuery from '../graphql/videoList.query.gql';

export default {
  data() {
    return {
      today_date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      currentTrack: '',
      innerWidth: 0,
      search_text: '',
      sort_is_on: true,
      sort_direction: 'desc',
      sort_by: [
        {'Likes': 'diggCount'},
        {'Views': 'playCount'},
        {'Shares': 'shareCount'},
      ],
      countries: [
        'USA',
        'UK',
        'Russia',
        'Germany',
      ],
    };
  },
  setup() {
    const {result} = useQuery(videoListQuery, {
      limit: 50,
      order: 'createTime desc',
    });

    const videoList = useResult(result, null, data => data.video); // if query fails we'll get null
    console.log(videoList);

    return {
      videoList, //without using UseResult we would return `result`
      track: ref(''),
      sort_by_item: ref(''),
      countries_item: ref(''),
      show_private: ref(false),
      date_item: ref(14),
    };
  },

  components: {
    PostsFilterMobile,
    PostsFilterDesktop,
    VideoPost,
    ButtonFilters,
  },
  watch: {
    currentTrack(newCurrentTrack, oldCurrentTrack) {
      const a = this.$refs.audioPlayer;
      a.load();
      if (newCurrentTrack) {
        a.play();
      }
    },
  },
  methods: {
    playMusic(x) {
      this.currentTrack = x;
    },
    getTimeOnly,
    sort(e) {
      if (e.target.dataset.filter === this.sort_is_on) {
        this.sort_direction = this.sort_direction === 'asc' ? 'desc' : 'asc';
      }
      this.sort_is_on = e.target.dataset.filter;
    },
  },
  created() {
    // this.$store.dispatch('posts/fetchPosts');

    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth;
    });
  },
  computed: {
    isMobile() {
      return this.innerWidth < 1200;
    },

    // getPosts() {
    //   return this.$store.getters['posts/get_posts'];
    // },
    // searching() {
    //   if (this.sort) {
    //     return this.getPosts
    //       .filter((item) =>
    //         item.name.toLowerCase().includes(this.search.toLowerCase()),
    //       )
    //       .sort((a, b) => {
    //         if (a[this.sort_is_on] === b[this.sort_is_on]) return 0;
    //         if (a[this.sort_is_on] > b[this.sort_is_on])
    //           return this.sortDirection === 'asc' ? 1 : -1;
    //         if (a[this.sort_is_on] < b[this.sort_is_on])
    //           return this.sortDirection === 'asc' ? -1 : 1;
    //       });
    //   } else {
    //     return this.getPosts;
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
@import 'src/css/components/table_heading';

</style>
