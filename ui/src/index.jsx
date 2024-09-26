import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Router,
  HashRouter,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LanguageProvider } from "./services/LanguageContext";
import { Provider } from "react-redux";
import configureStore from "./store/ConfigureStore";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <LanguageProvider>
        <Provider store={configureStore()}>
          <App />
        </Provider>
      </LanguageProvider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
