<template>
  <div id="connection-dashboard">
    <h2>Dashboard</h2>

    <div v-if="!currentConnection">
      <p>No connection selected.</p>
    </div>

    <div v-else-if="currentConnection.status != 'active'">
      <p>Selected connection is {{ currentConnection.status }}</p>
    </div>

    <div v-else>
      <h4>
        {{ currentConnection.host }} ({{ currentConnection.info.status.value }})
      </h4>
      <p>{{ currentConnection.info.version.value }}</p>

      <button @click="currentConnection.suspend()">Suspend</button>
      <button @click="currentConnection.isolate()">Isolate</button>
      <button @click="currentConnection.resume()" :disabled="!instanceSuspended">Resume</button>
      <button @click="currentConnection.shutdown()">Shutdown</button>
      <button @click="currentConnection.softRestart()">Soft restart</button>
      <button @click="currentConnection.hardRestart()">Hard restart</button>
      <button @click="currentConnection.reloadLists()">Reload lists</button>

      <hr>

      <h4>Smsc list</h4>
      <div class="smsc-box" v-for="smsc in smscs" v-bind:key="smsc.id.value"> 
        {{ smsc.id.value }} 
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "connection-dashboard",
  computed: {
    ...mapState({
      currentConnection: "currentConnection",
    }),
    instanceSuspended() {
      return this.currentConnection.instanceIsSuspended(); 
    }, 
    smscs() {
      return this.currentConnection.info.smscs.smsc; 
    }
  },
};
</script>

<style scoped>
#connection-dashboard {
  margin: 20px;
  padding: 20px;
  border: 1px solid skyblue;
}

button {
  margin: 5px;
}

.smsc-box {
  padding: 10px; 
  margin-bottom: 5px; 
  border: 1px solid darkmagenta; 
}
</style>