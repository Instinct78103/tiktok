<template>
  <q-page>

    <!--  FILTER  -->
    <div class="filter">
      <div class="container">

        <form @submit.prevent class="form_search">
          <input type="text" placeholder="Search"/>
          <q-btn color="primary" class="no-border-radius icon-search">
            <q-icon class="fas fa-search"></q-icon>
          </q-btn>
          <q-btn class="no-border-radius icon-bookmark">
            <q-icon class="fas fa-bookmark"></q-icon>
          </q-btn>
        </form>

        <div class="select_div">
          <div class="icon-arrows q-mr-xs"></div>
          <select id="sortBy">
            <option value="views">By Views</option>
            <option value="likes">By Likes</option>
            <option value="shares">By Shares</option>
          </select>
          <i class="q-icon fas fa-sort-amount-down q-ml-sm" v-if="sortBy && sortDirection === 'desc'"></i>
          <i class="q-icon fas fa-sort-amount-down-alt q-ml-sm" v-if="sortBy && sortDirection === 'asc'"></i>
        </div>

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
          <div class="post_title">{{ post.status }}</div>

          <div class="video_block">
            <img class="video_frame" :src="post.video" alt="">
            <div class="video_added"></div>
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


    <!--    <div class="q-gutter-md q-pa-md items-center flex filter">-->


    <!--      <q-form class="flex justify-center full-width" style="width: 100%">-->
    <!--        <q-input-->
    <!--          bg-color="white"-->
    <!--          label="Search"-->
    <!--          outlined-->
    <!--          square-->
    <!--        />-->
    <!--        <q-btn-->
    <!--          color="primary"-->
    <!--          label=""-->
    <!--          icon="fas fa-search"-->
    <!--          class="no-border-radius"-->
    <!--        />-->
    <!--      </q-form>-->


    <!--      <q-input class="search" outlined v-model="search" label="Search" style="width: 100%"/>-->
    <!--      <q-btn-dropdown-->
    <!--        color="primary"-->
    <!--        :label="`Sort By ${sortBy}`"-->
    <!--        transition-show="flip-right"-->
    <!--        transition-hide="flip-left"-->
    <!--      >-->
    <!--        <q-list dense style="min-width: 100px">-->
    <!--          <q-item clickable v-close-popup @click.prevent="sort">-->
    <!--            <q-item-section data-filter="views">Views</q-item-section>-->
    <!--          </q-item>-->
    <!--          <q-item clickable v-close-popup @click.prevent="sort">-->
    <!--            <q-item-section data-filter="likes">Likes</q-item-section>-->
    <!--          </q-item>-->
    <!--          <q-item clickable v-close-popup @click.prevent="sort">-->
    <!--            <q-item-section data-filter="shares">Shares</q-item-section>-->
    <!--          </q-item>-->
    <!--        </q-list>-->
    <!--      </q-btn-dropdown>-->
    <!--      <q-icon-->
    <!--        class="fas fa-sort-amount-down-alt"-->
    <!--        v-if="sortBy && sortDirection === 'asc'"-->
    <!--      ></q-icon>-->
    <!--      <q-icon-->
    <!--        class="fas fa-sort-amount-down"-->
    <!--        v-if="sortBy && sortDirection === 'desc'"-->
    <!--      ></q-icon>-->

    <!--    </div>-->

    <!--    <q-list class="full-width" bordered separator>-->
    <!--      <q-item-->
    <!--        class="element"-->
    <!--        v-for="post in searching"-->
    <!--        :key="post.name"-->
    <!--        v-ripple-->
    <!--        :to="{ name: 'VideoDetails', params: { id: post.id } }"-->
    <!--      >-->
    <!--        <q-avatar square size="100px" class="post-video">-->
    <!--          <img :src="post.video"/>-->
    <!--        </q-avatar>-->

    <!--        <q-item class="post-status">-->
    <!--          <q-item-label class="text-left full-width q-pl-s">-->
    <!--            ❞{{ post.status }}❞-->
    <!--          </q-item-label>-->
    <!--        </q-item>-->

    <!--        <q-item class="post-icons flex">-->
    <!--          <q-icon class="fab fa-tiktok"></q-icon>-->
    <!--          <q-icon class="fas fa-download q-mx-md"></q-icon>-->
    <!--          <q-icon class="fas fa-play"></q-icon>-->
    <!--        </q-item>-->

    <!--        <q-item class="post-date">-->
    <!--          <p class="text-caption text-weight-light">-->
    <!--            Video Added: {{ Math.floor(Math.random() * 6 + 1) }}h ago,-->
    <!--            {{ parseISOString(post.created) }}-->
    <!--          </p>-->
    <!--        </q-item>-->

    <!--        <q-item flex class="post-avatar-name">-->
    <!--          <q-avatar size="30px" class="q-mr-sm">-->
    <!--            <img :src="post.avatar" :alt="post.name"/>-->
    <!--          </q-avatar>-->
    <!--          <q-item-label class="post-name-container">-->
    <!--            <span class="post-name flex">{{ post.name }}</span>-->
    <!--          </q-item-label>-->
    <!--        </q-item>-->

    <!--        <div class="post-social">-->
    <!--          <q-item-label class="flex social-item">-->
    <!--            <q-icon class="social-icon" name="far fa-play-circle"></q-icon>-->
    <!--            <p>{{ post.views }}</p>-->
    <!--          </q-item-label>-->

    <!--          <q-item-label class="flex social-item q-mx-md">-->
    <!--            <q-icon class="social-icon" name="far fa-heart"></q-icon>-->
    <!--            <p>{{ post.likes }}</p>-->
    <!--          </q-item-label>-->

    <!--          <q-item-label class="flex social-item">-->
    <!--            <q-icon class="social-icon" name="far fa-share-square"></q-icon>-->
    <!--            <p>{{ post.shares }}</p>-->
    <!--          </q-item-label>-->
    <!--        </div>-->
    <!--      </q-item>-->
    <!--    </q-list>-->
  </q-page>
