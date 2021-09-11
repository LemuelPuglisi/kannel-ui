<template>
  <Fieldset class="p-col" legend="SMSC List">
    <div class="fix-w-parent">

      <div class="p-d-flex p-flex-wrap p-jc-center">
        <smsc-item v-for="(smsc, index) in smscs" :key="index" :smsc="smsc"/>
      </div>

    </div>
  </Fieldset>
</template>

<script>
import SmscItem from "./SmscItem.vue"; 
import Fieldset from "primevue/fieldset/sfc";

export default {
  name: "smsc-collection",
  props: ["connection"],
  components: {
    SmscItem, 
    Fieldset,
  },
  computed: {
    smscs() {
      const smscList = this.connection.info.smscs.smsc;
      const tmp = smscList.map((smsc) => {
        const statusTokens = smsc.status.value.split(" ");
        const status = statusTokens[0];
        const uptime = statusTokens[1];

        const nameTokens = smsc.name.value.split(":");
        const [protocol, host, port, user] = nameTokens;

        return {
          id: smsc.id.value,
          protocol: protocol,
          host: host,
          port: port,
          user: user,
          adminId: smsc["admin-id"].value,
          status: status,
          uptime: uptime,
          failed: smsc.failed.value,
          queued: smsc.queued.value,
          sentSms: smsc.sms.sent.value,
          receivedSms: smsc.sms.received.value,
          sentDlr: smsc.dlr.sent.value,
          receivedDlr: smsc.dlr.received.value,
        };
      });
      for (let i = 0; i < 10; i++) {
        tmp.push(tmp[0]);
      }
      return tmp;
    },
  },
};
</script>