<template>
  <div id="instance-dashboard">
    <h2>Dashboard</h2>

    <div v-if="!currentInstance">
      <p>No instance selected.</p>
    </div>

    <div v-else-if="currentInstance.status != 'active'">
      <p>Selected instance is {{ currentInstance.status }}</p>
    </div>

    <div v-else>
      <h4>{{ currentInstance.host }} ({{ currentInstance.info.status.value }}) </h4>
      <p>{{ currentInstance.info.version.value }}</p>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "instance-dashboard",
  computed: mapState({
      currentInstance: 'currentInstance'
  }),
};

</script>

<style scoped>
#instance-dashboard {
  margin: 20px;
  padding: 20px;
  border: 1px solid skyblue;
}
</style>