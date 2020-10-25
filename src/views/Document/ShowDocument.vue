<template>
  <div v-if="document">
    <span v-for="(file, i) in document.files" :key="i">
      <img v-if="file.type == '.jpg'" :src="getSrc(file.id)" width="800" contain />
      <PDFViewer v-if="file.type == '.pdf'" :url="getSrc(file.id)"></PDFViewer>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import documentApi from '@/api/DocumentApi';
import AutoCompleteTags from '@/components/AutoCompleteTags.vue';
import { DocumentGet } from '@/models/Document';
import PDFViewer from '@/components/PDFViewer.vue';

@Component({ components: { AutoCompleteTags, PDFViewer } })
export default class ShowDocument extends Vue {
  private documentId = 0;
  private document: DocumentGet | null = null;
  private dialog = false;
  private url: any;
  private numPages = 0;

  mounted() {
    this.openDocument(this.$route.params.id.toNumber());
  }

  private getSrc(fileId: number) {
    return `${process.env.VUE_APP_API_URL}fichier/${fileId}`;
  }

  public async openDocument(documentId: number) {
    this.dialog = true;
    this.document = await documentApi.get(documentId);
  }
}
</script>

<style scoped></style>
