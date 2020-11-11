<template>
  <v-container fluid style="height: 100%">
    <span class="d-flex flex-column fill-height">
      <v-row class="flex-grow-0">
        <v-col cols="12">
          <v-btn
            class="align-self-center fill-width"
            color="primary"
            rounded
            width="100%"
            height="50"
            @click="addFileClick"
          >
            <v-icon class="mr-2">mdi-camera</v-icon>
            Ajouter des fichiers
          </v-btn>
        </v-col>
        <v-file-input ref="fileInput" class="d-none" multiple @change="fileAdded"></v-file-input>
      </v-row>
      <v-row class="flex-grow-1">
        <v-col cols="12" class="d-flex">
          <v-card outlined class="flex-grow-1">
            <v-toolbar color="primary" dark flat>
              <h3>Fichiers à importer</h3>
            </v-toolbar>
            <v-progress-linear
              v-if="addDocumentLoading"
              indeterminate
              color="green"
              height="5"
              striped
            ></v-progress-linear>
            <v-list>
              <v-list-item v-for="file in files" :key="file.name">
                <v-list-item-avatar>
                  <v-icon>mdi-pdf-box</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="file.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="removeFile(file)" :loading="file.loading">
                    <v-icon color="grey">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="flex-grow-0">
        <v-col cols="12">
          <AutoCompleteTags
            :selectedTags.sync="selectedTags"
            @removeTag="removeTag"
            @addTag="addTag"
            label="Tags"
            appendInnerIcon="mdi-tag-multiple"
            outlined
            solo
            flat
          >
          </AutoCompleteTags>
        </v-col>
      </v-row>
    </span>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import documentApi from '@/api/DocumentApi';
import fichierApi from '@/api/FichierApi';
import tagApi from '@/api/TagApi';
import AutoCompleteTags from '@/components/AutoCompleteTags.vue';
import { FichierEntete } from '@/models/FichierEntete';
import { DocumentEntete } from '@/models/DocumentEntete';
import { DocumentGet } from '@/models/Document';

@Component({ components: { AutoCompleteTags } })
export default class EditDocument extends Vue {
  @Ref('fileInput') readonly fileInput!: any;
  @Ref('autocompleteTags') readonly refAutoCompleteTags!: AutoCompleteTags;
  private documentId = '';
  private document: DocumentGet = new DocumentGet();
  private files: FichierEntete[] = [];
  private selectedTags: string[] = [];
  private addDocumentLoading = false;

  get canExecuteSave() {
    return this.files.length >= 1 && this.selectedTags.length >= 1;
  }

  mounted() {
    this.openDocument(this.$route.params.id);
  }

  public async openDocument(documentId: string) {
    const document = await documentApi.get(documentId);
    this.document = document;
    this.documentId = document.id;
    document.tags.forEach((t) => this.selectedTags.push(t.label));
    document.files.forEach((f) => this.files.push(f));
  }

  private addFileClick() {
    this.fileInput.$refs.input.click();
  }

  private async fileAdded(files: File[] | File) {
    try {
      this.addDocumentLoading = true;

      if (files instanceof File) {
        const formData = new FormData();
        formData.append(files.name, files);
        const fileEntete = await fichierApi.add(formData, this.documentId);
        this.files.push(fileEntete);
      } else {
        files.forEach(async (element) => {
          const formData = new FormData();
          formData.append(element.name, element);
          const fileEntete = await fichierApi.add(formData, this.documentId);
          this.files.push(fileEntete);
        });
      }
    } finally {
      this.addDocumentLoading = false;
    }
  }

  private async removeFile(file: FichierEntete) {
    try {
      file.loading = true;
      await fichierApi.delete(file.id);
      this.files.splice(this.files.indexOf(file), 1);
    } finally {
      file.loading = false;
    }
  }

  private async removeTag(tag: string) {
    await tagApi.delete(this.documentId, this.document.tags.filter((t) => t.label == tag)[0].id);
  }

  private async addTag(tagLabel: string) {
    const tag = await tagApi.add(this.documentId, tagLabel);
    this.document.tags.push(tag);
  }

  //   private async sendFiles() {
  //     try {
  //       this.loading = true;
  //       const formData = new FormData();
  //       this.files.forEach((element) => {
  //         formData.append(element.name, element);
  //       });

  //       const documentId = await documentApi.createDocument(formData);
  //       await documentApi.tagDocument(documentId, this.selectedTags);
  //       this.reset();
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       this.loading = false;
  //     }
  //   }

  private reset() {
    this.selectedTags = [];
    this.files = [];
    this.refAutoCompleteTags.refreshAllTags();
  }
}
</script>
