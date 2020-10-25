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
            <v-list>
              <v-list-item v-for="file in files" :key="file.name">
                <v-list-item-avatar>
                  <v-icon>mdi-pdf-box</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="file.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="removeFile(file)">
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
          <AutoCompleteTags :selectedTags.sync="selectedTags" outlined solo flat> </AutoCompleteTags>
        </v-col>
      </v-row>
      <v-row class="flex-grow-0 pr-3 pl-3">
        <v-btn
          class="align-self-center fill-width"
          color="success"
          width="100%"
          height="50"
          @click="sendFiles"
          :disabled="!canExecuteSave"
          :loading="loading"
        >
          <v-icon class="mr-2">mdi-content-save-move</v-icon>
          Enregistrer
        </v-btn>
      </v-row>
    </span>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import documentApi from '@/api/DocumentApi';
import AutoCompleteTags from '@/components/AutoCompleteTags.vue';

@Component({ components: { AutoCompleteTags } })
export default class extends Vue {
  @Ref('fileInput') readonly fileInput!: any;
  @Ref('autocompleteTags') readonly refAutoCompleteTags!: AutoCompleteTags;
  private files: File[] = [];
  private selectedTags: string[] = [];
  private loading = false;

  get canExecuteSave() {
    return this.files.length >= 1 && this.selectedTags.length >= 1;
  }

  private addFileClick() {
    this.fileInput.$refs.input.click();
  }

  private fileAdded(files: File[] | File) {
    if (files instanceof File) {
      this.files.push(files);
    } else {
      files.forEach((element) => {
        this.files.push(element);
      });
    }
  }

  private removeFile(file: File) {
    this.files.splice(this.files.indexOf(file), 1);
  }

  private removeTag(tag: string) {
    this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
  }

  private async sendFiles() {
    try {
      this.loading = true;
      const formData = new FormData();
      this.files.forEach((element) => {
        formData.append(element.name, element);
      });

      const documentId = await documentApi.createDocument(formData);
      await documentApi.tagDocument(documentId, this.selectedTags);
      this.reset();
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  private reset() {
    this.selectedTags = [];
    this.files = [];
    this.refAutoCompleteTags.refreshAllTags();
  }
}
</script>
