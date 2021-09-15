<template>
  <div>
    <q-layout class="shadow-2 rounded-borders">
      <Header
        @addcha="addChall"
        @dropemit="sortArr"
        @lgout="lgOut"
        :empname="empname"
      />
      <q-page-container class="row" v-if="this.len !== 0">
        <ChallList
          :jsonResp="formData"
          @upvote="upVote"
          @downvote="downVote"
          :empid="empid"
          ref="foo"
        />
      </q-page-container>
      <q-page-container v-if="this.len === 0">
        <div class="q-pa-md absolute-center q-gutter-md">
          <q-card>
            <q-card-section class="bg-grey-10 text-white">
              <div class="text-h6">No challenges/ideas found.</div>
            </q-card-section>
          </q-card>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Header from "../components/Header";
import ChallList from "../components/ChallList";
import axios from "axios";

export default {
  name: "NewMain",
  components: {
    Header,
    ChallList
  },
  props: {
    empname: String,
    empid: String
  },
  emits: ["lgout"],
  data() {
    return {
      formData: null,
      sortedData: null,
      datae: null,
      dataf: null,
      len: null,
      dat: null,
      sort: null
    };
  },
  async created() {
    this.formData = await this.getChall();
    this.len = this.formData.length;
  },
  methods: {
    async upVote(id) {
      await axios
        .get(`http://localhost:3000/ideas/${id}`)
        .then(response => {
          this.dat = response.data;
        })
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });

      const voteT = { ...this.dat, votes: [...this.dat.votes, this.empid] };
      await axios
        .put(`http://localhost:3000/ideas/${id}`, voteT)
        .then(response => {
          this.dat = response.data;
        })
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });
      this.formData = this.formData.map(task =>
        task.id === id ? { ...task, votes: this.dat.votes } : task
      );
    },

    async downVote(id) {
      await axios
        .get(`http://localhost:3000/ideas/${id[1]}`)
        .then(response => {
          this.dat = response.data;
        })
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });

      this.dat.votes.splice(id[0], 1);
      const voteT = { ...this.dat, votes: this.dat.votes };
      await axios
        .put(`http://localhost:3000/ideas/${id[1]}`, voteT)
        .then(response => {
          this.dat = response.data;
        })
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });
      this.formData = this.formData.map(task =>
        task.id === id[1] ? { ...task, votes: this.dat.votes } : task
      );
    },

    lgOut(out) {
      this.$emit("lgout", out);
    },

    async addChall(task) {
      await axios
        .post("http://localhost:3000/ideas", task)
        .then(response => (this.datae = response.data))
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });
      this.formData = [this.datae, ...this.formData];
      this.len = this.formData.length;
    },

    async getChall() {
      //var dataf = null
      await axios
        .get("http://localhost:3000/ideas")
        .then(response => (this.dataf = response.data))
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });

      return this.dataf;
    },
    sortArr(type) {
      if (type === "new") {
        this.formData.sort((t1, t2) => (t1.redate > t2.redate ? -1 : 1));
      } else if (type === "old") {
        this.formData.sort((t1, t2) => (t1.redate < t2.redate ? -1 : 1));
      } else if (type === "most") {
        this.formData.sort((t1, t2) =>
          t1.votes.length > t2.votes.length ? -1 : 1
        );
      } else if (type === "least") {
        this.formData.sort((t1, t2) =>
          t1.votes.length < t2.votes.length ? -1 : 1
        );
      }
    }
  }
};
</script>
