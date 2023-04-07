<template>
  <div class="body">
    <div v-if="isLoading">
      <div class="fa-3x icon-container">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>
    <img  :src="githubImage" alt="github avatar" class="image my-link" />
    <h3><a class="my-link" href="https://github.com/Seundev">seundev</a></h3>
    <h1>{{ githubRepo }}</h1>
    <div class="group">
      <ul>
        
          <li v-for="repo in slicedRepos" :key="repo.id" class="mini-group">
          <router-link :to="'/repo/' + repo.name" class="my-link">{{ repo.name }}</router-link>
          <div>Language: {{ repo.language }}</div>
          <div>
            URL:<a class="my-link" :href="repo.html_url">{{ repo.html_url }}</a>
          </div>
          <div>Date created: {{ repo.created_at }}</div>
          <div>Size: {{ repo.size }}</div>
          <div>Open issues: {{ repo.open_issues }}</div>
          <div>Default branch: {{ repo.default_branch }}</div>
        </li>
    
      </ul>
    </div>
    <div v-if="page > 1" @click="previousPage">
      <i class="fa-solid fa-backward fa-beat-fade fa-2x"></i>
    </div>
    <div v-if="page < lastPage" @click="nextPage">
      <i class="fas fa-forward fa-beat fa-2x" style="color: #1b3869"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref, computed } from "vue";

export default {
  name: "GithubRepository",

  // <SingleRepository :repo="repo" />

  setup() {
    const githubRepo = ref("My Github Repositories");
    const githubImage = ref("");
    const repositories = ref([]);
    const isLoading = ref(true);
    const perPage = ref(3);
    const page = ref(1);

    const lastPage = computed(() => {
      return Math.ceil(repositories.value.length / perPage.value);
    });

    const slicedRepos = computed(() => {
      const start = (page.value - 1) * perPage.value;
      const end = start + perPage.value;
      return repositories.value.slice(start, end);
    });

    const previousPage = () => {
      page.value--;
    };

    const nextPage = () => {
      page.value++;
    };

    onMounted(async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/seundev/repos`
        );
        repositories.value = response.data;
        console.log(repositories.value);
      } catch (error) {
        console.log(error);
        alert("Error");
      } finally {
        isLoading.value = false;
      }
      const imageResponse = await axios.get(
        `https://api.github.com/users/seundev`
      );
      githubImage.value = imageResponse.data.avatar_url;
    });

    return {
      repositories,
      isLoading,
      perPage,
      page,
      githubRepo,
      lastPage,
      slicedRepos,
      previousPage,
      nextPage,
      githubImage,
    };
  },
};
</script>

<style scoped>
.group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.icon-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #076e9a;
}

.my-link {
  font-weight: bold;
}

.image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
}
ul {
  list-style-type: none;
}
* {
  text-decoration: none;
}

.mini-group {
  margin: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 25px;

  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
  position: relative;
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow: -11px -11px 0px #957070, 11px 11px 0px #8d6464;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #5a88d7;
}
.body {
  margin: 0 auto;
  width: 50%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
  position: relative;
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow: -11px -11px 0px #c5c5c5, 11px 11px 0px #fbfbfb;
}
@import "@fortawesome/fontawesome-free/css/all.css";
</style>
