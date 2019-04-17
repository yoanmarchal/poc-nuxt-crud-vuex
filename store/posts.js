import axios from 'axios'

export const state = () => ({
  list: [],
  fetched: false,
  newClient: ''
})

const apiPath = 'posts'

export const mutations = {
  SET(state, obj) {
    state.list = obj
    state.fetched = true
  },
  CREATE_CLIENT(state, object) {
    state.list.push(object)
  },
  UPDATE_CLIENT(state, client) {
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
  DELETE_CLIENT(state, id) {
    state.list = state.list.filter(p => p.id != id)
  }
}

export const actions = {
  async fetch({ commit }) {
    const { data } = await axios.get(`/api/${apiPath}`)
    commit('SET', data)
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
    await axios
      .post(`/api/${apiPath}`, newClient, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(({ data }) => {
        commit('CREATE_CLIENT', data)
      })
  },
  async update({ commit }, client) {
    console.log('update client', client)
    await axios
      .put(`/api/${apiPath}/${client.id}`, client, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(_ => {
        commit('UPDATE_CLIENT', client)
      })
  },
  async remove({ commit }, id) {
    await axios
      .delete(`/api/${apiPath}/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(_ => commit('DELETE_CLIENT', id))
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
  totalClients: state => {
    return state.list.length
  },
  blueClients: state => {
    return state.list.filter(car => state.list.color === 'Blue')
  }
}
