<template>
    <article>
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
      <div class="article-links">
        <nuxt-link v-bind:to="{name: 'posts-id', params:{id: post.id}}" class="button--green"> View </nuxt-link>
        <a @click="destroyPost({id: post.id})" class="button--grey"> Delete </a>
      </div>
    </article>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  props: {
    post: {
      type: Object,
      default:() => []
    }
  },
  computed: {
    ...mapState([
      'route', // vuex-router-sync
    ]),
  },
  methods: {
    ...mapActions('posts', {
      destroyPost: 'destroy'
    })
  }
}
</script>
