<template>
  <section class="container">
    <div>
      <nuxt-link
        class="button--grey back"
        :to="{ name: 'posts-id', params: { id: $route.params.id } }"
      >
        Cancel
      </nuxt-link>
      <h1 class="title">
        Edit article
      </h1>
      <form @submit.prevent="update()">
        <fieldset>
          <div class="form-group">
            <label for="title">Title</label>
            <input
              id="title"
              ref="title"
              v-model="currentPost.title"
              type="text"
              name="title"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="body">body</label>
            <textarea
              id="body"
              v-model="currentPost.body"
              name="body"
              class="form-control"
              rows="10"
            ></textarea>
          </div>

          <input
            class="button--green"
            type="submit"
            value="Submit"
          >
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      currentPost: {
        title: '',
        content: ''
      }
    }
  },

  async asyncData({ app, params }) {
    return {
      post: await app.$postRepository.show(params.id)
    }
  },

  async created() {
    this.currentPost = Object.assign(
      {},
      await this.$postRepository.show(this.$route.params.id)
    )
  },

  methods: {
    async update() {
      this.currentPost = {... this.post}
      await this.$postRepository.update(this.currentPost, this.post.id).then((response) => {
        console.log('ok updated')
      }, (response) => {
          alert('Ups, something has gone wrong')
      });
    }
  }
}
</script>
