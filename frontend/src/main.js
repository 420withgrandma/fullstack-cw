import { createApp } from "vue"; //function to create vue application
import App from "./App.vue"; //main app components
import router from "./router"; //importing the router configuration

//creates and mounts the vue application with routing
createApp(App).use(router).mount("#app");