import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    responde: '',
    request: '',
    content: '',
    extendTimes: ''
  },

  actions: {
    Book (obj, responde) {
      obj.commit('Book', responde)
    },
    selfBook (ctx, request) {
      ctx.commit('selfBook', request)
    },
    clickRoom (arr, content) {
      arr.commit('clickRoom', content)
    },
    extendTimes (arr, extendTimes) {
      arr.commit('extendTimes', extendTimes)
    }
  },

  mutations: {
    Book (state, responde) {
      state.responde = responde
    },
    selfBook (state, request) {
      state.request = request
    },
    clickRoom (state, content) {
      state.content = content
    },
    extendTimes (state, extendTimes) {
      state.extendTimes = extendTimes
    }
  },
  modules: {
    //
  }
})

export default store
