export const state = () => ({
  model: false
});

export const mutations = {
  changeSteta(state) {
    state.model = !state.model;
  }
};
