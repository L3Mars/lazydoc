<template>
  <v-row>
    <v-col cols="12">
      <AutoCompleteTags class="ma-2" :selectedTags.sync="selectedTags" label="Recherche"></AutoCompleteTags>
      <v-list subheader two-line>
        <v-list-item v-for="document in documents" :key="document.id" :to="`/showdocument/${document.documentId}`">
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark>
              mdi-file-document
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span v-for="tag in document.tags" :key="tag">
                {{ tag }}
              </span>
            </v-list-item-title>
            <v-list-item-subtitle>{{ document.createDate | dateToString('DD/MM/YYYY HH:mm') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { DocumentEntete } from '@/models/DocumentEntete';
import documentApi from '@/api/DocumentApi';
import AutoCompleteTags from '@/components/AutoCompleteTags.vue';

@Component({ components: { AutoCompleteTags } })
export default class SearchDocument extends Vue {
  private selectedTags: string[] = [];
  private documents: DocumentEntete[] = [];
  private headers: any = [
    { text: 'Tags', value: 'tags' },
    { text: 'Create on', value: 'createDate' }
  ];
  private fileUrl = '';

  mounted() {
    this.searchDocuments();
  }

  @Watch('selectedTags')
  private async searchDocuments() {
    this.documents = await documentApi.searchDocument(this.selectedTags);
  }
}
</script>

<style scoped></style>
