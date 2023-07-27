import { useUserStore } from "~/stores/user";

export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: {
      userStore: useUserStore(),
    },
  };
});
