<template>
  <div class="home">
    <v-col cols="12">
      <v-btn large color="success" block height="200" to="/adddocument" outlined>
        <v-icon class="mr-3" large>mdi-plus</v-icon>
        <h2>Créer un document</h2>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-btn large color="primary" block height="200" to="/searchdocument" outlined>
        <v-icon class="mr-3" large>mdi-text-box-search</v-icon>
        <h2>Mes documents</h2>
      </v-btn>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>
