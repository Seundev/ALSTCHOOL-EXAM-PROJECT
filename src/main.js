import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import GithubRepositoryVue from "./components/GithubRepository.vue";
import NotFoundVue from "./components/NotFound.vue";
import SingleRepositoryListVue from "./components/SingleRepositoryList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "GithubRepository",
      component: GithubRepositoryVue,
    },
    {
      path: "/repo/:name",
      name: "SingleRepositoryList",
      component: SingleRepositoryListVue,
      
    },
    {
      path: "/:notFound(.*)",
      name: "NotFound",
      component: NotFoundVue,
    },
  ],
});
createApp(App).use(router).mount("#app");


