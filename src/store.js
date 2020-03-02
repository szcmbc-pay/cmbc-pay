// store.js
const store = new Vuex.Store({
    state: {
        isLoading: false
    },
    mutations: {
        showLoading(state){
            state.isLoading = true    
        },
        hideLoading (state) {
            state.isLoading = false
        }
    }
})
export default store;