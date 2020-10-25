<template>
  <span>
    <pdf v-for="i in numPages" :key="i" :src="url" :page="i"> </pdf>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import pdf from 'vue-pdf';

@Component({ components: { pdf } })
export default class PDFViewer extends Vue {
  @Prop() private url: any;
  private numPages = 0;

  mounted() {
    this.url = pdf.createLoadingTask(this.url);
    this.url.promise.then((pdf: any) => {
      this.numPages = pdf.numPages;
    });
  }

  private getSrc(fileId: number) {
    return `${process.env.VUE_APP_API_URL}fichier/${fileId}`;
  }
}
</script>

<style scoped></style>
