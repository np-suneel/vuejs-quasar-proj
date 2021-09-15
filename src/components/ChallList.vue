<template>
  <div v-for="(value, key) in jsonResp" :key="key">
    <Chall
      :value="value"
      @upvote="upVote"
      @downvote="downVote"
      :empid="empid"
    />
  </div>
</template>

<script>
import Chall from "./Chall";

export default {
  name: "ChallList",
  props: {
    jsonResp: Array,
    empid: String
  },
  components: {
    Chall
  },
  emits: ["upvote", "downvote"],
  methods: {
    upVote(id) {
      this.$emit("upvote", id);
    },
    downVote(indid) {
      this.$emit("downvote", indid);
    }
  }
};
</script>
