import { defineStore } from 'pinia'
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: () => (
    {
      users: {},
      providers: [],
      schedule: []
    }
  ),
  getters: {
    getUser: (state) => state.user
  },
  actions: {
    async start () {
      await this.getServiceProviders()
      await this.getSchedule()
    },
    async getAll() {
        
    },
    async getById(id) {

    },
    async getServiceProviders() {
      if (this.providers.length > 0) {
        return this.providers;
      }

      const response = await $axios.get('/users/providers')
      const providers = response.data

      this.providers = providers;
      return providers;
    },
    async getSchedule() {
      if (this.schedule.length > 0) {
        return this.schedule;
      }

      const response = await $axios.get('/appointments')
      const schedule = response.data

      this.schedule = schedule;
      return schedule;
    },
   
    restartUserStates() {
    
    }
  },
})