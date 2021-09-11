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
  <smsc-modal
    :connection="connection"
    :smscId="selectedSmscId"
    @close-smsc-modal="removeSelectedSmsc"
  />
</template>

<script>
import SmscItem from "./SmscItem.vue";
import SmscModal from "./SmscModal.vue";
import Fieldset from "primevue/fieldset/sfc";

/**
 * SMSC Selection FLOW
 * -----------------------------------------------------------------------------------
 * SMSC is selected from the list using the "click" event on SmscItem component.
 * The smsc is binded to selectedSmscId variable, that is passed as a prop to the
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
      selectedSmscId: null,
    };
  },
  computed: {
    smscs() {
      return this.connection.getSmscs();
    },
  },
  methods: {
    selectSmsc(smsc) {
      this.selectedSmscId = smsc.id;
    },
    removeSelectedSmsc() {
      this.selectedSmscId = null;
    },
  },
};
</script>