<template>
  <div class="filter_desktop">
    <div class="container">
      <div class="filter-desktop-wrap">
        <div class="date_picker">
          <q-btn icon="event" round color="primary">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date
                @before-update="save"
                v-model="proxyDate"
                range
                mask="YYYY-MM-DD"
                :options="availableDays"
              >
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Cancel" color="primary" flat v-close-popup/>
                  <q-btn label="OK" color="primary" flat @click="save" v-close-popup/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
        <div class="search">
          <q-form
            class="flex"
            @submit.prevent="searchInit($event)"
          >
            <q-input
              id="search"
              style="width:calc(100% - 56px)"
              outlined
              v-model="search_text"
              label="Search"
            />
            <q-btn
              icon="fa fa-search"
              type="submit"
              color="primary"
            />
          </q-form>
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
            v-model="prepared_range"
            toggle-color="primary"
            :options="options"
            size="0.9em"
          />
        </div>
        <div class="sort_by">
          <q-select
            class="sort_by_select"
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
          <q-select
            standart
            v-model="country"
            :options="countries"
            label="Filter By Country"
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

export default {
  name: 'PostsFilterDesktop',
  data() {
    return {
      options: [
        {
          label: '7 days',
          value: 7,
        },
        {
          label: '14 days',
          value: 14,
        },
        {
          label: '30 days',
          value: 30,
        },
        {
          label: 'All',
          value: 0,
        },
      ],
    };
  },

  methods: {
    searchInit() {
      this.$store.dispatch('filter/search', this.search_text);
      this.$router.push({
        query: Object.assign({}, this.$route.query, {search: this.search_text}),
      });
    },
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
        query: Object.assign({}, this.$route.query, {show_private: newVal}),
      });
    },
    'sort_by_item': function (newVal) {
      this.$store.dispatch('filter/sortBy', newVal.value);
      this.$router.push({
        query: Object.assign({}, this.$route.query, {sort_by: newVal.alias}),
      });
    },
    'range': function (newVal, prevVal) {
      console.log('range')
      this.$store.dispatch('filter/range', newVal);
      if (prevVal === null && this.prepared_range && newVal) {
        this.prepared_range = null;
      }
    },
    'prepared_range': function (newVal, prevVal) {
      this.$store.dispatch('filter/days', newVal);
      console.log('prepared')
      // if (newVal === 0) {
      //   this.range = null;
      //   this.proxyDate = null;
      // }
      if (prevVal === null && this.range && newVal) {
        this.range = null;
        this.proxyDate = null
      }
    },
    'country': function (newVal) {
      this.$store.dispatch('filter/region', newVal.value);
      this.$router.push({
        query: Object.assign({}, this.$route.query, {region: newVal.value}),
      });
    },
  },

  props: {
    countries: Array,
    date_item: Number,
    sort_by_item: Object,
    search_text: String,
    sort_by: Array,
    sort_direction: String,
    show_private: Boolean,
    today_date: String,
  },

  setup(props) {
    const store = useStore();
    const country = ref(props.countries
      .find(item => item.value.toLowerCase() === store.getters['filter/get_region'].toLowerCase()));

    const prepared_range = ref(props.date_item);

    const today = new Date().toJSON().slice(0, 10);

    const proxyDate = ref(today);
    const range = ref(store.getters['filter/get_range']);

    return {
      country,
      range,
      proxyDate,
      prepared_range,

      save() {
        range.value = proxyDate.value;
      },

      availableDays(date) {
        return date <= today.replace(/-/g, '/');
      },
    };
  },

};
</script>

<style lang="scss" scoped>
@import 'src/css/components/filter';
</style>
