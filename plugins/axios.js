import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.baseURL = 'http://127.0.0.1:8080'
  // axios.defaults.baseURL = nuxtApp?.$config.public.baseUrl
 return {
  provide: {
    axios: axios
  }
 }
})