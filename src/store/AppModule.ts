import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from './index';

export interface IAppState {
  darkMode: string;
}

@Module({ dynamic: true, store, name: 'appModule' })
class AppModule extends VuexModule {
  public darkMode: string = localStorage.getItem('darkMode') || 'false';

  @Action
  public async changeDarkMode(darkMode: boolean) {
    this.setDarkMode(darkMode);
  }

  @Mutation
  private setDarkMode(darkMode: boolean) {
    this.darkMode = darkMode ? 'true' : 'false';
    localStorage.setItem('darkMode', this.darkMode);
  }
}

export const appModule = getModule(AppModule);
