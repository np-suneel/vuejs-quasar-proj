<template>
  <div class="col">
    <q-header bordered class="bg-grey-10">
      <q-toolbar-title class="tooltitle q-pt-sm">
        Hack Ideas
      </q-toolbar-title>
    
      <q-toolbar class="q-pl-lg">
        <DropdownBtn @dropemit="dropEmit" />
        <AddButton @add-chall="addChallen" />
        <q-space />
        <Title :empname="empname"></Title>

        <q-space />
        <LogOut @lgout="lgOut" />
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
import AddButton from "./AddButton";
import DropdownBtn from "./DropdownBtn";
import LogOut from "./LogOut";
import Title from "./Title";

export default {
  name: "Header",
  components: {
    AddButton,
    DropdownBtn,
    LogOut,
    Title
  },
  props: {
    empname: String
  },  
  methods: {
    dropEmit(type) {
      this.$emit("dropemit", type);
    },
    addChallen(cha) {
      this.$emit("addcha", cha);
    },
    lgOut(out) {
      this.$emit("lgout", out);
    }
  },
  emits: ["dropemit", "addcha", "lgout"]
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Urbanist&display=swap");

.tooltitle {  
    text-align: center;
  font-family: "Urbanist", sans-serif;
}
.emp {
  font-size: 18px;
}
.lg {
  right: 120%;
}
</style>
