<template>
  <article>
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
    <div class="article-links">
      <nuxt-link
        :to="{ name: 'posts-id', params: { id: post.id } }"
        class="button--green"
      >
        View
      </nuxt-link>
      <a
        class="button--grey"
        @click="destroyPost({ id: post.id })"
      > Delete </a>
    </div>
  </article>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  props: {
    post: {
      type: Object,
      default: () => []
    }
  },
  computed: {
    ...mapState([
      'route' // vuex-router-sync
    ])
  },
  methods: {
    ...mapActions('posts', {
      destroyPost: 'destroy'
    })
  }
}
</script>
