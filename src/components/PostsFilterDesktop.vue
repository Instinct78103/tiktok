<template>
  <div class="filter_desktop">
    <div class="container">
      <div class="filter-desktop-wrap">
        <div class="date_picker">
          <q-btn icon="event" round color="primary">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date @before-update="updateProxy" v-model="proxyDate" range>
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup/>
                  <q-btn label="OK" color="primary" flat @click="save" v-close-popup/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
          {{ chosen }}
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
              {
                label: '7 days',
                value: JSON.stringify({
                  from: days_7, to: today
                })
              },
              {
                label: '14 days',
                value: JSON.stringify({
                  from: days_14, to: today
                })
              },
              {
                label: '30 days',
                value: JSON.stringify({
                  from: days_30, to: today
                })
              }
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
          <q-select standart v-model="country" :options="countries" label="Filter By Country"
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
import {useStore} from 'vuex';
import {addZero} from 'src/helper';

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
    'chosen': function (newVal) {
      this.$store.dispatch('filter/range', newVal);
    },
    'date_item': function (newVal) {
      this.chosen = JSON.parse(newVal);
      this.proxyDate = JSON.parse(newVal);
      // this.$store.dispatch('filter/range', newVal);
    },
    'country': function (newVal) {
      this.$store.dispatch('filter/region', newVal);
    },

  },

  props: {
    countries: Array,
    date_item: Object,
    sort_by_item: Object,
    search_text: String,
    sort_by: Array,
    sort_direction: String,
    show_private: Boolean,
    today_date: String,
  },

  setup(props) {
    const store = useStore();
    const country = ref(null);

    const countries = props.countries;
    console.log(countries);

    const d = new Date();
    const today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    const proxyDate = ref(today);
    const chosen = ref(store.getters['filter/get_range']);

    const days_30 = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000)
      .toJSON().slice(0, 10).replace(/-/g, '/');
    const days_14 = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
      .toJSON().slice(0, 10).replace(/-/g, '/');
    const days_7 = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      .toJSON().slice(0, 10).replace(/-/g, '/');


    return {
      country,
      chosen,
      proxyDate,
      today,
      days_30,
      days_14,
      days_7,

      updateProxy() {
        chosen.value = proxyDate.value;
      },

      save() {
        chosen.value = proxyDate.value;
      },
    };
  },

};
</script>

<style lang="scss" scoped>
@import 'src/css/components/filter';
</style>
