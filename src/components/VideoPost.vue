<template>
  <div class="video_post_mobile" v-if="isMobile">
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
        <span class="ago">{{ timeAgo(post.createTime) }}</span>
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
        <span>{{ numFormat(post.diggCount, 1) }}</span>
      </div>
      <div class="social_item middle flex column items-center">
        <q-icon class="fas fa-share"></q-icon>
        <span>{{ numFormat(post.shareCount, 1) }}</span>
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
      <q-btn size="10px" round class="play grey-button" :data-track="post.music.playUrl"
             :icon="isPlaying && post.music.playUrl === nowPlaying ? 'fas fa-pause' : 'fas fa-play'"
             @click="triggerPlay(post.music.playUrl)"/>
    </div>

  </div>


  <div class="video_post_desktop" v-else>
    <div class="video_block">
      <q-btn size="10px" round type="a" :href="post.video_url" class="grey-button" icon="fab fa-tiktok"
             target="_blank"/>
      <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }" class="video_frame">
        <img :src="post.cover_url" alt="">
        <div class="video_added flex column">
          <span class="time flex flex-center"><q-icon class="fas fa-clock"></q-icon>{{
              getTimeOnly(post.createTime)
            }}</span>
          <span class="ago">{{ timeAgo(post.createTime) }}</span>
        </div>
      </router-link>
    </div>

    <div class="post_title">
      <router-link :to="{ name: 'VideoDetails', params: { id: post.id } }">{{ post.desc }}</router-link>
    </div>

    <div class="user_block flex items-center">
      <q-btn size="10px" round type="a" :href="post.author?.profile_url" class="grey-button" icon="fas fa-user"
             target="_blank"/>
      <img class="user_avatar" :src="post.author?.cover_url" :alt="post.name"/>
      <span class="user_name">{{ post.author?.uniqueId }}</span>
    </div>

    <div class="music_block flex items-center">
      <q-btn size="10px" round type="a" :href="post.music?.music_url" class="grey-button" icon="fas fa-music"
             target="_blank"/>
      <img :src="post.music?.cover_url" alt="" class="music_frame">
      <span class="music_title">{{ post.music?.title }}</span>
      <q-btn size="10px" round class="play grey-button" :data-track="post.music?.playUrl"
             :icon="isPlaying && post.music?.playUrl === nowPlaying ? 'fas fa-pause' : 'fas fa-play'"
             @click="triggerPlay(post.music?.playUrl)"/>
      <q-icon class="fas fa-download grey-button"></q-icon>
    </div>

    <chart :graph-data="post.graph"></chart>

    <div class="social_block flex">
      <div class="social_item flex">
        <span>{{ numFormat(post.playCount, 1) }}</span>
      </div>
      <div class="social_item flex">
        <span>{{ numFormat(post.diggCount, 1) }}</span>
      </div>
      <div class="social_item flex">
        <span>{{ numFormat(post.commentCount, 1) }}</span>
      </div>
      <div class="social_item flex">
        <span>{{ numFormat(post.shareCount, 1) }}</span>
      </div>
      <div class="social_item flex">
        <span class="value">{{ numFormat(post.engagement, 1) }}</span>
      </div>
      <div class="social_item flex">
        <span class="value">{{ numFormat(post.trending, 2) }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import Chart from 'components/Chart';
import {getTimeOnly, timeAgo, numFormat} from 'src/helper';
import {ref} from 'vue';

export default {
  name: 'VideoPost',
  methods: {
    getTimeOnly,
    timeAgo,
    numFormat,
    triggerPlay(someAudioUrl) {
      this.isPlaying = !this.isPlaying;
      this.$emit('triggerParent', this.isPlaying ? someAudioUrl : null);
    },
  },
  components: {
    Chart,
  },
  props: {
    post: Object,
    isMobile: Boolean,
    nowPlaying: String,
  },
  setup() {
    return {
      isPlaying: ref(false),
      playing: ref(false),
      currentTrack: ref(null),
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'src/css/components/video_post';
</style>
