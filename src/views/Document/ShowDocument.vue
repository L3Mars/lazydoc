<template>
  <div v-if="document">
    <v-col cols="12" v-for="(file, i) in document.files" :key="i" class="d-flex child-flex">
      <img v-if="file.type == '.jpg' || file.type == '.png'" :src="getSrc(file.id)" aspect-ratio="1" contain />
      <PDFViewer v-if="file.type == '.pdf'" :url="getSrc(file.id)"></PDFViewer>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import documentApi from '@/api/DocumentApi';
import AutoCompleteTags from '@/components/AutoCompleteTags.vue';
import { DocumentGet } from '@/models/Document';
import PDFViewer from '@/components/PDFViewer.vue';
import { userModule } from '@/store/UserModule';

@Component({ components: { AutoCompleteTags, PDFViewer } })
export default class ShowDocument extends Vue {
  private documentId = 0;
  private document: DocumentGet | null = null;
  private dialog = false;
  private url: any;
  private numPages = 0;

  mounted() {
    this.openDocument(this.$route.params.id);
  }

  private getSrc(fileId: number) {
    return `${process.env.VUE_APP_API_URL}fichier/${fileId}/${userModule.token}`;
  }

  public async openDocument(documentId: string) {
    this.dialog = true;
    this.document = await documentApi.get(documentId);
  }
}
</script>

<style scoped></style>
