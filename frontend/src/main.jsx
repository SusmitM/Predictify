import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from '@chakra-ui/react'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from "react-router-dom";
import { ImageContextProvider } from "./context/ImageContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
    <Auth0Provider
    domain="dev-yulirgcw0au7p08o.us.auth0.com"
    clientId="3EUcuBuKI8i1rwJtaVUPgVu0HL1zJpmH"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <AuthContextProvider>
    <BrowserRouter>
    <ImageContextProvider>
    <App />
    </ImageContextProvider>
    </BrowserRouter>
    </AuthContextProvider>
    </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
