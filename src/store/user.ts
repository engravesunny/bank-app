import { defineStore } from "pinia";

export interface UserInfo {
  [index: string]: unknown;
}
export interface UserState {
  token: string;
  info: UserInfo;
}

export const user = defineStore("user", {
  state: (): { userInfo: UserState } => {
    return {
      userInfo: {
        token: localStorage.getItem("TOKEN") as string || '',
        info: {}
      }
    }
  },
  actions: {
    setUserInfo(info: any) {
      this.userInfo.info = { ...info }
    },
    setToken(token: string) {
      this.userInfo.token = token
      localStorage.setItem("TOKEN", token)
    }
  },
  getters: {
    token(): string {
      return this.userInfo.token
    },
    info(): any {
      return this.userInfo.info
    }
  }
});

