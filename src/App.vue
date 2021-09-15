<template>   

  <Login v-if="logPg === 'lgout'" @succ="openMainPg" @empname="empName" @empid="empId"/>
  <NewMain v-if="mnPg === 'succ'" @lgout="closeMainPg" :empname="empname" :empid="empid"/>
    
</template>

<script>
import Login from 'layouts/Login'
import NewMain from 'layouts/NewMain'


export default {
    name: 'App',
    components:{
    Login,
    NewMain
    },     
    data(){
      return{
        mnPg : null,
        logPg : 'lgout',
        empname : null,
        empid: null
      }
    },
    methods:{
      openMainPg(str){
        this.mnPg = str
        this.logPg = str
      },
      closeMainPg(str){        
        this.logPg = str
        this.mnPg = str
      },
      empName(str){        
        this.empname = str        
      },
      empId(str){
        this.empid = str  
      }
    }

}

</script>
