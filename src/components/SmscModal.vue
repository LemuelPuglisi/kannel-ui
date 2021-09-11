<template>
  <Dialog
    v-if="smsc"
    v-model:visible="displayModal"
    position="left"
    class="p-shadow-24"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <template #header>
      <h1>{{ smsc.id }}</h1>
    </template>

    <p>{{smsc}}</p>

    <template #footer>
      <!-- <Button label="No" icon="pi pi-times" class="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" autofocus /> -->
    </template>
  </Dialog>

</template>

<script>
import Dialog from "primevue/dialog/sfc";

export default {
  name: "smsc-modal",
  props: ["smsc"],
  components: {
    Dialog,
  },
  data() {
    return {
      displayModal: false,
    };
  },
  watch: {
      smsc: function (smsc) {
          this.displayModal = smsc != null; 
      }, 

      displayModal: function (display) {
        if (!display) {
            this.$emit('close-smsc-modal')
        }
      }
  }
};
</script>