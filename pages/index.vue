<template>
  <section class="container">
    <div>
      <h1 class="title">
        Quick demo of basic CRUD <br>
        using nuxt & vuex with api
      </h1>
      <div class="links">
        <nuxt-link class="button--green" v-bind:to="{name: 'posts'}"> List posts </nuxt-link>
        <nuxt-link class="button--grey" v-bind:to="{name: 'posts-add'}"> Add post </nuxt-link>
      </div>
    </div>
  </section>
</template>

<style>
.links {
  padding-top: 15px;
}
</style>
