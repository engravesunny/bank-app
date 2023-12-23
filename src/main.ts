import { createApp } from "vue";
import "./style/index.css";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import 'virtual:svg-icons-register'
import globalComponent from '@/components/index.ts'

createApp(App).use(globalComponent).use(pinia).use(router).mount("#app");
