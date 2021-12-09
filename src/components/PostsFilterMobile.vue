<template>
  <!--  FILTER-MOBILE  -->
  <div class="filter_mobile">
    <div class="container">
      <div class="filter_mobile-wrap">
        <div class="search">
          <q-form @submit.prevent class="search_form">
            <q-input class="search_input" square outlined v-model="search_text" bg-color="white" label="Search"/>
            <div>
              <q-btn icon="search" type="submit" color="primary"/>
            </div>
          </q-form>
        </div>

        <div class="sort_by">
          <q-select standart
                    v-model="sort_by_item"
                    :options="sort_by"
                    label="Sort By"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    class="select_block"
          ></q-select>
          <i class="q-icon fas q-ml-sm"
             :class="sort_direction === 'desc' ? 'fa-sort-amount-down': 'fa-sort-amount-down-alt'"
             @click="sort_Direction = (sort_direction === 'desc') ? 'asc' : 'desc'"
          ></i>
        </div>

        <ButtonFilters></ButtonFilters>

      </div>
    </div>
  </div>
</template>

<script>
import ButtonFilters from 'components/ButtonFilters';

export default {
  name: 'PostsFilterMobile',
  props: {
    sort_by_item: String,
    search_text: String,
    countries_item: String,
    sort_by: Array,
    sort_direction: String,
  },
  components: {
    ButtonFilters,
  },
};
</script>

<style lang="scss" scoped>
@import '../css/components/filter';
</style>
