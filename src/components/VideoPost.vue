<template>
  <div class="post-wrap">
    <div class="video_post_mobile" v-if="isMobile">

      <div class="post_title">
        <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }">{{ post.status }}</router-link>
      </div>

      <div class="video_block">
        <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }" class="video_frame">
          <img :src="post.video" alt="">
        </router-link>
        <div class="video_added flex column">
          <span class="time flex flex-center"><q-icon class="fas fa-clock"></q-icon>00:46</span>
          <span class="ago">5h ago</span>
        </div>
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

    <!----------DESKTOP---------->

    <div class="video_post_desktop" v-else>
      <div class="video_block">
        <q-icon class="fab fa-tiktok grey-button"></q-icon>
        <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }" class="video_frame">
          <img :src="post.video" alt="">
          <div class="video_added flex column">
            <span class="time flex flex-center"><q-icon class="fas fa-clock"></q-icon>00:46</span>
            <span class="ago">5h ago</span>
          </div>
        </router-link>
      </div>

      <div class="post_title">
        <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }">{{ post.status }}</router-link>
      </div>

      <div class="user_block flex items-center">
        <q-icon class="fas fa-user grey-button"></q-icon>
        <img class="user_avatar" :src="post.avatar" :alt="post.name"/>
        <span class="user_name">{{ post.name }}</span>
      </div>

      <div class="music_block flex items-center">
        <q-icon class="fas fa-music grey-button"></q-icon>
        <img src="/images/music_frame.png" alt="" class="music_frame">
        <span class="music_title">Music Stuff</span>
        <q-icon class="fas fa-play grey-button"></q-icon>
        <q-icon class="fas fa-download grey-button"></q-icon>
      </div>

      <chart></chart>

      <div class="social_block flex">
        <div class="social_item flex">
          <!--          <q-icon class="fas fa-heart"></q-icon>-->
          <span>12.7M</span>
        </div>
        <div class="social_item flex">
          <!--          <q-icon class="fas fa-share"></q-icon>-->
          <span>130K</span>
        </div>
        <div class="social_item flex">
          <!--          <q-icon class="fas fa-eye"></q-icon>-->
          <span>28.2M</span>
        </div>
        <div class="social_item flex">
          <!--          <q-icon class="fas fa-eye"></q-icon>-->
          <span>28.2M</span>
        </div>
        <div class="social_item flex">
          <!--          <span class="index">ER</span>-->
          <span class="value">22.6%</span>
        </div>
        <div class="social_item flex">
          <!--          <span class="index">TS</span>-->
          <span class="value">x0.02</span>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import Chart from 'components/Chart';

export default {
  name: 'VideoPost',
  components: {
    Chart,
  },
  props: {
    post: Object,
    isMobile: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import 'src/css/components/video_post';
</style>
