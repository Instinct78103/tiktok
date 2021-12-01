<template>
  <div class="button-filter">
    <!--    <q-btn label="Filters" flat @click="dialog_1 = true" icon="fas fa-filter"></q-btn>-->
    <!--    <q-dialog v-model="dialog_1">-->
    <!--      <q-card style="min-width: 300px">-->
    <!--        <q-list>-->

    <!--          <q-item>-->
    <!--            <q-item-section>-->
    <!--              <q-btn align="left" flat label="Country" icon="flag" @click="dialog_2 = true"/>-->

    <!--              <q-dialog v-model="dialog_2">-->
    <!--                <q-card style="min-width: 300px">-->
    <!--                  <q-list>-->
    <!--                    <q-item v-for="n in countries" :key="n">-->
    <!--                      <q-item-section>-->
    <!--                        <q-btn align="left" :label="n" flat v-close-popup/>-->
    <!--                      </q-item-section>-->
    <!--                    </q-item>-->
    <!--                    <q-separator/>-->
    <!--                    <q-item>-->
    <!--                      <q-item-section>-->
    <!--                        <q-btn flat icon="fas fa-arrow-left" v-close-popup/>-->
    <!--                      </q-item-section>-->
    <!--                    </q-item>-->
    <!--                  </q-list>-->
    <!--                </q-card>-->
    <!--              </q-dialog>-->

    <!--            </q-item-section>-->
    <!--          </q-item>-->

    <!--          <q-item>-->
    <!--            <q-item-section>-->
    <!--              <q-btn align="left" flat label="Date" icon="event" @click="dialog_3 = true"/>-->

    <!--              <q-dialog v-model="dialog_3">-->
    <!--                <q-card style="min-width: 300px">-->
    <!--                  <q-list>-->
    <!--                    <q-item v-for="n in [-->
    <!--                              {label: '7 days', value: '7'},-->
    <!--                              {label: '14 days', value: '14'},-->
    <!--                              {label: '30 days', value: '30'}-->
    <!--                            ]" :key="n.label" v-close-popup>-->
    <!--                      <q-item-section>-->
    <!--                        <q-btn align="left" :label="n.label" flat/>-->
    <!--                      </q-item-section>-->
    <!--                    </q-item>-->
    <!--                    <q-item>-->
    <!--                      <q-item-section>-->
    <!--                        <q-btn flat align="left" icon="fas fa-calendar-day" label="Custom Range"/>-->
    <!--                      </q-item-section>-->
    <!--                    </q-item>-->
    <!--                    <q-separator/>-->
    <!--                    <q-item>-->
    <!--                      <q-item-section>-->
    <!--                        <q-btn flat icon="fas fa-arrow-left" v-close-popup/>-->
    <!--                      </q-item-section>-->
    <!--                    </q-item>-->
    <!--                  </q-list>-->
    <!--                </q-card>-->
    <!--              </q-dialog>-->

    <!--            </q-item-section>-->
    <!--          </q-item>-->

    <!--          <q-item>-->
    <!--            <q-item-section>-->
    <!--              <div class="flex justify-between" @click="show_private = (show_private === false)"-->
    <!--                   style="position: relative; align-items: center">-->
    <!--                <q-btn align="left" flat label="Show Private" icon="fas fa-address-book" style="width: 100%"/>-->
    <!--                <q-toggle class="show-private" left-label v-model="show_private"-->
    <!--                          style="position: absolute; right: 16px"/>-->
    <!--              </div>-->
    <!--            </q-item-section>-->
    <!--          </q-item>-->

    <!--          <q-separator/>-->

    <!--          <q-item>-->
    <!--            <q-item-section>-->
    <!--              <q-btn flat icon="fas fa-times" v-close-popup/>-->
    <!--            </q-item-section>-->
    <!--          </q-item>-->

    <!--        </q-list>-->
    <!--      </q-card>-->
    <!--    </q-dialog>-->

        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error.message }}</div>
        <div v-else-if="result && result.post">
          <div>id: {{ result.video.id }}</div>
        </div>

  </div>
</template>

<script>
import {ref, defineComponent, provide} from 'vue';
import {useQuery} from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({
  name: 'ButtonFilters',
  setup() {

    const query = gql`
    {
      video{
        id
      }
    }
    `;

    const {result, loading, error} = useQuery(query);

    return {
      result,
      loading,
      error,
      dialog_1: ref(false),
      dialog_2: ref(false),
      dialog_3: ref(false),
      date_item: ref('7'),
      show_private: ref(false),
    };
  },
  data() {
    return {
      countries: [
        'USA',
        'UK',
        'Russia',
        'Germany',
      ],
    };
  },
});
</script>

<style scoped>

</style>
