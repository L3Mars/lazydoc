<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card flat>
          <v-card-title class="d-flex justify-center">
            <v-icon size="70" color="primary">mdi-file-document</v-icon>
          </v-card-title>
          <v-card-title class="d-flex justify-center">
            <h3>LazyDocs</h3>
          </v-card-title>
          <v-card-text class="pt-5 pb-5" v-if="!successMessage">
            <v-form @keypress.enter="register" ref="form" v-model="formIsValid" lazy-validation>
              <v-text-field
                label="Email"
                prepend-icon="mdi-email"
                name="email"
                type="text"
                v-model="email"
                :rules="emailRules"
                validate-on-blur
                :readonly="loading"
                color="blue"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="!successMessage">
            <v-btn rounded color="primary" :loading="loading" @click="sendValidation" block>Send validation mail</v-btn>
          </v-card-actions>
          <v-alert v-if="successMessage" dense text type="success">
            {{ successMessage }}
          </v-alert>
          <v-card-text v-if="errorMessage">
            <v-alert dense text type="error">{{ errorMessage }} </v-alert>
          </v-card-text>
          <v-card-actions class="pt-5">
            <v-btn text block small :disabled="loading" to="/authentication"><b>Login</b></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserApi } from '@/api/UserApi';
import { displayAxiosError } from '@/utils/ErrorMethods';
import { userModule } from '@/store/UserModule';

@Component
export default class ActivationMail extends Vue {
  private formIsValid = '';
  public loading = false;
  private successMessage = '';
  private errorMessage = '';

  private email = '';
  private emailRules: any = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
  ];

  public async sendValidation() {
    const isValid: boolean = (this.$refs.form as any).validate();
    if (isValid) {
      this.loading = true;
      UserApi.requestValidation(this.email)
        .then(() => {
          this.successMessage = 'Confirmation mail sended, check your mail adress to validate your account.';
          this.errorMessage = '';
          userModule.reset();
        })
        .catch((err) => {
          this.errorMessage = displayAxiosError(err);
          this.successMessage = '';
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
</script>

<style scoped></style>
