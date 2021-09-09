<template>
  <Toast />
  <Splitter>
    <SplitterPanel :size="30" :minSize="20">
      <connection-handler />
    </SplitterPanel>
    <SplitterPanel :size="70" :minSize="50">
      <connection-dashboard />
    </SplitterPanel>
  </Splitter>
</template>

<script>
// import Button from "primevue/button/sfc";
import Splitter from "primevue/splitter/sfc";
import SplitterPanel from "primevue/splitterpanel/sfc";
import Toast from 'primevue/toast/sfc'; 

import ConnectionHandler from "./ConnectionHandler.vue";
import ConnectionDashboard from "./ConnectionDashboard.vue";


export default {
  name: "App",
  components: {
    ConnectionHandler,
    ConnectionDashboard,
    Splitter,
    SplitterPanel,
    Toast
  },
  data() {
    return {
      debugResult: "<h1>OK</h1>",
      sidebarFlag: true,
    };
  },
  methods: {
    // debug() {
    //   // const proxy = new CrossOriginHttp("http://localhost:8181");
    //   // const connection = new KannelConnection(proxy, "localhost", "bar");
    //   // connection.connect();
    //   // console.log(connection.info);
    //   this.$toast.add({
    //     severity: "success",
    //     summary: "Success Message",
    //     detail: "Order submitted",
    //     life: 3000,
    //   });
    // },
  },
  created() {
    setInterval(() => {
      this.$store.dispatch("pingAllConnections");
    }, 2000);
  },
};
</script>

<style scoped>
table {
  text-align: left;
}

#app {
  padding: 20px;
  width: 100%;
}
</style>