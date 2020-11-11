<template>
  <v-row no-gutters>
    <v-col v-if="userFirstUse && !loading" class="d-flex justify-center">
      <v-card class="ma-5">
        <v-card-text>
          Welcome <b>{{ username }}</b
          >, your document library is currently empty, please add new document and enjoy the power of lazyDocs.
          <a class="ml-2"><router-link to="/adddocument" tag="span" class="logo"> Add document</router-link></a>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-else cols="12" no-gutters>
      <AutoCompleteTags
        class="px-5 pt-5 pb-2"
        :selectedTags.sync="selectedTags"
        label="Recherche"
        appendInnerIcon="mdi-magnify"
        :clearable="true"
      ></AutoCompleteTags>
      <v-list subheader two-line>
        <v-list-item v-for="document in documents" :key="document.id" @click="openDocument(document)" class="pr-2">
          <v-list-item-avatar>
            <v-icon v-if="document.mainType == 'pdf'" class="red lighten-1" dark>
              mdi-adobe-acrobat
            </v-icon>
            <v-icon v-else-if="document.mainType == 'img'" class="blue lighten-1" dark>
              mdi-image
            </v-icon>
            <v-icon v-else-if="document.mainType == 'word'" class="blue lighten-1" dark>
              mdi-file-word-box
            </v-icon>
            <v-icon v-else-if="document.mainType == 'excel'" class="green lighten-1" dark>
              mdi-file-excel-box
            </v-icon>
            <v-icon v-else-if="document.mainType == 'multiple'" class="green lighten-1" dark>
              mdi-file-document-multiple
            </v-icon>
            <v-icon v-else class="grey lighten-1" dark>
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
          <v-list-item-action>
            <v-btn icon @click.stop="openBottomSheet(document)" large>
              <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-container style="height: 400px;" v-if="loading">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="subtitle-1 text-center" cols="12">
            Getting your files
          </v-col>
          <v-col cols="6">
            <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-bottom-sheet v-model="bottomSheet">
      <v-sheet>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon v-if="selectedDocument.mainType == 'pdf'" class="red lighten-1" dark>
              mdi-adobe-acrobat
            </v-icon>
            <v-icon v-else-if="selectedDocument.mainType == 'img'" class="blue lighten-1" dark>
              mdi-image
            </v-icon>
            <v-icon v-else-if="selectedDocument.mainType == 'word'" class="blue lighten-1" dark>
              mdi-file-word-box
            </v-icon>
            <v-icon v-else-if="selectedDocument.mainType == 'excel'" class="green lighten-1" dark>
              mdi-file-excel-box
            </v-icon>
            <v-icon v-else-if="selectedDocument.mainType == 'multiple'" class="green lighten-1" dark>
              mdi-file-document-multiple
            </v-icon>
            <v-icon v-else class="grey lighten-1" dark>
              mdi-file-document
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span v-for="tag in selectedDocument.tags" :key="tag">
                {{ tag }}
              </span>
            </v-list-item-title>
            <v-list-item-subtitle>{{
              selectedDocument.createDate | dateToString('DD/MM/YYYY HH:mm')
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-row class="text-center pt-3 pb-3">
          <v-col cols="3" class="text-center">
            <v-btn icon @click="showDocument(selectedDocument)" x-large>
              <div class="d-flex flex-column align-center">
                <v-icon color="blue lighten-1" class="mb-1" large>mdi-eye</v-icon>
                <h5>Show</h5>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="3" class="text-center">
            <v-btn icon @click="editDocument(selectedDocument)" x-large>
              <div class="d-flex flex-column align-center">
                <v-icon color="blue lighten-1" class="mb-1" large>mdi-pencil</v-icon>
                <h5>Edit</h5>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="3" class="text-center">
            <v-btn icon @click="downloadDocument(selectedDocument)" x-large>
              <div class="d-flex flex-column align-center">
                <v-icon color="blue lighten-1" class="mb-1" large>mdi-download</v-icon>
                <h5>Download</h5>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn icon @click="shareDocument(selectedDocument)" disabled x-large>
              <div class="d-flex flex-column align-center">
                <v-icon color="blue lighten-1" class="mb-1" large>mdi-share</v-icon>
                <h5>Share</h5>
              </div>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-list>
          <v-list-item @click="deleteDocument(selectedDocument)">
            <v-list-item-content class="red--text">
              Delete
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { DocumentEntete } from '@/models/DocumentEntete';
import documentApi from '@/api/DocumentApi';
import AutoCompleteTags from '@/components/AutoCompleteTags.vue';
import { userModule } from '@/store/UserModule';
import router from '@/router';
import { isMobile } from 'mobile-device-detect';
import Axios from 'axios';

@Component({ components: { AutoCompleteTags } })
export default class SearchDocument extends Vue {
  private loading = false;
  private firstLoad = true;
  private selectedTags: string[] = [];
  private documents: DocumentEntete[] = [];
  private headers: any = [
    { text: 'Tags', value: 'tags' },
    { text: 'Create on', value: 'createDate' }
  ];
  private fileUrl = '';
  private bottomSheet = false;
  private selectedDocument: DocumentEntete = new DocumentEntete();

  get userFirstUse() {
    return this.firstLoad && this.documents.length == 0;
  }
  get username() {
    return userModule.username;
  }

  mounted() {
    this.searchDocuments();
  }

  private async searchDocuments() {
    try {
      this.loading = true;
      this.documents = await documentApi.searchDocument(this.selectedTags);
    } finally {
      this.loading = false;
    }
  }

  @Watch('selectedTags')
  private async selectedTagsChange() {
    this.firstLoad = false;
    await this.searchDocuments();
  }

  private async openDocument(document: DocumentEntete) {
    if (document.filesCount == 1) {
      const doc = await documentApi.get(document.documentId);
      if (isMobile) {
        location.replace(`${process.env.VUE_APP_API_URL}fichier/${doc.files[0].id}/${userModule.token}`);
      } else {
        window.open(`${process.env.VUE_APP_API_URL}fichier/${doc.files[0].id}/${userModule.token}`, '_blank');
      }
    } else {
      router.push(`showDocument/${document.documentId}`);
    }
  }

  private showDocument(document: DocumentEntete) {
    router.push(`showDocument/${document.documentId}`);
  }

  private openBottomSheet(document: DocumentEntete) {
    this.bottomSheet = true;
    this.selectedDocument = document;
  }

  private deleteLoading = false;
  private async deleteDocument(document: DocumentEntete) {
    try {
      this.deleteLoading = true;
      await documentApi.delete(document.documentId);
      this.documents.splice(this.documents.indexOf(document, 0), 1);
      this.bottomSheet = false;
    } finally {
      this.deleteLoading = false;
    }
  }

  private async downloadDocument(documentEntete: DocumentEntete) {
    const doc = await documentApi.get(documentEntete.documentId);
    doc.files.forEach((file) => {
      Axios.get(`${process.env.VUE_APP_API_URL}fichier/${file.id}/${userModule.token}`, { responseType: 'blob' })
        .then((response) => {
          const blob = new Blob([response.data], {
            type: this.getContentType(file.type)
          });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = doc.files[0].name;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
    });
  }

  private getContentType(extension: string): string {
    if (extension == '.pdf') return 'application/pdf';
    else if (extension == '.jpg') return 'image/jpg';
    else if (extension == '.bnp') return 'image/bnp';
    else if (extension == '.jpeg') return 'image/jpeg';
    else if (extension == '.png') return 'image/png';
    else return '';
  }

  private async editDocument(document: DocumentEntete) {
    router.push(`editDocument/${document.documentId}`);
  }

  private async shareDocument(document: DocumentEntete) {
    return;
  }
}
</script>

<style scoped></style>
