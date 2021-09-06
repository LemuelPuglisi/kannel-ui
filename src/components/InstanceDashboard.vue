<template>
  <div id="instance-dashboard">
    <h2>Dashboard</h2>
    <p v-if="!currentInstance">Current instance not selected.</p>
    <p v-else>{{ currentInstance.host}}:{{ currentInstance.password }} is {{ currentInstance.status }} </p>
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