<template>
  <Fieldset class="p-col" legend="SMSC List">
    <div class="fix-w-parent">
      <div class="p-d-flex p-flex-wrap p-jc-center">
        <smsc-item
          v-for="(smsc, index) in smscs"
          :key="index"
          :smsc="smsc"
          @click="selectSmsc(smsc)"
        />
      </div>
    </div>
  </Fieldset>
  <!-- smsc modal -->
  <smsc-modal :smsc="selectedSmsc" @close-smsc-modal="removeSelectedSmsc" />
</template>

<script>
import SmscItem from "./SmscItem.vue";
import SmscModal from "./SmscModal.vue";
import Fieldset from "primevue/fieldset/sfc";

/**
 * SMSC Selection FLOW 
 * -----------------------------------------------------------------------------------
 * SMSC is selected from the list using the "click" event on SmscItem component.
 * The smsc is binded to selectedSmsc variable, that is passed as a prop to the 
 * SmscModal component. The modal component watches the passed smsc, and when it 
 * isn't null, then it displays the modal, updating a variable called displayModal. 
 * This is not done with computed props because the inner Dialog component needs to 
 * set this flag as false when the user closes the modal. The displayModel variable
 * is watched by SmscModal and, when it's set to false, the component emit a 
 * close-smsc-modal event. This event is catched here and handled with the 
 * removeSelectedSmsc method. 
 * -----------------------------------------------------------------------------------
 */

export default {
  name: "smsc-collection",
  props: ["connection"],
  components: {
    SmscItem,
    SmscModal,
    Fieldset,
  },
  data() {
    return {
      selectedSmsc: null,
    };
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
  methods: {
    selectSmsc(smsc) {
      this.selectedSmsc = smsc;
    },
    removeSelectedSmsc() {
      this.selectedSmsc = null;
    },
  },
};
</script>