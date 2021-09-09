<template>
  <div class="connection-item" v-if="connection" :class="{ 'selected': currentStateSelected }">
    <span class="status-badge p-tag">{{ connection.status }}</span>
    <span
      ><b>{{ connection.host }}</b></span
    >
    <br />
    <small class="bluegray-400">Running on port {{ connection.port }}</small> <br>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "connection-item",
  props: ["connection"],
  computed: {
    ...mapState({
      currentStateSelected (state) {
          return state.currentConnection != null &&
                 state.currentConnection.host == this.connection.host &&
                 state.currentConnection.port == this.connection.port; 
      }
    }),
  },
};
</script>

<style scoped>
.connection-item {
  position: relative;
  width: 100%;
  background-color: #20262e;
  border: none;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.5s;
}

.connection-item:hover {
  background-color: #1a1f24;
}

.status-badge {
  position: absolute;
  top: 20px;
  right: 20px;
}

.selected {
    border: 2px solid #c298d8; 
}

</style>