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
          <v-card-text class="pt-5 pb-5" v-if="!registerSuccess">
            <v-form @keypress.enter="register" ref="form" v-model="formIsValid" lazy-validation>
              <v-text-field
                label="Username"
                ref="loginElement"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="usernameRules"
                :readonly="loading"
                validate-on-blur
                color="blue"
                autofocus
              ></v-text-field>
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
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                v-model="password"
                :rules="passwordRules"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                validate-on-blur
                color="blue"
                :readonly="loading"
                hint="Min. 8 characters with at least one capital letter, a number and a special character."
                persistent-hint
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="!registerSuccess">
            <v-btn rounded color="primary" :loading="loading" @click="register" block>Register</v-btn>
          </v-card-actions>
          <v-alert v-if="registerSuccess" dense text type="success">
            <b>Registration success</b>, a confirmation mail have been sended <b>check your mail adress</b> to validate
            your account.
          </v-alert>
          <v-card-actions class="pt-5">
            <v-btn text block small :disabled="loading" to="/authentication"><b>Login</b></v-btn>
          </v-card-actions>
          <v-card-text v-if="errorMessage">
            <v-alert type="warning">{{ errorMessage }}</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userModule } from '@/store/UserModule';
import { RegistrationRequest } from '@/models/User/RegistrationRequest';

@Component
export default class Register extends Vue {
  private username = '';
  private usernameRules: any = [
    (v: string) => !!v || 'Username is required',
    (v: string) => v.length >= 3 || 'Three chars min'
  ];

  private email = '';
  private emailRules: any = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
  ];

  private showPassword = false;
  private password = '';
  private passwordRules: any = [(v: string) => !!v || 'Required Field', (v: string) => this.passwordValidation(v)];
  public loading = false;
  private formIsValid = '';
  private successMessage = '';

  get errorMessage() {
    return userModule.registerError;
  }

  get registerSuccess() {
    return userModule.registerSuccess;
  }

  private passwordValidation(password: string): boolean | string {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
    return (
      pattern.test(password) || 'Min. 8 characters with at least one capital letter, a number and a special character.'
    );
  }

  public async register() {
    this.loading = true;
    const userRegister = new RegistrationRequest({
      username: this.username,
      email: this.email,
      password: this.password
    });
    await userModule.register(userRegister);
    this.loading = false;
  }
}
</script>

<style scoped></style>
