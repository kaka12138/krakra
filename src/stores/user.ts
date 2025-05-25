import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : {},
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserId(userId: string) {
      this.userId = userId
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
  },
});
