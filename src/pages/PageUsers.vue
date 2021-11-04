<template>
  <q-page class="flex" style="min-height: inherit">
    <div class="q-gutter-md q-pa-md items-center flex" style="margin: 0 auto; max-width: 300px">
      <q-input outlined v-model="search" label="Find Author By Name" style="width: 100%"/>
      <q-btn style="width: 100%" color="primary" label="Filter By...">
        <q-menu fit
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Views</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Likes</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Shares</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Followers</q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable v-close-popup>
              <q-item-section>Close</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <q-list class="full-width" bordered separator>
      <q-item
        class="element"
        v-for="author in searching"
        :key="author.name"
        clickable
        v-ripple
        :to="{name: 'AuthorDetails', params: {id: author.id}}"
      >

        <q-item class="author-video" style="flex-flow: column; align-items: center">
          <q-avatar square size="100px" class="q-mb-sm">
            <img :src="author.video"/>
          </q-avatar>
        </q-item>

        <q-item class="author-text">
          <q-item-label class="author-name-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
              <path
                d="M38.4,21.68V16c-2.66,0-4.69-.71-6-2.09a8.9,8.9,0,0,1-2.13-5.64V7.86L24.9,7.73s0,.23,0,.54V30.8a5,5,0,1,1-3.24-5.61v-5.5a10.64,10.64,0,0,0-1.7-.14A10.36,10.36,0,1,0,30.32,29.91a10.56,10.56,0,0,0-.08-1.27V19.49A14.48,14.48,0,0,0,38.4,21.68Z"/>
            </svg>
            <span class="author-name flex">{{ author.name }}:</span>
          </q-item-label>

          <q-item-label class="text-left full-width q-pl-s">
            "{{ author.status }}"
            <p class="text-center text-caption text-weight-light">
              Video Added:<br>{{ parseISOString(author.created) }}
            </p>
          </q-item-label>
        </q-item>

        <div class="author-social">
          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-play-circle"></q-icon>
            <p>{{ author.views }}</p>
          </q-item-label>
          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-heart"></q-icon>
            <p>{{ author.likes }}</p>
          </q-item-label>
          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-share-square"></q-icon>
            <p>{{ author.shares }}</p>
          </q-item-label>
          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-user"></q-icon>
            <p>{{ author.followers }}</p>
          </q-item-label>
        </div>

        <q-item class="author-avatar">
          <q-avatar size="60px" class="q-mb-sm">
            <img :src="author.avatar" :alt="author.name"/>
          </q-avatar>
        </q-item>

      </q-item>
    </q-list>
  </q-page>
</template>

<script>

import {parseISOString} from 'src/service';

export default {
  data() {
    return {
      search: '',
    };
  },
  methods: {
    findAuthorByName(e) {
      this.search = e.target.value;
      console.log(e.target.value);
    },
    parseISOString(s) {
      const dt = s.split(/[: T-]/).map(parseFloat);
      return `${dt[0]}-${dt[1]}-${(dt[2] < 10 ? '0' + dt[2] : dt[2]) || 0}, ${(dt[3] < 10 ? '0' + dt[3] : dt[3]) || 0}:${(dt[4] < 10 ? '0' + dt[4] : dt[4]) || 0}`;
      // return `${(dt[3] < 10 ? '0' + dt[3] : dt[3]) || 0}:${(dt[4] < 10 ? '0' + dt[4] : dt[4]) || 0}`;
    },
  },
  created() {
    this.$store.dispatch('authors/fetchAuthors');
  },
  computed: {
    getAuthors() {
      return this.$store.getters['authors/get_authors'];
    },
    searching() {
      if (this.search) {
        return this.getAuthors.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
      } else {
        return this.getAuthors;
      }
    },
  },
};
</script>
<style lang="scss">

.element {
  display: grid;
  margin: 0 auto;
  width: 100%;
  padding: 0 10px 30px;
  align-items: center;
  justify-items: flex-end;

  grid-template-areas:
    'video text'
    'video text'
    'social social'
    'avatar avatar';
}

.author {

  &-video {
    grid-area: video;
    padding: 8px 0;
  }

  &-text {
    grid-area: text;
    flex-flow: column;
    padding: 8px 0;
    width: calc(100% - 20px);

    p {
      width: fit-content;
      margin: 20px 0;
      text-align: left;
    }
  }

  &-social {
    grid-area: social;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;

    .social-item {
      align-items: center;
      margin-right: 30px;
      margin-top: 0;

      &:last-child {
        margin-right: 0;
      }

      .social-icon {
        margin-right: 10px;
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

    .author-name {
      font-weight: 600;
      align-items: center;
    }

  }
}
</style>
