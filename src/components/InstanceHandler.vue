<template>
  <div id="instance-handler">
    <h2>Kannel Instance handler</h2>

    <form @submit.prevent="addNewInstance">
      <input
        type="text"
        v-model.trim="newInstanceHost"
        placeholder="kannel host"
      />
      <br />
      <input
        type="number"
        v-model.number="newInstancePort"
        placeholder="kannel port"
      />
      <input
        type="password"
        v-model.trim="newInstancePassword"
        placeholder="kannel password"
      />
      <br />
      <input type="submit" value="add" :disabled="emptyInstanceForm" />
    </form>

    <br>
    <br>

    <div id="instances-list-box">
      <h3>List of kannel instances</h3>
      <ul>
        <li v-for="instance in kannelInstancesList" v-bind:key="instance.host">
          <span @click="removeInstance(instance)">[X]</span>
          &nbsp;&nbsp;
          <span @click="selectInstance(instance)"
            >{{ instance.host }} ( {{ instance.status }} )</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import CrossOriginHttp from '../class/CrossOriginHttp';
import KannelInstance from "../class/KannelInstance";

export default {
  name: "instance-handler",

  computed: {
    emptyInstanceForm() {
      return this.newInstanceHost.length < 1 || this.newInstancePassword < 1;
    },

    ...mapState({
      kannelInstancesList: "kannelInstancesList",
      currentInstance: "currentInstance",
    }),
  },

  data() {
    return {
      newInstanceHost: "",
      newInstancePort: 13000,
      newInstancePassword: ""
    };
  },
  methods: {
    addNewInstance() {
      if (this.emptyInstanceForm) {
        return;
      }
      const instance = new KannelInstance(
        new CrossOriginHttp('http://localhost:8181'),
        this.newInstanceHost,
        this.newInstancePassword,
        this.newInstancePort
      );
      this.$store.dispatch("addKannelInstance", instance);
      this.newInstanceHost = "";
      this.newInstancePassword = "";
    },

    removeInstance(instance) {
      if (!this.currentInstance) return;
      this.$store.dispatch("removeKannelInstance", instance.host);
    },

    selectInstance(instance) {
      this.$store.dispatch("setCurrentInstance", instance.host);
    },
  },
};
</script>

<style scoped>
#instance-handler {
  padding: 20px;
}

#instance-handler input {
  margin: 8px;
}

#instances-list-box {
  padding: 10px;
  border: 1px solid red;
}

ul li span {
  cursor: pointer;
}

ul li span:hover:first-child {
  color: red;
}

ul li span:hover:nth-child(2) {
  color: blue;
}
</style>