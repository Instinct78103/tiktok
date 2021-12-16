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

    <pre>{{ getFilterObject }}</pre>

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
import {pageNum} from 'src/store/filter/actions';

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

    const videoList = useResult(result1, null, data => data.video); // if query fails we'll get null
    const regionsList = useResult(result2, null, data => data.region);

    console.log('comp: videos');
    // store.dispatch('filter/sortBy', 'createTime');

    return {
      refetch,
      fetchMore,
      videoList, //without using UseResult we would return `result`
      regionsList,
      track: ref(''),
      // sort_by_item: ref({label: 'Creation Date', value: 'createTime'}),
      sort_by_item: store.getters['filter/get_sortBy'],
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
    currentTrack(newTrack, oldTrack) {
      const a = this.$refs.audioPlayer;
      a.load();
      if (newTrack) {
        a.play();
      }
    },
    '$store.state.filter.model_sortBy': function (val) {
      this.$store.dispatch('filter/pageNum', 1);
      this.refetch(this.getFilterObject);
    },
    '$store.state.filter.order_direction': function (val) {
      this.$store.dispatch('filter/pageNum', 1);
      this.refetch(this.getFilterObject);
    },
    '$store.state.filter.model_region': function (val) {
      this.$store.dispatch('filter/pageNum', 1);
      this.refetch(this.getFilterObject);
    },
    '$store.state.filter.pageNum': function (newVal, oldVal) {
      if (newVal > oldVal) {
        this.fetchMore({
          query: videoListQuery,
          variables: this.getFilterObject,
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
      }
    },
  },
  methods: {
    getParamsFromURL() {

      const params = this.$route.query;
      console.log(params);
      if (params.hasOwnProperty('sortBy')) {
        this.$store.dispatch('filter/sortBy', params.sortBy);
      } else {
        this.$store.dispatch('filter/sortBy', 'createTime');
      }

    },
    getNextPosts() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.$store.dispatch('filter/pageNum', this.$store.getters['filter/get_pageNum'] + 1);
        }
      };
    },
    playMusic(x) {
      this.currentTrack = x;
    },
    getTimeOnly,
  },
  created() {
    this.getParamsFromURL();
    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth;
    });
  },
  mounted() {
    this.getNextPosts();
  },
  computed: {
    getFilterObject() {
      const target = JSON.parse(JSON.stringify(this.$store.getters));
      return Object.assign({}, {
        limit: target['filter/get_limit'],
        order: target['filter/get_sortBy'],
        order_direction: target['filter/get_orderDirection'],
        pageNum: target['filter/get_pageNum'],
        range: target['filter/get_range'],
        search_region: target['filter/get_region'].value,
        search_q: target['filter/get_search'],
        offset: (target['filter/get_pageNum'] - 1) * target['filter/get_limit'],
        // showPrivate: target['filter/get_showPrivate'],
      });
    },
    isMobile() {
      return this.innerWidth < 1200;
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'src/css/components/table_heading';
</style>
