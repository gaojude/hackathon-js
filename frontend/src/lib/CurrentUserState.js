import { makeAutoObservable } from "mobx";
import singletonGetter from "./singletonGetter";

export default class CurrentUserState {
  static get = singletonGetter(CurrentUserState);
  loggedInState = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoggedIn = (loggedIn) => (this.loggedInState = loggedIn);
}
