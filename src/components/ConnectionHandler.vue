<template>
  <div id="connection-handler">
    <h2>Kannel connections</h2>
    <Splitter layout="vertical" class="p-p-2">
      <SplitterPanel>
        <form @submit.prevent="addNewConnection">
          <div class="p-fluid">
            <div class="p-field">
              <InputText
                class="p-inputtext-lg"
                type="text"
                placeholder="host"
                v-model.trim="newConnectionHost"
              />
            </div>
            <div class="p-field p-mb-4">
              <Password
                v-model="newConnectionPassword"
                class="p-inputtext-lg"
                placeholder="password"
              />
            </div>
            <div class="p-field">
              <InputNumber
                v-model="newConnectionPort"
                class="p-inputtext-lg p-ml-2"
                placeholder="port"
                :min="0"
                :max="65535"
                :useGrouping="0"
              />
            </div>
            <div class="p-field">
              <Button type="submit" label="Connect" @click="addKannelConnection" class="p-ml-2 p-mt-2" />
            </div>
          </div>
        </form>
      </SplitterPanel>
      <SplitterPanel>
        <div id="connections-list-box">
          <h3>List of kannel connections</h3>
          <ul>
            <li
              v-for="connection in kannelConnectionsList"
              v-bind:key="connection.host"
            >
              <span @click="removeConnection(connection)">[X]</span>
              &nbsp;&nbsp;
              <span @click="selectConnection(connection)"
                >{{ connection.host }} ( {{ connection.status }} )</span
              >
            </li>
          </ul>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>


<script>
import { mapState } from "vuex";
import Splitter from "primevue/splitter/sfc";
import SplitterPanel from "primevue/splitterpanel/sfc";
import InputText from "primevue/inputtext/sfc";
import Password from "primevue/inputtext/sfc";
import InputNumber from "primevue/inputnumber/sfc";
import Button from "primevue/button/sfc";

export default {
  name: "connection-handler",
  components: {
    Splitter,
    SplitterPanel,
    InputText,
    Password,
    InputNumber,
    Button,
  },

  computed: {
    emptyConnectionForm() {
      return (
        this.newConnectionHost.length < 1 || this.newConnectionPassword < 1
      );
    },

    ...mapState({
      kannelConnectionsList: "kannelConnectionsList",
      currentConnection: "currentConnection",
    }),
  },

  data() {
    return {
      newConnectionHost: "",
      newConnectionPort: null,
      newConnectionPassword: "",
    };
  },
  methods: {
    addNewConnection() {
      console.log('eccome')
      if (this.emptyConnectionForm) {
        return;
      }
      this.$store.dispatch("addKannelConnection", {
        host: this.newConnectionHost,
        pass: this.newConnectionPassword,
        port: this.newConnectionPort,
      });
      this.clearFields();
    },

    clearFields() {
      this.newConnectionHost = "";
      this.newConnectionPort = 13000;
      this.newConnectionPassword = "";
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