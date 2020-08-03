// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
// https://blog.lichter.io/posts/organize-and-decouple-your-api-calls-in-nuxtjs/

/*

A POST, PUT or PATCH request should include a Content-Type: application/json header to use the JSON in the request body. Otherwise it will return a 2XX status code, but without changes being made to the data.

*/

export default $axios => resource => ({
  index() {
    return $axios.$get(`${resource}?_sort=id&_order=desc`)
  },

  show(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.$put(`${resource}/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  delete(id) {
    console.log(id);
    return $axios.$delete(`${resource}/${id}`)
  }
})