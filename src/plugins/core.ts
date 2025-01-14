import { Core } from "@/core"
import type { App } from "vue"

export default {
  install: (app: App) => {

    const coreInstance = new Core({
      baseUrl: import.meta.env.VITE_API_BASE_URL
    })

    // inject a globally available $coreInstance class
    // used by the useCore composable
    app.provide('coreInstance', coreInstance);
  }
}