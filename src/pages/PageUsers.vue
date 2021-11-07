<template>
  <q-page class="flex" style="min-height: inherit">
    <div class="q-gutter-md q-pa-md items-center flex" style="margin: 0 auto; max-width: 300px">
      <q-input outlined v-model="search" label="Find Author By Name" style="width: 100%"/>
      <q-btn-dropdown color="primary" :label="`Sort By ${sortBy}`"
                      transition-show="flip-right"
                      transition-hide="flip-left">
        <q-list dense style="min-width: 100px">
          <q-item clickable v-close-popup @click.prevent="sort">
            <q-item-section data-filter="views">Views</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click.prevent="sort">
            <q-item-section data-filter="likes">Likes</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click.prevent="sort">
            <q-item-section data-filter="shares">Shares</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-icon class="fas fa-sort-amount-down-alt" v-if="sortBy && sortDirection === 'asc'"></q-icon>
      <q-icon class="fas fa-sort-amount-down" v-if="sortBy && sortDirection === 'desc'"></q-icon>
    </div>
    <q-list class="full-width" bordered separator>
      <q-item
        class="element"
        v-for="author in searching"
        :key="author.name"
        v-ripple
        :to="{name: 'AuthorDetails', params: {id: author.id}}"
      >

        <q-avatar square size="100px" class="author-video">
          <img :src="author.video"/>
        </q-avatar>

        <q-item class="author-status">
          <q-item-label class="text-left full-width q-pl-s">
            ❞{{ author.status }}❞
          </q-item-label>
        </q-item>

        <q-item class="author-icons flex">
          <q-icon class="fab fa-tiktok"></q-icon>
          <q-icon class="fas fa-download q-mx-md"></q-icon>
          <q-icon class="fas fa-play"></q-icon>
        </q-item>

        <q-item class="author-date">
          <p class="text-caption text-weight-light">
            Video Added: {{ Math.floor(Math.random() * 6 + 1) }}h ago, {{ parseISOString(author.created) }}
          </p>
        </q-item>

        <q-item flex class="author-avatar-name">
          <q-avatar size="30px" class="q-mr-sm">
            <img :src="author.avatar" :alt="author.name"/>
          </q-avatar>
          <q-item-label class="author-name-container">
            <span class="author-name flex">{{ author.name }}</span>
          </q-item-label>
        </q-item>

        <div class="author-social">
          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-play-circle"></q-icon>
            <p>{{ author.views }}</p>
          </q-item-label>

          <q-item-label class="flex social-item q-mx-md">
            <q-icon class="social-icon" name="far fa-heart"></q-icon>
            <p>{{ author.likes }}</p>
          </q-item-label>

          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-share-square"></q-icon>
            <p>{{ author.shares }}</p>
          </q-item-label>
        </div>

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
      sortBy: '',
      sortDirection: 'asc',
    };
  },
  methods: {
    parseISOString(s) {
      const dt = s.split(/[: T-]/).map(parseFloat);
      return `${(dt[3] < 10 ? '0' + dt[3] : dt[3]) || 0}:${(dt[4] < 10 ? '0' + dt[4] : dt[4]) || 0}`;
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
    this.$store.dispatch('authors/fetchAuthors');
  },
  computed: {
    getAuthors() {
      return this.$store.getters['authors/get_authors'];
    },
    searching() {
      if (this.sort) {
        return this.getAuthors
          .filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
          .sort((a, b) => {
            if (a[this.sortBy] === b[this.sortBy]) return 0;
            if (a[this.sortBy] > b[this.sortBy]) return (this.sortDirection === 'asc') ? 1 : -1;
            if (a[this.sortBy] < b[this.sortBy]) return (this.sortDirection === 'asc') ? -1 : 1;
          });
      } else {
        return this.getAuthors;
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

.author {

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

    .author-name {
      font-weight: 600;
      align-items: center;
    }

  }
}
</style>
