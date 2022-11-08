import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { BootstrapVue3 } from 'bootstrap-vue-3';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { SchemaStore } from "./stores/schemaStore"; 

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(BootstrapVue3);

app.mount("#app");
