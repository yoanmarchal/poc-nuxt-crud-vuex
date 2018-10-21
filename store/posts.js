import createCRUDModule from 'vuex-crud'

const crudModule = createCRUDModule({
  resource: 'posts',
  urlRoot: 'https://jsonplaceholder.typicode.com/posts'
})

const state = () => crudModule.state

const { actions, mutations, getters } = crudModule

export {
  state,
  actions,
  mutations,
  getters
}
