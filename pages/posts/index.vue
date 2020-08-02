<template>
  <section class="container">
    <div>
      <h1 class="title">
        Posts
      </h1>
      <div class="links">
        <nuxt-link
          class="button--green back"
          :to="{ name: 'index' }"
        >
          Back to home
        </nuxt-link>
        <nuxt-link
          class="button--grey"
          :to="{ name: 'posts-add' }"
        >
          Add post
        </nuxt-link>
      </div>

      <div class="article-container mt-5">
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
  // async asyncData(ctx) {
  //   return {
  //     posts: await ctx.app.$postRepository.index()
  //   }
  // },
  async fetch({store}) {
    await store.dispatch('posts/fetch')
  },
  computed: {
    ...mapState({
      posts: state => {
        return state.posts.list
      }
    })
  },

}
</script>
<style >
  .mt-5 {
    margin-top: 15px;
  }
</style>