<template>
  <v-combobox
    v-model="_selectedTags"
    :items="filteredTags"
    chips
    clearable
    :label="_label"
    multiple
    append-icon="mdi-text-box-plus"
    :solo="_solo"
    :outlined="_outlined"
    :flat="_flat"
    hide-selected
    hide-details
    :search-input.sync="searchInput"
    :placeholder="_placeholder"
    @change="searchInput = ''"
  >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="removeTag(item)">
        <strong>{{ item }}</strong>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Watch } from 'vue-property-decorator';
import tagApi from '@/api/TagApi';

@Component
export default class AutoCompleteTags extends Vue {
  private searchInput = '';

  @PropSync('selectedTags', { default: [] }) private _selectedTags!: string[];
  @PropSync('outlined') private _outlined!: boolean;
  @PropSync('flat') private _flat!: boolean;
  @PropSync('solo') private _solo!: boolean;
  @PropSync('placeholder', { default: '' }) private _placeholder!: string;
  @PropSync('label', { default: '' }) private _label!: string;

  private filteredTags: string[] = [];
  private allTags: string[] = [];

  mounted() {
    this.refreshAllTags();
  }

  private removeTag(tag: string) {
    this._selectedTags.splice(this._selectedTags.indexOf(tag), 1);
  }

  @Watch('searchInput')
  private filterTags(filter: string) {
    if (!filter) this.filteredTags = [];
    else {
      this.filteredTags = this.allTags.filter((t) => t.toUpperCase().includes(filter.toUpperCase()));
    }
  }

  public async refreshAllTags() {
    this.allTags = await tagApi.getTags();
  }
}
</script>

<style scoped></style>
