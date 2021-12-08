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
    <!--  POSTS  -->
    <div class="posts-list">
      <div class="container">
        <!--        <button @click="refetch({limit:2, order: 'diggCount desc'})">Click Me!</button>-->
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
import {useStore} from 'vuex';

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
        {label: 'Creation Date', value: 'createTime'},
        {label: 'Likes', value: 'diggCount'},
        {label: 'Views', value: 'playCount'},
        {label: 'Shares', value: 'shareCount'},
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
    const {result, refetch, fetchMore} = useQuery(videoListQuery);

    const store = useStore();
    store.dispatch('filter/sortBy', 'createTime');
    store.dispatch('filter/order', 'desc');

    const videoList = useResult(result, null, data => data.video); // if query fails we'll get null

    return {
      refetch,
      fetchMore,
      videoList, //without using UseResult we would return `result`
      track: ref(''),
      sort_by_item: ref({label: 'Creation Date', value: 'createTime'}),
      countries_item: ref(''),
      show_private: ref(false),
      date_item: ref(14),
      pageNum: ref(0),
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
    '$store.state.filter.model_sortBy': function (val) {
      this.refetch({
        limit: 10,
        order: `${val} ${this.$store.getters['filter/get_order']}`,
      });
    },
    '$store.state.filter.order': function (val) {
      this.refetch({
        limit: 10,
        order: `${this.$store.getters['filter/get_sortBy']} ${val}`,
      });
    },
  },
  methods: {
    loadMore() {
      this.pageNum++;
      this.fetchMore({
        query: videoListQuery,
        variables: {limit: (this.pageNum * this.get_pageSize)},
        updateQuery: (existing, incoming) => ({
          videoList: [this.videoList, incoming.fetchMoreResult],
        }),
      });
    },
    getNextPosts() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.loadMore();
        }
      };
    },
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
    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth;
    });
  },
  mounted() {
    this.getNextPosts();
  },
  computed: {
    isMobile() {
      return this.innerWidth < 1200;
    },
    get_pageSize() {
      return this.$store.getters['filter/get_limit'];
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'src/css/components/table_heading';

</style>
