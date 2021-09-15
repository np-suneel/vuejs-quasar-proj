<template>
    <q-btn
    unelevated    
    label="Log out"
    no-caps
    icon="logout"    
    class="logbt bg-grey-10"
    size="15px" 
    @click="this.$emit('lgout','lgout')"   
    >
    </q-btn>
</template>

<script>

export default {
    name: 'LogOut',
    emits: ['lgout']
}

</script>


<style lang="scss" scoped>
</style>