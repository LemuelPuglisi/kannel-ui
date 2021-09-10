<template>
  <Fieldset class="p-col" legend="SMSC List">
      
  </Fieldset>
</template>

<script>
import Fieldset from "primevue/fieldset/sfc";

export default {
  name: "smsc-collection",
  props: ["connection"],
  components: {
    Fieldset,
  },
};
</script>