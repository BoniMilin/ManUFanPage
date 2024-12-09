import { createApp } from "vue"; // import for Vue 3
import App from "./App.vue"; // this is the root component of the project
import router from "./router"; // attach the router to the app

createApp(App).use(router).mount("#app");