<template>
    <router-view/>
</template>
<script>
import { defineComponent, provide } from 'vue'
import { DefaultApolloClient, ApolloClients} from '@vue/apollo-composable'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client/core';

const apolloClient = new ApolloClient({
  uri: 'https://tiktok.ufobe.com/api/graphql',
  cache: new InMemoryCache()
})

export default defineComponent({
  name: 'App',
  setup() {
    provide(ApolloClients, apolloClient)
  },
})
</script>
