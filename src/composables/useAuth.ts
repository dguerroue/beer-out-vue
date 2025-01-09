import { ref } from "vue";
import { useCore } from "./useCore"

export function useAuth() {
  const core = useCore();
  const isAuth = ref<boolean>(core.authUC.isAuth())

  const checkAuth = () => {
    isAuth.value = core.authUC.isAuth();
    return isAuth.value
  }

  return {
    isAuth,
    checkAuth
  }
}