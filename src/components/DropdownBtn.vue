<template>
<q-btn-dropdown
            no-caps
            unelevated
            class="srtbt bg-grey-10"
            padding="xs"
            size="15px"
            color="primary"
            label="Sort by"
          >
            <q-list dark bordered separator class="bg-grey-10 text-white">
              <q-item clickable v-close-popup @click="dropBtn('new')">
                <q-item-section>
                  <q-item-label>Newest first</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="dropBtn('old')">
                <q-item-section>
                  <q-item-label>Oldest first</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="dropBtn('most')">
                <q-item-section>
                  <q-item-label>Most upvoted</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="dropBtn('least')">
                <q-item-section>
                  <q-item-label separator>Least upvoted</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> 
</template>

<script>
export default{
    name: 'DropdownBtn',
    methods:{
        dropBtn(type){            
            this.$emit('dropemit',type)
        }
    }

}
</script>

<style scoped>

</style>