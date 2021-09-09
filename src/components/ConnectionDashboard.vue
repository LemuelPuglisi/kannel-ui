<template>
  <div id="connection-dashboard">
    <div class="no-connection-box" v-if="!currentConnection">
      <h1>No <span class="strong-underline">connection</span> selected.</h1>
    </div>

    <div v-else>
      <Toolbar>
        <template #left>
          <Button
            label="Resume"
            @click="currentConnection.resume()"
            :disabled="!instanceSuspended || connectionNotActive"
            icon="pi pi-plus"
            class="p-mr-2 p-button-outlined p-button-success"
          />
          <Button
            label="Isolate"
            :disabled="connectionNotActive"
            @click="currentConnection.isolate()"
            icon="pi pi-plus"
            class="p-mr-2 p-button-outlined p-button-warning"
          />
          <Button
            label="Suspend"
            @click="currentConnection.suspend()"
            :disabled="connectionNotActive"
            icon="pi pi-plus"
            class="p-mr-2 p-button-outlined p-button-warning"
          />
          <Button
            label="Shutdown"
            @click="currentConnection.shutdown()"
            :disabled="connectionNotActive"
            icon="pi pi-plus"
            class="p-mr-2 p-button-outlined p-button-danger"
          />
          <Button
            label="Restart"
            :disabled="connectionNotActive"
            icon="pi pi-plus"
            class="p-mr-2 p-button-outlined p-button-danger"
          />
          <Button
            label="Reload lists"
            @click="currentConnection.reloadLists()"
            :disabled="connectionNotActive"
            icon="pi pi-plus"
            class="p-mr-2 p-button-outlined"
          />
        </template>
        <template #right>
          <Button
            icon="pi pi-times"
            @click="expelCurrentConnection"
            class="p-button-danger"
          />
        </template>
      </Toolbar>

      <div v-if="connectionNotActive">
        <Skeleton class="p-mt-3 p-mb-3" height="10rem"></Skeleton>
        <div class="p-d-flex">
          <Skeleton class="p-mb-3" height="3rem" width="15rem"></Skeleton>
          <h1 class="p-mb-0 p-mt-0 p-ml-5">
            Current connection is
            <span class="strong-underline">{{ currentConnection.status }}</span
            >, Reconnecting.
          </h1>
        </div>
        <Skeleton class="p-mb-3" height="3rem"></Skeleton>
        <Skeleton class="p-mb-3" height="3rem"></Skeleton>
        <Skeleton class="p-mb-3" height="3rem"></Skeleton>
      </div>

      <div v-else class="p-mt-3">
        <Panel>
          <template #header>
            <span>
              {{ currentConnection.host }} 
            </span>
          </template>
          {{ currentConnection.info.version.value }}
          <div class="p-mt-5 p-d-flex p-flex-row-reverse">
            <span class="p-tag">{{ currentConnection.info.status.value }}</span>
          </div>
        </Panel>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Toolbar from "primevue/toolbar/sfc";
import Button from "primevue/button/sfc";
import Skeleton from "primevue/skeleton/sfc";
import Panel from "primevue/panel/sfc";

export default {
  name: "connection-dashboard",
  components: {
    Toolbar,
    Button,
    Skeleton,
    Panel,
  },
  computed: {
    ...mapState({
      currentConnection: "currentConnection",
    }),
    connectionNotActive() {
      return this.currentConnection.status != "active";
    },
    instanceSuspended() {
      return this.currentConnection.instanceIsSuspended();
    },
    smscs() {
      return this.currentConnection.info.smscs.smsc;
    },
  },
  data() {
    return {
      menuItems: [
        {
          label: "test",
          icon: "pi pi-plus",
          command: () => this.debug(),
        },
      ],
    };
  },
  methods: {
    expelCurrentConnection() {
      this.$store.dispatch("removeCurrentConnection");
    },
  },
};
</script>

<style scoped>
#connection-dashboard {
  padding: 20px;
  height: 100%;
}

button {
  margin: 5px;
}

.smsc-box {
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid darkmagenta;
}

.no-connection-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.strong-underline {
  border-bottom: 3px solid #c298d8;
}
</style>