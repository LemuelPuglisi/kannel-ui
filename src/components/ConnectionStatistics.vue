<template>
  <Fieldset class="p-col" legend="WPS">
    <ProgressBar class="p-m-2" :value="wpsSentPercentage">
      {{ wpsSentPercentage }}% of sent wps out of queue.</ProgressBar
    >
    <ProgressBar class="p-m-2" :value="wpsReceivedPercentage">
      {{ wpsReceivedPercentage }}% of received wps out of queue.</ProgressBar
    >
  </Fieldset>

  <Fieldset class="p-col" legend="SMS">
    <ProgressBar class="p-m-2" :value="smsSentPercentage">
      {{ smsSentPercentage }}% of sent sms out of queue.</ProgressBar
    >
    <ProgressBar class="p-m-2" :value="smsReceivedPercentage">
      {{ smsReceivedPercentage }}% of received sms out of queue.</ProgressBar
    >
  </Fieldset>

  <Fieldset class="p-col" legend="DLR">
    <div class="dlr-box-stat">
      
      <div class="dlr-stat-received">
          <div class="circle">{{ connection.info.dlr.received.total.value }}</div>
          <div class="label">received</div>
      </div>

      <div class="dlr-stat-received">
          <div class="circle">{{ connection.info.dlr.queued.value }}</div>
          <div class="label">queued</div>
      </div>

    <div class="dlr-stat-received">
          <div class="circle">{{ connection.info.dlr.sent.total.value }}</div>
          <div class="label">sent</div>
      </div>

    </div>
  </Fieldset>

</template>

<script>
import Fieldset from "primevue/fieldset/sfc";
import ProgressBar from "primevue/progressbar/sfc";

export default {
  name: "connection-statistics",
  props: ["connection"],
  components: {
    Fieldset,
    ProgressBar,
  },
  data() {
    return {};
  },
  computed: {
    wpsSentPercentage() {
      const t = parseInt(this.connection.info.wdp.sent.total.value);
      const q = parseInt(this.connection.info.wdp.sent.queued.value);
      return t == 0 ? t : (1 - q/t) * 100;
    },
    wpsReceivedPercentage() {
      const t = parseInt(this.connection.info.wdp.received.total.value);
      const q = parseInt(this.connection.info.wdp.received.queued.value);
      return t == 0 ? t : (1 - q/t) * 100;
    },
    smsSentPercentage() {
      const t = parseInt(this.connection.info.sms.sent.total.value);
      const q = parseInt(this.connection.info.sms.sent.queued.value);
      return t == 0 ? t : (1 - q/t) * 100;
    },
    smsReceivedPercentage() {
      const t = parseInt(this.connection.info.sms.received.total.value);
      const q = parseInt(this.connection.info.sms.received.queued.value);
      return t == 0 ? t : (1 - q/t) * 100;
    },
  },
};
</script>

<style scoped>
.p-chart {
  width: 90% !important;
}

.chart-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.dlr-box-stat {
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

[class*="dlr-stat"] {
    display: flex;
    flex-flow: column;
}

[class*="dlr-stat"] > .circle {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 3px solid #c298d8;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

[class*="dlr-stat"] > .label {
    text-align: center;
}

</style>