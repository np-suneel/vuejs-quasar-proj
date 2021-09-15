<template>
  <div>
    <q-btn 
    class="emp absolute-center q-pt-xs bg-grey-10 text-white"
    unclickable
    no-caps   
    disable
    >      
    Welcome, {{ this.empname }}
    </q-btn>
  </div>
</template>

<style lang="scss" scoped>
.emp {
  font-size: 17px;
  left: 49.6%
}
</style>

<script>
export default {
  name: "Title",
  props: {
    empname: String
  }
};
</script>
