import { makeAutoObservable } from "mobx";
import singletonGetter from "./singletonGetter";

export default class CurrentUserState {
  static get = singletonGetter(CurrentUserState);
  loggedInState = false;
  userId;

  constructor() {
    makeAutoObservable(this);
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) this.setLoggedIn(session.isSignedIn, session.userId);
  }

  setLoggedIn = (loggedIn, uId) => {
    this.loggedInState = loggedIn;
    this.userId = uId;
    localStorage.setItem(
      "session",
      JSON.stringify({ isSignedIn: loggedIn, userId: uId })
    );
  };
}
