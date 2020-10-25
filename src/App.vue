<template>
  <v-app>
    <v-app-bar color="green" dark app>
      <v-toolbar-title>
        <v-btn icon to="/" large class="mr-2"><v-icon>mdi-text-box</v-icon></v-btn>
        LazyDOC</v-toolbar-title
      >
    </v-app-bar>
    <v-main>
      <v-container fluid style="height: 100%">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  })
});
</script>
