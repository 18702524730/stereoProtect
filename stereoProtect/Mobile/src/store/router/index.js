
export default {
  state: {
  	//左侧当前路由，匹配高亮所用
    leftCurRouter: '/home/general'
  },
  mutations: {
  	SET_CUR_ROUTE (state, paths) {
	    state.leftCurRouter = paths.fullPath;
    }
  },
  actions: {
  	set_cur_route: ({commit}, paths) => {
      commit('SET_CUR_ROUTE', paths);
    }
  }
};