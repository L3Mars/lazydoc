<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card :loading="loading" class="mx-auto my-12">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>
          <v-toolbar flat color="primary lighten-1" dark height="100">
            <v-card-title>
              <v-avatar>
                <v-icon color="white" size="56">mdi-account-circle</v-icon>
              </v-avatar>
              <p class="ml-3">
                {{ username }}
              </p>
            </v-card-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              label="Username"
              prepend-icon="mdi-account"
              :value="username"
              append-icon="mdi-pencil"
              @click:append.stop="newUsernameDialog = true"
            >
            </v-text-field>
            <v-dialog v-model="newUsernameDialog" width="400">
              <v-card>
                <v-card-text class="pa-10 pb-5">
                  <v-form
                    @keypress.enter="register"
                    ref="newUsernameForm"
                    v-model="newUsernameFormIsValid"
                    lazy-validation
                  >
                    <v-text-field
                      label="New username"
                      prepend-icon="mdi-account"
                      v-model="newUsername"
                      :error-messages="newUsernameError"
                      :rules="newUsernameRules"
                      autofocus
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="saveNewUsername" :loading="newUsernameLoading">
                    Sauvegarder
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-text-field label="Email" prepend-icon="mdi-email-outline" readonly :value="email"></v-text-field>
            <v-text-field
              label="Encryption secret"
              prepend-icon="mdi-key"
              :type="showSecret ? 'text' : 'password'"
              readonly
              :value="secret"
              append-icon="mdi-eye"
              @click:append.stop="showSecret = !showSecret"
              hint="Warning, this secret are used for encryption, if you lose this secret you will not be able to access to your encrypted files. You should use the same secret for all your devices."
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" outlined>
              Change password
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userModule } from '@/store/UserModule';
import { displayAxiosError } from '@/utils/ErrorMethods';

@Component
export default class Profile extends Vue {
  private loading = false;
  private showSecret = false;

  private newUsername = '';
  private newUsernameDialog = false;
  private newUsernameError = '';
  private newUsernameLoading = false;
  private newUsernameFormIsValid = true;
  private newUsernameRules: any = [
    (v: string) => !!v || 'Username is required',
    (v: string) => v.length >= 3 || 'Three chars min'
  ];

  get username() {
    return userModule.username;
  }

  get email() {
    return userModule.email;
  }

  get secret() {
    return 'daZEsqd4AZEL654qsAZdsq';
  }

  private async saveNewUsername() {
    try {
      const isValid: boolean = (this.$refs.newUsernameForm as any).validate();
      if (isValid) {
        this.newUsernameLoading = true;
        await userModule.changeUsername(this.newUsername);
        this.newUsernameError = '';
        this.newUsernameDialog = false;
      }
    } catch (err) {
      this.newUsernameError = displayAxiosError(err);
    } finally {
      this.newUsernameLoading = false;
    }
  }
}
</script>

<style scoped>
.headerTitle {
  background-color: lightgray;
}
</style>
