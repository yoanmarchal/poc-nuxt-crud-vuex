<template>
  <section class="container">
    <div>
      <h1 class="title">
        NUXT demo for vuex-CRUD
      </h1>
      <h2 class="subtitle">
        Article
      </h2>

      <div class="article-container">
        <article v-if="currentPost">
          <h3>{{ currentPost.title }}</h3>
          <p>{{ currentPost.content }}</p>
          <br>
          <nuxt-link class="button--green" v-bind:to="{name: 'posts-edit-id', params:{id: currentPost.id}}">Edit</nuxt-link>
        </article>
      </div>
    </div>

    <nuxt-link class="button--green back" v-bind:to="{name: 'posts'}">Back to list</nuxt-link>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('posts', {
      postById: 'byId'
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
    currentPost () {
      return this.postById(this.$route.params.id)
    }
  },

  watch: {
    $route: 'fetchData',
  },



  async fetch ({ store, params }) {
    await store.dispatch('posts/fetchSingle',{
      id: params.id
    })
  },

  methods: {
    ...mapActions('posts', {
      fetchPost: 'fetchSingle'
    }),
    fetchData() {
      return this.fetchPost({
        id: this.route.params.id
      });
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  margin-bottom: 45px;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

article {
  width: 80vw;
  max-width: 600px;
  margin: 0 auto;
}
  article h1 {
    margin-bottom: 10px;
  }
  .article-links {
    margin-top: 15px;
  }
    .article-links a {
      cursor: pointer;
    }

.back {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
