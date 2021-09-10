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
            icon="pi pi-play"
            class="p-mr-2 p-button-sm p-button-outlined p-button-success"
          />
          <Button
            label="Isolate"
            :disabled="connectionNotActive"
            @click="currentConnection.isolate()"
            icon="pi pi-lock"
            class="p-mr-2 p-button-sm p-button-outlined p-button-warning"
          />
          <Button
            label="Suspend"
            @click="currentConnection.suspend()"
            :disabled="connectionNotActive"
            icon="pi pi-pause"
            class="p-mr-2 p-button-sm p-button-outlined p-button-warning"
          />
          <Button
            label="s-restart"
            @click="currentConnection.softRestart()"
            :disabled="connectionNotActive"
            icon="pi pi-replay"
            class="p-mr-2 p-button-sm p-button-outlined p-button-warning"
          />
          <Button
            label="h-restart"
            @click="currentConnection.hardRestart()"
            :disabled="connectionNotActive"
            icon="pi pi-replay"
            class="p-mr-2 p-button-sm p-button-outlined p-button-danger"
          />
          <Button
            label="Shutdown"
            @click="currentConnection.shutdown()"
            :disabled="connectionNotActive"
            icon="pi pi-power-off"
            class="p-mr-2 p-button-sm p-button-outlined p-button-danger"
          />
          <Button
            label="bwlist"
            @click="currentConnection.reloadLists()"
            :disabled="connectionNotActive"
            icon="pi pi-refresh"
            class="p-mr-2 p-button-sm p-button-outlined"
          />
        </template>
        <template #right>
          <Button
            icon="pi pi-times"
            @click="expelCurrentConnection"
            class="p-button-sm p-button-danger"
          />
        </template>
      </Toolbar>

      <div v-if="connectionNotActive">
        <Skeleton class="p-mt-3 p-mb-3" height="10rem"></Skeleton>
        
        <div class="p-d-flex p-jc-start p-mt-2 p-mb-2">
          
          <Skeleton class="p-mb-3" height="3rem" width="15rem"></Skeleton>
          <h1 class="p-mb-0 p-mt-0 p-ml-5">
            Current connection is
            <span class="strong-underline">{{ currentConnection.status }}</span
            >, reconnecting.
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
            <div class="status-badge p-mt-5 p-d-flex p-flex-row-reverse">
              <span class="p-tag">{{
                currentConnection.info.status.value
              }}</span>
            </div>
          </template>

          <Accordion :activeIndex="1">
          
            <AccordionTab header="Instance status">
              {{ currentConnection.info.version.value }}
            </AccordionTab>
          
            <AccordionTab header="Misc. informations">
              <div class="p-grid">
                <div class="p-col">
                  <div class="p-inputgroup p-p-1">
                    <span class="p-inputgroup-addon">SMS inbound</span>
                    <InputText :value="currentConnection.info.sms.inbound.value"/>
                  </div>

                  <div class="p-inputgroup p-p-1">
                    <span class="p-inputgroup-addon">SMS outbound</span>
                    <InputText :value="currentConnection.info.sms.outbound.value"/>
                  </div>
                </div>
                
                <div class="p-col">
                  <div class="p-inputgroup p-p-1">
                    <span class="p-inputgroup-addon">DLR inbound</span>
                    <InputText :value="currentConnection.info.dlr.inbound.value"/>
                  </div>

                  <div class="p-inputgroup p-p-1">
                    <span class="p-inputgroup-addon">DLR outbound</span>
                    <InputText :value="currentConnection.info.dlr.outbound.value"/>
                  </div>
                </div>

                <div class="p-col">
                  <div class="p-inputgroup p-p-1">
                    <span class="p-inputgroup-addon">SMS storesize</span>
                    <InputText :value="currentConnection.info.sms.storesize.value"/>
                  </div>

                  <div class="p-inputgroup p-p-1">
                    <span class="p-inputgroup-addon">DLR storage</span>
                    <InputText :value="currentConnection.info.dlr.storage.value"/>
                  </div>
                </div>
              </div>
            </AccordionTab>
          
          </Accordion>
        </Panel>

        <div class="p-mt-3 p-grid">
          <connection-statistics :connection="currentConnection" />
        </div>

        <div class="p-mt-3">
          <smsc-collection :connection="currentConnection"/>
        </div>

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
import ConnectionStatistics from "./ConnectionStatistics";
import Accordion from "primevue/accordion/sfc";
import AccordionTab from "primevue/accordiontab/sfc";
import InputText from "primevue/inputtext/sfc";
import SmscCollection from "./SmscCollection.vue"; 

export default {
  name: "connection-dashboard",
  components: {
    Toolbar,
    Button,
    Skeleton,
    Panel,
    ConnectionStatistics,
    Accordion,
    AccordionTab,
    InputText,
    SmscCollection
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
      restartButtons: [
        {
          label: "Soft restart",
          icon: "pi pi-plus",
          command: () => {
            console.log("here");
          },
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

<style>
#connection-dashboard {
  padding: 20px;
  height: 100%;
  overflow: scroll;
}

.p-panel-header {
  position: relative !important;
}

.status-badge {
  position: absolute;
  top: -18px;
  right: 20px;
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