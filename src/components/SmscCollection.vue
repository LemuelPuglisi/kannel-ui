<template>
  <Fieldset class="p-col" legend="SMSC List">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nulla sed
    suscipit, a similique quasi praesentium, necessitatibus magnam et unde eos
    mollitia repellat, obcaecati ipsum. Fugiat ut quis veritatis molestias!
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