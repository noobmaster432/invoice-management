import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";  
import App from "./App.jsx";  
import store from "./redux/store";  
import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}> 
    <App />
  </Provider>
);