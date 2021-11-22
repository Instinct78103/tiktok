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

        <!-- VIDEO BLOCK -->
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
        <div class="daily_block">
          <div class="heading items-center">
            <q-icon class="fas fa-chart-line"></q-icon>
            <h2>Daily Statistics:</h2>
            <q-icon class="fas fa-calendar-day grey-button"></q-icon>
          </div>
        </div>

        <div class="hourly_block">
          <div class="heading items-center">
            <q-icon class="fas fa-clock"></q-icon>
            <h2>Hourly Statistics:</h2>
          </div>
        </div>


        <!-- CHART -->
        <chart></chart>

      </div>
    </div>

  </q-page>
</template>

<script>
import {defineComponent} from 'vue';
import Chart from 'components/Chart';
// import {Line} from 'vue-chartjs';

export default defineComponent({
  name: 'PageIndex',
  // extends: Line,
  components: {
    Chart
  },
  // mounted() {
  //   this.renderChart({
  //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [{
  //       label: '',
  //       data: [2, 35, 3, 5, 19, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     }],
  //   });
  // },
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
