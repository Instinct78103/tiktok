<template>
  <q-page>

    <posts-filter-mobile
      v-if="isMobile"
      :date_item="date_item"
      :search_text="search_text"
      :show_private="show_private"
      :sort_by="sort_by"
      :sort_by_item="sort_by_item"
      :sort_direction="sort_direction"
    />

    <posts-filter-desktop
      v-else
      :countries="regionsList"
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
import regionsListQuery from '../graphql/regionsList.query.gql';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';

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
      countries: this.regionsList,
    };
  },
  setup() {

    const router = useRoute();
    const store = useStore();

    const {result: result1, refetch, fetchMore} = useQuery(videoListQuery);
    const {result: result2} = useQuery(regionsListQuery);

    console.log(result1)
    console.log(result2)


    const videoList = useResult(result1, null, data => data.video); // if query fails we'll get null
    // console.log(videoList)

    store.dispatch('filter/sortBy', 'createTime');
    store.dispatch('filter/orderDirection', 'desc');
    store.dispatch('filter/showPrivate', true);


    const regionsList = useResult(result2, null, data => data.region);

    return {
      refetch,
      fetchMore,
      videoList, //without using UseResult we would return `result`
      regionsList,
      track: ref(''),
      sort_by_item: ref({label: 'Creation Date', value: 'createTime'}),
      show_private: store.getters['filter/get_showPrivate'],
      date_item: ref(null),
      pageNum: ref(1),
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
        limit: this.$store.getters['filter/get_limit'],
        order: val,
        order_direction: this.$store.getters['filter/get_orderDirection'],
      });
    },
    '$store.state.filter.order_direction': function (val) {
      this.refetch({
        limit: this.$store.getters['filter/get_limit'],
        order: this.$store.getters['filter/get_sortBy'],
        order_direction: val,
      });
    },
    'pageNum': function (val) {
      this.$store.dispatch('filter/pageNum', val);
    },
  },
  methods: {
    loadMore() {
      this.pageNum++;

      console.log(this.$store.getters);

      this.fetchMore({
        query: videoListQuery,
        variables: {
          offset: (this.pageNum * this.get_pageSize),
        },
        updateQuery: (previousResult, {fetchMoreResult}) => {
          if (!fetchMoreResult) return previousResult;
          return {
            ...previousResult,
            video: [
              ...previousResult.video,
              ...fetchMoreResult.video,
            ],
          };
        },
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
    realCountries() {

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
