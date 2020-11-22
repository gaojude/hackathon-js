import { makeAutoObservable } from "mobx";
import singletonGetter from "./singletonGetter";

export default class CurrentUserState {
  static get = singletonGetter(CurrentUserState);
  loggedInState = false;
  userID;

  constructor() {
    makeAutoObservable(this);
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) this.setLoggedIn(session.isSignedIn, session.userID);
  }

  setLoggedIn = (loggedIn, uId) => {
    this.loggedInState = loggedIn;
    this.userID = uId;
    localStorage.setItem(
      "session",
      JSON.stringify({ isSignedIn: loggedIn, userID: uId })
    );
  };
}
