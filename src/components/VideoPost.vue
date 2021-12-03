<template>
  <div class="post-wrap">

    <div class="video_post_mobile" v-if="isMobile" :data-region="post.author.region.toLowerCase()">

      <div class="post_title">
        <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }">{{ post.desc }}</router-link>
      </div>

      <div class="video_block">
        <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }" class="video_frame">
          <img :src="post.cover_url" alt="">
        </router-link>
        <div class="video_added flex column">
          <span class="time flex flex-center"><q-icon class="fas fa-clock"></q-icon>{{
              getTimeOnly(post.createTime)
            }}</span>
          <span class="ago">{{ timeSince(post.createTime) }}</span>
        </div>
      </div>

      <div class="tiktok_buttons">
        <q-btn size="10px" round type="a" :href="post.video_url" class="grey-button" icon="fab fa-tiktok"
               target="_blank"/>
        <q-btn size="10px" round type="a" :href="post.author.profile_url" class="grey-button" icon="fas fa-user"
               target="_blank"/>
        <q-btn size="10px" round type="a" :href="post.music.music_url" class="grey-button" icon="fas fa-music"
               target="_blank"/>
      </div>

      <div class="social_block flex">
        <div class="social_item flex column items-center">
          <q-icon class="fas fa-heart"></q-icon>
          <span>{{numFormat(post.diggCount, 1)}}</span>
        </div>
        <div class="social_item middle flex column items-center">
          <q-icon class="fas fa-share"></q-icon>
          <span>{{numFormat(post.shareCount, 1)}}</span>
        </div>
        <div class="social_item flex column items-center">
          <q-icon class="fas fa-eye"></q-icon>
          <span>{{ numFormat(post.playCount, 1) }}</span>
        </div>
      </div>

      <div class="user_block flex items-center">
        <img class="user_avatar" :src="post.author.cover_url" :alt="post.author.uniqueId"/>
        <span class="user_name">{{ post.author.uniqueId }}</span>
      </div>

      <div class="music_block flex items-center">
        <img :src="post.music.cover_url" alt="" class="music_frame">
        <span class="music_title">{{ post.music.title }}</span>
        <q-btn size="10px" round class="grey-button" :icon="isPlaying ? 'fas fa-pause' : 'fas fa-play'"
               @click="togglePlay"/>
        <audio ref="audioElem" :src="post.music.playUrl"></audio>
        <!--        <q-icon class="fas fa-play grey-button"></q-icon>-->
      </div>

    </div>

    <!----------DESKTOP---------->

    <!--    <div class="video_post_desktop" v-else>-->
    <!--      <div class="video_block">-->
    <!--        <q-icon class="fab fa-tiktok grey-button"></q-icon>-->
    <!--        <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }" class="video_frame">-->
    <!--          <img :src="post.video" alt="">-->
    <!--          <div class="video_added flex column">-->
    <!--            <span class="time flex flex-center"><q-icon class="fas fa-clock"></q-icon>00:46</span>-->
    <!--            <span class="ago">5h ago</span>-->
    <!--          </div>-->
    <!--        </router-link>-->
    <!--      </div>-->

    <!--      <div class="post_title">-->
    <!--        <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }">{{ post.status }}</router-link>-->
    <!--      </div>-->

    <!--      <div class="user_block flex items-center">-->
    <!--        <q-icon class="fas fa-user grey-button"></q-icon>-->
    <!--        <img class="user_avatar" :src="post.avatar" :alt="post.name"/>-->
    <!--        <span class="user_name">{{ post.name }}</span>-->
    <!--      </div>-->

    <!--      <div class="music_block flex items-center">-->
    <!--        <q-icon class="fas fa-music grey-button"></q-icon>-->
    <!--        <img src="/images/music_frame.png" alt="" class="music_frame">-->
    <!--        <span class="music_title">Music Stuff</span>-->
    <!--        <q-icon class="fas fa-play grey-button"></q-icon>-->
    <!--        <q-icon class="fas fa-download grey-button"></q-icon>-->
    <!--      </div>-->

    <!--      <chart></chart>-->

    <!--      <div class="social_block flex">-->
    <!--        <div class="social_item flex">-->
    <!--          &lt;!&ndash;          <q-icon class="fas fa-heart"></q-icon>&ndash;&gt;-->
    <!--          <span>12.7M</span>-->
    <!--        </div>-->
    <!--        <div class="social_item flex">-->
    <!--          &lt;!&ndash;          <q-icon class="fas fa-share"></q-icon>&ndash;&gt;-->
    <!--          <span>130K</span>-->
    <!--        </div>-->
    <!--        <div class="social_item flex">-->
    <!--          &lt;!&ndash;          <q-icon class="fas fa-eye"></q-icon>&ndash;&gt;-->
    <!--          <span>28.2M</span>-->
    <!--        </div>-->
    <!--        <div class="social_item flex">-->
    <!--          &lt;!&ndash;          <q-icon class="fas fa-eye"></q-icon>&ndash;&gt;-->
    <!--          <span>28.2M</span>-->
    <!--        </div>-->
    <!--        <div class="social_item flex">-->
    <!--          &lt;!&ndash;          <span class="index">ER</span>&ndash;&gt;-->
    <!--          <span class="value">22.6%</span>-->
    <!--        </div>-->
    <!--        <div class="social_item flex">-->
    <!--          &lt;!&ndash;          <span class="index">TS</span>&ndash;&gt;-->
    <!--          <span class="value">x0.02</span>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--    </div>-->


  </div>
</template>

<script>
import Chart from 'components/Chart';
import {getTimeOnly, timeSince, numFormat} from 'src/helper';
import {ref} from 'vue';

export default {
  name: 'VideoPost',
  methods: {
    getTimeOnly,
    timeSince,
    numFormat,
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      const a = this.$refs.audioElem;
      if (this.isPlaying) {
        a.play();
      } else {
        a.pause();
        this.$refs.audioElem.currentTime = 0;
      }
    },
  },
  components: {
    Chart,
  },
  props: {
    post: Object,
    isMobile: Boolean,
  },

  setup() {
    return {
      isPlaying: ref(false),
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'src/css/components/video_post';
</style>
