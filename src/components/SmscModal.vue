<template>
  <Dialog
    v-if="connection && smscId"
    v-model:visible="displayModal"
    position="left"
    class="p-shadow-24"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <template #header>
      <div>
        <h1 class="p-mb-0">{{ smsc.id }}</h1>
        <h3 class="p-mt-0 text-secondary">{{ smsc.host }}</h3>
      </div>
    </template>

    <div class="p-grid p-p-3">
      <div class="p-col">
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Protocol</span>
          <InputText :value="smsc.protocol" readonly />
        </div>
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Port</span>
          <InputText :value="smsc.port" readonly />
        </div>
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">User</span>
          <InputText :value="smsc.user" readonly />
        </div>
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Admin ID</span>
          <InputText :value="smsc.adminId" readonly />
        </div>
      </div>

      <div class="p-col">
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Status</span>
          <InputText :value="smsc.status" readonly />
        </div>
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Uptime</span>
          <InputText :value="smsc.uptime" readonly />
        </div>
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Failed</span>
          <InputText :value="smsc.failed" readonly />
        </div>
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Queued</span>
          <InputText :value="smsc.queued" readonly />
        </div>
      </div>

      <div class="p-col">
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Sent sms</span>
          <InputText :value="smsc.sentSms" readonly />
        </div>
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Received Sms</span>
          <InputText :value="smsc.receivedSms" readonly />
        </div>
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Sent DLR</span>
          <InputText :value="smsc.sentDlr" readonly />
        </div>
        <div class="p-inputgroup p-p-1">
          <span class="p-inputgroup-addon">Received DLR</span>
          <InputText :value="smsc.receivedDlr" readonly />
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        label="Stop smsc"
        class="p-button-outlined p-button-danger"
        @click="stopSmsc"
        icon="pi pi-stop"
      />
      <Button
        label="Start smsc"
        class="p-button-outlined p-button-success"
        @click="startSmsc"
        icon="pi pi-stop"
      />
      <Button
        label="Close"
        @click="displayModal = false"
        class="p-button-outlined"
        icon="pi pi-tim es"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog/sfc";
import InputText from "primevue/inputtext/sfc";
import Button from "primevue/button/sfc";

export default {
  name: "smsc-modal",
  props: ["connection", "smscId"],
  components: {
    Dialog,
    InputText,
    Button,
  },
  computed: {
    smsc() {
      return this.connection.getSmscs().find((smsc) => smsc.id == smsc.id);
    },
  },
  data() {
    return {
      displayModal: false,
    };
  },
  methods: {
    stopSmsc() {
      this.connection.stopSmsc(this.smscId).then(message =>
        this.$toast.add({
          severity: "success",
          summary: "Smsc stopped successfully.",
          detail: message,
          life: 2000,
        })
      )
      .catch(errorMessage => {
        this.$toast.add({
          severity: "error",
          summary: "Cannot stop smsc",
          detail: `Error: ${errorMessage}`,
          life: 2000,
        })
      })
    },
    startSmsc() {
      this.connection.startSmsc(this.smscId).then(message =>
        this.$toast.add({
          severity: "success",
          summary: "Smsc started successfully.",
          detail: message,
          life: 2000,
        })
      )
      .catch(errorMessage => {
        this.$toast.add({
          severity: "error",
          summary: "Cannot start smsc",
          detail: `Error: ${errorMessage}`,
          life: 2000,
        })
      })
    },
  },
  watch: {
    smscId: function (smsc) {
      this.displayModal = smsc != null;
    },

    displayModal: function (display) {
      if (!display) {
        this.$emit("close-smsc-modal");
      }
    },
  },
};
</script>