<template>
  <section class="container">
    <div>
      <h1 class="title">
        NUXT demo for vuex-CRUD
      </h1>
      <h2 class="subtitle">
        Edit article
      </h2>

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
              <label for="content">Content</label>
              <textarea
                name="content"
                v-model="currentPost.content"
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

    <nuxt-link class="button--grey back" v-bind:to="{name: 'posts-id', params: {id: $route.params.id}}">Cancel</nuxt-link>
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

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  margin-bottom: 45px;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

article {
  width: 80vw;
  max-width: 600px;
  margin: 0 auto;
}
  article h1 {
    margin-bottom: 10px;
  }
  .article-links {
    margin-top: 15px;
  }
    .article-links a {
      cursor: pointer;
    }

.back {
  position: absolute;
  top: 10px;
  left: 10px;
}

fieldset {
  padding: 40px 25px 20px;
  border:1px solid grey;
  border-radius: 3px;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}
.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
}
textarea.form-control {
  height: auto;
}
</style>
