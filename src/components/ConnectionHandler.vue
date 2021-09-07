<template>
  <div id="connection-handler">
    <h2>Kannel Connection handler</h2>

    <form @submit.prevent="addNewConnection">
      <input
        type="text"
        v-model.trim="newConnectionHost"
        placeholder="kannel host"
      />
      <br />
      <input
        type="number"
        v-model.number="newConnectionPort"
        placeholder="kannel port"
      />
      <input
        type="password"
        v-model.trim="newConnectionPassword"
        placeholder="kannel password"
      />
      <br />
      <input type="submit" value="add" :disabled="emptyConnectionForm" />
    </form>

    <br>
    <br>

    <div id="connections-list-box">
      <h3>List of kannel connections</h3>
      <ul>
        <li v-for="connection in kannelConnectionsList" v-bind:key="connection.host">
          <span @click="removeConnection(connection)">[X]</span>
          &nbsp;&nbsp;
          <span @click="selectConnection(connection)"
            >{{ connection.host }} ( {{ connection.status }} )</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "connection-handler",

  computed: {
    emptyConnectionForm() {
      return this.newConnectionHost.length < 1 || this.newConnectionPassword < 1;
    },

    ...mapState({
      kannelConnectionsList: "kannelConnectionsList",
      currentConnection: "currentConnection",
    }),
  },

  data() {
    return {
      newConnectionHost: "",
      newConnectionPort: 13000,
      newConnectionPassword: ""
    };
  },
  methods: {

    addNewConnection() {
      if (this.emptyConnectionForm) {
        return;
      }
      this.$store.dispatch("addKannelConnection", {
        host: this.newConnectionHost, 
        pass: this.newConnectionPassword, 
        port: this.newConnectionPort
      });
      this.clearFields(); 
    },

    clearFields() {
      this.newConnectionHost = ''; 
      this.newConnectionPort = 13000; 
      this.newConnectionPassword = ''; 
    }, 

    removeConnection(connection) {
      if (!this.currentConnection) return;
      this.$store.dispatch("removeKannelConnection", connection.host);
    },

    selectConnection(connection) {
      this.$store.dispatch("setCurrentConnection", connection.host);
    },
  },
};
</script>

<style scoped>
#connection-handler {
  padding: 20px;
}

#connection-handler input {
  margin: 8px;
}

#connection-list-box {
  padding: 10px;
  border: 1px solid red;
}

ul li span {
  cursor: pointer;
}

ul li span:hover:first-child {
  color: red;
}

ul li span:hover:nth-child(2) {
  color: blue;
}
</style>