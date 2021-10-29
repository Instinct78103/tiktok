<template>
  <q-page class="flex column">

    <q-avatar top center class="flex-block column q-my-sm">
      <img :src="authorData.avatar">
    </q-avatar>

    <q-item-section top center class="column" style="align-items: center; flex: unset">
      <h2 class="text-h3 q-my-sm text-center">{{ authorData.name }}</h2>
      <img :src="authorData.video" style="width: 100%; object-fit: contain; height: fit-content">
    </q-item-section>


    <q-list bordered right class="full-width">
      <q-item v-for="(item, key) in details" :key="key" class="q-my-sm" clickable v-ripple center style="justify-content: center">
        <q-item-section>
          <q-item-label><span class="material-icons">visibility</span></q-item-label>
          <q-item-label caption lines="1">{{ details[0].views }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label><span class="material-icons">thumb_up</span></q-item-label>
          <q-item-label caption lines="1">{{ details[0].likes }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label><span class="material-icons">share</span></q-item-label>
          <q-item-label caption lines="1">{{ details[0].shares }}</q-item-label>
        </q-item-section>

        <q-item-section center>
          <span class="material-icons">question_answer</span>
          <q-item-label caption lines="1">{{ details[0].comments }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue';
import {matAllInbox} from '@quasar/extras/material-icons';

export default defineComponent({
  name: 'PageIndex',
  async created() {
    await this.fetchDetails();
  },
  data() {
    return {
      authorId: this.$route.params.id,
      details: null,
    };
  },
  methods: {
    async fetchDetails() {
      if (this.$route.params.id) {
        const p = await fetch(
          `https://6172d1dd110a740017222e38.mockapi.io/api/v1/users/${this.authorId}/stats`,
        );
        this.details = await p.json();
      }
    },
  },
  computed: {
    authorData() {
      return this.$store.getters['authors/get_authors']
        .find(author => author.id === this.$route.params.id);
    },
  },
});
</script>
