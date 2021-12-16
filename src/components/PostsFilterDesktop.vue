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
            :options="options"
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
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {addZero, currentFilter} from 'src/helper';

export default {
  name: 'PostsFilterDesktop',
  data() {
    return {
      options: [
        {
          label: '7 days',
          value: JSON.stringify({
            from: this.days_7, to: this.today,
          }),
        },
        {
          label: '14 days',
          value: JSON.stringify({
            from: this.days_14, to: this.today,
          }),
        },
        {
          label: '30 days',
          value: JSON.stringify({
            from: this.days_30, to: this.today,
          }),
        },
      ],
    };
  },

  methods: {
    changeOrder() {
      this.$store.dispatch('filter/orderDirection', this.$store.getters['filter/get_orderDirection'] === 'desc' ? 'asc' : 'desc');
      this.$router.push({
        query: Object.assign({}, this.$route.query, {sortDirection: this.$store.getters['filter/get_orderDirection']}),
      });
    },
  },
  watch: {
    'show_private': function (newVal) {
      this.$store.dispatch('filter/showPrivate', newVal);
      this.$router.push({
        query: Object.assign({}, this.$route.query, {showPrivate: newVal}),
      });
    },
    'sort_by_item': function (newVal) {
      this.$store.dispatch('filter/sortBy', newVal.value);
      this.$router.push({
        query: Object.assign({}, this.$route.query, {sortBy: newVal.value}),
      });
    },
    'chosen': function (newVal) {
      this.$store.dispatch('filter/range', newVal);
      this.$router.push({
        query: Object.assign({}, this.$route.query, {range: JSON.stringify(newVal)}),
      });
    },
    'date_item': function (newVal) { //all the data is directed to `chosen` and mutated there (see above)
      this.chosen = JSON.parse(newVal);
      this.proxyDate = JSON.parse(newVal);
    },
    'country': function (newVal) {
      this.$store.dispatch('filter/region', newVal);
      this.$router.push({
        query: Object.assign({}, this.$route.query, {region: newVal.value}),
      });
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

  setup() {
    const store = useStore();
    const country = ref(null);

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
