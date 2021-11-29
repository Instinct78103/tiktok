<template>
  <q-page>

    <!--  FILTER-MOBILE  -->
    <div class="filter_mobile" v-if="isMobile">
      <div class="container">
        <div class="filter_mobile-wrap">
          <div class="search">
            <q-form @submit.prevent class="search_form">
              <q-input class="search_input" square outlined v-model="search_text" bg-color="white" label="Search"/>
              <div>
                <q-btn icon="search" type="submit" color="primary"/>
              </div>
            </q-form>
          </div>

          <div class="sort_by">
            <q-select standart
                      v-model="sort_by_item"
                      :options="sort_by"
                      label="Sort By"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      class="select_block"
            ></q-select>
            <i class="q-icon fas q-ml-sm"
               :class="sortDirection === 'desc' ? 'fa-sort-amount-down': 'fa-sort-amount-down-alt'"
               @click="sortDirection = (sortDirection === 'desc') ? 'asc' : 'desc'"
            ></i>
          </div>

          <ButtonFilters></ButtonFilters>

        </div>
      </div>
    </div>

    <!--  FILTER-DESKTOP  -->
    <div class="filter_desktop" v-else>
      <div class="container">
        <div class="filter-desktop-wrap">
          <div class="date_picker">
            <q-btn icon="event" round color="primary">
              <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="proxyDate">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup/>
                    <q-btn label="OK" color="primary" flat @click="save" v-close-popup/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn>
          </div>

          <div class="search">
            <q-input outlined v-model="search_text" label="Search"/>
          </div>

          <div class="toggle_private">
            <q-toggle
              v-model="show_private"
              color="red"
              label="Show Private"
              left-label
            />
          </div>


          <div class="prepared_range">
            <q-btn-toggle
              v-model="date_item"
              toggle-color="primary"
              :options="[
        {label: '7 days', value: '7'},
        {label: '14 days', value: '14'},
        {label: '30 days', value: '30'}
      ]"
            />
          </div>

          <div class="sort_by">
            <q-select standart v-model="sort_by_item" :options="sort_by" label="Sort By"
                      transition-show="flip-up"
                      transition-hide="flip-down"
            ></q-select>
          </div>

          <div class="country_filter">
            <q-select standart v-model="countries_item" :options="countries" label="Filter By Country"
                      transition-show="flip-up"
                      transition-hide="flip-down"
            ></q-select>
          </div>

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
import ButtonFilters from 'components/ButtonFilters';
import {ref} from 'vue';
import VideoPost from 'components/VideoPost';

export default {
  setup() {
    return {
      sort_by_item: ref(''),
      search_text: ref(''),
      countries_item: ref(''),
    };
  },

  components: {
    VideoPost,
    ButtonFilters
  },
  data() {
    return {
      innerWidth: 0,
      search: '',
      sort_is_on: true,
      sortDirection: 'desc',
      sort_by: [
        'Likes',
        'Views',
        'Shares',
      ],
      countries: [
        'USA',
        'UK',
        'Russia',
        'Germany',
        'Germanyqwe',
        'Germanydc',
        'Germanydv',
      ],
    };
  },
  methods: {
    sort(e) {
      if (e.target.dataset.filter === this.sort_is_on) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.sort_is_on = e.target.dataset.filter;
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
            if (a[this.sort_is_on] === b[this.sort_is_on]) return 0;
            if (a[this.sort_is_on] > b[this.sort_is_on])
              return this.sortDirection === 'asc' ? 1 : -1;
            if (a[this.sort_is_on] < b[this.sort_is_on])
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
@import 'src/css/components/table_heading';

</style>
