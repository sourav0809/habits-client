import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { queryClient } from "@/lib/query/client";
import { envConfig } from "@/config/envConfig";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={envConfig.googleAuth.clientId}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
