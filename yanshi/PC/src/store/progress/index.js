
export default {
  state: {
    percent: 0, //金服条百分比,
    isComplete: false,
  },
  mutations: {
    SET_PERCENT (state, num) {
      state.percent = num
    },
    SET_COMPLETE (state, isComplete) {
      state.isComplete = isComplete
    }
  },
  actions: {
  	set_cur_route: ({commit}, paths) => {
      commit('SET_CUR_ROUTE', paths);
    }
  }
};
