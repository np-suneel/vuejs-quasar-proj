export function getChall() {     
    
      axios
          .get("http://localhost:3000/ideas")
          .then((response) => this.jsonResp = response.data)
          .catch((error) => {
            if (!error.response) {
              // network error
              this.errorStatus = "Error: Network Error";
            } else {
              this.errorStatus = error.response.data.message;
            }
          });
          console.log('in vuex action')
      commit('someMutation', true)    
}
