import axios from 'axios'

export const state = () => ({
  list: [],
  fetched: false,
  newClient: '',
  post: {}
})

const apiPath = 'posts'

export const mutations = {
  SET(state, obj) {
    state.list = obj
    state.fetched = true
  },
  CREATE_POST(state, object) {
    state.list.push(object)
  },
  UPDATE_POST(state, client) {
    const index = state.list.findIndex(p => p.id === client.id)

    if (index !== -1) {
      // We need to replace the array entirely so that vue can recognize
      // the change and re-render entirely.
      // See http://vuejs.org/guide/list.html#Caveats
      state.list.splice(index, 1, client)
    }
  },
  clearClient(state) {
    state.newClient = ''
  },
  SHOW_POST(state, obj) {
    state.post = obj
  },
  DELETE_POST(state, id) {
    state.list = state.list.filter(p => p.id != id)
  }
}
// TODO 
// fetchList
// fetchSingle
export const actions = {
  async fetch({ commit, state }) {
    await this.app.$postRepository.index()
    .then((data) => {
      commit('SET', data)
    })
  },
  async show({ commit, state }, params) {
    if(s  == 0) {
      await this.app.$postRepository.show(params.id).then(( data ) => {
        commit('SHOW_POST', data)
      })
    } else {
      return state.list.find(post => {
        if(params.id == post.id) {
          commit('SHOW_POST', post)
        }
      })
    }
  },
  async save({ dispatch, state }, client) {
    console.log('action:saveClient', client)
    const index = state.list.findIndex(p => p.id === client.id)
    console.log('action:saveClient index', index)
    // update client if it exists or create it if it doesn't
    if (index !== -1 && client.id !== null) {
      dispatch('updateClient', client)
    } else {
      dispatch('addClient', client)
    }
  },
  async add({ commit }, newClient) {
    console.log('create client', newClient)

    await this.app.$postRepository.create(newClient)
      .then(({ data }) => {
        commit('CREATE_POST', data)
      })
  },
  // TODO update item base on index in list after succes update via $postRepository
  async update({ commit }, client) {
    console.log('update client', client)
    await axios
      .put(`/api/${apiPath}/${client.id}`, client, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(_ => {
        commit('UPDATE_POST', client)
      })
  },
  async remove({ commit }, client) {
    await this.app.$postRepository.delete(client.id).then((data) => {
      commit('DELETE_POST', client)
    })
    .then((response) => {
      console.log('ok updated')
    }, (response) => {
      console.log('Ups, something has gone wrong')
    });
  }
}

export const getters = {
  posts: state => state.list,
  postById: state => id => {
    return state.list.find(client => client.id == id)
  },
  isFetched: state => {
    return !!state.fetched
  },
  // totalClients: state => {
  //   return state.list.length
  // },
  // blueClients: state => {
  //   return state.list.filter(car => state.list.color === 'Blue')
  // }
}
