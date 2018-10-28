<template>
  <section class="container">
    <div>
      <nuxt-link class="button--grey back" v-bind:to="{name: 'index'}">Cancel</nuxt-link>
      <h1 class="title">
        Add article
      </h1>

      <div class="article-container">
        <form @submit.prevent="createNewPost()">
          <fieldset>
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                v-model="title"
                name="title"
                id="title"
                ref="title"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="content">Content</label>
              <textarea
                name="content"
                v-model="content"
                id="content"
                class="form-control"
                rows="10"
              ></textarea>
            </div>

            <input class="button--green" type="submit" value="Submit">
          </fieldset>
        </form>
      </div>
    </div>


  </section>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },

  computed: {
    ...mapState([
      'route', // vuex-router-sync
    ])
  },

  methods: {
    ...mapActions('posts', {
      createPost: 'create'
    }),
    async createNewPost () {
      let res = await this.createPost({
        data: {
          title: this.title,
          content: this.content
        }
      })
      if (res.data.id !== undefined) {
        this.$router.push({name: 'posts-id', params: {id: res.data.id}})
      }else{
        alert('Ups, something has gone wrong')
      }
    },
  }
}
</script>
