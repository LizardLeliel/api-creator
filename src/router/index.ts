import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ObjectsMainView from "../views/ObjectsMainView.vue";
import ActionsMainView from "../views/ActionsMainView.vue";
import SchemasMainView from "../views/SchemasMainView.vue";
import FileNotFoundView from "../views/FileNotFoundView.vue";
import AboutView from "../views/AboutView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/schemas",
      name: "schemas",
      component: ObjectsMainView,
    },
    {
      path: "/actions",
      name: "actions",
      component: ActionsMainView,
    },
    {
      path: "/objects",
      name: "objects",
      component: SchemasMainView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/notfound(.*)*",
      name: "notFound",
      component: FileNotFoundView,
    }
  ],
});

export default router;
