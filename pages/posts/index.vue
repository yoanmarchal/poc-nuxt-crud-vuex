<template>
  <section class="container">
    <div>
      <nuxt-link class="button--green back" v-bind:to="{name: 'index'}">Back to home </nuxt-link>
      <h1 class="title">
         Posts
      </h1>
      <div class="article-container">
        <blog-post
          v-for="post in postList"
          v-bind:key="post.id"
          v-bind:post="post"
        >
        </blog-post>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import BlogPost from '~/components/Article.vue'

export default {
  components: {
    BlogPost
  },
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
      fetchPosts: 'fetchList'
    }),
    fetchData() {
      return this.fetchPosts();
    }
  }
}
</script>
