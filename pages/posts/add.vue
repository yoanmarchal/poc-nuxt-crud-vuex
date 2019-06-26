<template>
  <section class="container">
    <div>
      <nuxt-link
        class="button--grey back"
        :to="{ name: 'index' }"
      >
        Cancel
      </nuxt-link>
      <h1 class="title">
        Add article
      </h1>

      <div class="article-container">
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

const post = {
  title: '',
  content: '',
}

const initialData= () => {
  return {
    post: {
      title: '',
      ref: '',
    }
  }
}

export default {
  data() {
    return {
      post
    }
  },

  methods: {
    resetPostForm() {
      this.post = initialData().post;
    },
    async createNewPost() {
      return await this.$postRepository.create({
        data: {
          title: this.post.title,
          content: this.post.content
        }
      }).then(
        response => {
          console.log('created')
          this.resetPostForm();
        },
        response => {
          console.log('not created')
        }
      )
    }
  }
}
</script>
