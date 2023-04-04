import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App";
import router from "./router";

/**style */
import "normalize.css";
import "@/styles/index.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
