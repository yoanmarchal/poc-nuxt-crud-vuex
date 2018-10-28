<template>
  <section class="container">
    <div>
      <nuxt-link class="button--green back" v-bind:to="{name: 'index'}">Back to home </nuxt-link>
      <h1 class="title">
         Posts
      </h1>
      <div class="article-container">
        <article
          v-for="post in postList"
          v-bind:key="post.id"
        >
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <div class="article-links">
            <nuxt-link v-bind:to="{name: 'posts-id', params:{id: post.id}}" class="button--green"> View </nuxt-link>
            <a @click="destroyPost({id: post.id})" class="button--grey"> Delete </a>
          </div>
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
      postList: 'list'
    }),
    ...mapState([
      'route', // vuex-router-sync
    ]),
  },

  async fetch ({ store }) {
    await store.dispatch('posts/fetchList')
  },

  methods: {
    ...mapActions('posts', {
      fetchPosts: 'fetchList',
      destroyPost: 'destroy'
    }),
    fetchData() {
      return this.fetchPosts();
    }
  }
}
</script>
