<template>
  <section class="container">
    <div>
      <nuxt-link
        class="button--green back"
        :to="{ name: 'index' }"
      >
        Back to home
      </nuxt-link>
      <h1 class="title">
        Posts
      </h1>
      <div class="article-container">
        <blog-post
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
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
    ...mapGetters({
      posts: 'posts/posts'
    })
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetch')
  },
}
</script>
