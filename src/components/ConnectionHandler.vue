<template>
  <div id="connection-handler">
    <h2>Kannel connections</h2>

    <form @submit.prevent="addNewConnection" class="p-mb-3">
      <div class="p-fluid">
        <div class="p-field">
          <InputText
            type="text"
            placeholder="host"
            v-model.trim="newConnectionHost"
          />
        </div>
        <div class="p-field p-mb-4">
          <InputText
            type="password"
            placeholder="password"
            v-model.trim="newConnectionPassword"
          />
        </div>
        <div class="p-field p-mb-4">
          <InputNumber
            v-model="newConnectionPort"
            class="p-ml-2"
            placeholder="port"
            :min="0"
            :max="65535"
            :useGrouping="false"
          />
        </div>
        <div class="p-ml-2 p-mt-2">
          <Button
            type="submit"
            label="connect"
            @click="addNewConnection"
            class="p-button-outlined p-button-rounded"
            :disabled="emptyConnectionForm"
          />
        </div>
      </div>
    </form>

    <div class="p-mt-5 p-mb-5">
      <Divider align="center">
        <span class="p-tag">Connections list</span>
      </Divider>
    </div>

    <div id="connections-list-box">
      <ScrollPanel style="max-height: 40vh; width: 100%">
        <connection-item
          v-for="connection in kannelConnectionsList"
          v-bind:key="connection.host"
          :connection="connection"
          @click="selectConnection(connection)"
        />

        <ScrollTop
          target="parent"
          :threshold="100"
          class="custom-scrolltop"
          icon="pi pi-arrow-up"
        />
      </ScrollPanel>
    </div>
  </div>

</template>


<script>
import { mapState } from "vuex";
import InputText from "primevue/inputtext/sfc";
import InputNumber from "primevue/inputnumber/sfc";
import Button from "primevue/button/sfc";
import Divider from "primevue/divider/sfc";
import ScrollPanel from "primevue/scrollpanel/sfc";
import ScrollTop from "primevue/scrolltop/sfc";
import ConnectionItem from "./ConnectionItem";

export default {
  name: "connection-handler",
  components: {
    InputText,
    InputNumber,
    Button,
    Divider,
    ScrollPanel,
    ScrollTop,
    ConnectionItem,
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
      if (this.emptyConnectionForm) {
        return;
      }
      this.$store.dispatch("addKannelConnection", {
        host: this.newConnectionHost,
        pass: this.newConnectionPassword,
        port: this.newConnectionPort,
      }); 
      this.$toast.add({
        severity:'success', 
        summary: 'Connection created', 
        detail: `Trying to connect to ${this.newConnectionHost}`, 
        life: 2000}
      );
      this.clearFields();
    },

    clearFields() {
      this.newConnectionHost = "";
      this.newConnectionPort = null;
      this.newConnectionPassword = "";
    },

    selectConnection(connection) {
      this.$store.dispatch("setCurrentConnection", connection);
    },
  },
};
</script>

<style scoped>

#connection-handler {
  padding: 20px;
  margin-right: 15px;
}

#connection-handler input {
  margin: 8px;
}

#connections-list-box {
  width: 100%;
  border: 1px solid #3f4b5b;
  border-radius: 10px;
  padding: 10px;
  padding-left: 20px;
  display: flex;
  justify-content: center;
}

.p-scrollpanel {
  max-height: 30vh !important;
}

@media screen and (min-height: 900px) {
  .p-scrollpanel {
    max-height: 40vh !important;
  }
}


/* DIVIDER CSS WORKAROUND BC OF PRIMEVUE BUG */

.p-divider-solid.p-divider-horizontal:before {
  border-top-style: solid !important;
}
.p-divider-dashed.p-divider-horizontal:before {
  border-top-style: dashed !important;
}
.p-divider-solid.p-divider-vertical:before {
  border-left-style: solid !important;
}
</style>