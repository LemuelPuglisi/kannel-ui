<template>
  <div class="smsc-outer-box">
    <div class="smsc-box" />
    <div class="smsc-content">
      <div style="text-align: center">
        <div class="p-m-3">
            <Tag :value="smsc.status" :severity="statusSeverity"/>
        </div>
        <span class="p-text-nowrap"><b>{{ smsc.id }}</b></span><br/>
        <small> {{ smsc.host }} </small> <br>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from 'primevue/tag';

const statusColorMap = new Map([
    ['online', 'success'], 
    ['re-connecting', 'warning'], 
    ['connecting', 'warning'],     
    ['disconnected', 'danger'],     
    ['dead', 'danger']
])

export default {
    name: 'smsc-item', 
    props: ['smsc'], 
    components: {
        Tag, 
    }, 
    computed: {
        statusSeverity() {
            return statusColorMap.get(this.smsc.status); 
        }
    }
}
</script>

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.smsc-outer-box {
  position: relative;
  width: 240px;
  height: 220px;
}

.smsc-box {
  height: 150px;
  width: 200px;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;
  background-color: #20262e;
}
.smsc-box:before {
  content: "";
  background-image: conic-gradient(#c298d8 20deg, transparent 120deg);
  height: 150%;
  width: 150%;
  position: absolute;
  left: -25%;
  top: -25%;
  animation: rotate 2s infinite linear;
}
@keyframes rotate {
  100% {
    transform: rotate(-360deg);
  }
}
.smsc-box:after {
  content: "";
  height: 94%;
  width: 94%;
  position: absolute;
  background-color: #20262e;
  border-radius: 5px;
  top: 3%;
  left: 3%;
  color: #04b0ee;
  display: grid;
  place-items: center;
  font-size: 20px;
  letter-spacing: 6px;
}

.smsc-content {
  position: absolute;
  height: 150px;
  width: 200px;
  top:  16%;
  left: 10%; 
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  border-radius: 5px;  
  transition: .5s;
}

.smsc-content:hover {
  background-color: rgba(2, 2, 2, 0.5);
}

</style>