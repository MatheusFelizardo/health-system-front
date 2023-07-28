import { defineStore } from 'pinia'
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: () => (
    {
      users: {},
      providers: [],
      schedule: [],
      foundUser: {}
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

    async getByEmail(email) {
      try {
        const response = await $axios.post(`/users/email`, {email} )
        const user = response.data
  
        this.foundUser = user;
        return user;
      } catch (e) {
        this.foundUser = ''
        return e.response.data
      }
     
    },

    async create(user) {
      try {
        const response = await $axios.post('/users/create', user)
        const userCreated = response.data
        this.foundUser = userCreated;

        return userCreated;
      } catch (e) {
        this.foundUser = ''
        return e.response.data
      }
    },

    async update(user) {
      try {
        const response = await $axios.put(`/users/update/${user.id}`, user)
        const updatedUser = response.data

        this.foundUser = updatedUser;
        return updatedUser;
      } catch (e) {
        this.foundUser = ''
        return e.response.data
      }
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

    async savedSchedule(providerId, userId) {

      const response = await $axios.put(`/appointments/schedule/${providerId}`, {"patientId": userId})
      const scheduleResponse = response.data

      const updatedSchedule = this.schedule.map(schedule => {
        if (scheduleResponse.id === schedule.id) {
          schedule.reservation = true
        }
        return schedule
      })
      this.schedule = updatedSchedule;
      return scheduleResponse;
    },
   
    restartUserStates() {
      this.users = {}
      this.providers = []
      this.schedule = []
      this.foundUser = {}
    }
  },
})