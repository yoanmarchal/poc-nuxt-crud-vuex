<template>
  <section class="container">
    <div>
      <h1 class="title">
        Add article
      </h1>
      <nuxt-link
        class="button--grey back"
        :to="{ name: 'index' }"
      >
        Cancel
      </nuxt-link>

      <div class="article-container mt-5">
        <form @submit.prevent="createNewPost()">
          <fieldset>
            <div class="form-group">
              <label for="title">Title</label>
              <input
                id="title"
                ref="title"
                v-model="post.title"
                type="text"
                name="title"
                class="form-control"
              >
            </div>

            <div class="form-group">
              <label for="content">Content</label>
              <textarea
                id="content"
                v-model="post.content"
                name="content"
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
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      post: {
        title: '',
        content: '',
      }
    }
  },

  methods: {
    // TODO use state
    async createNewPost() {
      return await this.$postRepository.create({
        title: this.post.title,
        body: this.post.content
      }).then(
        response => {
          this.post = {};
          this.$router.push({ name: 'posts'})
        },
        response => {
          console.log('not created')
        }
      )
    }
  }
}
</script>
