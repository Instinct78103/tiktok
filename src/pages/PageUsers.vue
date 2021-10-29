<template>
  <q-page class="flex">

    <div class="q-pa-md full-width">
      <div class="q-gutter-md" style="max-width: 300px">
        <q-input outlined v-model="search" label="Find Author" @input="findAuthorByName"/>
      </div>
    </div>
    <q-list class="full-width" bordered separator>
      <q-item
        v-for="author in getAuthors"
        :key="author.id"
        clickable
        v-ripple
        :to="{name: 'AuthorDetails', params: {id: author.id}}"
      >

        <q-item-section avatar top>
          <q-avatar rounded size="100px" class="q-mb-sm">
            <img :src="author.video"/>
          </q-avatar>
          <q-item-label class="text-center text-caption text-weight-light full-width">
            Created: <br>{{ author.createdAt.split('T')[0] }}
          </q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label class="text-left full-width q-pb-md">
            {{ author.name }}:
          </q-item-label>
          <q-item-label class="text-left full-width q-pl-s">
            {{ author.status }}
          </q-item-label>
        </q-item-section>

        <q-item-section avatar top>
          <q-avatar>
            <img :src="author.avatar">
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
  data() {
    return {
      search: '443545435',
    };
  },
  methods: {
    findAuthorByName(e) {
      this.search = e.target.value;
      console.log('dfsdf');
    },
  },
  created() {
    this.$store.dispatch('authors/fetchAuthors');
  },
  computed: {
    getAuthors() {
      return this.$store.getters['authors/get_authors'];
    },
  },
};
</script>
