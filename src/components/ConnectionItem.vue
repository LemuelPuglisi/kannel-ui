<template>
    <div class="connection-item" :class="{ selected: currentStateSelected }">

        <Button icon="pi pi-times" @click="removeConnection" class="p-button-rounded p-button-danger p-button-outlined p-mr-4" />

        <div>
            <span class="status-badge p-tag">{{ connection.status }}</span>
            <span><b>{{ connection.host }}</b></span><br/>
            <small class="text-secondary">Running on port {{ connection.port }}</small><br/>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Button from 'primevue/button/sfc'; 

export default {
  name: "connection-item",
  components: {
      Button
  },
  props: ["connection"],
  computed: {
    ...mapState({
      currentStateSelected(state) {
        return (
          state.currentConnection != null &&
          state.currentConnection.host == this.connection.host &&
          state.currentConnection.port == this.connection.port
        );
      },
    }),
  },
  methods: {
    removeConnection() {
      if (!this.connection) return;
      this.$store.dispatch("removeKannelConnection", this.connection);
    },
  }
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
  display: flex;
  align-items: center;
}

.remove-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border: none; 
    border-radius: 10px; 
}

.text-secondary {
  color: #7e96a1;
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
}

@media screen and (min-width: 1300px) {
  .status-badge {
    top: 20px;
    right: 20px;
  }
}

.selected {
  border: 2px solid #c298d8;
}
</style>