</template>

<script>
import {parseISOString} from 'src/service';

import FilterMobile from 'src/components/FilterMobile.vue';

export default {

  components: {
    FilterMobile,
  },
  data() {
    return {
      search: '',
      sortBy: true,
      sortDirection: 'desc',
    };
  },
  methods: {
    parseISOString(s) {
      const dt = s.split(/[: T-]/).map(parseFloat);
      return `${(dt[3] < 10 ? '0' + dt[3] : dt[3]) || 0}:${
        (dt[4] < 10 ? '0' + dt[4] : dt[4]) || 0
      }`;
      // return `${dt[0]}-${dt[1]}-${(dt[2] < 10 ? '0' + dt[2] : dt[2]) || 0}, ${(dt[3] < 10 ? '0' + dt[3] : dt[3]) || 0}:${(dt[4] < 10 ? '0' + dt[4] : dt[4]) || 0}`;
      // return `${(dt[3] < 10 ? '0' + dt[3] : dt[3]) || 0}:${(dt[4] < 10 ? '0' + dt[4] : dt[4]) || 0}`;
    },
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
<style lang="scss">
.q-item {
  min-height: unset;
}

.q-icon {
  font-size: 16px;
}

.element {
  max-width: 640px;
  display: grid;
  margin: 0 auto;
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-items: flex-end;
  grid-gap: 10px;
  grid-auto-columns: 120px auto;
  grid-auto-rows: fit-content(100%);
  grid-template-areas:
    'video status status'
    'video date date'
    'video avatar-name avatar-name'
    'icons social social';

  > * {
    padding: 0;
  }

  *:not(.text-caption) {
    font-size: 16px;
  }
}

.post {
  &-video {
    grid-area: video;
    width: 100%;
    align-self: flex-start;
  }

  &-date {
    grid-area: date;
    width: 100%;

    p {
      margin: 0;
    }
  }

  &-status {
    grid-area: status;
    width: 100%;
    align-self: flex-start;

    p {
      width: fit-content;
      margin: 10px 0 0;
      text-align: left;
    }
  }

  &-icons {
    grid-area: icons;
    padding: 0;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }

  &-avatar-name {
    grid-area: avatar-name;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 100%;
  }

  &-social {
    grid-area: social;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1em;

    .social-item {
      align-items: center;
      margin-top: 0;

      &:last-child {
        margin-right: 0;
      }

      .social-icon {
        margin-right: 5px;
      }
    }

    p {
      margin: 0;
    }
  }

  &-avatar {
    grid-area: avatar;
    justify-self: center;
    padding: 0;
    margin-top: 30px;
  }

  &-name-container {
    display: flex;
    flex-flow: column;
    align-items: flex-start;

    .post-name {
      font-weight: 600;
      align-items: center;
    }
  }
}
</style>
