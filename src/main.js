import { createApp } from 'vue'

import store from './store'
import App from './components/App.vue'; 
import PrimeVue from 'primevue/config'; 

import '@/assets/css/main.css'; 
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/bootstrap4-dark-purple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App); 

app.use(store); 
app.use(PrimeVue)

app.mount('#app'); 