<template>
  <section class="container">
    <div class="row">
      <h1 class="title">
        Quick demo of basic CRUD <br>
        using nuxt & vuex with api
      </h1>
      <div class="links">
        <nuxt-link
          class="button--green"
          :to="{ name: 'posts' }"
        >
          List posts
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<style>
.links {
  padding-top: 15px;
}
</style>
