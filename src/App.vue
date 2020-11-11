<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary mobile-break-point="960" clipped app>
      <v-list-item class="px-2" link to="/profile">
        <v-list-item-avatar>
          <v-icon color="primary" large>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-title> {{ username }}</v-list-item-title>
      </v-list-item>
      <v-divider v-if="updateAvailable"></v-divider>
      <v-list-item v-if="updateAvailable" color="red" class="px-2 red--text" dense link @click="refreshApp">
        <v-list-item-avatar>
          <v-icon color="green">mdi-arrow-up-circle-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-title class="px-2 green--text">Update LazyDocs</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.name" link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list-item color="red" class="px-2 red--text" dense link @click="logout">
        <v-list-item-avatar>
          <v-icon color="red">mdi-logout</v-icon>
        </v-list-item-avatar>
        <v-list-item-title class="px-2 red--text"> Logout</v-list-item-title>
      </v-list-item>
      <v-list-item class="align-self-end">
        <v-switch :label="`Dark Theme`" v-model="$vuetify.theme.dark" @change="darkModeChange"></v-switch>
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark app v-if="isAuhtenticate">
      <v-badge
        :value.sync="updateAvailable"
        color="green"
        icon="mdi-arrow-up-thick"
        overlap
        offset-y="22"
        offset-x="22"
        class="mr-5"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-badge>
      <v-toolbar-title>
        LazyDocs
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark link icon @click="goAddDocument"><v-icon large>mdi-plus</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid style="height: 100%" class="pa-0">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { userModule } from '@/store/UserModule';
import { appModule } from '@/store/AppModule';
import Component from 'vue-class-component';
import router from '@/router';
@Component({
  name: 'Home'
})
export default class extends Vue {
  private drawer = false;
  private mini = false;
  private registration: ServiceWorkerRegistration | null = null;
  private updateAvailable = false;
  private refreshing = false;

  private menuItems: any = [
    { icon: 'mdi-plus', name: 'Nouveau document', path: '/adddocument' },
    { icon: 'mdi-magnify', name: 'Mes documents', path: '/searchdocument' }
  ];

  get isAuhtenticate() {
    return userModule.isAuthenticate;
  }

  get username() {
    return userModule.username;
  }

  private logout() {
    userModule.logout();
  }

  created() {
    this.$vuetify.theme.dark = appModule.darkMode == 'true';
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  }

  private goAddDocument() {
    router.push('/adddocument');
  }

  private showRefreshUI(e: Event) {
    this.registration = (e as CustomEvent).detail;
    this.updateAvailable = true;
  }

  private refreshApp() {
    if (!this.registration || !this.registration.waiting) return;
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    this.registration.update();
  }

  private darkModeChange(value: boolean) {
    appModule.changeDarkMode(value);
  }
}
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: black;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
