<template>
  <div
    class="q-gutter-md q-pa-md items-center flex"
    style="margin: 0 auto; max-width: 300px"
  >
  {{params.sortDirection}} {{params.sortBy}}
    <q-input outlined v-model="params.search" label="Search" style="width: 100%" />
    <q-btn-dropdown
      color="primary"
      :label="`Sort By ${params.sortBy}`"
      transition-show="flip-right"
      transition-hide="flip-left"
    >
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
    <q-icon
      class="fas fa-sort-amount-down-alt"
      v-if="params.sortBy && params.sortDirection === 'asc'"
    ></q-icon>
    <q-icon
      class="fas fa-sort-amount-down"
      v-if="params.sortBy && params.sortDirection === 'desc'"
    ></q-icon>
  </div>
</template>

<script>
export default {
  name: "FilterMobile",
  props: {
    params: Object,
  },
};
</script>

<style>
</style>