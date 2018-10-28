<template>
  <section class="container">
    <div>
      <nuxt-link class="button--green back" v-bind:to="{name: 'posts'}">Back to list</nuxt-link>
      <h1 class="title">
        Article
      </h1>

      <div class="article-container">
        <article v-if="currentPost" class="is-single">
          <h3>{{ currentPost.title }}</h3>
          <p>{{ currentPost.body }}</p>
          <br>
          <nuxt-link class="button--green" v-bind:to="{name: 'posts-edit-id', params:{id: currentPost.id}}">Edit</nuxt-link>
        </article>
      </div>
    </div>
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
