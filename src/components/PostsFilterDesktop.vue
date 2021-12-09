<template>
  <div class="filter_desktop">
    <div class="container">
      <div class="filter-desktop-wrap">
        <div class="date_picker">
          <q-btn icon="event" round color="primary">
            <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
              <q-date v-model="proxyDate">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup/>
                  <q-btn label="OK" color="primary" flat @click="save" v-close-popup/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
          {{ date }}
        </div>

        <div class="search">
          <q-input outlined v-model="search_text" label="Search"/>
        </div>

        <div class="toggle_private">
          <q-toggle
            v-model="show_private"
            color="red"
            label="Show Private"
            left-label
          />
        </div>


        <div class="prepared_range">
          <q-btn-toggle
            v-model="date_item"
            toggle-color="primary"
            :options="[
              {label: '7 days', value: 7},
              {label: '14 days', value: 14},
              {label: '30 days', value: 30}
            ]"
          />
        </div>
        <div class="sort_by">
          <q-select class="sort_by_select"
                    standart
                    v-model="sort_by_item"
                    :options="sort_by"
                    label="Sort By"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    @update:model-value="changeSortBy(sort_by_item)"
          ></q-select>
          <q-btn
            size="10px"
            class="round grey-button"
            :icon="$store.getters['filter/get_orderDirection'] === 'desc'
              ? 'fas fa-sort-amount-down'
              : 'fas fa-sort-amount-down-alt'"
            @click="changeOrder"
          />
        </div>

        <div class="country_filter">
          <q-select standart v-model="countries_item" :options="countries" label="Filter By Country"
                    transition-show="flip-up"
                    transition-hide="flip-down"
          ></q-select>
        </div>

      </div>
    </div>
  </div>
  <pre>{{ this.$store.state }}</pre>
</template>

<script>
import {ref} from 'vue';

export default {
  name: 'PostsFilterDesktop',

  methods: {
    changeSortBy(val) {
      this.$store.dispatch('filter/sortBy', val.value);
    },
    changeOrder() {
      this.$store.dispatch('filter/orderDirection', this.$store.getters['filter/get_orderDirection'] === 'desc' ? 'asc' : 'desc');
    },
    changePrivateOnly(val) {
      this.$store.dispatch('filter/showPrivate', !val);
    },
  },

  computed: {
    showPrivateStatus() {
      return this.$store.getters['filter/get_showPrivate'];
    },
  },

  watch: {
    'show_private': function (newVal) {
      this.$store.dispatch('filter/showPrivate', newVal);
    },
  },

  props: {
    countries: Array,
    date_item: Number,
    sort_by_item: Object,
    search_text: String,
    countries_item: String,
    sort_by: Array,
    sort_direction: String,
    show_private: Boolean,
    today_date: String,
  },

  setup() {
    const today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const date = ref(today);
    const proxyDate = ref('2019/03/01');

    return {
      date,
      proxyDate,

      updateProxy() {
        proxyDate.value = date.value;
      },

      save() {
        date.value = proxyDate.value;
      },
    };
  },

};
</script>

<style lang="scss" scoped>
@import 'src/css/components/filter';
</style>
