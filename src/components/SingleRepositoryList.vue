
 <template>
  <div >
    <h2>{{ repo.name }}</h2>
    <ul>
      <li>Language: {{ repo.language }}</li>
      <li>
        URL: <a :href="repo.html_url">{{ repo.html_url }}</a>
        
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "SingleRepositoryList",
  props: {
    repoId: {
      type: String,
      default: "repo",
    },
  },
  setup(props) {
    const repo = ref({});
    const getRepo = async () => {
      try {
        const data = await fetch(`https://api.github.com/repos/seundev/${props.repoId}`).then(response => response.json());
        if (data.message === "Not Found") {
          throw new Error("Repository not found");
        }
        repo.value = data;
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => {
      getRepo();
    });
    return { repo };
  },
};
</script> 


