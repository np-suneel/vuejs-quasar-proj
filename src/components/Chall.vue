<template>
  <div class="column q-pa-md q-gutter-md" style="width: 700px; max-width: 100%">
    <q-card>
      <q-card-section class="bg-blue-10 text-white">
        <div class="s text-h3 text-overline">
          Created on: {{ value.redate }}
        </div>
        <div class="text-h5">{{ value.type }}: {{ value.title }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h3 text-caption">Description:</div>
        <div class="q-pb-lg">
          {{ value.descrip }}
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions align="left">
        <q-btn
          flat
          round
          color="red"
          icon="thumb_up"
          v-if="upBtn === true"
          @click="downVote"
        />
        <q-btn
          flat
          round
          color="red"
          icon="thumb_up_off_alt"
          v-if="upBtn === false"
          @click="upVote"
        />

        <div v-if="value.votes.length > 1 || value.votes.length === 0">{{ this.value.votes.length }} votes</div>
        <div v-if="value.votes.length === 1">{{ this.value.votes.length }} vote</div>
      </q-card-actions>
      <q-separator inset />
      <div>
        <q-card-section>{{ this.value.tags }}</q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Chall",
  props: {
    value: Object,
    empid: String
  },
  computed: {
    upBtn() {
      for (let i = 0; i < this.value.votes.length; i++) {
        if (this.value.votes[i] === this.empid) {
          return true;
        }
      }
      return false;
    }
  },
  data() {
    return {
      alreadyvoted: null,
      notyetvoted: null,
      emitarray: []
    };
  },
  emits: ["upvote", "downvote"],

  methods: {
    upVote() {
      this.$emit("upvote", this.value.id);
    },
    downVote() {
      for (let i = 0; i < this.value.votes.length; i++)
        if (this.value.votes[i] === this.empid) {
          this.emitarray.push(i);
          break;
        }
      this.emitarray.push(this.value.id);
      this.$emit("downvote", this.emitarray);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Urbanist&display=swap");

.s {
  font-size: 12px;
  float: right;
}
.text-h5 {
  font-family: "Urbanist", sans-serif;
}
</style>
