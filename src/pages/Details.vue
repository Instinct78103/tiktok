<template>
  <q-page class="flex row page-details">
    <div class="author-info" v-if="details">
      <div class="content">
        <q-avatar size="100px" class="q-mb-sm">
          <img :src="details?.avatar"/>
        </q-avatar>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <path
            d="M38.4,21.68V16c-2.66,0-4.69-.71-6-2.09a8.9,8.9,0,0,1-2.13-5.64V7.86L24.9,7.73s0,.23,0,.54V30.8a5,5,0,1,1-3.24-5.61v-5.5a10.64,10.64,0,0,0-1.7-.14A10.36,10.36,0,1,0,30.32,29.91a10.56,10.56,0,0,0-.08-1.27V19.49A14.48,14.48,0,0,0,38.4,21.68Z"/>
        </svg>
        <span>{{ details?.name }}</span>
      </div>
      <div class="status">❞{{ details?.status }}</div>
      <div class="video">
        <q-video
          :ratio="16/9"
          src="https://v16-web.tiktok.com/video/tos/useast5/tos-useast5-ve-0068c003-tx/302b0dc310224d28b5cd13db39395788/?a=1988&br=3814&bt=1907&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1636046010&ft=9wMeRe6d4kag3&l=202111041113170102452421950D273470&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=3&qs=0&rc=ang1eTY6Zm5uOTMzZzczNEApZDgzOjM0aTxkN2k0NzM3aGdlaGRncjQwZi5gLS1kMS9zc2EyLzBgLjZgMy9eXy0zYy06Yw%3D%3D&signature=4964e6b7eb68f6aa75e45e39b8481118&tk=0&vl=&vr="
        />
        <div class="created">
          <p class="text-center text-caption text-weight-light q-mt-sm">
            Video Added:<br>{{ parsedDate }}
          </p>
        </div>
      </div>
      <div class="graph"></div>
      <div class="stats">
        <h5>Video Statistics</h5>
        <div class="author-social">
          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-play-circle"></q-icon>
            <p>{{ details?.views }}</p>
          </q-item-label>
          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-heart"></q-icon>
            <p>{{ details?.likes }}</p>
          </q-item-label>
          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-share-square"></q-icon>
            <p>{{ details?.shares }}</p>
          </q-item-label>
          <q-item-label class="flex social-item">
            <q-icon class="social-icon" name="far fa-user"></q-icon>
            <p>{{ details?.followers }}</p>
          </q-item-label>
        </div>
      </div>
      <div class="table"></div>
    </div>
  </q-page>
</template>

<script>
import {parseISOString} from 'src/service';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PageIndex',
  created() {
    this.fetchDetails();
  },
  data() {
    return {
      details: null,
    };
  },
  methods: {
    async fetchDetails() {
      if (this.$route.params.id) {
        const index = this.$store.getters['posts/get_posts'].findIndex(post => post.id === this.$route.params.id);
        const isPostInTheStore = index > -1;

        if (!isPostInTheStore) {
          const p = await fetch(
            `https://6172d1dd110a740017222e38.mockapi.io/api/v1/users/${this.$route.params.id}`,
          );
          this.details = await p.json();
        } else {
          this.details = this.$store.getters['posts/get_posts']
            .find(post => post.id === this.$route.params.id);
        }
      }
    },
  },
  computed: {
    postData() {
      return this.$store.getters['posts/get_posts']
        .find(post => post.id === this.$route.params.id);
    },
    parsedDate() {
      return parseISOString(this.details.created);
    },
  },
});
</script>

<style lang="scss">
.author-info {
  width: 100%;
  display: grid;
  grid-template-areas:
    'content'
    'status'
    'video'
    'graph'
    'stats'
    'table';

  > * {
    margin: 10px 0;
  }
}

.content {
  grid-area: content;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 1.5em;
  }
}

.status {
  grid-area: status;
  display: flex;
  justify-content: center;
  text-align: center;
}

.graph {
  grid-area: graph;
}

.stats {
  grid-area: stats;

  h5 {
    text-align: center;
  }

  .author-social {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;

    .social-item {
      align-items: center;
      margin: 0 20px 0 0;

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
}

.video {
  grid-area: video;
}

.table {
  grid-area: table;
}


</style>
