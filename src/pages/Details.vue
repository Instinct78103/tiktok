<template>
  <q-page>

    <div class="post_details">
      <div class="container">

        <!--TOP-->
        <div class="top">
          <div class="heading flex items-center">
            <q-icon class="fab fa-tiktok grey-button"></q-icon>
            <h2>Video Details:</h2>
          </div>
          <p class="post_title">{{ details?.status }}</p>
        </div>

        <div class="video_block flex">
          <img :src="details?.video" class="video_frame" alt="">
          <div class="video_data">
            <p class="duration">
              <span>Duration: <b>11 sec</b></span>
            </p>
            <p class="created">
              <span>Created: <b>2 hours ago</b></span>
              <span class="text-italic">(November 15, 2021, 2:34 PM)</span>
            </p>
            <p class="updated">
              <span>Updated: <b>12 minutes ago</b></span>
              <span class="text-italic">(November 15, 2021, 5:03 PM)</span>
            </p>
          </div>
        </div>

        <!-- USER -->

        <div class="user_block flex items-center">
          <q-icon class="fas fa-user grey-button"></q-icon>
          <img class="user_avatar" :src="details?.avatar" :alt="details?.name"/>
          <span class="user_name">{{ details?.name }}</span>
        </div>

        <!-- MUSIC -->

        <div class="music_block">
          <q-icon class="fas fa-music grey-button"></q-icon>
          <p class="music_title">
            <img src="/images/music_frame.png" alt="" class="music_frame">
            <span>Music Stuff</span>
          </p>
          <q-icon class="fas fa-play grey-button"></q-icon>
          <q-icon class="fas fa-download grey-button"></q-icon>
        </div>

        <!-- SOCIAL -->

        <div class="social_block flex">
          <div class="social_item flex column items-center">
            <q-icon class="fas fa-heart"></q-icon>
            <span class="value">12.7M</span>
          </div>
          <div class="social_item middle flex column items-center">
            <q-icon class="fas fa-share"></q-icon>
            <span class="value">130K</span>
          </div>
          <div class="social_item flex column items-center">
            <q-icon class="fas fa-eye"></q-icon>
            <span class="value">28.2M</span>
          </div>
          <div class="social_item flex column items-center">
            <q-icon class="fas fa-comments"></q-icon>
            <span class="value">156K</span>
          </div>
          <div class="social_item flex column items-center">
            <span class="index">ER</span>
            <span class="value">22.6%</span>
          </div>
          <div class="social_item flex column items-center">
            <span class="index">TS</span>
            <span class="value">x0.02</span>
          </div>
        </div>

        <!-- STATISTICS -->

        <div class="stats">
          <div class="heading items-center">
            <q-icon class="fas fa-chart-line"></q-icon>
            <h2>Daily Statistics:</h2>
            <q-icon class="fas fa-calendar-day grey-button"></q-icon>
          </div>
        </div>

      </div>
    </div>


    <!--    <div class="author-info" v-if="details">-->
    <!--      <div class="content">-->
    <!--        <q-avatar size="100px" class="q-mb-sm">-->
    <!--          <img :src="details?.avatar"/>-->
    <!--        </q-avatar>-->
    <!--        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">-->
    <!--          <path-->
    <!--            d="M38.4,21.68V16c-2.66,0-4.69-.71-6-2.09a8.9,8.9,0,0,1-2.13-5.64V7.86L24.9,7.73s0,.23,0,.54V30.8a5,5,0,1,1-3.24-5.61v-5.5a10.64,10.64,0,0,0-1.7-.14A10.36,10.36,0,1,0,30.32,29.91a10.56,10.56,0,0,0-.08-1.27V19.49A14.48,14.48,0,0,0,38.4,21.68Z"/>-->
    <!--        </svg>-->
    <!--        <span>{{ details?.name }}</span>-->
    <!--      </div>-->
    <!--      <div class="status">❞{{ details?.status }}</div>-->
    <!--      <div class="video">-->
    <!--        <q-video-->
    <!--          :ratio="16/9"-->
    <!--          src="https://v16-web.tiktok.com/video/tos/useast5/tos-useast5-ve-0068c003-tx/302b0dc310224d28b5cd13db39395788/?a=1988&br=3814&bt=1907&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1636046010&ft=9wMeRe6d4kag3&l=202111041113170102452421950D273470&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=3&qs=0&rc=ang1eTY6Zm5uOTMzZzczNEApZDgzOjM0aTxkN2k0NzM3aGdlaGRncjQwZi5gLS1kMS9zc2EyLzBgLjZgMy9eXy0zYy06Yw%3D%3D&signature=4964e6b7eb68f6aa75e45e39b8481118&tk=0&vl=&vr="-->
    <!--        />-->
    <!--        <div class="created">-->
    <!--          <p class="text-center text-caption text-weight-light q-mt-sm">-->
    <!--            Video Added:<br>{{ parsedDate }}-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="graph"></div>-->
    <!--      <div class="stats">-->
    <!--        <h5>Video Statistics</h5>-->
    <!--        <div class="author-social">-->
    <!--          <q-item-label class="flex social-item">-->
    <!--            <q-icon class="social-icon" name="far fa-play-circle"></q-icon>-->
    <!--            <p>{{ details?.views }}</p>-->
    <!--          </q-item-label>-->
    <!--          <q-item-label class="flex social-item">-->
    <!--            <q-icon class="social-icon" name="far fa-heart"></q-icon>-->
    <!--            <p>{{ details?.likes }}</p>-->
    <!--          </q-item-label>-->
    <!--          <q-item-label class="flex social-item">-->
    <!--            <q-icon class="social-icon" name="far fa-share-square"></q-icon>-->
    <!--            <p>{{ details?.shares }}</p>-->
    <!--          </q-item-label>-->
    <!--          <q-item-label class="flex social-item">-->
    <!--            <q-icon class="social-icon" name="far fa-user"></q-icon>-->
    <!--            <p>{{ details?.followers }}</p>-->
    <!--          </q-item-label>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="table"></div>-->
    <!--    </div>-->

    <div class="layout-view">
      <canvas ref="canvas"></canvas>
    </div>

  </q-page>
</template>

<script>
// import {parseISOString} from 'src/service';
import {defineComponent} from 'vue';
import {Line} from 'vue-chartjs';

export default defineComponent({
  name: 'PageIndex',
  extends: Line,
  components: {},
  mounted() {
    this.renderChart({
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }],
    });
  },
  created() {
    this.fetchDetails();
  },
  data() {
    return {
      details: {},
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

<style lang="scss" scoped>
@import 'src/css/components/video_details';
</style>
