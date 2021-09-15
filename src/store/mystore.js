const state = {
    getchall : false
}

const mutations = {
    someMutation (state, boo) {
        state.getchall = boo 
    }    
}

const actions = {    
     async getChall() {     
        console.log('in vuex action store')
        await axios
            .get("http://localhost:3000/ideas")
            .then((response) => this.response = response.data)
            .catch((error) => {
              if (!error.response) {
                // network error
                this.errorStatus = "Error: Network Error";
              } else {
                this.errorStatus = error.response.data.message;
              }
            });
            
        commit('someMutation', true)
        return this.response    
  }      
}

const getters = {
    stat: (state) => {
        return state.getchall
}

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}