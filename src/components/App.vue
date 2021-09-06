<template>

  <div class="p-grid">
    <div class="p-col-4">
      <instance-handler/>
    </div>
    <div class="p-col-8">
      <instance-dashboard/>
    </div>
  </div>

</template>

<script>

import InstanceHandler from './InstanceHandler.vue';
import InstanceDashboard from './InstanceDashboard.vue';

export default {
  name: 'App',
  components: {
    InstanceHandler, 
    InstanceDashboard
  }, 
  created() {
    setInterval(() => {
      this.$store.dispatch('pingAllInstances')
    }, 1000); 
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