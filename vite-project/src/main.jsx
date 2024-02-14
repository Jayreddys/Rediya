import React from "react";
import { createRoot } from "react-dom/client";// Change this import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { Provider } from "react-redux";
import App from "./App";
import './main.css'
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
      </Provider>
  </React.StrictMode>
);
