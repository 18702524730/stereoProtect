
export default {
  state: {
    percent: 0, //金服条百分比,
    isComplete: false,
    fills:'',
    pics:'',
    location:'',
    img:'',
    //重新上传的图片
    anotherImg:'',
  },
  mutations: {
    SET_PERCENT (state, num) {
      state.percent = num
    },
    SET_COMPLETE (state, isComplete) {
      state.isComplete = isComplete
    },
    SET_FILLS (state, data) {
      state.fills = data
    },
    SET_PICS (state, data) {
      state.pics = data
    },
    SET_LOCATION (state, data) {
      state.location = data
    },
    CLEAR_FILL (state, data) {
      state.pics = '';
      state.fills = '';
      state.location=''
    },
    CHANGE_IMG(state, payload) {
      state.img = payload.img;
    },
    CHANGE_ANOTHER(state, payload) {
      state.anotherImg = payload.anotherImg;
    },
  },
  actions: {
  	set_cur_route: ({commit}, paths) => {
      commit('SET_CUR_ROUTE', paths);
    },
    set_fills: ({commit}, data) => {
      commit('SET_FILLS', data);
    },
    set_pics: ({commit}, data) => {
      commit('SET_PICS', data);
    },
    set_location: ({commit}, data) => {
      commit('SET_LOCATION', data);
    },
    clear_fill: ({commit}, data) => {
      commit('CLEAR_FILL', '');
    },
    change_img: ({commit}, data) => {
      commit('CHANGE_IMG', data);
    },
    CHANGE_ANOTHER: ({commit}, data) => {
      commit('CLEAR_FILL', data);
    },
  }
};
