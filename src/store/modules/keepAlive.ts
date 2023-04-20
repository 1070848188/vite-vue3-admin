import { defineStore } from 'pinia';
import type { keepAliveState } from '../interface';

const keepAliveStore = defineStore('keepAliveState', {
  state: (): keepAliveState => {
    return {
      keepAliveName: []
    };
  },
  actions: {
    addKeepAliveItem(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
    },
    removeKeepAliveItem(name: string) {
      this.keepAliveName = this.keepAliveName.filter((nameItem) => nameItem !== name);
    }
  }
});

export default keepAliveStore;
