import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ObjectsMainView from "@/views/ObjectsMainView.vue";
import ActionsMainView from "@/views/ActionsMainView.vue";
import SchemasMainView from "@/views/SchemasMainView.vue";
import FileNotFoundView from "@/views/FileNotFoundView.vue";
import SchemaEditView from '@/views/SchemaEditView.vue';


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
      component: SchemasMainView,
    },
    {
      path: "/schemas/:schemaName(\\w+)",
      name: "schema-edit",
      component: SchemaEditView,
      props: true
    },
    {
      path: "/actions",
      name: "actions",
      component: ActionsMainView,
    },
    {
      path: "/objects",
      name: "objects",
      component: ObjectsMainView,
    },
    {
      path: "/:notfound(.*)*",
      name: "notFound",
      component: FileNotFoundView,
    }
  ],
});

export default router;
