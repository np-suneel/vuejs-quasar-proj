<template>  
  <q-btn
    unelevated
    no-caps
    icon="add"
    label="Add challenges/ideas"
    class="adbt bg-grey-10"    
    size="15px"
    @click="open('top')"
  />  
  <div>
  <q-dialog v-model="dialog" :position="position" persistent>
    <q-card style="width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h5">Add a challenge/idea</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          outlined
          class="q-pl-sm q-pr-sm"
          v-model="formData.title"
          label="Title"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please enter title']"
        />
        <q-input
          outlined
          v-model="formData.descrip"
          autogrow
          class="q-pl-sm q-pr-sm"
          label="Description"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please write description'
          ]"
        />
        <div class="q-pl-sm">
          Select type:
          <q-btn-toggle
            unelevated
            clearable
            v-model="formData.type"
            toggle-color="primary"
            :options="[
              { label: 'Challenge', value: 'Challenge' },
              { label: 'Idea', value: 'Idea' }
            ]"
          />
          <q-dialog
            v-model="alert"
            persistent
            transition-show="scale"
            transition-hide="scale"
            v-if="this.formData.type === null"
          >
            <q-card>
              <q-card-section>
                <div class="text-h6">Alert</div>
              </q-card-section>
              <div v-if="this.formData.title === ''">
                <q-card-section class="q-pt-none">
                  Please enter data.
                </q-card-section>
              </div>
              <div v-else-if="this.formData.descrip === ''">
                <q-card-section class="q-pt-none">
                  Please write description.
                </q-card-section>
              </div>
              <div v-else>
                <q-card-section class="q-pt-none">
                  Please select a type.
                </q-card-section>
              </div>

              <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <div class="q-pt-md">
            Select tags:
            <q-checkbox v-model="tags.feat" label="feature" />
            <q-checkbox v-model="tags.tech" label="tech" />
            <q-checkbox v-model="tags.cod" label="coding" />
            <q-checkbox v-model="tags.sec" label="security" />
          </div>
        </div>

        <div class="q-pl-sm q-pb-md">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            @click="alert = true"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            @click="alert = false"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { date } from "quasar";

export default {
  setup() {
    const dialog = ref(false);
    const position = ref("top");

    return {
      dialog,
      position,
      alert: ref(false),
      open(pos) {
        position.value = pos;
        dialog.value = true;
      }
    };
  },
  data() {
    return {
      jsonResp: null,      
      formData: {
        title: "",
        descrip: "",
        type: null,
        tags: "",
        redate: '',
        votes: [],        
      },
      tags:{
        tech: false,
        sec: false,
        cod: false,
        feat: false
      }
    };
  },
  methods: {
    onReset() {
      this.formData.title = "";
      this.formData.descrip = "";
      this.formData.type = null;
      this.formData.tags = '';      
      this.tags.cod = false;
      this.tags.sec = false;
      this.tags.tech = false;
      this.tags.feat = false;      
    },
    onSubmit() {          
      if (this.formData.type !== null) { 
        console.log('clicked add submit')     
        const timeStamp = Date.now();
        this.formData.redate = date.formatDate(timeStamp, "DD-MM-YY HH:mm:ss");

      if(this.tags.feat === true)        
        this.formData.tags+='#feature '
      if(this.tags.tech === true)
        this.formData.tags+='#tech '
        if(this.tags.cod === true)
        this.formData.tags+='#coding ' 
      if(this.tags.sec === true)
        this.formData.tags+='#security '       

        this.$emit('add-chall', this.formData);         
      this.formData.tags = '';
       
      }
    }
  },
  emits: ['add-chall']
};
</script>

<style scoped>

</style>
