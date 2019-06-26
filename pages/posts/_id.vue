<template>
  <section class="container">
    <div>
      <nuxt-link
        class="button--green back"
        :to="{ name: 'posts' }"
      >
        Back to list
      </nuxt-link>
      <h1 class="title">
        Article
      </h1>

      <div class="article-container">
        <article
          v-if="post"
          class="is-single"
        >
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <br>
          <nuxt-link
            class="button--green"
            :to="{
              name: 'posts-edit-id',
              params: { id: post.id }
            }"
          >
            Edit
          </nuxt-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  async asyncData({ app, params, payload }) {
    if (payload) return { post: payload }
    else return {
      post: await app.$postRepository.show(params.id)
    }
  }
}
</script>
