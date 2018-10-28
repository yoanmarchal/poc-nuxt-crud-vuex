<template>
  <section class="container">
    <div>
      <nuxt-link class="button--grey back" v-bind:to="{name: 'posts-id', params: {id: $route.params.id}}">Cancel</nuxt-link>
      <h1 class="title">
        Edit article
      </h1>

      <div class="article-container">
        <form @submit.prevent="update()">
          <fieldset>
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                v-model="currentPost.title"
                name="title"
                id="title"
                ref="title"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="body">body</label>
              <textarea
                name="body"
                v-model="currentPost.body"
                id="body"
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
      currentPost: {
        title: '',
        content: ''
      }
    }
  },

  computed: {
    ...mapGetters('posts', {
      postById: 'byId'
    }),
    ...mapState([
      'route', // vuex-router-sync
    ])
  },

  watch: {
    $route: 'fetchData',
  },

  async fetch ({ store, params }) {
    await store.dispatch('posts/fetchSingle',{
      id: params.id
    })
  },

  async created () {
    this.currentPost = Object.assign({}, await this.postById(this.$route.params.id))
  },

  methods: {
    ...mapActions('posts', {
      updatePost: 'update',
      fetchPost: 'fetchSingle'
    }),
    fetchData() {
      return this.fetchPost({
        id: this.route.params.id
      });
    },
    async update () {
      let res = await this.updatePost({
        id: this.currentPost.id,
        data: this.currentPost
      })
      if (res.data.id !== undefined) {
        this.$router.push({name: 'posts-id', params: {id: res.data.id}})
      }else{
        alert('Ups, something has gone wrong')
      }
    }
  }
}
</script>
