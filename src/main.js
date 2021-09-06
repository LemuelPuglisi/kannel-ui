import { createApp } from 'vue'

import store from './store'
import App from './components/App.vue'; 
import PrimeVue from 'primevue/config'; 

import '@/assets/css/main.css'; 
import 'primeflex/primeflex.css';

const app = createApp(App); 

app.use(store); 
app.use(PrimeVue)

app.mount('#app'); 