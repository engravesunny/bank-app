import { defineStore } from "pinia";

export interface UserInfo {
  [index: string]: unknown;
}
export interface UserState {
  token: string;
  info: UserInfo;
}

const user = defineStore("user", {});

export default user;
