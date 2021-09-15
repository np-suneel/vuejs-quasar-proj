<template>
  <div class="q-pa-md absolute-center q-gutter-md">
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Hack Ideas</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit()" @reset="onReset()" class="q-gutter-md">
          <div class="text-subtitle2">Login</div>
          <q-input
            clearable
            v-model="name"
            filled
            lazy-rules="ondemand"
            label="Your employee ID*"
            :rules="[val => (val && val.length > 0) || 'Please enter ID']"
          />
          <div class="btn">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="sds text-h6">Login failed</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Please check your details and try again.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: null,
      errorStatus: null,
      alert: false,
      logsucc: false
    };
  },
  emits: ["succ", "empname", "empid"],
  methods: {
    async onSubmit() {
      await axios
        .get("http://localhost:3000/employees")
        .then(response => (this.dataf = response.data))
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });      
      for (let i = 0; i < this.dataf.length; i++) {
        if (this.dataf[i].id === this.name) {
          this.alert = false;

          this.$emit("succ", "succ");
          this.$emit("empname", this.dataf[i].name.toString());
           this.$emit("empid", this.dataf[i].id);
          return;
        }
      }     
      this.alert = true;
      this.name = "";
    },

    onReset() {
      this.name = "";
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Urbanist&display=swap");
.q-pa-md {
  width: 25%;
  max-width: "250px";
}
.text-subtitle2 {
  text-align: center;
}
.text-h6 {
  font-family: "Urbanist", sans-serif;
  text-align: center;
}
.sds {
  font-weight: bold;
}
.btn {
  text-align: center;
}
</style>
