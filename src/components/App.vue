<template>
  <Toast />
  <Splitter style="width: 100%">
    <SplitterPanel :size="30" :minSize="20">
      <connection-handler />
    </SplitterPanel>
    <SplitterPanel :size="70" :minSize="50">
      <connection-dashboard />
    </SplitterPanel>
  </Splitter>
</template>

<script>
import Splitter from "primevue/splitter/sfc";
import SplitterPanel from "primevue/splitterpanel/sfc";
import Toast from "primevue/toast/sfc";

import ConnectionHandler from "./ConnectionHandler.vue";
import ConnectionDashboard from "./ConnectionDashboard.vue";

export default {
  name: "App",
  components: {
    ConnectionHandler,
    ConnectionDashboard,
    Splitter,
    SplitterPanel,
    Toast,
  },
  data() {
    return {
      debugResult: "<h1>OK</h1>",
      sidebarFlag: true,
    };
  },
  created() {
    setInterval(() => {
      this.$store.dispatch("pingAllConnections");
    }, 1500);
  },
};
</script>

<style>
#app {
  padding: 30px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>