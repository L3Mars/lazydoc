<template>
  <div class="home" align="center">
    <v-col cols="12" md="6" lg="4">
      <v-btn large color="green" block height="200" to="/adddocument" outlined>
        <div class="d-flex flex-column">
          <v-icon class="mr-3 mb-5" size="70">mdi-text-box-plus</v-icon>
          <h2>Ajouter un document</h2>
        </div>
      </v-btn>
    </v-col>
    <v-col cols="12" md="6" lg="4">
      <v-btn large color="primary" block height="200" to="/searchdocument" outlined>
        <div class="d-flex flex-column">
          <v-icon class="mr-3 mb-5" size="70">mdi-text-box-search</v-icon>
          <h2>Mes documents</h2>
        </div>
      </v-btn>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>
