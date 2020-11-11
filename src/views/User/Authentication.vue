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
          <v-card-text class="pt-5 pb-5">
            <v-form ref="form" v-model="formIsValid" lazy-validation>
              <v-text-field
                label="Email"
                ref="loginElement"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                v-model="email"
                :readonly="loading"
                @keypress.enter="login"
                :rules="emailRules"
                autofocus
              ></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                @keypress.enter="login"
                :readonly="loading"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-alert v-if="_displayAccountVerification && !errorMessage" dense text type="success">
            Congratulations! Your account has been activated.
          </v-alert>
          <v-card-actions>
            <v-btn rounded color="primary" :loading="loading" @click="login" block>Login</v-btn>
          </v-card-actions>
          <v-card-text v-if="errorMessage">
            <v-alert dense text type="error">
              <span
                >{{ errorMessage }}
                <span v-if="accountNotActivated">
                  <a><router-link to="/ActivationMail" tag="span" class="logo"> Request new activation</router-link></a>
                </span>
              </span>
            </v-alert>
          </v-card-text>
          <v-card-actions class="pt-5 d-flex justify-center">
            <v-facebook-login app-id="1320894848251931" @login="facebookLogin"></v-facebook-login>
          </v-card-actions>
          <v-card-actions class="pt-5">
            <v-btn text block small :disabled="loading" to="/register"><b>Create account</b></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { userModule } from '@/store/UserModule';
import VFacebookLogin from 'vue-facebook-login-component';
import { FacebookAuthRequest } from '@/models/User/FacebookAuthRequest';

@Component({ components: { VFacebookLogin } })
export default class Authentication extends Vue {
  private loading = false;
  private email = '';
  private password = '';
  private formIsValid = '';
  @PropSync('displayAccountVerification', { default: false }) private _displayAccountVerification!: boolean;
  private emailRules: any = [(v: string) => !!v || 'Email is required'];
  get errorMessage() {
    return userModule.loginError;
  }
  get accountNotActivated(): boolean {
    return userModule.accountNotActivated;
  }

  private async login() {
    const isValid: boolean = (this.$refs.form as any).validate();
    if (isValid) {
      this.loading = true;
      userModule.login({ email: this.email, password: this.password }).finally(() => {
        this.loading = false;
      });
    }
  }

  private async facebookLogin(fbObject: any) {
    const facebookRequest = new FacebookAuthRequest();
    facebookRequest.accessToken = fbObject.authResponse.accessToken;
    userModule.facebookLogin(facebookRequest);
  }
}
</script>

<style scoped></style>
