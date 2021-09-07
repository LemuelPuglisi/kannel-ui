<template>
    <Sidebar v-model:visible="sidebarFlag"> Content </Sidebar>
    <Button icon="pi pi-arrow-right" @click="sidebarFlag = !sidebarFlag" />
    <h1>porcodiooo</h1>

    <div class="p-grid">
        <div class="p-col-4">
            <connection-handler />
        </div>
        <div class="p-col-8">
            <connection-dashboard />
        </div>
    </div>

    <hr />
    <button @click="debug">debug call</button>
    <p v-html="debugResult"></p>
</template>

<script>
import Sidebar from "primevue/sidebar/sfc";
import Button from "primevue/button/sfc";

import ConnectionHandler from "./ConnectionHandler.vue";
import ConnectionDashboard from "./ConnectionDashboard.vue";
import KannelConnection from "../class/KannelConnection";
import CrossOriginHttp from "../class/CrossOriginHttp";

export default {
    name: "App",
    components: {
        ConnectionHandler,
        ConnectionDashboard,
        Sidebar,
        Button,
    },
    data() {
        return {
            debugResult: "<h1>OK</h1>",
            sidebarFlag: true,
        };
    },
    methods: {
        debug() {
            const proxy = new CrossOriginHttp("http://localhost:8181");
            const connection = new KannelConnection(proxy, "localhost", "bar");
            connection.connect();
            console.log(connection.info);
        },
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