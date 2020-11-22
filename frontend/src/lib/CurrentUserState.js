import { makeAutoObservable } from "mobx";
import singletonGetter from "./singletonGetter";

export default class CurrentUserState {
  static get = singletonGetter(CurrentUserState);
  loggedInState = false;

  constructor() {
    const session = localStorage.getItem("session");
    this.loggedInState = session;
    makeAutoObservable(this);
  }

  setLoggedIn = (loggedIn) => {
    this.loggedInState = loggedIn;
    localStorage.setItem("session", loggedIn);
  };
}
