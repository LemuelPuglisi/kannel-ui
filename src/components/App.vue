<template>

  <div class="p-grid">
    <div class="p-col-4">
      <instance-handler/>
    </div>
    <div class="p-col-8">
      <instance-dashboard/>
    </div>
  </div>

  <hr>
  <button @click="debug">debug call</button>
  <p v-html="debugResult"></p>


</template>

<script>

import InstanceHandler from './InstanceHandler.vue';
import InstanceDashboard from './InstanceDashboard.vue';
import KannelInstance from '../class/KannelInstance';
import CrossOriginHttp from '../class/CrossOriginHttp';

export default {
  name: 'App',
  components: {
    InstanceHandler, 
    InstanceDashboard
  }, 
  data() {
    return {
      debugResult: '<h1>OK</h1>'
    }
  },
  methods: {
    debug() {
      const proxy = new CrossOriginHttp('http://localhost:8181'); 
      const instance = new KannelInstance(proxy, 'localhost', 'bar'); 
      instance.connect(); 
      console.log(instance.info)
    }
  },
  created() {
    setInterval(() => {
      this.$store.dispatch('pingAllInstances')
    }, 2000); 
  }
}
</script>

<style scoped>

  table {
    text-align: left;
  }

  #app {
    padding: 20px; 
    width: 100%;
  }

</style>